---
paths:
  - "src/**/*.tsx"
  - "src/**/*.ts"
  - "src/index.css"
  - "components.json"
---

# 前端慣例

## 樣式

- 主題 token 定義於 `src/index.css`（CSS 自訂屬性、OKLch）：`--background`、`--foreground`、`--primary`、`--muted`、`--accent`、`--destructive`、`--radius-*`
- 暗色模式以 `.dark` class 切換，**不是** `prefers-color-scheme`
- 只用 Tailwind class，不另建 CSS 檔；class 合併用 `cn()`（`src/lib/utils.ts`）

## 元件

- shadcn/ui 元件放 `src/components/ui/`，以 `npx shadcn add <component>` 新增（該目錄已在 `eslint.config.js` 關閉 `react-refresh/only-export-components`，因 shadcn 會同時 export 元件與 variants）
- Icon 用 Lucide React；GitHub icon 用各頁面內自訂的 `GithubIcon` SVG
- 頁內錨點 `<a href="#x">` 用 `handleHashClick()`（`src/lib/utils.ts`）改走 `scrollIntoView`

## Framer Motion

- `ease` 值加 `as const`，Variants 加型別標註（strict 模式下否則型別錯誤）
- 只動 `transform` / `opacity`；尊重 `prefers-reduced-motion`
