---
title: 讓 AI 當「群組裡的一個成員」——ai-chatroom 開發筆記
slug: ai-chatroom
status: draft
date: 2026-06-16
tags: [AI, Spring AI, WebSocket, SSE, React]
cover: /projects/ai-chatroom/home.png
repo: https://github.com/Rex-shark/ai-chatroom
---

> 📌 這是一篇**草稿**，未來搬進站內 `/blog`。資料來源為 ai-chatroom 專案的 `README.md` 與 `docs/features.md`，不含未公開數據。

# 讓 AI 當「群組裡的一個成員」

大多數 AI 聊天產品是「人對 AI 一對一」，而一般聊天室是「人對人」。**ai-chatroom** 想做的是把兩者合一：在一個**多真人房間**裡放進一位 AI 成員 **Luna 🌙**，讓她像群組裡真正的一個夥伴——會自己判斷什麼時候該講話、什麼時候安靜。

技術上是 **Spring Boot 3 + React 19 + Spring AI** 的全端專案，用 Docker 單一網域部署。這篇談幾個我覺得最有意思的設計決策。

![首頁](/projects/ai-chatroom/home.png)

---

## 一、兩種聊天形態，兩種串流技術

專案裡有兩個入口，刻意用了**不同的即時技術**，因為它們的通訊模型本質不同：

| 形態 | 場景 | 即時技術 | 對話記憶 key |
|------|------|----------|--------------|
| **AI 泡泡** | 訪客與 Luna 一對一陪聊 | **SSE**（`WebFlux Flux`） | `anonId` |
| **多人聊天室** | 多真人 + Luna 同房 | **WebSocket / STOMP** | `roomCode` |

### 泡泡為什麼用 SSE？

一對一只需要「伺服器 → 單一瀏覽器」的單向逐字推送，SSE（Server-Sent Events）剛好夠用，又比 WebSocket 輕。前端用 `fetch` + `ReadableStream` 接，做出打字機效果，串流中還能用 `AbortController` 中斷。

匿名訪客填個暱稱就能聊，靠 `anon_id` 的 HttpOnly cookie + Redis session（TTL 30 分）維持身分，配 Spring AI 的 `ChatMemory`（`CONVERSATION_ID = anonId`）記住上下文。

![AI 泡泡一對一](/projects/ai-chatroom/ai-bubble.png)

### 多人房為什麼用 WebSocket/STOMP？

多人房是「多對多 + 廣播」：任何人發言要即時送到房內**所有**成員，還有成員進出、AI 打字中等事件。這天生需要雙向、可推播的連線，於是用 STOMP over WebSocket，訊息廣播到 `/topic/room/{code}`。

事件設計得頗細：`MESSAGE` / `MEMBER_JOIN` / `MEMBER_LEAVE` / `AI_TYPING` / `AI_TOKEN` / `AI_DONE` / `JOINED` / `ERROR`——Luna 的回覆一樣以 `AI_TOKEN` 逐字廣播全房，所有人同步看到她「正在打字」。

---

## 二、Luna 怎麼決定「要不要講話」

這是整個專案的靈魂。如果 Luna 有問必答，那她只是個被 @ 才動的機器人；要像群組成員，她得**自己**判斷該不該插話。

做法是：**每一則 IC（劇情內）訊息都會進到 AI**，由 LLM 自主決定要回應，或是回一個特殊標記 `[SKIP]` 表示這次安靜。後端看到 `[SKIP]` 就不廣播。

但這帶來一個並發問題：多人同時發話時，多個 AI 判斷會交錯，回應順序亂掉。解法是用 **Redis 佇列 + 鎖**（`ai:queue` + `ai:lock`）把 AI 觸發**序列化**，嚴格逐則處理，確保 Luna 的反應不會打架。

![房間內 Luna 自主回應](/projects/ai-chatroom/room-chat.png)

---

## 三、「對誰說話」被做成一級互動

真人在群組裡講話，其實隱含「對象」：對全部人、私下對某人、或純粹閒聊出戲。ai-chatroom 把這件事顯性化成**三種訊息類型**，用不同底色區分：

| 類型 | 語意 | 會不會進 AI |
|------|------|:-----------:|
| 群播 BROADCAST | 對全房 + Luna 發言 | ✅ |
| 定向 DIRECTED | `@某人`（含 @Luna），AI 收到時會被標註情境 | ✅ |
| 旁白 OOC | `//` 開頭的出戲閒聊，**Luna 看不到** | ❌ |

輸入框上方還有一排「對象快捷 chip」：對所有人 / 對 Luna / 對每位成員 / 旁白，一鍵切換。最細緻的是它**具記憶性**——送出後維持同一對象（保留前綴），不會每次跳回「對所有人」；而當記憶的對象**離開房間**時，會自動退回「對所有人」（Luna 常駐不受影響）。

![開房表單](/projects/ai-chatroom/rooms-lobby.png)

---

## 四、雙 AI Provider：本地與雲端一個設定切換

用 Spring AI 抽象掉了 Provider 差異，靠 `app.ai.provider` 切換：

- **Ollama（本地）**：開發階段零成本、可離線，容器透過 `host.docker.internal` 連到 host 上的 Ollama。
- **Google Gemini（雲端）**：Function Calling / Tool 支援完整。

這個切換不只是省錢，也牽動下一節的「發圖」功能——因為發圖依賴模型支援 Tool。

---

## 五、Luna 會「發情緒圖」：Function Calling 的小巧思

Luna 開心或生氣時，可以主動發一張情緒圖片。實作是把發圖包成 Spring AI 的 Tool（`sendHappyImage` / `sendCuteAngry1Image`）：

1. LLM 自主呼叫圖片 Tool；
2. Tool 從該情緒的圖庫**隨機挑一張**，把 URL 登記進 `ToolContext` 的收集清單；
3. 串流結束後，後端把選中的 URL 以 `![](url)` Markdown 附加到回覆。

圖片素材放在 classpath `/ai-images/<情緒>/`，同一情緒要加圖只要丟檔、**不用改程式**。泡泡和多人房共用同一套機制。

> ⚠️ 這功能依賴模型支援 Function Calling。Gemini 完整支援；Ollama 端若選了不支援 tools 的模型，Luna 就不會觸發發圖——這是正常行為，不是 bug。

---

## 六、安全：把房主的自訂人設「關進籠子」

多人房的房主可以即時編輯 Luna 的角色人設（`PUT /persona`）。但「讓使用者自由寫 prompt」等於開了 prompt injection 的門。

防護做法是**結構化隔離**：房主的人設字串以三引號受控包起來，外層再加上後端固定的安全準則，讓自訂內容只能「設定角色個性」，不能覆寫系統指令。前端也對 AI 回覆做 `rehype-sanitize` 防 XSS，泡泡還有每 IP 每分鐘的限流。

---

## 小結

ai-chatroom 真正想驗證的一句話是：**AI 可以是「群組裡的一個成員」，而不是一個被呼叫的服務**。

為了這個目標，幾個技術決策環環相扣：

- 一對一用 SSE、多人房用 WebSocket/STOMP，各取所長；
- 用 `[SKIP]` + Redis 佇列序列化，讓 Luna 自主又不打架；
- 把「對誰說話」做成有記憶的一級互動；
- Spring AI 抽象雙 Provider，本地開發、雲端上 Tool；
- Function Calling 發圖、結構化人設隔離補上體驗與安全。

> 原始碼：<https://github.com/Rex-shark/ai-chatroom>

---

*（草稿待辦：補一張架構圖、確認是否公開 demo、搬進 `/blog` 後把圖片路徑改成站內資源。）*
