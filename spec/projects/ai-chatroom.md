---
slug: ai-chatroom
name: ai-chatroom
tagline: 真人 + AI 夥伴 Lumi 的多人即時聊天室，Lumi 還會自己換場景、生成背景圖
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
> 資料取自專案的 `README.md`、`docs/features.md`（2026-10-12）、`spec/lumi-image-library.md`。2026-10-19 依 README 更新：AI 角色更名 **Luna 🌙 → Lumi 🐾**、新增「自動情境生圖」、圖庫擴充為 109 張。
>
> ⚠️ **範圍限定**：本 spec **只介紹聊天室業務**（AI 泡泡一對一 + 多人聊天室 + 場景生圖），**不含**底層 RBAC 後台（帳號 / 角色 / 權限 / 操作日誌 / JWT 登入等）——那些屬共用基礎設施，非本專案展示重點。

---

## 一句話說明

一個有 AI 夥伴 **Lumi 🐾** 隨行的多人即時聊天室：匿名訪客可與 Lumi 一對一陪聊，也能開房邀朋友多人同聊，Lumi 會以房間成員身分自主加入對話；聊到要換地方時，Lumi 還會自己判斷換場，並用本機 ComfyUI 生成全房共享的背景圖。

## 解決的問題

一般聊天室只有「人對人」，而多數 AI 聊天又只有「人對 AI 一對一」。ai-chatroom 把兩者合一：在一個**多真人房間**裡放進一位 **AI 成員 Lumi**，她會自己判斷何時該講話、何時安靜（`[SKIP]`），讓 AI 真正像「群組裡的一個夥伴」而非客服機器人。同時示範了 SSE 逐字串流、WebSocket/STOMP 廣播、Spring AI 雙 Provider、Function Calling 發圖與換場、ComfyUI 非同步生圖等實戰整合。

## 適合誰用

- 想看 **Spring AI 整合多人即時通訊（WebSocket/STOMP）** 完整範例的後端工程師
- 研究 **AI 如何以「群組成員」身分自主參與對話**（逐則判斷、佇列序列化）的人
- 學習 **SSE 串流 + React 打字機效果 + Markdown 安全渲染** 前端整合的開發者
- 對 **本地 LLM（Ollama）/ 雲端（Gemini）雙 Provider 可切換** 架構有興趣的人
- 想看 **LLM 工具呼叫觸發本機生圖、又不拖慢聊天**（文字 / 圖雙軌、冷卻與最新優先）怎麼設計的人

---

## 兩大聊天形態

```
            ┌─────────────────────────────┐
訪客 ──────▶│  ① AI 泡泡（全站浮窗）       │  SSE 逐字串流
（匿名暱稱） │  Lumi 一對一陪聊             │  ChatMemory = anonId
            └─────────────────────────────┘

房主 ──開房──▶ 6 碼房號 ──┐
                          ▼
            ┌─────────────────────────────┐
朋友 ─輸房號─▶│  ② 多人聊天室               │  WebSocket / STOMP
（+ 暱稱）   │  多真人 + AI 成員 Lumi       │  廣播至 /topic/room/{code}
            │  Lumi 逐則自主判斷回應/SKIP  │  每次自 Redis 取最近 K 則歷史
            │  Lumi 判斷換場 → 背景生圖    │  ComfyUI（本機）
            └─────────────────────────────┘
```

兩種形態共用同一套後端 AI 基礎設施（雙 Provider、Function Calling 發圖、Redis 狀態）。多人房**不使用 `ChatMemory`**，每次呼叫由 `AiTriggerService` 自 Redis 取最近 K 則 IC 歷史組進 prompt。

---

## 技術棧

| 分層 | 技術 |
|------|------|
| 語言 / 框架 | Java 21、Spring Boot 3.5.14、Maven、Lombok |
| AI | Spring AI 1.1.2 — 雙 Provider：Ollama（本地）/ Google Gemini，`app.ai.provider` 切換 |
| 場景生圖 | 本機 ComfyUI（預設 workflow：Qwen Image 2.1），`app.ai.image.provider` 切換 |
| 即時通訊 | SSE（WebFlux `Flux`，泡泡）／ WebSocket + STOMP（多人房） |
| 資料庫 / 狀態 | PostgreSQL 16 + JPA/Hibernate；Redis（聊天狀態 / 佇列，前綴 `acr:`） |
| 前端 | React 19、Vite、TypeScript、Tailwind CSS v4、shadcn/ui |
| 前端狀態 / 路由 | Zustand、React Router v7、react-markdown、@stomp/stompjs |
| 反向代理 / 部署 | Nginx（path 路由分流）、Docker Compose（6 服務，容器前綴 `acr-`） |

### 卡片用 badge 顏色（給設計參考）

| Tag | 建議色 |
|------|--------|
| Java 21 | `#B07219` |
| Spring Boot 3.5 | `#6DB33F` |
| Spring AI | `#6DB33F` |
| WebSocket / STOMP | `#010101` |
| Ollama | `#000000` |
| Google Gemini | `#4285F4` |
| ComfyUI | `#7C3AED` |
| React 19 | `#61DAFB` |
| Redis | `#DC382D` |
| PostgreSQL | `#336791` |

---

## 主要功能（用於頁面 Feature 區塊）

### 1. AI 泡泡 — Lumi 一對一陪聊（全站浮窗）
- **說明**：右下角浮窗，**匿名訪客 + 自訂暱稱**即可開聊，不需登入。
- **SSE 逐字串流**：Lumi 回覆打字機效果（`fetch` + `ReadableStream`），串流中可中斷（`AbortController`）。
- **記憶**：Spring AI `ChatMemory`（`CONVERSATION_ID = anonId`）+ Redis 歷史還原（TTL 30 分）。
- **安全**：每 IP 每分鐘 10 則限流（超限 code 616）；`react-markdown` + `rehype-sanitize` 防 XSS；中文輸入法選字 Enter 不誤送。
- **頭像放大檢視**：點 Lumi 頭像跳出 Dialog 顯示完整原圖。
- **icon 建議**：`MessageCircle` / `Sparkles`

### 2. 多人聊天室 — 多真人 + 一個 AI 成員 Lumi
- **說明**：房主開房取得 **6 碼房號**，他人輸房號 + 暱稱加入（暱稱去重，「小明」→「小明2」）。
- **即時**：WebSocket/STOMP 廣播至 `/topic/room/{code}`，在線成員列表即時更新；房主標記、Lumi 常駐。
- **生命週期**：全部離開即清除房間；房主離開房間仍在、可再進。
- **icon 建議**：`Users` / `Radio`

### 3. 三種訊息類型（不同底色）
- **群播 BROADCAST**：對全房 + Lumi 發言（進 AI）。
- **定向 DIRECTED**：`@某人`（含 @Lumi），AI 收到時標註情境（進 AI）。
- **旁白 OOC**：`//` 開頭的劇情外聊天，**AI 看不到**（不進 AI）。
- **icon 建議**：`MessagesSquare`

### 4. 對象快捷 chip（具記憶性）
- **說明**：輸入框上方一排 chip：對所有人 / 對 Lumi / 對每位成員 / 旁白，一鍵切換並 highlight 當前對象。
- **記憶性**：送出後維持同一對象（保留前綴），不會跳回「對所有人」；記憶對象**離開房間時自動退回「對所有人」**（Lumi 常駐不受影響）。
- **其他**：頭像右鍵 → 回覆可自動指定對象。
- **icon 建議**：`AtSign` / `Target`

### 5. Lumi 自主參與（逐則判斷）
- **說明**：每則 IC（劇情內）訊息都進 AI，由 LLM **自主判斷該回應或回 `[SKIP]`**，讓 Lumi 像真的群組成員而非有問必答。
- **可靠性**：嚴格逐則 + 佇列序列化（Redis `ai:queue` + `ai:lock`），避免並發回應交錯。
- **icon 建議**：`Brain` / `Bot`

### 6. Lumi 角色人設（房主可編輯）
- **說明**：房主可即時編輯 Lumi 的角色設定（`PUT /persona`），立即生效；非房主不可見。
- **安全**：人設以三引號結構化隔離 + 後端固定安全準則（防 prompt injection）。
- **icon 建議**：`UserCog` / `Settings2`

### 7. 自動情境生圖 — Lumi 判斷換場，背景自動生成（Epic 15 / 16 / 17）
- **說明**：聊天中說「我們去海邊的夏日祭典吧」，**Lumi 會自行判斷場景改變**並呼叫 `changeScene` 工具，房內「當前場景」立即更新，**無需房主介入**。場景區對全員唯讀。
- **生圖**：場景描述送本機 **ComfyUI**（Qwen Image 2.1，896×592、16 步，實測約 40–60 秒）生成背景圖，**全房共享**，以雙圖層交叉淡入切換（先預載完成才淡入，不閃白）；中途加入的成員也看得到同一張。
- **文字與圖雙軌**：場景文字**立即**寫入 Redis 並進入 AI 上下文（Lumi 的回話跟著新場景）；背景圖受**每房 60 秒冷卻**節流，允許延遲。
- **生圖時機延後**：生圖不在工具呼叫當下開始，而是等該房 AI 回覆結束才開始——生圖與聊天互搶 GPU，並行時聊天約慢 2–3 倍。
- **最新優先**：冷卻期間的換場不丟棄，標記待重繪，冷卻結束由背景工人讀 Redis 現值補生；連續換場只會為最後一個場景生圖。Redis `scene:lock` 防同房重複觸發。
- **進度事件**：STOMP 依序廣播 `SCENE_TEXT`（文字先到）→ `SCENE_GENERATING` → `SCENE_UPDATE`（含圖 URL）/ `SCENE_ERROR`。
- **優雅降級**：沒開 ComfyUI 也能正常聊天，只是沒有背景圖。
- **icon 建議**：`Mountain` / `ImageIcon`

### 8. Lumi 情緒圖庫（看心情發圖）
- **說明**：Lumi 依當下情緒/情境主動挑一張對應的圖貼進對話。單一 Function Calling 工具 `sendLumiImage(emotion, intent)`，兩維度挑圖：**emotion 主鍵（16 種）** + **intent 次鍵（17 種）**。目前圖庫 **109 張 webp**。
- **挑圖演算法**（`LumiImageLibrary.pick`）：先用 emotion 取候選（無對應則回空、不發圖）→ 若給 intent 優先取同時符合的子集、子集為空退回只比對 emotion → 最終候選隨機挑一張。**優雅降級**：metadata 壞了或圖庫空，聊天主流程照跑。
- **機制**：工具挑到圖 → URL 進 `ToolContext` 收集清單 → 串流結束後 `![](url)` 附加；泡泡與多人房共用、前端零改動。圖為 webp、`metadata.json` 驅動，加圖只要丟檔 + 更新 metadata、**不用改 Java**。
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
| PUT | `/api/v1/rooms/{code}/persona` | 房主更新 Lumi 角色人設 |
| GET | `/api/v1/lumi-images/**` | Lumi 情緒圖庫（公開靜態資源） |
| WS | `/ws` → `/topic/room/{code}` | 多人房 STOMP（join / send / leave） |

**STOMP 目的地**：`/app/room/{code}/{join,send,leave}`
**STOMP 事件**：`MESSAGE` / `MEMBER_JOIN` / `MEMBER_LEAVE` / `AI_TYPING` / `AI_TOKEN` / `AI_DONE` / `JOINED` / `ERROR` / `SCENE_TEXT` / `SCENE_GENERATING` / `SCENE_UPDATE` / `SCENE_ERROR`

**Method 配色建議**：GET `#3B82F6`、POST `#10B981`、PUT `#F59E0B`、WS `#8B5CF6`

---

## 設計亮點 / 可在頁面強調的 Why

- **AI 是「群組成員」不是客服**：Lumi 逐則自主判斷回應或沉默（`[SKIP]`），更貼近真人在群組裡的行為。
- **兩種串流技術各司其職**：一對一泡泡用 SSE，多人房用 WebSocket/STOMP，前端都做到打字機逐字效果。
- **發話對象語意化**：群播 / 定向 / 旁白三型 + 具記憶性的對象 chip，把「對誰說話」做成一級互動。
- **雙 AI Provider 可切換**：本地 Ollama 零成本開發、雲端 Gemini 完整 Tool 能力，一個設定切換。
- **並發安全**：多人同時發話時，AI 觸發走 Redis 佇列 + 鎖序列化，回應不交錯。
- **Prompt injection 防護**：房主自訂人設經結構化隔離 + 後端安全準則約束。
- **生圖不拖慢聊天**：場景文字與背景圖雙軌、生圖延到 AI 回完話才開始、冷卻 + 最新優先，讓幾十秒的本機生圖不卡住即時對話。

---

## 已知限制 / 誠實揭露

- **Function Calling 依賴模型支援 Tool**：Ollama 端若選用不支援 Function Calling 的模型，Lumi 不會觸發發圖（屬正常，非 bug）。
- **換場由 LLM 自行判斷**：同樣的話不一定每次都觸發 `changeScene`；非定向訊息 Lumi 也可能直接 `[SKIP]`。
- **場景背景需要本機 ComfyUI**：須在 host 機器上跑 ComfyUI 並安裝 workflow 用到的模型；沒開時只有背景圖生不出來。
- **房間狀態存 Redis**：多人房房間 / 成員 / 訊息 / 佇列皆存 Redis，Redis 清空即遺失（個人專案取向）。
- **預設啟動政策為手動**：`docker-compose.yml` 的 `restart` 設為 `"no"`，不隨開機自啟，正式長跑須自行調整。
- **派生自 RBAC 模板**：底層仍帶有 `good-neighbor` RBAC 後台，但非本專案展示重點。

---

## 連結

- **Source code**：https://github.com/Rex-shark/ai-chatroom
- **Demo / Live**：（待補：目前無公開 demo，僅本機 Docker 部署）
- **相關文章**：（待補）

---

## 視覺資產

存於 [`public/projects/ai-chatroom/`](../../public/projects/ai-chatroom/)，頁面以 `<img src="/projects/ai-chatroom/<name>">` 引用。

| # | 檔案 | 內容 | 用途 / 位置 |
|---|------|------|-------------|
| 1 | `scene-room-festival.png` | 多人房實況：Lumi 依對話換到「海邊的夏日祭典」，上方「當前場景」已更新，背景為 ComfyUI 生成的祭典夜景（800×500） | ⭐ Hero 主視覺 |
| 2 | `scene-bg-festival.jpg` | 自動生成的背景：海邊的夏日祭典，夜晚，紅燈籠與煙火（896×592） | 「自動情境生圖」段落 |
| 3 | `scene-bg-onsen.jpg` | 自動生成的背景：山中溫泉旅館的雪夜庭院（896×592） | 「自動情境生圖」段落 |
| 4 | `ai-bubble.png` | AI 泡泡一對一實際對話 | 「AI 泡泡」卡片 |
| 5 | `room-chat.png` | 房內實況：房號 / 在線成員 / 對象 chip / 開場回覆 | 「多人聊天室」卡片 |
| 6 | `rooms-lobby.png` | 多人聊天室大廳「開房」表單（暱稱 + 人設 + 建立房間） | 「開房 / 加入房間」 |
| 7 | `luna-emotion-image.png` | 情緒圖庫實例：被誇「你今天超可愛」，害羞回覆並自主發出對應情緒圖（emotion：embarrassed × intent：affection） | 「情緒圖庫」段落 |
| 8 | `home.png` | 舊版玻璃態首頁 Hero（月亮圖示 + Luna） | 目前僅 `docs/blog/ai-chatroom.md` 草稿的 cover 使用 |

> 1–3 取自 ai-chatroom 的 `docs/images/`（2026-10-19）。
> ⚠️ 4–8 攝於**角色更名前**，畫面上仍是舊名「Luna 🌙」與月亮圖示；頁面引用時須在圖說註明。待重新截圖後替換並移除註記。

---

## 給 subagent 的頁面製作指引

- **頁面路由**：`/projects/ai-chatroom`，元件位於 `src/pages/projects/AiChatroom.tsx`。
- **頂部導覽**：返回連結指向 `/`，右側保留 GitHub 連結。
- **範圍限定**：頁面**只呈現聊天室功能**，不要介紹 RBAC 後台 / 帳號權限管理。
- **不可編造**：所有數字（stars、forks）目前**不放假數據**，沒資料就移除該區塊或顯示 `—`。
- **文案語氣**：繁體中文（台灣用語），技術詞彙保留原文。
