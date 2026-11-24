# 設計範本：實作計畫

> 2026-11-09 撰寫。依據：[README.md](README.md)（原則、展示器、驗收）、[shared-data.md](shared-data.md)、各版型規格、三份風格 `DESIGN.md`。
> 進度追蹤在 [spec/plan.md](../plan.md)「🧩 設計範本」段落；本檔只放做法，不放進度。
> 狀態符號：⬜ 待開始　🔄 進行中　✅ 已完成　⏸ 暫停　❌ 取消

---

## 0. 前提與預設

README 第 8 節的待決事項尚未確認。本計畫先用下列**預設**往下排，Rex 若決定不同，只影響標註的階段：

| 待決事項 | 預設 | 影響階段 |
|---|---|---|
| 補充版型 `booking`、`landing` | 先不做，放在階段 5，確認後才開工 | 階段 5 |
| 圖片來源 | 先用程式產生的佔位圖（`TplImage`），之後整批替換，不改版型程式 | 階段 1 留介面，階段 6 替換 |
| 品牌名「青森選物」 | 沿用 | 無（文案集中在資料檔，改名只改資料） |
| 實作順序 | 基礎建設 → 儀表板 × 3 風格 → Rex 檢視 → 其他版型 | 全部 |

**不動的東西**：`src/pages/**`、`src/components/**`、`src/index.css`、`/gallery`、`/styles/*`、`/projects/*`。唯一例外是階段 6 在首頁導覽列加「設計範本」按鈕。

---

## 1. 關鍵技術決策

### D1｜風格層：CSS 變數＋共用元件，風格只是資料

每種風格是一個 TS 物件，不是一套元件：

```ts
type TplStyle = {
  slug: 'minimal' | 'glass' | 'soft'
  meta: { name: string; tagline: string; suitableFor: string[]; swatches: string[] }
  fonts: { googleFontsHref: string; sans: string; heading: string; numeric: string }
  vars: Record<`--tpl-${string}`, string>          // 顏色、圓角、陰影、材質
  slots?: Partial<Record<SlotName, string>>       // 少量無法用變數表達的 class 覆寫
  Decor?: React.ComponentType                     // 純裝飾背景（科技感的格線與光暈）
}
```

- **共用元件**（`src/templates/ui/*`）只寫一次，樣式全部取自 `--tpl-*` 變數；風格差異 90% 以上靠變數表達。
- **slots** 只用在變數做不到的地方（例如柔和 UI 按下時從凸起切到內凹、玻璃態的 `backdrop-filter`）。每個 slot 都是完整的 Tailwind class 字串字面值，Tailwind 才掃描得到。
- **Decor** 必須是 `aria-hidden`、`pointer-events-none`、不含文字。
- 為什麼不每種風格各寫一套元件：那樣功能與結構一定會漂移，違反 README 原則 2、3。

### D2｜變數只掛在範本外框，不碰全域

- 變數以 inline style 掛在 `DeviceFrame` 元素上（`data-tpl-style="glass"`），**不寫進 `:root`、不改 `src/index.css`**，正式站的 shadcn 主題完全不受影響。
- Tailwind v4 用變數簡寫：`bg-(--tpl-surface)`、`text-(--tpl-on-surface)`、`rounded-(--tpl-radius-md)`、`shadow-(--tpl-shadow-raised)`。階段 1 第一件事是驗證每種 utility 都支援 `(--var)` 寫法，不支援的改用 `[var(--x)]`。
- 變數命名：DESIGN.md 色彩 token 一對一轉成 `--tpl-<token>`（例如 `on-surface-variant` → `--tpl-on-surface-variant`），再加上材質變數（見第 3 節）。

### D3｜裝置預覽：容器查詢，不用 iframe

工具列的「桌機／平板／手機」是把範本框在 1280 / 768 / 375px 寬的框內。框內的響應式**必須用容器查詢**，因為媒體查詢看的是瀏覽器視窗，框變窄也不會觸發。

- `DeviceFrame` 設 `@container`；範本內一律用 `@md:`、`@lg:`、`@max-md:` 等容器變體。
- **`src/templates/` 內禁止使用視窗斷點**（`sm:` `md:` `lg:` `xl:`），由第 6 節的檢查腳本把關。
- 不用 iframe 的原因：iframe 要跨文件同步狀態、重新載入字體與樣式，切換風格時會閃爍，也拖慢切換速度。

### D4｜範本不用 `position: fixed`，浮層掛進外框

框變窄時，`fixed` 元素仍會對齊整個瀏覽器視窗，會跑出框外。因此：

```
Viewer（全頁）
└─ DeviceFrame          relative、overflow-hidden、@container、--tpl-* 變數、字體
   ├─ ScrollArea        overflow-auto，範本自己的捲動容器（scrollRef）
   │  └─ <TemplateView>
   └─ OverlayRoot       absolute inset-0、pointer-events-none；浮層的掛載點
```

- 導覽列吸頂用 `sticky`（相對 ScrollArea）；回到頂端按鈕、toast、抽屜、對話框都掛在 OverlayRoot（`absolute`）。
- base-ui 的 Dialog、Drawer、Menu、Select、Popover、Tooltip、Toast 都支援 Portal 的 `container` 屬性，一律傳入 OverlayRoot。**漏傳會讓浮層掛到 `body`，脫離變數範圍而失去樣式**，這是最容易出錯的地方。
- 捲動相關功能（錨點捲動、捲動追蹤、數字跑動、`IntersectionObserver`）一律以 ScrollArea 為 root，不用 `window`。用共用 hook `useTplScroll()` 取得。

### D5｜狀態：每個版型一個 store，放在風格外層

- 每個版型有 `state.ts`：初始資料＋reducer（純函式，與 React、風格無關）。
- store 用模組層級的 `useSyncExternalStore` 實作，**放在風格之外**：切換風格只改 `?style=` 與 DeviceFrame 的變數，範本元件不重新掛載，狀態自然保留。
- 切換版型再切回來，狀態仍在（store 在模組層級）；重新整理回到初始資料；工具列「重設」呼叫該版型 store 的 `reset()`。
- 跨版型的資料（購物網站下單後訂單編號接在儀表板 0418 之後）：訂單流水號放在共用 store，兩個版型都讀它。
- `DeviceFrame` 與 `TemplateView` **不可用 `key={style}`**，否則切風格會清空狀態。

### D6｜元件底層用 base-ui，不另裝套件

專案已有 `@base-ui/react` 1.3，涵蓋 Accordion、Checkbox、Dialog、Drawer、Menu、NumberField、Popover、Radio、Select、Switch、Tabs、Toast、ToggleGroup、Tooltip。無障礙（focus 管理、鍵盤、ARIA）交給它，外觀用 D1 的方式套。**不新增 UI 或圖表套件。**

### D7｜圖表自繪 SVG

儀表板只需要折線／面積圖（12 點或 7 點）、甜甜圈圖、水平長條。自繪 SVG，顏色取 `--tpl-chart-1..4`，tooltip 用共用 Tooltip，鍵盤 `←` `→` 逐點檢視。

### D8｜圖片：佔位元件，之後整批替換

`<TplImage id="P04" variant="main|alt1|alt2" />`：目前產生 SVG 佔位圖（依分類固定色相＋商品名稱，**所有風格同一張**）。之後換成真實圖片時，只改 `TplImage` 內部的來源對照表，版型程式不動。

### D9｜字體按需載入

每種風格進入時注入一次 Google Fonts `<link>`（已載入就略過），字體變數手寫在風格檔（**不用 design.md export 的字體結果**，它會把字體清單包成單一字串）。展示器外框與工具列沿用正式站的 Geist。

### D10｜lazy load，不增加首頁 bundle

`/templates`、`/templates/:template` 用 `React.lazy` 載入；每個版型的 View 再各自 lazy。驗收時比對 `npm run build` 的首頁 chunk 大小，不得增加。

### D11｜DESIGN.md 與程式碼同步

- 風格檔的色彩變數必須與 DESIGN.md frontmatter 完全一致。
- 新增 `scripts/check-templates.mjs`（純 Node，無新套件），`npm run tpl:check` 執行，檢查三件事：
  1. 每份 DESIGN.md 的 `colors` 與對應風格檔的 `--tpl-*` 變數一一相符（值、數量）
  2. `src/templates/` 內沒有視窗斷點 class（D3）
  3. `src/templates/` 內沒有 `fixed` 定位，以及 Portal 都有傳 `container`（D4，用字串比對做粗檢）

### 階段 1 實作後的修正（2026-11-09）

- **浮層區域底部避開工具列**：桌機模式下展示工具列疊在範本底部，OverlayRoot 改為 `bottom: 工具列高度`，抽屜底部按鈕才不會被擋住
- **網格內卡片要 `min-w-0`**：否則表格等寬內容會把網格撐出框外（手機寬度時特別明顯），已加在 `Card` 基本樣式
- **首頁 bundle**：範本共用 `@/lib/utils` 的 `cn()` 會把 tailwind-merge 留在首頁 chunk（+29KB）。改為範本自己的 `src/templates/lib/cn.ts`，並在 `vite.config.ts` 加 `templates-shared` 分組；`tpl:check` 也會擋 `@/lib/utils`。結果首頁只多 2.5KB（lazy 路由本身）
- **Toaster 與玻璃態柔光不用 Framer Motion**：改用 `tw-animate-css` 與 Web Animations API，範本 chunk 更小
- **容器查詢斷點**：Tailwind 的 `@md` 只有 448px，平板 / 桌機要用 `@3xl`（768）/ `@7xl`（1280），對照表寫在 `.claude/rules/templates.md`

---

## 2. 目錄結構

```
src/templates/
├── routes.tsx                 # lazy 載入的兩個頁面元件，App.tsx 只多兩行 Route
├── registry.ts                # 版型清單（slug、名稱、情境、lazy View、store）＋風格清單
├── viewer/
│   ├── TemplatesHome.tsx      # /templates 總覽頁（中性樣式）
│   ├── TemplateViewer.tsx     # /templates/:template：讀 ?style=，組 DeviceFrame
│   ├── DeviceFrame.tsx        # 外框、變數、容器查詢、ScrollArea、OverlayRoot
│   ├── Toolbar.tsx            # 底部浮動工具列（中性樣式）
│   ├── StyleInfoPanel.tsx     # 風格說明側欄，可複製 DESIGN.md 全文
│   └── context.ts             # useTplStyle、useTplOverlayRoot、useTplScroll
├── styles/
│   ├── minimal.ts
│   ├── glass.ts               # 單一淡粉底，無 Decor（2026-11-09 改版）
│   ├── soft.ts
│   └── index.ts               # 風格清單與型別
├── ui/                        # 共用元件（README 第 6 節的清單）
│   ├── Button.tsx  Input.tsx  Select.tsx  Checkbox.tsx  Radio.tsx  Switch.tsx
│   ├── Segmented.tsx  Chip.tsx  Badge.tsx  Card.tsx  Table.tsx  Pagination.tsx
│   ├── Tabs.tsx  Accordion.tsx  Drawer.tsx  Dialog.tsx  Menu.tsx  Tooltip.tsx
│   ├── Toast.tsx  Progress.tsx  Stepper.tsx  Rating.tsx  Avatar.tsx  Skeleton.tsx
│   ├── EmptyState.tsx  Field.tsx（標籤＋錯誤訊息）  TplImage.tsx
│   └── charts/  LineChart.tsx  DonutChart.tsx  BarList.tsx
├── lib/
│   ├── store.ts               # createStore(initial, reducer) → useSyncExternalStore
│   ├── format.ts              # NT$ 金額、日期 2026/11/09、百分比
│   ├── validate.ts            # 必填、Email、手機 09 開頭 10 碼、字數
│   └── fakeSubmit.ts          # 0.8 秒模擬送出
├── data/                      # 對應 shared-data.md（品牌、分類、商品、門市、課程、人物）
├── kit/KitView.tsx            # 元件總覽：所有共用元件的所有狀態，驗收風格用
├── dashboard/  data.ts  state.ts  View.tsx  pages/（Overview、Orders、Products、Settings）
├── shop/       data.ts  state.ts  View.tsx  pages/（List、Detail、Checkout、Done）＋CartDrawer
├── corporate/  data.ts  state.ts  View.tsx  sections/（13 個區塊）
├── booking/    （階段 5）
└── landing/    （階段 5）

spec/templates/styles/<slug>/DESIGN.md   # 風格權威來源（已完成）
scripts/check-templates.mjs              # D11
.claude/rules/templates.md               # 規則檔（階段 1 建立，路徑：src/templates/**、spec/templates/**）
```

`App.tsx` 只新增兩行 Route（`/templates`、`/templates/:template`），不改既有路由。

---

## 3. 變數清單（每種風格都必須提供）

### 3.1 色彩

DESIGN.md `colors` 全部 token → `--tpl-<token>`。三種風格共同必備：
`primary` `on-primary` `primary-hover` `secondary` `tertiary` `neutral` `background` `surface` `surface-raised`（簡約以 `surface-muted` 對應）`on-surface` `on-surface-variant` `on-surface-subtle` `outline` `outline-strong` `disabled` `on-disabled` `scrim`、四組狀態色（含 container）、`chart-1..4`。

風格各自缺的共同 token，在風格檔內以既有色補齊（例如簡約沒有 `surface-raised` → 用 `surface`），共用元件只引用共同 token。

### 3.2 材質（DESIGN.md 內文的陰影、邊框、模糊轉成變數）

| 變數 | 用途 | 簡約 | 玻璃態 | 柔和 UI |
|---|---|---|---|---|
| `--tpl-panel-bg` | 卡片、側欄、表格容器底 | surface | glass-fill | surface |
| `--tpl-panel-border` | 面板邊框 | 1px outline | 1px glass-border | none |
| `--tpl-panel-shadow` | 面板陰影 | none | 0 8px 32px … | 凸起 1 |
| `--tpl-panel-backdrop` | 背景模糊 | none | blur(20px) saturate(160%) | none |
| `--tpl-panel-highlight` | 面板頂邊亮線 | none | inset 0 1px 0 glass-highlight | none |
| `--tpl-control-shadow` | 次要按鈕、chip | none | none | 凸起 1 |
| `--tpl-control-shadow-pressed` | 按下／選中 | none | none | 內凹 −1 |
| `--tpl-input-bg` / `--tpl-input-shadow` | 輸入框 | surface / none | surface / none | surface-inset / 內凹 −1 |
| `--tpl-overlay-bg` / `--tpl-overlay-shadow` / `--tpl-overlay-backdrop` | 浮層 | 依各自 DESIGN.md 的層級 2 | 同左 | 同左 |
| `--tpl-focus-ring` | focus-visible 外框色 | tertiary | secondary | primary |
| `--tpl-radius-sm/md/lg/xl` | 圓角 | 4/6/8/8 | 8/12/20/28 | 10/16/24/32 |
| `--tpl-radius-control` | 按鈕、chip | md（6px） | full | full |
| `--tpl-control-h` | 控制項高度 | 40px | 44px | 48px |
| `--tpl-font-sans` / `--tpl-font-heading` / `--tpl-font-numeric` | 字體 | 依 DESIGN.md | 同左 | 同左 |

`prefers-reduced-transparency: reduce` 時，玻璃態的 `--tpl-panel-bg` 改 `surface`、`--tpl-panel-backdrop` 改 `none`（DeviceFrame 用 `matchMedia` 切換變數組）。

---

## 4. 分階段任務

每個階段結束都要通過第 5 節的驗證，並更新 `spec/plan.md`。

### 階段 1：基礎建設＋元件總覽 ⬜

| # | 任務 | 完成條件 |
|---|---|---|
| 1.1 | 驗證 Tailwind `(--var)` 寫法、容器查詢變體、base-ui Portal `container` | 一個暫時的測試元件在三種寫法下都正確，結論寫進規則檔後刪除測試元件 |
| 1.2 | 建 `.claude/rules/templates.md` | 收錄 README 核心原則、D1–D5、禁用清單（視窗斷點、fixed、`key={style}`、不傳 container 的 Portal） |
| 1.3 | 路由＋lazy 載入（D10）、`registry.ts` | `/templates`、`/templates/dashboard` 可開啟；首頁 chunk 大小不變 |
| 1.4 | 三個風格檔＋字體載入（D9）＋玻璃態 Decor | 色彩值與 DESIGN.md 一致（`tpl:check` 通過） |
| 1.5 | `DeviceFrame`、ScrollArea、OverlayRoot、context hooks | 切換三種寬度時內容在框內重新排版；浮層不跑出框 |
| 1.6 | 工具列：風格切換（含 `←` `→`）、版型切換、裝置寬度、重設、隱藏、返回 | 切換風格不重掛元件（React DevTools 確認或計數器驗證） |
| 1.7 | 風格說明側欄（讀 DESIGN.md 原文，用 Vite `?raw` 匯入；複製全文） | 三種風格都能顯示與複製 |
| 1.8 | `/templates` 總覽頁 | 版型卡片＋風格 chip 可直接進入 |
| 1.9 | `lib/`（store、format、validate、fakeSubmit）、`data/`（shared-data 全部資料） | 資料數值與 shared-data.md 逐項一致 |
| 1.10 | 共用元件（README 第 6 節全部）＋圖表＋`TplImage` | 每個元件含 hover、focus、active、disabled、錯誤狀態 |
| 1.11 | 元件總覽 `/templates/kit`（不列在總覽頁、不進 sitemap） | 三種風格下所有元件與狀態都正確，作為風格驗收基準 |
| 1.12 | `scripts/check-templates.mjs`＋`npm run tpl:check`（D11） | 三項檢查都能抓到故意放入的錯誤 |

### 階段 2：後台儀表板 × 3 風格 ⬜

依 [dashboard.md](dashboard.md) 逐節實作：版面骨架與側欄（含停用項 tooltip）、總覽（KPI、營收趨勢 7 天／12 個月、分類甜甜圈可隱藏分類、最新訂單、熱銷 Top 5、庫存提醒、近期活動）、訂單頁（頁籤計數、搜尋 debounce、排序、分頁、勾選＋批次、詳情抽屜、狀態時間軸、骨架屏、空狀態、手機卡片列表）、商品頁（篩選、上架開關、表格／卡片切換、新增商品對話框＋驗證）、設定頁（表單、開關、低庫存門檻連動、未變更停用儲存、危險區確認）、通知鈴、使用者選單、toast。

完成條件：dashboard.md 第 7 節狀態清單全部看得到；第 5 節驗證全過。

**⏸ 檢查點：Rex 檢視儀表板 × 3 風格**，確認方向後才進階段 3。風格若要調整，先改 DESIGN.md（lint 通過）再改風格檔。

### 階段 3：購物網站 ⬜

依 [shop.md](shop.md)：頁首（公告列可關閉、分類、搜尋、收藏數、購物車數）、列表（主視覺、篩選排序全部組合、已套用條件 chip、手機篩選抽屜、骨架屏、各種空狀態）、商品卡（hover 換圖、收藏、售完、低庫存）、詳情（圖庫鍵盤切換、規格加價、數量上限、手風琴、評論、相關商品、返回保留篩選與捲動位置）、購物車抽屜（免運進度、合併同規格、移除可復原、折扣碼、金額公式）、結帳（條件欄位、驗證捲到第一個錯誤）、完成頁（訂單流水號接共用 store）。

### 階段 4：公司官網 ⬜

依 [corporate.md](corporate.md)：導覽（捲動追蹤、捲動後樣式變化、「線上商店」切到購物網站並保留風格）、13 個區塊、數字跑動、門市頁籤與複製地址、消息分類＋載入更多＋對話框、輪播（hover／focus 暫停、減少動態時不自動播）、職缺手風琴＋「我要應徵」預填表單、FAQ、聯絡表單、回到頂端（避開工具列）。

階段 3、4 互不相依，基礎建設完成後可以**分兩個 session 並行**（各自只寫自己的版型資料夾；共用元件若需要新增或修改，集中在一邊做完再合併）。

### 階段 5：補充版型（待 Rex 確認）⏸

預約訂位（[booking.md](booking.md)）、方案介紹頁（[landing.md](landing.md)）。確認保留才開工；做法同階段 3、4。

### 階段 6：上線收尾 ⬜

| # | 任務 |
|---|---|
| 6.1 | 首頁 `Finalist.tsx` 導覽列「設計實驗室」旁加「設計範本」按鈕 → `/templates`（同樣式、同動畫） |
| 6.2 | `public/sitemap.xml` 加入 `/templates` 與各版型路由（不含 `/templates/kit`） |
| 6.3 | 圖片：依 Rex 決定的來源替換 `TplImage` 對照表（若仍未決定，維持佔位圖上線） |
| 6.4 | 品質複查：用 impeccable 的 `audit`、`critique` 參考文件逐版型 × 風格檢查（只讀參考，不執行其啟動器） |
| 6.5 | 更新 `spec/plan.md`、README 驗收清單打勾 |
| 6.6 | 部署：**等 Rex 指示**才 commit／push |

---

## 5. 驗證方式（每個階段都做）

| 項目 | 做法 |
|---|---|
| 型別與建置 | `npm run typecheck`、`npm run lint`、`npm run build` 全過 |
| 規則檢查 | `npm run tpl:check` 通過 |
| bundle | build 後比對首頁 chunk 大小，不得因範本增加 |
| 畫面 | 用 preview 開 `dev` 設定，逐一檢視「版型 × 3 風格 × 3 寬度」，看 console 無錯誤、無水平捲動、無文字溢出 |
| 內容一致 | 在 preview 中切換三種風格，比對 ScrollArea 的 `innerText` 完全相同（同狀態下） |
| 狀態保留 | 操作到某個狀態（加購物車、篩選、開抽屜）後切換風格，狀態仍在 |
| 功能 | 依版型規格逐項操作，對照規格的「必須展示的狀態清單」 |
| 無障礙 | 鍵盤走完主要流程、focus 可見；抽查文字對比（以 DESIGN.md 已 lint 的組合為準）；開啟 `prefers-reduced-motion` 確認動畫停止 |
| 截圖 | 每個版型完成時，三種風格各一張桌機截圖附在回報中 |

---

## 6. 風險與對策

| 風險 | 對策 |
|---|---|
| 浮層漏傳 Portal `container`，掛到 `body` 失去樣式 | 共用元件內統一包好，版型程式不直接用 base-ui Portal；`tpl:check` 粗檢 |
| 誤用視窗斷點，裝置預覽失效 | 規則檔＋`tpl:check` 禁止 |
| 玻璃態在亮的柔光區塊上對比不足 | 文字只放在玻璃或實色上；以 `surface` 等效色驗證；柔光不透明度上限 45% |
| 柔和 UI 陰影在窄框內互相疊壓 | 依 DESIGN.md 保留 20px 間距；手機寬度陰影減半（容器查詢切換變數） |
| Noto Sans TC 字體檔大、首次切換閃爍 | Google Fonts 的 unicode-range 分片＋`display=swap`；進入 `/templates` 時預先載入三種風格字體 |
| 風格差異大到「同一結構」做不出來 | 先改共用元件讓變數多一個維度；仍做不到才用 slots；**絕不為單一風格改結構或功能** |
| 共用元件數量多、階段 1 偏重 | 元件總覽頁讓每個元件一次在三種風格下驗收，後續版型只需組裝 |

---

## 7. 不在本計畫範圍

- 不做暗色模式切換（風格本身已有亮、暗之分）
- 不做後端、真實付款、資料持久化（重新整理即重設）
- 不做多語系
- 不取代或修改 `/gallery` 設計實驗室（取代時機另議）
- 不新增 UI、圖表、狀態管理套件
