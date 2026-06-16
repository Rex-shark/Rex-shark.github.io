---
slug: ai-chatroom
name: ai-chatroom
tagline: 真人 + AI 夥伴 Luna 的多人即時聊天室
status: 已完成
category: Full-Stack / AI / Realtime
github: https://github.com/Rex-shark/ai-chatroom
demo: null
route: /projects/ai-chatroom
---

# ai-chatroom

> 此文件為 subagent 製作靜態介紹頁的權威資料來源。撰寫頁面時請以本檔內容為準，**不得自行編造數據或功能**。
> 標註 `（待補）` 的欄位請保留原樣或在頁面上顯示佔位提示。
>
> ⚠️ **範圍限定**：本 spec **只介紹聊天室業務**（AI 泡泡一對一 + 多人聊天室），**不含**底層 RBAC 後台（帳號 / 角色 / 權限 / 操作日誌 / JWT 登入等）——那些屬共用基礎設施，非本專案展示重點。

---

## 一句話說明

一個有 AI 夥伴 **Luna 🌙** 隨行的多人即時聊天室：匿名訪客可與 Luna 一對一陪聊，也能開房邀朋友多人同聊，Luna 會以房間成員身分自主加入對話。

## 解決的問題

一般聊天室只有「人對人」，而多數 AI 聊天又只有「人對 AI 一對一」。ai-chatroom 把兩者合一：在一個**多真人房間**裡放進一位 **AI 成員 Luna**，她會自己判斷何時該講話、何時安靜（`[SKIP]`），讓 AI 真正像「群組裡的一個夥伴」而非客服機器人。同時示範了 SSE 逐字串流、WebSocket/STOMP 廣播、Spring AI 雙 Provider、Function Calling 發圖等實戰整合。

## 適合誰用

- 想看 **Spring AI 整合多人即時通訊（WebSocket/STOMP）** 完整範例的後端工程師
- 研究 **AI 如何以「群組成員」身分自主參與對話**（逐則判斷、佇列序列化）的人
- 學習 **SSE 串流 + React 打字機效果 + Markdown 安全渲染** 前端整合的開發者
- 對 **本地 LLM（Ollama）/ 雲端（Gemini）雙 Provider 可切換** 架構有興趣的人

---

## 兩大聊天形態

```
            ┌─────────────────────────────┐
訪客 ──────▶│  ① AI 泡泡（全站浮窗）       │  SSE 逐字串流
（匿名暱稱） │  Luna 一對一陪聊             │  ChatMemory = anonId
            └─────────────────────────────┘

房主 ──開房──▶ 6 碼房號 ──┐
                          ▼
            ┌─────────────────────────────┐
朋友 ─輸房號─▶│  ② 多人聊天室               │  WebSocket / STOMP
（+ 暱稱）   │  多真人 + AI 成員 Luna       │  廣播至 /topic/room/{code}
            │  Luna 逐則自主判斷回應/SKIP  │  ChatMemory = roomCode
            └─────────────────────────────┘
```

兩種形態共用同一套後端 AI 基礎設施（雙 Provider、Function Calling 發圖、Redis 狀態）。

---

## 技術棧

| 分層 | 技術 |
|------|------|
| 語言 / 框架 | Java 21、Spring Boot 3.5.14、Maven、Lombok |
| AI | Spring AI 1.1.2 — 雙 Provider：Ollama（本地）/ Google Gemini，`app.ai.provider` 切換 |
| 即時通訊 | SSE（WebFlux `Flux`，泡泡）／ WebSocket + STOMP（多人房） |
| 資料庫 / 狀態 | PostgreSQL 16 + JPA/Hibernate；Redis（聊天狀態 / 佇列，前綴 `acr:`） |
| 前端 | React 19、Vite、TypeScript、Tailwind CSS v4、shadcn/ui |
| 前端狀態 / 路由 | Zustand、React Router v7、react-markdown、@stomp/stompjs |
| 反向代理 / 部署 | Nginx（path 路由分流）、Docker Compose（容器前綴 `acr-`） |

### 卡片用 badge 顏色（給設計參考）

| Tag | 建議色 |
|------|--------|
| Java 21 | `#B07219` |
| Spring Boot 3.5 | `#6DB33F` |
| Spring AI | `#6DB33F` |
| WebSocket / STOMP | `#010101` |
| Ollama | `#000000` |
| Google Gemini | `#4285F4` |
| React 19 | `#61DAFB` |
| Redis | `#DC382D` |
| PostgreSQL | `#336791` |

---

## 主要功能（用於頁面 Feature 區塊）

### 1. AI 泡泡 — Luna 一對一陪聊（全站浮窗）
- **說明**：右下角浮窗，**匿名訪客 + 自訂暱稱**即可開聊，不需登入。
- **SSE 逐字串流**：Luna 回覆打字機效果（`fetch` + `ReadableStream`），串流中可中斷（`AbortController`）。
- **記憶**：Spring AI `ChatMemory`（`CONVERSATION_ID = anonId`）+ Redis 歷史還原（TTL 30 分）。
- **安全**：每 IP 每分鐘 10 則限流（超限 code 616）；`react-markdown` + `rehype-sanitize` 防 XSS；中文輸入法選字 Enter 不誤送。
- **icon 建議**：`MessageCircle` / `Sparkles`

### 2. 多人聊天室 — 多真人 + 一個 AI 成員 Luna
- **說明**：房主開房取得 **6 碼房號**，他人輸房號 + 暱稱加入（暱稱去重，「小明」→「小明2」）。
- **即時**：WebSocket/STOMP 廣播至 `/topic/room/{code}`，在線成員列表即時更新；房主標記、Luna 常駐。
- **生命週期**：全部離開即清除房間；房主離開房間仍在、可再進。
- **icon 建議**：`Users` / `Radio`

### 3. 三種訊息類型（不同底色）
- **群播 BROADCAST**：對全房 + Luna 發言（進 AI）。
- **定向 DIRECTED**：`@某人`（含 @Luna），AI 收到時標註情境（進 AI）。
- **旁白 OOC**：`//` 開頭的劇情外聊天，**AI 看不到**（不進 AI）。
- **icon 建議**：`MessagesSquare`

### 4. 對象快捷 chip（具記憶性）
- **說明**：輸入框上方一排 chip：對所有人 / 對 Luna / 對每位成員 / 旁白，一鍵切換並 highlight 當前對象。
- **記憶性**：送出後維持同一對象（保留前綴），不會跳回「對所有人」；記憶對象**離開房間時自動退回「對所有人」**（Luna 常駐不受影響）。
- **其他**：頭像右鍵 → 回覆可自動指定對象。
- **icon 建議**：`AtSign` / `Target`

### 5. Luna 自主參與（逐則判斷）
- **說明**：每則 IC（劇情內）訊息都進 AI，由 LLM **自主判斷該回應或回 `[SKIP]`**，讓 Luna 像真的群組成員而非有問必答。
- **可靠性**：嚴格逐則 + 佇列序列化（Redis `ai:queue` + `ai:lock`），避免並發回應交錯。
- **icon 建議**：`Brain` / `Bot`

### 6. Luna 角色人設（房主可編輯）
- **說明**：房主可即時編輯 Luna 的角色設定（`PUT /persona`），立即生效；非房主不可見。
- **安全**：人設以三引號結構化隔離 + 後端固定安全準則（防 prompt injection）。
- **icon 建議**：`UserCog` / `Settings2`

### 7. Luna 情緒發圖（Function Calling）
- **說明**：Luna 可透過 Tool（`sendHappyImage` / `sendCuteAngry1Image`）在開心 / 生氣時主動發情緒圖片，同情緒多張時隨機挑一張，以 Markdown 圖片附在回覆。
- **機制**：圖片 Tool 把選中的 URL 登記到 `ToolContext` 收集清單 → 串流結束後 `![](url)` 附加；泡泡與多人房共用同一機制。素材放 classpath `/ai-images/<情緒>/`，加圖免改碼。
- **注意**：依賴模型支援 Function Calling / Tool（Gemini 完整支援；Ollama 須選支援 tools 的模型）。
- **icon 建議**：`ImagePlus` / `Smile`

---

## API / 通訊端點（用於頁面 API 區塊）

| Method | 端點 | 說明 |
|--------|------|------|
| POST | `/api/v1/portal/ai/session` | 建立匿名泡泡 session（暱稱 + cookie） |
| POST | `/api/v1/portal/ai/chat/stream` | 泡泡 SSE 逐字串流 |
| POST | `/api/v1/rooms` | 開房，回 6 碼房號 |
| GET | `/api/v1/rooms/{code}/exists` | 房號是否存在 |
| PUT | `/api/v1/rooms/{code}/persona` | 房主更新 Luna 角色人設 |
| GET | `/api/v1/ai-images/**` | Luna 情緒圖片（公開靜態資源） |
| WS | `/ws` → `/topic/room/{code}` | 多人房 STOMP（join / send / leave） |

**STOMP 目的地**：`/app/room/{code}/{join,send,leave}`
**STOMP 事件**：`MESSAGE` / `MEMBER_JOIN` / `MEMBER_LEAVE` / `AI_TYPING` / `AI_TOKEN` / `AI_DONE` / `JOINED` / `ERROR`

**Method 配色建議**：GET `#3B82F6`、POST `#10B981`、PUT `#F59E0B`、WS `#8B5CF6`

---

## 設計亮點 / 可在頁面強調的 Why

- **AI 是「群組成員」不是客服**：Luna 逐則自主判斷回應或沉默（`[SKIP]`），更貼近真人在群組裡的行為。
- **兩種串流技術各司其職**：一對一泡泡用 SSE，多人房用 WebSocket/STOMP，前端都做到打字機逐字效果。
- **發話對象語意化**：群播 / 定向 / 旁白三型 + 具記憶性的對象 chip，把「對誰說話」做成一級互動。
- **雙 AI Provider 可切換**：本地 Ollama 零成本開發、雲端 Gemini 完整 Tool 能力，一個設定切換。
- **並發安全**：多人同時發話時，AI 觸發走 Redis 佇列 + 鎖序列化，回應不交錯。
- **Prompt injection 防護**：房主自訂人設經結構化隔離 + 後端安全準則約束。

---

## 已知限制 / 誠實揭露

- **情緒發圖需模型支援 Tool**：Ollama 端若選用不支援 Function Calling 的模型，Luna 不會觸發發圖（屬正常，非 bug）。
- **房間狀態存 Redis**：多人房房間 / 成員 / 訊息 / 佇列皆存 Redis，Redis 清空即遺失（個人專案取向）。
- **預設啟動政策為手動**：`docker-compose.yml` 的 `restart` 設為 `"no"`，不隨開機自啟，正式長跑須自行調整。
- **派生自 RBAC 模板**：底層仍帶有 `good-neighbor` RBAC 後台，但非本專案展示重點。

---

## 連結

- **Source code**：https://github.com/Rex-shark/ai-chatroom
- **Demo / Live**：（待補：目前無公開 demo，僅本機 Docker 部署）
- **相關文章**：（待補）

---

## 視覺資產（已備齊）

> 截圖已由 Claude 用系統 Chrome（puppeteer-core 驅動）對本機實際執行的 app 擷取，存於 [`public/projects/ai-chatroom/`](../../public/projects/ai-chatroom/)。
> subagent 製作頁面時直接以 `<img src="/projects/ai-chatroom/<name>.png">` 引用，**無需再另外處理檔名或搬移**。

| # | 檔案 | 內容 | 用途 / 位置 |
|---|------|------|-------------|
| 1 | `home.png` | 玻璃態首頁 Hero（`ai-chatroom` 漸層大標 + 多人聊天室入口卡片） | ⭐ Hero / 頁首主視覺 |
| 2 | `ai-bubble.png` | AI 泡泡一對一：Luna 回覆「Rex 嗨～一句話自我介紹」實際對話 | 「AI 泡泡」功能卡片旁 |
| 3 | `rooms-lobby.png` | 多人聊天室大廳「開房」表單（暱稱 + Luna 人設 + 建立房間） | 「多人聊天室」功能段落 |
| 4 | `room-chat.png` | 房內實況：房號 / 在線成員（Luna + Rex 房主）/ 對象 chip / Luna 開場回覆 | ⭐ 多人房最強成果證明 |

### 截圖樣式建議

- 四張皆為深空玻璃態深色截圖，統一加圓角 `rounded-2xl` + 細邊框（深色用 `border-white/10`），hover 可微微抬起。
- `home.png`、`room-chat.png` 是最強主視覺，建議放大呈現；`ai-bubble.png` 為直長型浮窗，適合放功能卡側欄。
- 截圖本身已是深色背景，頁面若為白底（Finalist 風），可在圖外加一層淺色卡片襯托。

---

## 給 subagent 的頁面製作指引

- **頁面路由**：`/projects/ai-chatroom`，元件位於 `src/pages/projects/AiChatroom.tsx`。
- **參考既有範例**：[`src/pages/projects/ThreadsBot.tsx`](../../src/pages/projects/ThreadsBot.tsx)、[`SpringBootApiDemo.tsx`](../../src/pages/projects/SpringBootApiDemo.tsx) 的版型與動畫節奏可沿用。
- **頂部導覽**：返回連結指向 `/styles/finalist`，右側保留 GitHub 連結。
- **範圍限定**：頁面**只呈現聊天室功能**，不要介紹 RBAC 後台 / 帳號權限管理。
- **不可編造**：所有數字（stars、forks）目前**不放假數據**，沒資料就移除該區塊或顯示 `—`。
- **文案語氣**：繁體中文（台灣用語），技術詞彙保留原文。
- **完成後**：記得到 `spec/plan.md` 的「精選專案 showcase 頁」表格新增本專案一列，並視需要在首頁專案區塊加卡片。
