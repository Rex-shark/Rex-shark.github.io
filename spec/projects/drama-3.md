---
slug: drama-3
name: Drama 3 TTS 工作台
tagline: 在 Apple Silicon Mac 上離線操作 Fish Audio Drama 3 的多角色 TTS 工作台
status: 已完成
category: AI / TTS / Local LLM Tooling
github: https://github.com/Rex-shark/drama-3
demo: null
route: /projects/drama-3
component: src/pages/projects/Drama3.tsx
---

# Drama 3 TTS 工作台

> 本文件為製作靜態介紹頁的權威資料來源。撰寫頁面時請以本檔內容為準，**不得自行編造數據或功能**。
> 標註 `（待補）` 的欄位請保留原樣或在頁面上顯示佔位提示。
>
> 資料全部取自專案的 `README.md`、`spec/architecture.md`、`spec/model-capabilities.md`、`plan/upgrade-validation.md`，未加油添醋。
> 2026-11-05 依 drama-3 的 Epic 4（升級驗證，2026-11-03）更新：mlx-audio 改鎖 0.6.3、4bit / bf16 換 2026-10-29 新權重、建議預設改 4bit、版本數據重測。
> 站內路由 `/projects/drama-3`，元件 `src/pages/projects/Drama3.tsx`。

---

## 一句話說明

在 Apple Silicon Mac 上以圖形介面操作 [Fish Audio Drama 3](https://huggingface.co/fishaudio/drama-3) 文字轉語音模型：**多角色、聲音複製、表演標籤、長文串流**，全程本機、離線、不花錢。後端以 FastAPI 薄封裝 mlx-audio，前端是 Vite + React 的「紙張與墨」工作台。

## 解決的問題

Fish Audio 官方推理只支援 NVIDIA GPU（SGLang-Omni / fish-speech），Mac 無法執行。社群雖有轉成 MLX 格式的權重，但 mlx-audio 內建 server 只收一段參考音檔、且參考音檔必須是伺服器端路徑，**無法上傳、無法多角色**。

這個專案自寫一層 FastAPI，把多角色劇本、多段參考音檔上傳、表演標籤組字、串流播放做成一個本機工作台，不用手打 `<|speaker:N|>` 標籤。

## 適合誰用

- 手上有 Apple Silicon Mac、想在本機離線跑大型 TTS 模型的人
- 想看「如何在不改第三方碼的前提下，替 MLX 模型包一層可用服務」的開發者
- 對 **模型會中斷** 這類非確定性失敗要怎麼在工程上偵測與提示有興趣的人

---

## 截圖

| 檔案 | 說明 |
|---|---|
| `public/projects/drama-3/workbench-light.jpg` | 工作台（亮色）：左欄角色與參考音檔、中欄劇本行、右欄取樣參數與 take 卡紙 |
| `public/projects/drama-3/workbench-dark-early-stop.jpg` | 工作台（暗色），take 卡紙顯示提前中斷提示 |

> 截圖為接「模擬後端」時的畫面，音訊是測試音；真模型畫面相同，只是沒有頂端的橫幅。

---

## 能做什麼

| 能力 | 說明 |
|---|---|
| 聲音複製 | 每個角色上傳或錄製 10–30 秒參考音檔加逐字稿，可多段；沒有參考音檔則由模型自行配音 |
| 多角色劇本 | 最多 16 個角色，逐行指定角色，不用手打 `<\|speaker:N\|>` 標籤 |
| 表演控制 | 點狀標籤 `[laughs]` `[sighs]` `[pause]`、區間標籤 `<whisper>…</whisper>`、整句風格前綴、導演筆記 |
| 跨語言 | 參考音檔與台詞語言可不同，83 種語言 |
| 長文與串流 | 自動分段、前段當後段上下文；串流模式收到第一段就開始播放 |
| 版本切換 | 4bit / 8bit / bf16 三個量化版本，一次載入一個，取樣參數隨版本換預設 |
| 輸出 | 每次產生一張 take 卡紙，可播放、下載 WAV、重新產生；保留先前 12 張 |

不做的事（移植版沒有或需要改第三方碼）：修改 take、局部 infilling、固定種子、變速、角色描述代替音檔。

---

## 架構

```
瀏覽器 (Vite :5173) ──/api proxy──▶ FastAPI (:8793) ──▶ mlx-audio ──▶ MLX / Metal ──▶ models/
```

- `frontend/`：Vite + React 19、純 CSS、Oxlint；字型以 @fontsource 隨前端打包，離線可用。
- `server/`：Python 3.12 + FastAPI，由 uv 管理；只呼叫 mlx-audio 的公開 API，不改第三方碼。
- `MOCK=1` 啟動後端可在沒有模型時開發前端，回傳測試音。

### 一次產生的資料流

1. 前端收集角色清單：每角色 1 到 N 段參考音檔與逐字稿；瀏覽器端解碼任何格式並轉成 WAV（後端不需 ffmpeg）
2. 前端把劇本行組成純文字：每行 `<|speaker:N|>` + 風格前綴 + 台詞
3. multipart 送出 `text`、重複的 `ref_audio` / `ref_text` / `ref_speaker` 三組等長欄位、取樣參數、`stream`
4. 後端驗證（角色編號 0–15、參考音檔 ≤ 60 秒、三組欄位等長、已載入模型），存暫存檔
5. 在常駐推理執行緒呼叫 `model.generate(...)`，內部一律逐段取，可把中止縮到約 0.3 秒
6. 非串流：累積片段編成 WAV 回傳；串流：每個片段轉 s16le PCM 即時寫出
7. 回應結束後刪暫存檔

---

## 技術棧

| 分層 | 技術 |
|------|------|
| 模型 | Fish Audio Drama 3（35B 參數 MoE，每 token 約 3B 啟用，輸出 44.1 kHz）；社群 MLX 量化權重 4bit / 8bit / bf16（4bit、bf16 為 2026-10-29 新權重重轉版，8bit 仍是 2026-10-15 舊版） |
| 推理 | mlx-audio 0.6.3（0.6.0 起正式支援 Drama 3，鎖 PyPI 版本號）、MLX / Metal |
| 後端 | Python 3.12、FastAPI、uvicorn、uv |
| 前端 | React 19、Vite、純 CSS、Oxlint、@fontsource（Lexend / Noto Sans TC / IBM Plex Mono） |
| 開發工具 | IDEA HTTP Client 測試請求、`MOCK=1` 模擬後端 |
| 授權 | 程式碼 MIT；模型權重與輸出受 Fish Audio Community License 約束 |

---

## 關鍵設計決策（用於頁面「設計亮點」）

| 決策 | 原因 |
|------|------|
| 自寫 FastAPI 而非用 mlx-audio 內建 server | 內建 `/v1/audio/speech` 只收一段參考音檔，且 `ref_audio` 必須是伺服器端路徑，無法上傳、無法多角色 |
| 只呼叫 mlx-audio 公開函式（`load_model`、`model.generate`） | 不改第三方碼；它更新時只需重跑 `uv sync`。2026-11-03 起鎖 PyPI 正式版 `mlx-audio==0.6.3`，不再鎖 git commit |
| `top_k` 預設不設上限（API 收 0 或省略，後端轉 `None` 再呼叫） | mlx-audio 0.6.3 起主 token 不設上限；明確傳 30 會擋掉上游對「講一句就轉靜音」的修正，舊權重實測中斷率約加倍（8/31 對 17/31）。直接傳 0 會讓取樣拋例外，所以必須轉 `None` |
| MLX 推理固定在一條常駐執行緒（`ThreadPoolExecutor(max_workers=1)`） | MLX 的 GPU stream 是每執行緒一份，換執行緒求值會拋 `There is no Stream(gpu, 0) in current thread`；不能用 `asyncio.to_thread` |
| 單一 worker + asyncio lock，忙碌時直接回 409，不排隊 | MLX 同一進程共用 GPU，一次只能做一件事；單人工具不需要佇列，前端在 busy 時禁用按鈕 |
| 每次產生結束呼叫 `mx.clear_cache()`（保留當保險） | 舊版 MLX 快取會從 40 GB 長到 76 GB 不回落；mlx-audio 0.6.2 起已在產生內自行限制快取，實測 clear 前已是 0 |
| 提前中斷偵測在後端取段迴圈做 | 不改第三方碼；中斷時主動停止，省下撞到長度上限的空轉時間 |
| 串流用 raw PCM s16le 44.1 kHz mono | WAV header 需總長度，串流時未知；前端用 Web Audio 播 PCM |
| speaker 綁定靠逐字稿前綴 `<|speaker:N|>` | mlx-audio 以標籤綁定而非順序；後端統一補前綴，前端只送角色編號 |

---

## 模型會中斷：問題與對策（誠實揭露）

產生到一半會沒聲音，是**模型權重版本**的問題。Fish Audio 2026-10-29 悄悄換了一版 RL 權重（無公告），社群已用它重轉 4bit 與 bf16，實測零中斷；**8bit 社群尚未重轉，仍是舊權重，中斷率約三成**。

2026-11-03 實測（mlx-audio 0.6.3，合成語音當參考，各情境 10 次 × 兩組 top_k）：

| 版本 | 權重 | 無參考句 | 一句 5 個標籤 |
|---|---|---|---|
| 4bit | 2026-10-29 | 0/20 | 0/20（另重現 0/20） |
| bf16 | 2026-10-29 | 0/20 | 0/20 |
| 8bit | 2026-10-15 舊 | 5/20 | 9/20 |

- **主因是權重版本，不是量化等級**：光升級 mlx-audio 並沒有改善舊 8bit 的中斷率，改善來自新權重。
- **中斷的樣子**：不是音訊變短，而是講幾秒後轉成靜音，一路拖到長度上限。
- **對策**：後端偵測「出聲後連續 6 秒無聲」或「開頭 6 秒沒出聲」就主動停止並提示**重新產生**。門檻維持 6 秒：新權重正常句內部最長停頓 1.8 秒。
- **取樣參數**：預設 1.0 / 0.9 / top_k 不限，與 mlx-audio 0.6.3 一致；明確設 top_k=30 會讓舊權重的中斷率加倍。

> 舊版紀錄（2026-10-15，mlx-audio 舊 commit、舊權重）：一句塞 5 個標籤時 4bit 3/3、8bit 2/3、bf16 3/3 中斷，已被上表取代。

---

## 版本與硬體需求

實測機器：M5 Max、128 GB 統一記憶體。記憶體看「行程峰值」而不是權重大小（帶參考音檔的請求開頭會瞬間多 5–7 GB）。

| 版本 | 權重 | 磁碟 | 行程峰值 | 載入（熱） | 即時倍率 | 備註 |
|---|---|---|---|---|---|---|
| 4bit | 2026-10-29 | 22 GB | 32 GB | 0.7 秒 | 2.5x | **建議預設**：零中斷、最快、最省記憶體 |
| 8bit | 2026-10-15 舊 | 39 GB | 50 GB | 1.4 秒 | 1.9x | 等社群重轉，目前中斷率約三成 |
| bf16 | 2026-10-29 | 67 GB | 81 GB | 9.6 秒 | 1.4x | 原版品質，零中斷，128 GB 機器可跑 |

數據：2026-11-03，mlx-audio 0.6.3，無其他負載。三個版本取樣預設皆為 1.0 / 0.9 / top_k 不限。
對照舊版（2026-10-15，舊 commit、舊權重）行程峰值 55 / 72 / 103 GB，各降約 22 GB。

---

## 控制語法（前端組字、後端原樣送出）

| 類型 | 語法 | 範例 |
|------|------|------|
| 角色標籤 | `<|speaker:N|>`，N = 0–15 | `<|speaker:1|> 你來了。` |
| 點狀標籤 | `[tag]` | `好吧，[sighs] 隨你。` |
| 區間標籤 | `<tag>…</tag>` | `<whisper>別吵醒她</whisper>` |
| 風格前綴 | `[自然語言描述]` | `[疲憊而溫柔] 我們明天再談。` |
| 導演筆記 | `Direction: 描述`＋換行＋`Line: 台詞` | `Direction: 像在深夜廣播，語速慢` / `Line: 各位聽眾晚安。` |

---

## 快速開始

| 步驟 | 指令 |
|------|------|
| 後端環境（可重複執行） | `bash server/setup.sh` |
| 下載模型（擇一或全部） | `bash models/download.sh 4bit` |
| 啟動後端（:8793） | `bash server/run-server.sh` |
| 無模型時用模擬後端 | `MOCK=1 bash server/run-server.sh` |
| 啟動前端（:5173） | `cd frontend && npm install && npm run dev` |

---

## 已知限制

- 中斷偵測抓不到「出聲之後才轉成低音量雜訊」的失敗，會拖到長度上限（約 47 秒）；新權重 100 次測試出現 1 次。
- 8bit 社群尚未以新權重重轉，仍是舊權重，中斷率約三成；重轉後重測再決定是否改回建議。
- 麥克風錄音功能未在自動化測試中驗證（瀏覽器窗格無法授權麥克風）。
- 同一段文字每次結果不同，沒有固定種子。
- 載入秒數為檔案已在系統快取的熱載入，冷讀會更久。
- 本專案跑的不是 Fish Audio 官方推理；MLX 權重由社群（stickerdaniel）轉換，Fish Audio 未釋出也未背書。

---

## 授權與來源

- 本 repo 的程式碼以 MIT License 釋出；模型權重不在此授權範圍內。
- 模型權重與輸出受 Fish Audio Community License 約束：年營收 50 萬美元以下可商用；對外提供 TTS 服務或 API 需另簽授權；禁止未經同意複製真人聲音；禁止用輸出訓練其他語音模型；須標示 Built with Fish Audio。本專案定位為本機自用工具。
- 本專案與 Fish Audio、Apple、mlx-audio 專案皆無隸屬關係。**Built with Fish Audio.**

| 元件 | 來源 |
|---|---|
| Drama 3 模型（原版） | Fish Audio，[fishaudio/drama-3](https://huggingface.co/fishaudio/drama-3) |
| MLX 量化權重（非官方） | [mlx-community/fish-audio-drama-3-4bit](https://huggingface.co/mlx-community/fish-audio-drama-3-4bit) 等，由 stickerdaniel 轉換 |
| mlx-audio | Prince Canuma，[Blaizzy/mlx-audio](https://github.com/Blaizzy/mlx-audio)（Drama 3 支援由 stickerdaniel 貢獻，PR #1018） |
| MLX | Apple，[ml-explore/mlx](https://github.com/ml-explore/mlx) |

---

## 卡片重點（首頁牌桌的簡易介紹）

> 點首頁場上的卡時顯示的 3 個亮點與代表截圖（2026-11-17 起）。程式端在 `src/pages/home/content/briefs.ts`，改內容時兩邊一起改。一句話說明直接用 `profile.ts` 的 desc，不寫在這裡。

- 在 Mac 上離線跑 Fish Audio Drama 3，零 API 成本
- 多角色劇本、聲音複製、表演標籤、串流播放
- 4bit／8bit／bf16 三版量化可切換

代表截圖：`public/projects/drama-3/workbench-light.jpg`（工作台：角色與參考音檔、劇本行、取樣參數與 take 卡紙）
