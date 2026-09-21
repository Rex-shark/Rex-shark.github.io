---
paths:
  - "spec/article/**"
  - "src/pages/styles/Finalist.tsx"
  - ".claude/skills/add-article/**"
---

# 好文分享

來源 `spec/article/data.md`，需與 `Finalist.tsx` 的 `articles` 陣列同步。待上架的放 `data-pending.md`，由 `add-article` skill 處理。

## data.md 格式（每筆以空白行分隔）

```
# url
* https://...
# title
* 文章標題
# tags
* tag1 tag2 tag3
# date
* 2026-04
```

- `tags` 以**空白拆分**：`AI Agent skills github` → 4 個 tag，`AI Agent` 不是單一 tag
- `date` 統一到月（`YYYY-MM`）

## Tag 正規化

| data.md | 正規化 |
|---|---|
| `ai` | `AI` |
| `agent` | `Agent` |
| `skills` | `Skills` |
| `github` / `gitHub` | `GitHub` |
| `uiux` | `UIUX` |
| `ai生圖` | `AI 生圖` |
| `筆記` | `筆記` |
| `java` | `Java` |
| `資安` | `資安` |

出現表外的新 tag：在 `Finalist.tsx` 的 `TAG_COLOR` 指派顏色，並在上表補一列。

## 其他

- 來源類型由 URL 自動判斷：`youtube.com` / `youtu.be` → 影片、`github.com` → 倉庫、其他 → 文章
- 不顯示閱讀時間
- **不得編造**日期（沒給就 `（待補）`）與摘要（頁面只顯示標題 + tag + 來源網域）
