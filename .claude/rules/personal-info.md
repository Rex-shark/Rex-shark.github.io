---
paths:
  - "spec/info.md"
  - "src/data/**"
  - "src/pages/**"
  - "index.html"
  - "README.md"
---

# 個人資料

- 與 Rex 相關的內容（自介、技能、聯絡方式、職位、年資、專案描述）以 `spec/info.md` 為唯一來源，撰寫文案前必先讀取
- 頁面程式碼一律 `import` [`src/data/profile.ts`](../../src/data/profile.ts)（與 `info.md` 1:1 對應），不在頁面內另寫一份姓名、技能、專案、聯絡方式；配色、icon 等裝飾欄位留在頁內用 key / index 對應
- 改資料時 `info.md` 與 `profile.ts` 一起改
- **不放**：技能熟練度百分比 / 等級、GitHub stars / followers 等數字、Open to Work、回覆時效承諾
- `（待補）` 欄位不得編造：保留 `（待補）` 或詢問使用者
- 使用者補充新資訊時同步更新 `info.md`
- 既有頁面的硬編碼資料與 `info.md` 不一致時，以 `info.md` 為準
