# AGENTS.md

Rex 個人網站（rex-shark.github.io）的 AI 代理指引。

## 專案現況

目前 `src/App.tsx` 仍為 Vite 預設腳手架內容，網站處於**早期開發**階段。尚未導入路由（React Router 等），計畫內容包含：自介、技能、Java/Spring Boot 教學、GitHub 專案展示。

## 常用指令

```bash
npm run dev      # 本地開發伺服器（Vite HMR）
npm run build    # tsc -b && vite build（型別檢查 + 建置至 dist/）
npm run lint     # ESLint 檢查
npm run preview  # 預覽 production 建置結果
```

> `npm run build` 包含 TypeScript 型別檢查（`tsc -b`），確保在部署前先通過型別驗證。

## 技術 Stack

| 類別 | 套件 |
|------|------|
| 框架 | React 19 + Vite 8 |
| 樣式 | Tailwind CSS v4（透過 `@tailwindcss/vite`，**無** `tailwind.config.js`） |
| UI 元件 | shadcn/ui（style: `base-nova`，底層使用 `@base-ui/react`，非 Radix UI） |
| 動畫 | Framer Motion |
| 字型 | Geist Variable（`@fontsource-variable/geist`） |
| Icons | Lucide React + SVG 精靈檔（`public/icons.svg`） |

## 路徑別名

`@` → `./src`（在 `vite.config.ts` 與 `tsconfig.json` 均已設定）

```ts
import { cn } from "@/lib/utils"   // ✅
import { cn } from "../../lib/utils" // ❌ 避免相對路徑
```

## 樣式慣例

- **主題 token** 定義於 `src/index.css`，使用 **OKLch 色彩空間**的 CSS 自訂屬性（`--background`、`--primary` 等）
- **暗色模式**：切換 `.dark` class（非 `prefers-color-scheme` media query）；custom variant 宣告為 `@custom-variant dark (&:is(.dark *))`
- **class 合併**：一律使用 `cn()` 工具函式（`clsx` + `tailwind-merge`），位於 `@/lib/utils`
- Tailwind CSS v4 無 config 檔，設定完全透過 `src/index.css` 的 `@theme inline {}` 區塊完成

## 元件慣例

- shadcn/ui 元件放於 `src/components/ui/`，新增指令：`npx shadcn add <component>`
- Button 範例（`src/components/ui/button.tsx`）：底層使用 `@base-ui/react/button`，以 `cva` 管理 variants
- SVG 精靈使用方式：`<use href="/icons.svg#icon-name" />`

## 部署

Push 至 `main` 分支後，`.github/workflows/deploy.yml` 自動觸發：
1. `npm ci` → `npm run build` → 輸出至 `dist/`
2. 部署至 GitHub Pages（`https://rex-shark.github.io`）

`base: '/'` 已設定於 `vite.config.ts`。

## 關鍵檔案索引

| 檔案 | 用途 |
|------|------|
| `src/index.css` | Tailwind 匯入、主題 token、暗色模式定義 |
| `src/components/ui/button.tsx` | shadcn/ui 元件範例（`cva` + `@base-ui/react`） |
| `src/lib/utils.ts` | `cn()` 工具函式 |
| `vite.config.ts` | Vite + Tailwind v4 plugin、`@` 路徑別名 |
| `components.json` | shadcn/ui 設定（style: `base-nova`、alias 對應） |
| `.github/workflows/deploy.yml` | CI/CD 自動部署流程 |

