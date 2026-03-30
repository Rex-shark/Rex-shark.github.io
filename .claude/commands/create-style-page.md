# 建立新風格首頁

你是負責設計並實作個人網站風格頁面的專業 subagent。

## 輸入參數

使用者會提供：
- **$ARGUMENTS** — 格式為：`<英文路由名> <中文風格名> <風格關鍵字>`
- 例如：`cyberpunk 賽博龐克 neon dark futuristic glitch`

解析方式：
- 第一個詞 → 英文路由名（kebab-case），用於 URL `/styles/<路由名>` 和檔名
- 第二個詞 → 中文風格名，用於頁面標題
- 其餘詞 → 風格關鍵字，傳入設計系統搜尋

---

## 執行步驟

### 步驟 1：產生設計系統（必須）

使用 `ui-ux-pro-max` 技能的腳本產生設計系統：

```bash
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "<風格關鍵字> portfolio personal" --design-system -p "Rex Portfolio - <中文風格名>" -f markdown
```

再補充搜尋風格細節：

```bash
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "<風格關鍵字>" --domain style -n 3
```

根據搜尋結果決定：配色方案、字型配對、動畫策略、裝飾元素。

### 步驟 2：閱讀既有範例

閱讀以下兩個檔案，理解既有模式與共用結構：

- `src/pages/styles/MinimalBusiness.tsx` — 簡約商務風格（結構範本）
- `src/pages/styles/HandDrawn.tsx` — 手繪風格（創意表現範本）

**必須遵循的共用模式：**

1. **導覽列**：固定頂部，左側「返回風格選擇」連結（`<Link to="/">`），右側頁內錨點連結
2. **頁面區塊順序**：Hero（含 `/me.png` 照片）→ 技能 → 專案 → 聯絡 → Footer
3. **個人資料**：
   - 名字：Rex
   - 身份：Java 全端工程師 ＆ 系統分析師
   - Email：rexrex10050@gmail.com
   - GitHub：https://github.com/Rex-shark
   - 照片：`/me.png`
4. **技能清單**：Java, Spring Boot, Spring Security, JPA/Hibernate, React, TypeScript, Tailwind CSS, PostgreSQL, Docker, GitHub Actions, 系統分析設計
5. **專案卡片**（3 張）：個人網站、Spring Boot API 範例、系統分析設計教學
6. **GitHub Icon**：lucide-react 沒有 Github icon，使用自訂 SVG（參考既有檔案的 `GithubIcon` 元件）

### 步驟 3：實作頁面

建立檔案 `src/pages/styles/<PascalCase名稱>.tsx`：

**技術規範：**
- React 19 + TypeScript（strict 模式）
- 樣式使用 Tailwind CSS class（不建立額外 CSS 檔）
- 動畫使用 Framer Motion，`ease` 屬性加 `as const` 避免型別錯誤
- Variants 物件加上 `Variants` 型別標註（`import type { Variants } from 'framer-motion'`）
- 路由使用 `react-router`（`Link`, `useNavigate` 等從 `react-router` 匯入）
- Icon 使用 Lucide React（`lucide-react`），GitHub 用自訂 SVG
- 路徑別名：`@` → `./src`
- 若需要 Google Fonts，用 `<link rel="stylesheet" href="...">` 在元件內載入
- 所有文字使用繁體中文

**設計原則：**
- 每種風格必須有明顯的視覺差異，不能只是換色
- 全頁面響應式設計（手機、平板、桌面）
- 所有可點擊元素加 `cursor-pointer`
- Hover 效果使用 150-300ms 過渡
- 支援 `prefers-reduced-motion`

### 步驟 4：註冊路由

編輯 `src/App.tsx`，加入新路由：

```tsx
import <PascalCase名稱> from '@/pages/styles/<PascalCase名稱>'
// ...
<Route path="/styles/<路由名>" element={<PascalCase名稱 />} />
```

### 步驟 5：更新導覽頁

編輯 `src/pages/StyleGallery.tsx`：

1. 在 `styles` 陣列中新增一個項目（含 title、subtitle、description、to、accentColor、bgColor、textColor、preview）
2. 建立對應的 `<風格名>Preview` 元件，用簡化的幾何圖形表達該風格的視覺特徵

### 步驟 6：驗證

```bash
npm run build
```

**必須**建置成功，無型別錯誤。若有錯誤，修正後重新建置。

---

## 品質檢查清單

- [ ] 設計系統有依據（來自 ui-ux-pro-max 搜尋結果）
- [ ] 風格與既有頁面有明顯視覺差異
- [ ] 包含所有必要區塊（Hero、技能、專案、聯絡）
- [ ] 個人資料正確（Rex、Java 全端工程師、email、GitHub）
- [ ] 使用 `/me.png` 作為個人照片
- [ ] 返回導覽頁按鈕正常
- [ ] 路由已註冊到 App.tsx
- [ ] 導覽頁已新增對應卡片與預覽
- [ ] `npm run build` 通過
- [ ] 無 emoji 作為 icon（使用 SVG）
- [ ] 所有可點擊元素有 `cursor-pointer`
