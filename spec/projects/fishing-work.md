---
slug: fishing-work
name: fishing-work
tagline: 偽裝成上班軟體的區網遊戲平台，由本機 AI 當繪圖比賽的評審
status: 已完成（持續開發）
category: AI / Realtime / Full-Stack
github: https://github.com/Rex-shark/fishing-work
demo: null
route: /projects/fishing-work
component: src/pages/projects/FishingWork.tsx
---

# fishing-work

> 本文件為製作靜態介紹頁的權威資料來源。撰寫頁面時請以本檔內容為準，**不得自行編造數據或功能**。
> 標註 `（待補）` 的欄位請保留原樣或在頁面上顯示佔位提示。
>
> 資料取自專案的 `README.md`、`CLAUDE.md`、`spec/draw-contest/`、`plan/backlog.md`、`plan/contest-mimic.md`、`plan/contest-commentary.md`、`.claude/team/ROSTER.md`（2026-11-17）。
> 站內路由 `/projects/fishing-work`，元件 `src/pages/projects/FishingWork.tsx`。
>
> **頁面重點：AI 的應用**（Rex 2026-11-17 指定）。AI 用在兩個層面：① 產品內——本機模型當繪圖比賽的評分員與評審；② 開發流程——Claude Code 多 session 分工加獨立驗收子代理。

---

## 一句話說明

部署在本機、同事透過公司區網（或 Cloudflare Tunnel）進來玩的互動遊戲平台。三款遊戲（我畫你猜、繪圖比賽、猜歌）的畫面都偽裝成上班會開的軟體——VS Code、PowerPoint、Google Meet、Excel；繪圖比賽由**本機 AI 模型打分並講評**。

## 解決的問題

想在上班空檔跟同事玩個小遊戲，又不想裝東西、不想註冊帳號、也不想畫面一看就是遊戲。fishing-work 開一個網址就能玩，暱稱即身分；遊戲畫面套上辦公軟體的外觀；繪圖比賽不需要真人評審，交給本機的 AI 模型看畫打分、再由另一個模型扮評審講一句評語，全程不連雲端 AI 服務。

---

## 三款遊戲

| 遊戲 | 偽裝 | 一句玩法 |
|---|---|---|
| 我畫你猜 | VS Code／PowerPoint／Google Meet／Excel 四選一 | 畫師自訂題目作畫，其他人看畫在聊天室猜題，越快猜對分數越高 |
| 繪圖比賽 | PowerPoint | 出題後所有人同時畫 2 分鐘，**AI 逐張打分**、投影片揭曉名次與 **AI 評語**；附參考圖就是「像不像比賽」 |
| 猜歌 | Google Meet | 出題者選題庫（指定歌手、台灣熱門、西洋熱門、動漫熱門），所有人同時聽 Apple Music 30 秒試聽、打字猜歌名 |

我畫你猜的偽裝：程式編輯器（畫布＝編輯區、聊天＝TERMINAL）、簡報、視訊會議、試算表。

---

## AI 應用一：繪圖比賽的 AI 評分員（Clef）

- **做什麼**：每張交卷的畫，由本機 Ollama 上的 **Clef 決策模型**看圖打分（0～100）並給信心值，判斷「畫得像不像題目」。
- **模型**：`clef:27b-nvfp4`（27B、NVFP4 量化，約 18 GB），呼叫 Ollama 的 `POST /v1/systemone`。
- **速度**：1280×720 原圖直送約 2.4 秒一張（Ollama 0.40.3 的 MLX 後端），因此移除了原本的縮圖步驟。
- **流程**：server 收到一張就排進評分佇列（一次一張），不等全部交卷；全部評完才揭曉。
- **暖機**：啟動時送一張 1×1 的圖把 Clef 載進記憶體並常駐 30 分鐘；冷啟動第一張約 13 秒，暖機後第一回合不必等。

## AI 應用二：像不像比賽（雙圖比對）

- **做什麼**：出題者附一張參考圖，大家照著畫；Clef **同時看參考圖與作品**打分。
- **評分公式**：模型分別回答相似度（5 級）與完成度（3 級），合成 `score = round(100 × (0.9 × 相似度/4 + 0.1 × 完成度/2))`；不管顏色與線條粗細，看形狀、構圖與主體。
- **參考圖處理**：客戶端用 canvas 縮到長邊 ≤ 1280、轉 JPEG 品質 0.9 再上傳（透明背景先鋪白底），server 不需要影像函式庫。
- **實測**：真 Clef 下，照著參考圖畫的 84 分、亂畫的 9 分。

## AI 應用三：AI 評審「ミオ」的評語（gemma4）

- **做什麼**：每張畫配一句評語，顯示在揭曉卡片上。由本機 Ollama 的 `gemma4:26b-mlx-bf16`（約 52.5 GB）以毒舌小惡魔的少女人設產生，評審名「ミオ」。
- **提示詞規則**：繁體中文台灣用語、一句話 60 字內、帶參賽者暱稱（不另加指示）、`think: false`、`num_predict` 120；像不像比賽時評語也看參考圖與作品兩張。
- **第一名稱讚版**：名次揭曉時才知道誰第一，所以第一名的評語在揭曉當下用「稱讚版」提示詞重做一次；稱讚版失敗時退回他原本的評語。
- **不擋揭曉**：分數與排名只由 Clef 決定；評語晚到會自動補在卡片上（等待中顯示「ミオ：正在寫評語」）。

## AI 應用四：模型不在也照玩（容錯設計）

- **自動降級**：連不上 Ollama 或模型不存在時，該回合自動改用隨機評分器，畫面標示「隨機評分」；Ollama 之後才開也不用重啟，下一回合就恢復 AI 評分。
- **錯誤分類**：只跟這張輸入有關的錯誤（HTTP 400／413／415／422）只讓那一張退回隨機；上游不可用（連線失敗、逾時、5xx、模型不存在等）才整回合降級。
- **評語韌性**：單張逾時 30 秒；同一回合**連續兩次失敗**才跳過剩下的評語，下一回合再試。
- **記憶體取捨**：兩個模型同時常駐約 71 GB，128 GB 的機器沒問題；32 GB 的機器設 `COMMENT=off` 只留評分，或再加 `JUDGE=random` 完全不用 AI。

## AI 應用五：AI 團隊協作開發

整個專案用 Claude Code 以「計畫驅動」開發（`plan/` 寫 Epic、`spec/` 寫契約），多個 session 各有分工：

| 角色 | 職責 |
|---|---|
| 海圖（Chart） | 架構師、規格負責人：釐清需求、撰寫 `spec/`、`plan/`、`DESIGN.md`，做設計決策；不寫業務程式 |
| 水手長（Bosun） | 工程師：依 plan 與 spec 拆任務、派工給子代理並驗收產出 |
| 事務長（Purser） | 助手：查資料、環境與工具操作、文件整理等非開發事務 |
| acceptance-reviewer（子代理） | 獨立驗收：不相信實作回報，自己重跑型別檢查／測試／建置／lint、比對契約、補寫協定測試、用瀏覽器實際操作，回報通過與否與證據 |

到 2026-11-11 共完成 20 個 Epic（Epic 0～21 扣掉暫緩的 Epic 8 語音輸入、進行中的 Epic 9 Docker 部署），完成的 Epic 都經過驗收（子代理或舵手）與 Rex 實測。

---

## 技術棧

| 分層 | 技術 |
|------|------|
| 前端 | React 19、Vite 8、TypeScript、Tailwind CSS v4、Zustand（三款遊戲各一個前端） |
| 後端 | Node.js、TypeScript、Express 5、Socket.IO 4（單一程序提供網頁與即時連線） |
| 共用 | `shared/` 事件契約、常數、純函式 |
| AI | 本機 Ollama：Clef `clef:27b-nvfp4`（評分）、gemma4 `gemma4:26b-mlx-bf16`（評語） |
| 外部資料 | Apple iTunes Search API 與排行榜 RSS（猜歌題庫，免金鑰） |
| 測試 | Vitest、協定測試（只依 spec 打 Socket）、30 客戶端壓測 |
| 部署 | 區網 80 埠單一 Node 程序；Docker（`docker compose up -d --build`）；外網用 Cloudflare Tunnel |
| 資料庫 | 無，狀態全在記憶體；繪圖比賽歷史存在各自的瀏覽器（IndexedDB，最近 5 場） |

---

## 截圖

| 檔案 | 說明 |
|---|---|
| `public/projects/fishing-work/draw-guess-vscode.png` | 我畫你猜（VS Code 偽裝）：畫布在編輯區、TERMINAL 是聊天猜題、檔案總管是玩家與分數 |
| `public/projects/fishing-work/draw-guess-ppt.png` | 我畫你猜（PowerPoint 偽裝） |
| `public/projects/fishing-work/draw-guess-meet.png` | 我畫你猜（Google Meet 偽裝） |
| `public/projects/fishing-work/draw-guess-excel.png` | 我畫你猜（Excel 偽裝） |
| `public/projects/fishing-work/draw-contest-drawing.png` | 繪圖比賽作畫中（簡報偽裝） |
| `public/projects/fishing-work/draw-contest-reveal.png` | 繪圖比賽揭曉：Clef 分數、名次與ミオ的評語 |
| `public/projects/fishing-work/draw-contest-mimic.png` | 像不像比賽：作畫中的參考圖面板 |
| `public/projects/fishing-work/song-guess-playing.png` | 猜歌播放中（Meet 偽裝） |
| `public/projects/fishing-work/song-guess-reveal.png` | 猜歌揭曉 |

---

## 已知限制

- 沒有登入機制，只靠網址不外流；外網分享時網址公開即任何人都能進來（房間上限 50 人）。
- 分數只存在伺服器記憶體，重啟歸零。
- AI 評分與評語需要本機 Ollama 與足夠記憶體（兩模型約 71 GB）；沒有時退回隨機評分、沒有評語。
- 語音輸入（Epic 8，whisper.cpp 語音轉文字）暫緩：區網只能用 http，瀏覽器不開放麥克風。
- 猜歌需要 server 與每位玩家都連得到 Apple 的網域；公司網路擋掉時聽不到聲音。

## 聲明

偽裝外觀模仿 VS Code、PowerPoint、Google Meet、Excel 的介面，相關商標屬於各自的公司；本專案與這些公司無關。猜歌的試聽與封面由玩家瀏覽器直接向 Apple 取得。
