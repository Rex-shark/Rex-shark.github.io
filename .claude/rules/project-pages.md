---
paths:
  - "src/pages/projects/**"
  - "spec/projects/**"
  - "public/projects/**"
---

# 精選專案 showcase 頁

- 資料唯一來源：`spec/projects/<slug>.md`（slug 為 kebab-case）。製作或更新 `src/pages/projects/<Project>.tsx` 前必先讀取
- **不得編造**：`（待補）` 欄位、未提供的截圖、未公布的數字（stars / forks）一律保留佔位或留白
- 截圖放 `public/projects/<slug>/<name>.png`（英文檔名）；原始檔在 `spec/projects/img/`。缺圖時以灰底框 + `截圖待補` 呈現
- 導覽列返回連結指向 `/`
- 新增專案時同步：`spec/projects/<slug>.md`（首段標註路由與元件路徑）、`Finalist.tsx` 專案卡、`src/App.tsx`、`public/sitemap.xml`、`spec/plan.md`
- Spring Boot API 範例無 spec 檔，內容內嵌於頁面
