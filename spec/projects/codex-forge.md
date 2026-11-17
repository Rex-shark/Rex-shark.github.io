---
slug: codex-forge
name: codex-forge
tagline: 把 AI 技術顧問接進需求討論群聊的自架平台
status: 已完成（持續開發）
category: AI Integration / Full-Stack / Realtime
github: null（私人專案，不公開）
demo: null
route: /projects/codex-forge
component: src/pages/projects/CodexForge.tsx
---

# codex-forge

> 本文件為製作靜態介紹頁的權威資料來源。撰寫頁面時請以本檔內容為準，**不得自行編造數據或功能**。
> 標註 `（待補）` 的欄位請保留原樣或在頁面上顯示佔位提示。
>
> 資料取自專案的 `README.md`（2026-11-17）與 `docs/project-intro.md`（2026-11-02）；兩者數字不同時以較新的 README 為準。
> 站內路由 `/projects/codex-forge`，元件 `src/pages/projects/CodexForge.tsx`。
>
> 🔒 **私人專案**（Rex 2026-11-17 指示：不公開）。頁面與專案卡**不放 repo 連結**，標示「私人專案」。
> 依專案自己的介紹文件，**不寫出**：repo 位置、本機路徑、測試帳號、Rex 的 email、真實專案或客戶名稱（截圖中的示範房「訂單系統改版」是虛構的）。

---

## 一句話說明

自架的多人需求討論聊天室，把 **OpenAI Codex CLI** 和 **Claude Code CLI** 當成隨傳隨到的技術顧問接進群聊：非技術的關係人用白話討論需求、上傳舊表單和草圖；專案擁有者打 `@小助手Lumi`，後端把累積的討論、文件和圖片整理成諮詢單交給 Codex，回覆（Mermaid 流程圖、可點的 HTML 原型、產出檔案）回到同一條時間軸，所有成員都看得到。

它不是「AI 聊天介面」，而是**把 AI 放進既有的協作流程**：討論和諮詢在同一個地方、同一條時間軸，留下同一份紀錄。

## 解決的問題

PM／SA 的日常是跟承辦、主管、外部 PM 把需求談清楚，再自己設計與實作：

1. **需求散在通訊軟體、信件和會議紀錄裡**。每次問 AI 都得重新整理脈絡、貼一大段，還常漏掉附件。
2. **關係人不會用 AI 工具，也不該要他們學**。但他們的原話、草圖、舊表單才是最重要的輸入。
3. **AI 的回覆要回到討論裡**，讓承辦看得到「技術上可以這樣做」，而不是只留在某個人的終端機裡。

答案：聊天室本身就是需求紀錄，AI 從聊天室讀、往聊天室寫。系統只負責把輸入整理好、把輸出接回來，**不限制 AI 能做什麼**。

典型流程：

```
承辦上傳舊表單的照片：「現在要跑三層簽核」
PM：「線上化之後要不要支援代理人？」
擁有者回了規劃，然後打：@小助手Lumi 請整理大家的討論，畫出簽核流程，做一個表單原型
  → 小助手Lumi 回覆：Mermaid 流程圖 + 待釐清的問題 + 一個可以點的 HTML 原型
承辦點開原型：「對，退件要回到申請人，不是回到上一關」
擁有者私下問貓：「幫我整理成三點，下次開會用」→ 看完按「開放」，全房都看得到
```

---

## 兩位 AI

### 小助手Lumi（Codex CLI）：群聊裡的技術顧問

- **只有房間擁有者的 `@` 會觸發**，沒有按鈕、不自動觸發；成員打同樣的字只是一般文字。
- **諮詢範圍**：上次成功諮詢之後累積的全部訊息，加上這一則。每間房一條 Codex 脈絡，預設續接（`codex exec resume`）；續接失敗自動改開新脈絡重跑；擁有者可手動重置記憶。
- **輸入整理**：討論紀錄（含發言者職稱與時間）、文件庫索引、這次附帶的文件與圖片（圖片直接進 prompt），加上三層組成的 `AGENTS.md`：平台憲法 → 擁有者補充的房間角色 → 系統產生的說明。
- **即時進度**：排隊中 → 準備中 → 處理中 → 完成或失敗；擁有者可取消、重新送出。
- **輸出接回**：Markdown（含 Mermaid、程式碼），頂部摘要列寫明「根據幾則討論」與用到的檔案；產出的圖片直接顯示、`.html` 用 sandbox iframe 在聊天室內預覽、其他產出變成檔案卡。
- **連結 git 專案**：房間可連結一個本機專案，Lumi 直接讀寫程式碼；系統在諮詢前後各拍一次 git 快照，算出「修改了 N 個檔案（+A −B）」做成卡片，擁有者一鍵還原。系統不 commit。

### 小助手喵喵（Claude Code CLI）：擁有者的私人 Live2D 貓

- 每間房右下角一隻 Live2D 貓（日景黑貓、夜景白貓），背後是 `claude -p --output-format stream-json`，回答逐字串流。
- **只有主持人能提問**；其他成員看得到貓、看得到牠忙不忙，但拿不到提問內容、工具呼叫和錯誤訊息。
- 回答先給主持人看，按「開放」才給全房，標示「主持人交辦」，之後可以收回。
- 開放的回答會進入 Lumi 的討論紀錄，**兩位 AI 互相知道對方**。
- 有待機動作、互動反應、新訊息時泡泡變色；可拖曳、可縮小。

---

## 其他功能

- **聊天室**：回覆、軟刪除、未讀數、斷線補齊；STOMP over WebSocket 推播，重連自動重新訂閱並補齊缺口。
- **附件不限類型與大小**：圖片進圖片區、其他進文件區；Word、PDF、Excel 由 Apache Tika 抽成文字讓 AI 讀得到；iPhone 的 HEIC 在前端轉 JPEG。右側「檔案」面板可逐一標記要不要提供給小助手。
- **語音輸入**：本機 whisper.cpp 把語音轉成文字填進輸入框，不自動送出、錄音不留存。
- **帳號**：不開放註冊、沒有邀請連結；帳號由管理員建立，成員由擁有者從既有帳號加入。
- **擁有者的房間管理**：改名稱與說明、開關小助手、補充小助手的房間角色（寫進 `AGENTS.md`）、重置記憶、封存；成員管理可設定房內顯示名稱與職稱（職稱會一起寫進送給 AI 的討論紀錄）。
- **前台視覺：紙偶定格**：整個畫面是劇場箱，每個面都是有厚度與紙紋的紙，動畫用 `steps()` 逐格播放；日景／夜景對應淺色／深色。三種發言者三種紙（他人米白便條、自己赤陶紅紙條、小助手影印紙配紫墨）。疊上紙紋後量的文字對比全部 ≥ 4.5:1，尊重 `prefers-reduced-motion`，375 px 手機可用。
- **後台 forge-admin**：蘋果風格（玻璃只用在側邊欄與頂欄），支援深色模式；完整 RBAC（帳號、角色、目錄／選單／按鈕三層權限樹、群組、操作日誌）。**後台看不到任何訊息內容**。小助手健康提示：Codex CLI 搬家或被登出時前後台主動提示。

---

## 三個設計原則

1. **寫入走 REST，推播走 WebSocket**。用戶端送進 WebSocket 的東西一律丟掉，否則 SimpleBroker 會把偽造的「小助手回覆」原樣廣播。斷線重連再打一次 `after=` 就能補齊。
2. **系統不限制 AI**。不擋工具、不設逾時、不限輸出；系統只整理輸入、接回輸出。安全邊界是「這台機器」與「擁有者邀請的成員」。
3. **內容與 metadata 嚴格分開**。訊息原文、提問、prompt 快照、貓未開放的回答都算內容，只給房間成員；後台、操作日誌、跨房稽核只拿 metadata。

## 一次 `@小助手Lumi` 的流程

1. 擁有者送出含 `@小助手Lumi` 的訊息，訊息照常落庫、全員即時看到。
2. 交易提交後偵測到 `@`，建立諮詢（排隊中）。
3. Worker 領取（每房一次一筆）→ 算範圍 → 鏡射檔案 → 重寫 `AGENTS.md` → 組 prompt 並落庫。
4. 以子程序執行 `codex exec --json`（新脈絡）或 `exec resume`（續接），JSONL 事件逐筆落庫、推播處理中。
5. 完成後落地：小助手的訊息、產出進檔案庫、脈絡回合 +1，推播給全房。

---

## 工程實踐

- **規格驅動**：穩定規範獨立成文件（聊天室、檔案、Codex 橋接、喵喵、後端標準，加上四份 Mermaid ERD）；每個 Epic 有計畫，記錄設計決策與踩雷；先寫規格再實作，做完立即回寫，產品決策附日期與理由。
- **錯誤碼分號段**：聊天室 620～639、Codex 640～659、語音 660～669、喵喵 670～689，每個碼都有常數、HTTP 狀態與中文訊息。
- **多個 AI session 分工開發**：一個 session 負責規格，一個負責派工與驗收；實作交給後端、前端子代理，另有**只驗不改**的 UI 驗收子代理——開真的瀏覽器量 computed style、明暗模式與斷點，模擬真人動線、故意製造失敗、純鍵盤操作、雙分頁推播，不採信開發者的自我回報。
- **測試**：後端整合測試起真的 PostgreSQL 與 Redis（Testcontainers）；Codex 與 Claude 的子程序用假 CLI 腳本重現事件序列（續接失敗、被殺、缺少 init 事件）；修 bug 時做突變驗證——把修正改回去，確認測試真的會失敗。
- **全量 code review**：分四段審過後端、安全、前台、後台，找到 18 條、已修 13 條（例：殘留的執行中狀態卡死佇列、停用帳號與改密碼後舊 token 仍有效、零寬字元冒充小助手名字、重連補齊漏訊息）。

## 規模（README 2026-11-17）

| 項目 | 數字 |
|---|---|
| 後端 Java | 291 個檔、約 38,000 行；測試 83 個檔、約 26,000 行、719 支 |
| 前台 forge-web | 134 個 TS／TSX 檔、約 17,000 行 |
| 後台 forge-admin | 79 個 TS／TSX 檔、約 8,000 行 |
| REST | 17 個 Controller、72 個端點 |
| 資料表 | 23 張（RBAC 9、聊天室 4、Codex 6、喵喵 4） |
| 規格與計畫 | 約 7,800 行，16 個 Epic |

開發期間：2026-09-15 起（`docs/project-intro.md`）。

---

## 技術棧

| 層 | 選型 |
|---|---|
| 後端 | Spring Boot 4.1、Java 25（virtual thread）、Spring Security 7、Hibernate 7、Jackson 3 |
| 資料 | PostgreSQL 16（訊息以 `id` 游標分頁）、Redis（只放 token 黑名單與登入鎖定） |
| 即時 | STOMP over WebSocket（SimpleBroker）：CONNECT 帶 JWT、SUBSCRIBE 時檢查成員資格 |
| 檔案 | Apache Tika 抽字、縮圖、HEIC 前端轉檔；HTML 預覽用只開 `allow-scripts` 的 sandbox iframe |
| AI | Codex CLI（`exec --json`／`exec resume`）、Claude Code CLI（`-p --output-format stream-json`）：都以子程序執行，參數用陣列傳、不經 shell |
| 前台 | React 19、TypeScript、Vite、Tailwind CSS v4、shadcn/ui、Zustand、react-markdown + Mermaid、pixi-live2d-display |
| 後台 | React 19、TypeScript、Tailwind CSS v4、shadcn/ui（蘋果風格） |
| 語音 | whisper.cpp 本機 HTTP 伺服器 |
| 測試 | JUnit、Testcontainers（真的 PostgreSQL、Redis、Tomcat）、模擬 CLI 事件序列的假 CLI 腳本 |

## 部署

設計給本機或內網部署：一台機器跑 Spring Boot、PostgreSQL、Redis 和兩個前端，AI 用自己的 Codex 與 Claude 訂閱；需要對外時用 cloudflared tunnel 臨時開放。介面與文件都是繁體中文。

---

## 截圖

圖片存於 `public/projects/codex-forge/`（取自專案 `docs/screenshots/web/` 的 WebP，1440×900）。截圖都是真實畫面：討論內容是虛構的示範資料，Lumi 和喵喵的回覆與產出是真的呼叫結果。

| 檔案 | 說明 |
|---|---|
| `web-room-day.webp` | 前台房間頁・日景：三種紙、右側檔案面板、右下的貓 |
| `web-room-night.webp` | 同畫面・夜景 |
| `web-conversation.webp` | 討論的開頭：承辦說明現況並附上文件 |
| `web-mention.webp` | 擁有者輸入 `@` 時的提及清單 |
| `web-doc-preview.webp` | 文件的文字版預覽 |
| `web-lumi-reply.webp` | 小助手Lumi 的回覆：根據 14 則討論、Mermaid 流程圖、HTML 原型連結（直式長圖 1437×1862） |
| `web-lumi-html-preview.webp` | AI 產出的 HTML 原型在聊天室內預覽 |
| `web-cat-host.webp` | 主持人視角：貓的對話框 |
| `web-cat-member.webp` | 成員視角：開放後的回答標示「主持人交辦」 |
| `web-room-settings.webp` | 房間設定：小助手開關、角色補充、重置記憶 |
| `web-mobile.webp` | 375 寬手機版（375×812） |
| `admin-rooms.webp` | 後台：專案聊天室列表 |
| `admin-rooms-dark.webp` | 後台：深色模式 |
| `admin-consultations.webp` | 後台：諮詢紀錄，只有 metadata（發起者帳號已打碼） |
| `admin-permissions.webp` | 後台：權限樹 |

## 素材

小助手喵喵使用 Live2D 官方的免費範例模型「Tororo & Hijiki」與 Cubism SDK for Web 的 Cubism Core；依授權條款，這些素材不放進版控。
