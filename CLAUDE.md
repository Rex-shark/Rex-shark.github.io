# CLAUDE.md

Rex（GitHub：Rex-shark）的個人網站，部署於 `rex-shark.github.io`。
本檔只放核心指引；主題規則在 `.claude/rules/`，讀到對應路徑的檔案時自動載入。

## 語言

回應、文件、程式碼註解一律**繁體中文（台灣用語）**。

## 技術 Stack

React 19 + Vite 8、TypeScript strict、Tailwind CSS v4（`@tailwindcss/vite`，無獨立設定檔）、shadcn/ui（`base-nova`，底層 `@base-ui/react`）、Framer Motion、Lucide React、Geist Variable。路徑別名 `@` → `./src`。

## 指令

```bash
npm run dev       # 本地開發
npm run build     # tsc --noEmit + 建置至 dist/
npm run lint      # ESLint
npm run preview   # 預覽 production 建置
```

## 架構總覽

BrowserRouter，路由定義於 `src/App.tsx`：

```
/                     → 正式首頁（src/pages/styles/Finalist.tsx）
/gallery              → 設計實驗室（StyleGallery，23 種風格）
/styles/<name>        → 各風格首頁；/styles/finalist 同首頁（向下相容）
/projects/<slug>      → 精選專案 showcase
```

## 資料權威來源（不得編造）

| 主題 | 來源 |
|---|---|
| Rex 個人資料 | `spec/info.md`（程式端對應 `src/data/profile.ts`） |
| 精選專案 | `spec/projects/<slug>.md` |
| 好文分享 | `spec/article/data.md`（待上架：`data-pending.md`） |

標註 `（待補）` 的欄位一律保留，不可自行填值。

## 計畫與文件同步

計畫集中於 [spec/plan.md](spec/plan.md)（本專案不另設 `plan/`）。完成項目或計畫變更時**立即更新**。
狀態符號：⬜ 待開始　🔄 進行中　✅ 已完成　⏸ 暫停　❌ 取消

## 規則索引（`.claude/rules/`）

| 檔案 | 主題 |
|---|---|
| `frontend.md` | 樣式系統、元件慣例 |
| `routing.md` | 路由、GitHub Pages SPA redirect、sitemap |
| `style-pages.md` | 風格頁結構、subagent 分工 |
| `project-pages.md` | 專案 showcase 頁 |
| `articles.md` | 好文分享格式、tag 正規化 |
| `personal-info.md` | 個人資料使用規則 |

## Subagent / Skill

- `style-page-creator`：建立新風格頁（只寫自己的頁面檔）
- `code-reviewer`：唯讀程式碼審查
- `add-article` skill：上架 `data-pending.md` 的文章

## 部署

push `main` → `.github/workflows/deploy.yml` → GitHub Pages。未經指示不自動 commit。
