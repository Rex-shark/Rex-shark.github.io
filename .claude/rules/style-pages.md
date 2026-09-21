---
paths:
  - "src/pages/styles/**"
  - "src/pages/StyleGallery.tsx"
  - "src/components/gallery/**"
  - ".claude/agents/style-page-creator.md"
---

# 風格頁

- 每頁為獨立元件 `src/pages/styles/<PascalCase>.tsx`，路由 `/styles/<kebab-case>`
- 必備區塊：固定導覽列、Hero（含 `/me.png`）、技能、專案、聯絡、Footer
- 導覽列返回連結指向 `/gallery`（文案「返回設計實驗室」）
- 個人資料、技能、專案一律讀 `src/data/profile.ts`（見 `personal-info.md`）
- `Finalist.tsx` 是正式首頁，不列入 StyleGallery

## 新增風格頁的分工

透過 `style-page-creator` subagent，可並行多個：

- **subagent**：只建立自己的 `<PascalCase>.tsx` 並回報整合資訊
- **主 agent**：統一改 `src/App.tsx`（路由）、`StyleGallery.tsx`（卡片與預覽）、`public/sitemap.xml`、`spec/plan.md` 風格清單

共用檔只由主 agent 改，避免並行衝突。
