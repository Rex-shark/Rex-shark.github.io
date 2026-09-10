---
slug: rpgmaker-character-forge
name: RPG Maker Character Forge
tagline: 用 Agent + ComfyUI 把一張行走圖變成整套 RPG Maker 角色素材
status: 已完成
category: AI Pipeline / Tooling / 生成式繪圖
github: https://github.com/Rex-shark/rpgmaker-character-forge
demo: null
route: /projects/rpgmaker-character-forge
---

# RPG Maker Character Forge

> 本文件為製作靜態介紹頁的權威資料來源。撰寫頁面時請以本檔內容為準，**不得自行編造數據或功能**。
> 標註 `（待補）` 的欄位請保留原樣或在頁面上顯示佔位提示。
>
> 資料全部取自專案的 [README.md](https://github.com/Rex-shark/rpgmaker-character-forge/blob/main/README.md) 與 `AGENTS.md`，未加油添醋。

---

## 一句話說明

一套給 **RPG Maker MV／MZ** 用的角色素材生成流程：丟進一張單人行走圖，由 Codex Agent 組提示詞、呼叫繪圖工具生圖，再交給 ComfyUI 放大、去背、縮放與切割，最後產出可直接匯入遊戲的**立繪 + 16 表情 face 圖 + 敵人戰鬥圖**。

## 解決的問題

RPG Maker 的內建素材只有 48×48 的像素行走圖。想要對話用的 face 圖、劇情用的立繪、戰鬥用的 `sv_enemies` 圖，只能自己畫或外包——而且三者**必須是同一個角色**，風格、髮型、服裝、配色都要對得上。

Character Forge 把這件事流程化：以行走圖（或 face 圖／既有立繪）為身份基準，用固定的提示詞規格與 ComfyUI 後處理，把「同一角色的多種素材」變成可重複執行的 Job，而不是每次重畫都要碰運氣。

## 適合誰用

- 用 **RPG Maker MV／MZ** 做遊戲、卡在素材產能的獨立開發者
- 想看 **Agent 驅動的生圖 pipeline**（提示詞規格化 + 後處理 + AI 自我驗證）怎麼落地的人
- 研究 **ComfyUI 工作流程式化呼叫**（動態換 `LoadImage` / `SaveImage`、排隊、下載結果）的開發者
- 對 **「AI 產出要怎麼驗收」** 這個工程問題有興趣的人

---

## 最終產物規格

| 產物 | 規格 |
|------|------|
| 全身立繪 | 432 × 576 透明 PNG |
| Face 圖 | 兩張 576 × 288、4×2 排列，共 **16 種表情**（每格 144 × 144） |
| 敵人戰鬥圖 | 432 × 576 透明 `sv_enemies` PNG |

生圖背景統一使用純黑 `#000000`，再由 ComfyUI 去背。

---

## 六個 Job

| Job | 輸入 | 輸出 |
|-----|------|------|
| 1 | 單人行走圖 | 全身立繪 |
| 2 | 單人行走圖 ＋ face 圖 | 全身立繪 |
| 3 | 完成立繪 | 16 表情 face 圖 |
| 4 | 完成立繪 ＋ 單人行走圖 | `sv_enemies` 戰鬥圖 |
| 5 | 單人行走圖 | 立繪 ＋ face 圖 ＋ 戰鬥圖（依序跑 Job 1 → 3 → 4） |
| 6 | 單人行走圖 ＋ face 圖 | 立繪 ＋ 戰鬥圖 |

使用方式是在專案根目錄開 Codex，直接輸入 `執行 job1`，或指定接續：`執行 job3，接續 job1 的艾莉絲`。

---

## Pipeline（正式黑底流程）

```
① 準備參考圖 ─ Job 1/5/6 先用 ComfyUI 4× 放大行走圖（4x-UltraSharpV2）
        ↓
② Agent 分析實際要交給繪圖工具的參考圖
        ↓
③ 組合系統規格 + 圖片觀察 + 使用者提示詞 → composed_prompt.json
        ↓
④ 繪圖工具在純黑 #000000 背景生圖
        ↓
⑤ ComfyUI 去背（BEN2）、置中縮放、必要時切割 face 圖
        ↓
⑥ Agent 比對「原始參考 / 黑底原圖 / 透明成品」完成 AI 視覺驗證
        ↓
⑦ 通過才整理進 runs/<角色>/output/，並複製一份原始參考圖
```

Job 5 是一次指令、**三次分開生圖**；上一階段 `ai_validation.json` 沒過就不繼續。

---

## 技術棧

| 分層 | 技術 |
|------|------|
| 流程驅動 | Codex Agent（`AGENTS.md` + `system_prompt.txt` + `prompt.schema.json` 三層規格） |
| 後處理 | ComfyUI（`http://127.0.0.1:8188`）— 自訂節點 + BEN2 去背模型 |
| 放大模型 | `4x-UltraSharpV2.pth`（`ImageUpscaleWithModel`） |
| 腳本 | Python 3.10+、Pillow（行走圖切割）、`unittest` 規格測試 |
| 執行器 | `tools/comfyui/run_workflow.py` — 動態上傳輸入、替換工作流節點、排隊、下載終端輸出 |
| 靜態圖鑑 | React 19、Vite 8、Tailwind CSS v4、vinext（Cloudflare Workers / wrangler） |
| 部署 | Docker Compose、Nginx、Supervisor；可搭 Cloudflare Quick Tunnel 對外 |
| 授權 | MIT（僅涵蓋自行開發的程式碼與文件） |

### 卡片用 badge 顏色（給設計參考）

| Tag | 建議色 |
|-----|--------|
| Python | `#3776AB` |
| ComfyUI | `#7C3AED` |
| Codex Agent | `#10A37F` |
| React 19 | `#61DAFB` |
| Docker | `#2496ED` |
| Cloudflare | `#F38020` |

---

## 主要功能（用於頁面 Feature 區塊）

### 1. 六個 Job 覆蓋不同起點
- **說明**：手上有什麼就跑哪個 Job——只有行走圖跑 Job 5 一次到底；已有立繪只想補 face 圖跑 Job 3；已有立繪＋行走圖想補戰鬥圖跑 Job 4。
- **接續機制**：Job 3／4 可直接接續已通過驗證的 Job 1 run，不用重新丟圖。
- **icon 建議**：`Workflow` / `GitBranch`

### 2. 提示詞規格化（不靠運氣）
- **說明**：每份全身生圖提示詞都必須逐字以固定英文前綴開頭，**使用者提示詞不可覆蓋**，用來擋掉三視圖、角色設定表、轉面圖、並排人物、重複身體等常見生圖災難。
- **比例硬規格**：非 Q 版標準動漫／JRPG 全身比例，約 6.5～7 頭身；明確禁止超大頭、幼兒體型、五頭身以下。
- **參考圖責任分工**：face 圖優先控制臉部身份，行走圖優先控制服裝／配色／背面設計，完成立繪補充畫風連貫性——三者職責寫死在規格裡。
- **icon 建議**：`FileCode2` / `ScrollText`

### 3. ComfyUI 三套工作流
- **`upscale_sprite_4x.json`**：用 `4x-UltraSharpV2.pth` 把行走圖放大 4×，供 Agent 分析與繪圖工具參考。
- **`remove_background_and_fit.json`**：threshold 40 偵測純黑背景 → 裁出人物 → 留邊放進 864×1152 畫布 → BEN2 去背 → 縮成固定 432×576。
- **`remove_background_and_split_face_sheet.json`**：576×576 的 4×4 黑底原圖去背、重組，上下切成兩張 576×288 face 圖。
- **共用執行器**：`run_workflow.py` 會動態替換唯一的 `LoadImage` 與終端 `SaveImage`，**不需要為了 JSON 內的預設檔名去改 ComfyUI**。
- **icon 建議**：`Layers` / `Wand2`

### 4. 16 表情固定順序
- **說明**：Job 3 生成的 face 圖表情順序寫死，方便直接對應 RPG Maker 的表情索引。
- **順序**：`0 中立`、`1 微笑／開心`、`2 生氣`、`3 受傷／痛苦`、`4 驚訝`、`5 悲傷／擔心`、`6 堅定／嚴肅`、`7 戰敗／昏厥`、`8 害羞`、`9 鬼臉`、`10 大哭`、`11 水汪汪大眼`、`12 挑逗`、`13 睡覺`、`14 困惑／疑問`、`15 嘟嘴`。
- **視角規格**：每格為朝畫面左側約 15～20° 的頭肩近拍；即使立繪面向右側也必須重繪為朝左，兩眼保持可見。
- **icon 建議**：`Smile` / `Grid3x3`

### 5. Agent AI 視覺驗證（產出要自己驗收）
- **五項判準**：① 是否仍是同一人物 ② 是否單人物／單身體／單姿勢／單視角 ③ 臉、四肢、服裝、鞋履、武器有無重大缺失或錯誤裁切 ④ 去背縮放後有無吃掉重要細節 ⑤ 背景是否有效移除、透明 PNG 可用。
- **明確的容忍清單**：黑底非逐像素等於 `(0,0,0)`、Alpha 1～31 低殘值、一像素細邊、輕微光邊等**不得單獨造成失敗**，只寫進 `notes`——避免驗證器過嚴反而卡死流程。
- **結果留痕**：`ai_validation.json` / `stage_validations/` 存在 run 目錄裡。
- **icon 建議**：`ShieldCheck` / `ClipboardCheck`

### 6. 靜態角色圖鑑（前端展示）
- **說明**：通過驗證的 Job 5／Job 6 run 可用 `publish_character.py` 發布到靜態圖鑑，工具只複製展示素材並更新索引，**不修改原始 run**。
- **圖鑑功能**：角色清單切換、行走圖動畫預覽（3×4）、立繪與敵人戰鬥圖並排、**透明／暗色／亮色三種底色切換**用來檢查去背邊緣、Face 切割檢查（逐格瀏覽 16 表情 + 尺寸是否正確）。
- **架構**：純靜態，只讀 `public/characters/index.json` 與各角色的 `character.json`，不連後端。
- **icon 建議**：`LayoutGrid` / `Images`

### 7. 安全的 run 管理
- **說明**：既有 run 預設不覆寫，要取代舊結果才用 `--force`；發布工具遇到內容不同的既有圖片預設拒絕覆寫。
- **參考圖存證**：每次通過驗證都會把本次實際使用的輸入圖以 `<角色>-reference-*.png` 複製進 `output/`，且**必須與原始輸入位元組完全相同**，不得縮放或重新編碼。
- **icon 建議**：`Archive` / `Lock`

---

## 常用指令（用於頁面「怎麼用」區塊）

| 用途 | 指令 |
|------|------|
| 安裝 Python 依賴 | `python3 -m pip install -r tools/requirements.txt` |
| 確認 ComfyUI 連線 | `curl -sS http://127.0.0.1:8188/system_stats` |
| 切割八人合併行走圖 | `python3 tools/sprites/split_character_sheet.py <圖> --output-dir <目錄>` |
| 執行 Job（在 Codex 內） | `執行 job5` |
| 發布到角色圖鑑 | `python3 tools/gallery/publish_character.py workspace/job05/runs/<角色名稱>` |
| 規格測試 | `python3 -m unittest discover -s tests/tools -p 'test_*.py' -v` |
| 本機 Docker 展示 | `docker compose up -d --build` → `http://localhost` |

---

## 專案結構

```text
jobs/       Job 1～6 的 Agent 規格、提示詞與 Schema
tools/      ComfyUI 執行器、工作流、行走圖切割與圖鑑發布工具
workspace/  使用者本機輸入與生成結果；圖片及 runs 預設不提交
tests/      Job 與工具規格測試
frontend/   靜態角色成果圖鑑
docker/     Nginx、Supervisor 與本機部署設定
```

---

## 設計亮點 / 可在頁面強調的 Why

- **把「生圖」變成有規格的 Job**：三層規格檔（`AGENTS.md` / `system_prompt.txt` / `prompt.schema.json`）鎖住不可協商的部分（尺寸、單人單視角、黑底、身份一致），使用者提示詞只能在容許範圍內調整。
- **AI 產出由 AI 驗收，但驗收標準是寫死的**：五項判準 + 明確的容忍清單，避免「太寬鬆放行爛圖」與「太嚴格永遠不過」兩種失敗。
- **生成與後處理分離**：繪圖工具只負責黑底原圖，尺寸／去背／切割全部交給 ComfyUI 工作流，換繪圖工具不用改後處理。
- **一次指令、多階段生圖**：Job 5 內部是三次獨立生圖，中間有驗證閘門，避免一路錯到底。
- **成果可展示**：靜態圖鑑本身就是驗收介面——亮／暗／透明三種底色切換就是為了肉眼確認去背品質。

---

## 已知限制 / 誠實揭露

- **需要本機 ComfyUI**：必須有可在 `http://127.0.0.1:8188` 連線的 ComfyUI，且已安裝所需自訂節點、BEN2 去背模型與 `4x-UltraSharpV2.pth`。
- **需要繪圖工具**：專案本身不含生圖模型，實際作畫交給可接收參考圖與提示詞的外部繪圖工具。
- **素材版權不在授權範圍**：MIT 只涵蓋自行開發的程式碼與文件；RPG Maker 素材、模型、自訂節點、使用者提供的圖片與各服務生成的內容，都依各自權利人條款辦理。公開倉庫不附帶 RPG Maker 原始素材。
- **輸入必須是單人行走圖**：八人合併行走圖要先用 `split_character_sheet.py` 切開，不能直接丟給 Job。
- **像素圖資訊有限**：行走圖與 face 近拍只提供設計與身份，無法控制身體比例；像素圖看不清的細節不得當成事實。

---

## 素材來源與版權聲明（頁面需保留）

開發、測試與展示素材有使用或參考：

- [落日迷宮之都](https://mizuotaku.com/SunsetDungeon/index.html)
- [RPG Maker MZ](https://www.rpgmakerweb.com/products/rpg-maker-mz)

上述素材、角色、美術、產品名稱與商標權利均屬各自作者、權利人或發行商所有；列示僅為出處說明，不代表已納入本專案授權範圍，也不代表原作者背書。

---

## 連結

- **Source code**：https://github.com/Rex-shark/rpgmaker-character-forge
- **Demo / Live**：（待補：目前僅本機 Docker + Cloudflare Quick Tunnel，無常駐公開站）
- **相關文章**：（待補）

---

## 視覺資產（已備齊）

> 存於 [`public/projects/rpgmaker-character-forge/`](../../public/projects/rpgmaker-character-forge/)。
> 頁面直接以 `<img src="/projects/rpgmaker-character-forge/<name>.png">` 引用。

| # | 檔案 | 內容 | 來源 | 用途 / 位置 |
|---|------|------|------|-------------|
| 1 | `character-gallery.png` | 角色圖鑑（Sylphie）：角色清單 + 行走圖預覽 + 角色立繪 + 敵人戰鬥圖，透明格底 | 專案 README | ⭐ Hero / 頁首主視覺 |
| 2 | `face-sheet-inspector.png` | Face 切割檢查：16 表情逐格瀏覽 + 兩張 576×288 原始圖與切割線 + 「2/2 張尺寸正確」 | 專案 README | 「16 表情 face 圖」功能段落 |
| 3 | `bright-check.png` | 透明背景檢查切到**亮色**底（Amber）：白底下確認去背無殘留光暈或色塊 | Claude 實機擷取 | 「AI 視覺驗證 / 圖鑑」段落 |

> 註：`bright-check.png` 由 Claude 以 puppeteer-core 驅動系統 Chrome，對本機實際跑起來的圖鑑（`npm run dev`，port 3000）擷取，3200×2000。

### 截圖樣式建議

- 三張皆為深綠／深空色系的深色截圖，統一 `rounded-2xl` + 細邊框（深色用 `border-white/10`）。
- `character-gallery.png` 最適合當 Hero，寬幅呈現。
- `bright-check.png` 與 `character-gallery.png` 是同一介面的**不同底色**，可並排做「透明 vs 亮底」對照，強化「去背品質可驗證」這個賣點。

---

## 給製作頁面的指引

- **頁面路由**：`/projects/rpgmaker-character-forge`，元件位於 `src/pages/projects/RpgmakerCharacterForge.tsx`。
- **參考既有範例**：[`src/pages/projects/AiChatroom.tsx`](../../src/pages/projects/AiChatroom.tsx)、[`ThreadsBot.tsx`](../../src/pages/projects/ThreadsBot.tsx) 的版型與動畫節奏可沿用。
- **頂部導覽**：返回連結指向 `/styles/finalist`，右側保留 GitHub 連結。
- **不可編造**：stars / forks 不放假數據，沒資料就移除該區塊或顯示 `—`。
- **必須保留**：素材來源與版權聲明區塊（RPG Maker、落日迷宮之都）。
- **文案語氣**：繁體中文（台灣用語），技術詞彙保留原文。
