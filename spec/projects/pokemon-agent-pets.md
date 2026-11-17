---
slug: pokemon-agent-pets
name: 寶可夢牧場 Agent（Pokemon Agent Pets）
tagline: 讓 AI coding agent 的工作狀態「看得見」的 3D 桌寵
status: 已完成（持續開發）
category: AI Agent Tooling / Desktop App / 3D
github: https://github.com/Rex-shark/pokemon-agent-pets
demo: null
route: /projects/pokemon-agent-pets
component: src/pages/projects/PokemonAgentPets.tsx
---

# 寶可夢牧場 Agent（Pokemon Agent Pets）

> 本文件為製作靜態介紹頁的權威資料來源。撰寫頁面時請以本檔內容為準，**不得自行編造數據或功能**。
> 標註 `（待補）` 的欄位請保留原樣或在頁面上顯示佔位提示。
>
> 資料取自專案的 `README.md`（2026-11-17，八張地圖版）。
> 站內路由 `/projects/pokemon-agent-pets`，元件 `src/pages/projects/PokemonAgentPets.tsx`。
>
> 名稱：網站上顯示「寶可夢牧場 Agent」（Rex 2026-11-17 指示加上 Agent）；App 本身的名稱是 Pokemon Ranch Pets。
>
> ⚠️ **素材**：非官方粉絲專案。repo 不含任何寶可夢模型。網站使用八張純場景截圖，以及 README 中兩張放了模型後實際跑起來的示意圖（`map-lake-left-pets`、`map-snow-pets`；Rex 2026-11-17 決定放上），頁面須註明角色屬於各自的權利方。泡泡狀態另以網頁元件重繪圖例。

---

## 一句話說明

macOS 與 Windows 都能用的桌寵：桌面上有一座 3D 等角小島，**每個 Claude Code／Codex session 認養一隻第一代寶可夢**；寵物在牧場裡走動，頭上的雲朵泡泡顯示 agent 正在做什麼，等你確認、出錯、做完時用顏色和音效提醒。

## 解決的問題

同時開好幾個 AI agent session 時，得一個個切回去看誰在等權限、誰出錯、誰做完了。寶可夢牧場把每個 session 的狀態變成桌面上一隻寵物頭上的泡泡，掃一眼就知道該去處理哪一個。

---

## 泡泡狀態（agent 的情況 → 寵物的反應）

| agent 的情況 | 寵物的反應 |
|------|------|
| 新 session 第一次有動靜 | 從牧場上還沒有的品種裡隨機認養一隻，重開 App 還在 |
| 在做事（讀檔、寫程式、跑指令、查資料…） | 白色雲朵泡泡，例如「跑指令：執行型別檢查」 |
| 等你確認（權限、問問題、計畫） | 黃色泡泡＋跳動，停下來面向你，叮咚聲 |
| 工具失敗 | 紅色泡泡，播攻擊動作，低音提示聲 |
| 整理記憶（壓縮對話） | 淡紫泡泡 |
| 這一輪做完 | 綠色「做完了！」，播開心動作，上揚三音 |
| 5 分鐘沒有動靜 | 躺下睡覺、飄 Zzz，下一個事件就醒來 |
| session 結束 | 寵物留在牧場上，要拿掉從選單「放生」 |

## 沒事的時候寵物自己過日子

- **各有各的地盤**：陸地的在草地上逛，水系的在水裡游，兩棲的兩邊都去。
- **會打架**：兩隻正面撞上有機率打一場，輸的冒著汗跑到另一頭。
- **151 隻都有**：依體型分級，卡比獸和小拉達站在一起看得出差別。
- **兩種模式**：置頂的小牧場（可以拖著搬、可以摸寵物），或鋪在桌面圖示底下的桌布模式（只有 macOS）。

場景全部用程式產生，音效用 Web Audio 現場合成，除了模型之外沒有其他素材檔。

---

## 八張地圖

| 檔案 | 地圖 | 說明 |
|---|---|---|
| `map-lake-left.webp` | 左側海 | 沙灘、椰子樹，一座伸進海裡的木棧橋，寵物會走上去 |
| `map-lake-center.webp` | 火山口湖 | 活火山，湖在山頂；水系在湖裡，其他寵物在山下的平地 |
| `map-river.webp` | 中央河 | 一條微彎的河把牧場分成兩岸，上岸是營地與營火 |
| `map-snow.webp` | 雪地 | 亮著燈的小木屋、松林、雪屋與雪人，天上飄雪 |
| `map-sakura.webp` | 日式賞櫻 | 池泉庭園：瀑布石組、太鼓橋與鳥居、枝垂櫻、會動的鹿威し，花瓣飄落 |
| `map-islet.webp` | 中央島 | 四面環海的沙島，大椰子樹、排球、沖上岸的包裹、半埋在沙裡的黃色橡皮艇 |
| `map-moon.webp` | 月面基地 | 淡藍大玻璃罩、中央圓形水池、玻璃通道通到小島邊緣的門；罩外月面有隕石坑與 NPC |
| `map-undersea.webp` | 海底世界 | 整座島沉在海裡像水族箱：玻璃罩裡是陸地，罩外水系浮在不同高度，珊瑚、海草、寶箱、氣泡與魚群 |

另有兩張放了模型後的實景截圖（角色屬於各自的權利方，只當示意）：

| 檔案 | 說明 | 位置 |
|---|---|---|
| `map-lake-left-pets.webp` | 左側海地圖上的寶可夢：兩隻走上棧橋，水系在海裡游 | Hero 主視覺 |
| `map-snow-pets.webp` | 雪地上六個 session 同時在跑：白色在做事、黃色等你確認、紅色失敗、淡紫整理記憶、綠色做完 | 泡泡狀態區 |

圖片存於 `public/projects/pokemon-agent-pets/`（由原 PNG 轉 WebP，保留透明背景）。從選單切換地圖，也可以設成每次啟動隨機抽一張。

---

## 運作方式

```
Claude Code／Codex（多個 session、子代理）
   ── hook 事件 ──▶ hooks/（pet-hook.sh／.mjs、codex-hook.py）
   ── POST 127.0.0.1:47821/hook ──▶ hook-server（Electron 主行程）
   ──▶ ranch-state（認養＋每個 session 的狀態機）
   ── IPC 快照 ──▶ renderer（three.js 牧場、寵物、泡泡、音效）
```

## 設計重點

- **隱私**：只取事件裡用得到的欄位（session ID、事件名、工具名、工作目錄）；泡泡上的說明只留看不出隱私的東西（檔名、指令的簡短描述、網域）。提示文字、指令本身、檔案內容、agent 的回覆讀完就丟，不保存、不寫 log。
- **安全**：只聽 `127.0.0.1`，帶 `Origin` 標頭的請求一律拒絕，避免瀏覽器裡的網頁冒充 agent。
- **不拖慢 agent**：hook 永遠成功結束、最多等 1 秒；桌寵沒開時連線立刻被拒。Claude Code 的 hook 不輸出任何東西，Codex 的只回空的 `{}`，不影響權限、不加提示。
- **子代理不另外養寵物**：子代理的事件只算「這個 session 還有動靜」，子代理要權限時一樣會變黃。

---

## 技術棧

| 分層 | 技術 |
|------|------|
| 桌面 App | Electron 45（macOS、Windows；可打包成不簽章的 App） |
| 3D 場景 | three.js 0.187、程式產生的等角小島與八張地圖 |
| 前端建置 | TypeScript、Vite |
| 音效 | Web Audio 現場合成 |
| Agent 接入 | Claude Code hooks（shell／Node）、Codex hooks（Python） |
| 展示網站 | `npm run showcase`：可送假事件的活牧場＋151 隻動作圖鑑 |

## 快速開始

| 步驟 | 指令 |
|------|------|
| 安裝套件 | `cd agent-pets && npm install` |
| 準備模型 | 自行從 06wj/pokemon 取得，放進 `agent-pets/models/`（詳見 repo 的 `docs/install.md`） |
| 安裝 hooks | 把 `hooks/claude-settings.example.json` 合併進 `~/.claude/settings.json` |
| 開發模式 | `npm run dev` |
| 打包 App | `npm run dist:mac`（Windows：`npm run dist:win`） |

## 已知限制

- repo 不含寶可夢模型，要自己取得並放進 `agent-pets/models/`；模型權利屬原權利方，只能自己的電腦上用。
- 桌布模式只有 macOS；Windows 只有置頂小牧場。
- 打包的 App 沒有簽章，給自己這台電腦用。

## 聲明與素材來源

- 非官方的粉絲專案，與任天堂、Creatures、GAME FREAK、The Pokémon Company 無關，也未獲背書。寶可夢（Pokémon）及相關名稱是各權利方的商標。
- 模型：06wj/pokemon（repo 不包含、不散布模型）；屬性資料：06wj/pokemon 的 `pokemonTypes.ts`（MIT）；官方身高體重：PokeAPI 的 CSV 資料。
- hook 腳本的規則（不輸出、永遠成功結束、限時）參考 claude-office 與 pixel-agents。
