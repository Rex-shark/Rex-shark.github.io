---
paths:
  - "src/App.tsx"
  - "index.html"
  - "public/404.html"
  - "public/sitemap.xml"
  - "public/robots.txt"
---

# 路由與 SEO

- 使用 **BrowserRouter**（已從 HashRouter 遷移）。GitHub Pages 的 SPA 路由靠兩段腳本：
  - `public/404.html`：未知路徑編碼成 `/?/path` 導回首頁
  - `index.html`：還原 `?/path`，並把舊版 `#/path` 連結轉成路徑
- `/styles/finalist` 與 `/` 指向同一元件，保留以相容舊連結，勿移除
- **新增 / 移除路由時**同步：`src/App.tsx`、`public/sitemap.xml`、`spec/plan.md` 路由表
- sitemap 網址一律無 hash
