---
slug: vrm-chat-widget
name: VRM Chat Widget
tagline: 會聊天、會說話、有表情的 3D 虛擬角色
status: 已完成（持續開發）
category: AI / 3D / Web
github: https://github.com/Rex-shark/vrm-chat-widget
demo: null
route: /projects/vrm-chat-widget
component: src/pages/projects/VrmChatWidget.tsx
---

# VRM Chat Widget

> 本文件為製作靜態介紹頁的權威資料來源。撰寫頁面時請以本檔內容為準，**不得自行編造數據或功能**。
> 標註 `（待補）` 的欄位請保留原樣或在頁面上顯示佔位提示。
>
> 資料取自專案的 `README.md`、`THIRD_PARTY_NOTICES.md`、`public/models/README.md`（2026-11-23）。
> 站內路由 `/projects/vrm-chat-widget`，元件 `src/pages/projects/VrmChatWidget.tsx`。
>
> ⚠️ **截圖中的角色**是 VRoid Project 的 AvatarSample_A（第三方模型，個人、法人皆可使用；不隨 repo 散布）。頁面圖說須註明。

---

## 一句話說明

在瀏覽器用 three-vrm 顯示 VRM 模型的 3D 虛擬角色，串接本機 LLM（Ollama）、TTS（openai-edge-tts）與 STT（whisper.cpp）：會聊天、會用語音回話並對嘴、依情緒換表情。提供全畫面的**舞台版**，以及縮在網頁右下角、複製一個區塊就能嵌入任何頁面的**泡泡版**。

## 三個服務

| 服務 | 用什麼 | 說明 |
|---|---|---|
| LLM | 本機 Ollama | 對話內容不經過雲端 AI 服務 |
| STT | 本機 whisper.cpp | 錄音不會離開電腦 |
| TTS | 作者 fork 並修正的 openai-edge-tts | 免費使用微軟 Edge 的線上朗讀聲音；要唸的回覆文字會送到微軟 |

## 兩種顯示模式

- **舞台版**（`stage.html`）：全畫面展示，可切換角色、表情和動作，支援語音輸入。
- **泡泡版**（`widget.html`）：縮在網頁右下角的虛擬助理，複製 `#widget` 區塊（連同樣式與 `<script type="module">`）就能嵌入任何頁面。

---

## 功能

- **AI 對話**：透過 Ollama 呼叫本機 LLM。回覆開頭帶情緒標籤（例如 `[happy]`），角色依此換表情。
- **語音與對嘴**：回覆用 TTS 唸出來，Web Audio `AnalyserNode` 即時取音量驅動嘴型。微軟朗讀服務偶爾失敗時伺服器自動重試。
- **語音輸入**（舞台版）：🎤 錄音後在前端轉成 16kHz mono WAV，送到 whisper.cpp 辨識，文字填入輸入框讓使用者確認再送出。
- **待機動作**：呼吸、重心晃動、自動眨眼、偶爾瞟別處、手部小動作。
- **互動**：視線跟著滑鼠；點角色的頭會害羞。
- **動作播放**（舞台版）：載入 Mixamo FBX 動作，即時重定向到 VRM 骨架。
- **多角色**：選單切換角色，選擇記在瀏覽器裡；新增角色只要加一筆設定。

### 表情

六種表情（平常、開心、生氣、難過、放鬆、驚訝）可以用按鈕切換，AI 回覆時也會依情緒標籤自動換上，維持約 7 秒後淡回平常。

### 動作（舞台版）

九個 Mixamo 動作（揮手、張望、搖頭、爭論、哭哭、醉醺醺、大爺站、施法、抓狂），一鍵播放，播完自動淡回待機。動作檔依授權不能再散布，需自行免費下載。

---

## 架構

```
瀏覽器（stage.html / widget.html）── 靜態檔 ──▶ server.mjs
  ── POST /chat ──▶ server.mjs ── OpenAI 相容 API ──▶ Ollama
  ── POST /tts  ──▶ server.mjs ──▶ openai-edge-tts（Rex-shark fork）──▶ 微軟 Edge 線上朗讀
  ── POST /stt  ──▶ server.mjs ──▶ whisper.cpp server
```

`server.mjs` 是零相依的 Node 伺服器，供應 `public/` 的靜態檔，並把 `/chat`、`/tts`、`/stt` 同源代理到本機服務，避開瀏覽器的 CORS 限制。某個服務沒開時只有對應功能失效，其餘照常運作。

## TTS 用作者的 fork

官方 openai-edge-tts 映像裡的 edge-tts 版本太舊，會被微軟朗讀服務拒絕（WebSocket 403），TTS 一律回 500。作者 fork（`Rex-shark/openai-edge-tts` 的 `fixes` 分支）合併了上游尚未收下的三個修正：

- 鎖定 edge-tts 7.3.1，修好 403（上游 PR #62）
- SSE 串流修正（#64）
- PCM 低延遲串流（#63）

---

## 技術棧

| 分層 | 技術 |
|---|---|
| 3D 顯示 | three.js 0.180.0、@pixiv/three-vrm 3.5.4（執行時從 CDN 載入） |
| 動作 | Mixamo FBX → VRM 骨架重定向（pixiv/three-vrm 範例程式，MIT） |
| 伺服器 | Node.js 18+，零相依 `server.mjs`（靜態檔＋同源代理） |
| LLM | Ollama（OpenAI 相容 API；預設模型 `gemma4:26b-mlx-bf16`，可用 `OLLAMA_MODEL` 換小模型） |
| TTS | openai-edge-tts（Rex-shark fork，Docker） |
| STT | whisper.cpp server（例：`ggml-large-v3-turbo`） |
| 前端音訊 | Web Audio `AnalyserNode`（對嘴）、前端轉 16kHz mono WAV（語音輸入） |

## 角色

- repo 內附作者自製的 **Lumi 系列**四個角色（VRM Public License 1.0：可商用、可改作與再散布，需署名）。
- 另支援四個 VRoid Hub 上的第三方角色（AvatarSample、Emy、クヌギ、燈水梔子），授權屬原作者，不隨 repo 散布，需自行下載。

## 快速開始

| 步驟 | 指令 |
|---|---|
| 啟動 | `npm start`，開 `http://127.0.0.1:5004/`（只啟動這步就看得到角色與待機動作） |
| LLM | `ollama pull gemma4:e4b`，`OLLAMA_MODEL=gemma4:e4b npm start` |
| TTS | `docker build --build-arg INSTALL_FFMPEG=true -t openai-edge-tts-fork "https://github.com/Rex-shark/openai-edge-tts.git#fixes"`，再 `docker run -d -p 5050:5050 openai-edge-tts-fork` |
| STT（選用） | `./build/bin/whisper-server -m models/ggml-large-v3-turbo.bin --port 8791` |

## 授權

- 程式碼：MIT，© 2026 Rex
- Lumi 系列模型：VRM Public License 1.0，需署名
- 第三方：pixiv/three-vrm 範例程式（MIT）；three.js、three-vrm（MIT，CDN 載入）；VRoid Hub 模型與 Mixamo 動作需自行下載
- openai-edge-tts 使用 Microsoft Edge 的線上朗讀服務，並非官方開放的 API，可能隨時失效；商用可改接 Azure AI Speech 等正式服務

---

## 截圖

圖片存於 `public/projects/vrm-chat-widget/`（由專案 `docs/images/` 的 PNG 轉 WebP）。截圖中的角色是 VRoid Project 的 AvatarSample_A。

| 檔案 | 說明 |
|---|---|
| `stage.webp` | 舞台版：角色選單、表情與動作按鈕、對話泡泡、聲音選單、🎤 與送出 |
| `widget.webp` | 泡泡版：嵌在示範網頁右下角的 AI 看板娘 |
| `expressions.webp` | 六種表情：平常、開心、生氣、難過、放鬆、驚訝 |
| `motions.webp` | 九個動作：揮手、張望、搖頭、爭論、哭哭、醉醺醺、大爺站、施法、抓狂（拍攝時鏡頭拉遠、隱藏介面） |

---

## 卡片重點（首頁牌桌的簡易介紹）

> 點首頁場上的卡時顯示的 3 個亮點與代表截圖（2026-11-23 起）。程式端在 `src/pages/home/content/briefs.ts`，改內容時兩邊一起改。一句話說明直接用 `profile.ts` 的 desc，不寫在這裡。

- 本機 Ollama 對話，回覆帶情緒標籤自動換表情
- TTS 語音回話，Web Audio 即時驅動嘴型
- 舞台版全畫面，泡泡版複製一個區塊就能嵌入網頁

代表截圖：`public/projects/vrm-chat-widget/stage.webp`（舞台版，角色為 VRoid Project 的 AvatarSample_A）
