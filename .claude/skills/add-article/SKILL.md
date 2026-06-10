---
name: add-article
description: Process pending bookmark articles into the website's "好文分享" (Bookmarks) section. Use when the user wants to publish new articles from spec/article/data-pending.md, add articles to the homepage Bookmarks section, refresh the bookmark list, process pending articles, or sync the article queue. Trigger phrases include "新增好文分享", "處理 pending 文章", "上架文章", "更新好文分享", "處理 data-pending", "把 pending 的文章上架", "刷新好文分享列表".
---

# 新增好文分享文章

把 `spec/article/data-pending.md` 中的待上架文章，正規化、寫入正式資料檔、同步前端、清空 pending 檔。

## 流程總覽

```
spec/article/data-pending.md  ──(解析+正規化)──>  Finalist.tsx 的 articles[]
                              └──(append)─────>  spec/article/data.md
                              └──(emptied)────>  spec/article/data-pending.md
```

## 步驟

### 1. 讀取與解析 `spec/article/data-pending.md`

每筆 entry 以**空白行**分隔。容錯解析下列兩種格式變體：

**標準格式**：
```
# url
* https://...
# title
* 文章標題
# tags
* AI Agent skills github
# date
* 2026-04
```

**緊湊變體**（同義，需相容）：
```
# url https://...           ← URL 直接放在 # url 同一行
# title
* 文章標題
...
```

**title 缺漏變體**（需偵測警告）：有些 entry 可能缺 `# title` 標頭，title 直接以 `*` 開頭。遇到時先試著從上下文推斷（位於 url 與 tags 之間的 bullet），若不確定就**停下來請使用者確認**，不要憑空編造標題。

每筆 entry 必有 4 個欄位：`url` / `title` / `tags` / `date`。任一缺漏就停下來請使用者補上（**不可編造**）。

### 2. 正規化欄位

依 `CLAUDE.md` 的「好文分享資料來源」章節規則：

**Tag 正規化**（按表查表，不在表上的視為新 tag）：

| 原始（pending） | 正規化後 |
|---|---|
| `ai` | `AI` |
| `agent` | `Agent` |
| `skills` | `Skills` |
| `github` / `gitHub` | `GitHub` |
| `uiux` | `UIUX` |
| `ai生圖` | `AI 生圖` |
| `筆記` | `筆記` |
| `java` | `Java` |

**Tag 解析**：`# tags` 下的字串以**空白拆分**，例如 `AI Agent skills github` → `['AI', 'Agent', 'Skills', 'GitHub']`。**不要**把 `AI Agent` 視為單一 tag。

**Date**：保留 `YYYY-MM` 格式，不到日。

**URL**：保留原樣（含 fbclid 等追蹤參數也保留，避免破壞使用者來源記錄）。

**Title**：把全形數字、半形數字之間多餘空格收乾淨；標題中英混排時若中英字之間有空格就保留，沒有就不強加。

**Title 簡轉繁（重要）**：若偵測到 title 為**簡體中文**，必須轉成**繁體中文（台灣用語）**後才上架。轉換規則：
- 不只是字形轉換（简→簡），還要套用**台灣慣用詞彙**，例如：`视频`→`影片`、`代理`/`智能体`→`代理人`（依語境）、`开源`→`開源`、`漏洞`→`漏洞`、`生产力`→`生產力`、`装`→`裝`、`组`→`組`。
- 中國大陸用語改為台灣用語（如「视频」用「影片」、「软件」用「軟體」、「网络」用「網路」、「内存」用「記憶體」、「代码」用「程式碼」）。
- 轉換後的**繁中版本**同時寫入 `Finalist.tsx` 的 `articles[]` **與** `data.md`，兩處一致，不保留簡體原文。
- 若某些專有名詞或語境不確定如何轉，**停下來請使用者確認**，不要硬翻。

### 3. 偵測新 tag

把正規化後的 tag 集合與 `src/pages/styles/Finalist.tsx` 中的 `TAG_COLOR` 比對：

- 全部都在 `TAG_COLOR` → 直接進入下一步
- 出現新 tag（如 `Docker`、`Backend` 等）→ **暫停**，告訴使用者「偵測到新 tag X，需要為它指派顏色並更新 CLAUDE.md 的對照表」，請使用者：
  1. 指定顏色 hex
  2. 確認正規化後的呈現名稱（例如 `docker` → `Docker`）
  3. 同意後才繼續

### 4. 寫入 `src/pages/styles/Finalist.tsx`

把每筆新文章**附加到 `articles[]` 陣列的最末端**（保持與 `data.md` 順序一致）。格式：

```ts
{
  title: '<正規化後的標題>',
  url: '<原 URL>',
  tags: ['<正規化 tag1>', '<正規化 tag2>'],
  date: '<YYYY-MM>',
},
```

若有新 tag 已在 step 3 確認，順手把它加進 `TAG_COLOR` 物件並指派色號。

### 5. 附加到 `spec/article/data.md`

把每筆 entry 以**標準格式**（步驟 1 第一種）附加到 `data.md` 末尾，每筆前加一個空白行作為分隔。順手把格式統一化（緊湊變體展開成標準格式）。

例：
```
（既有內容）

# url
* https://...
# title
* 文章標題
# tags
* AI Agent
# date
* 2026-05
```

### 6. 清空 `spec/article/data-pending.md`

寫入空檔（保留檔案、清掉內容）。**不要刪除檔案本身**，使用者之後會再用。

### 7. 驗證

執行 `npm run build` 確認 TypeScript / Vite 通過。若失敗，回滾並回報錯誤。

### 8. 完成回報

簡短摘要：
- 處理了幾筆文章
- 新增/沿用的 tag 清單
- 各 tag 的新 count（例如 `AI 13→14`）
- build 結果

## 邊界情境

| 情境 | 處理方式 |
|------|----------|
| `data-pending.md` 完全空 | 回報「目前沒有待上架文章」，不做任何修改 |
| 某筆 entry 缺欄位 | 停下，請使用者補上，不繼續 |
| 偵測到新 tag | 停下，請使用者指派顏色 + 同步 CLAUDE.md，不繼續 |
| URL 重複（已存在於 data.md） | 停下，請使用者確認是要跳過、覆寫、還是中止 |
| Build 失敗 | 回滾 Finalist.tsx + data.md 變更，pending 不清空 |

## 不可做的事

- ❌ **編造**任何欄位（缺 title 就停下問人，不要從 URL 猜）
- ❌ 把**簡體中文** title 原樣上架（一定要先轉成繁體中文台灣用語，兩處資料檔都用繁中版）
- ❌ 改動 `articles[]` 既有 entry 的順序
- ❌ 改動 `TAG_COLOR` 既有色號（只能新增）
- ❌ 刪除 `data-pending.md` 檔案（要清空內容但保留檔案）
- ❌ 修改 `CLAUDE.md` 對照表，**除非**使用者在 step 3 明確同意新 tag

## 相關檔案

- 輸入：`spec/article/data-pending.md`
- 正式資料：`spec/article/data.md`
- 前端：`src/pages/styles/Finalist.tsx`（`articles` 陣列 + `TAG_COLOR`）
- 規範：`CLAUDE.md`「好文分享資料來源」章節
