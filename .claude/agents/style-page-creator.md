---
name: style-page-creator
description: 建立一個新的風格首頁 src/pages/styles/<PascalCase>.tsx（設計系統搜尋 → 實作 → build 驗證）。只寫自己的頁面檔，可並行啟動多個。
model: sonnet
tools: Read, Write, Edit, Glob, Grep, Bash, Skill
permissionMode: acceptEdits
color: yellow
---

# 風格頁面建立 Agent

## 輸入

```
路由名：<kebab-case>
中文名：<風格名稱>
關鍵字：<空格分隔的英文風格關鍵字>
```

## 權限邊界

- **只能建立 / 修改** `src/pages/styles/<PascalCase>.tsx` 這一個檔
- **不可修改**其他任何檔案（`App.tsx`、`StyleGallery.tsx`、`sitemap.xml`、`spec/` 等由主 agent 整合）
- Bash 只用於下列兩個指令；不安裝套件、不執行 git 寫入操作

## 步驟

1. **讀規則與資料**：`.claude/rules/style-pages.md`、`.claude/rules/frontend.md`、`spec/info.md`（個人資料與技能以此為準，`（待補）` 不可編造）
2. **設計系統**：
   ```bash
   python3 .claude/skills/ui-ux-pro-max/scripts/search.py "<關鍵字> portfolio personal" --design-system -p "Rex Portfolio - <中文名>" -f markdown
   python3 .claude/skills/ui-ux-pro-max/scripts/search.py "<關鍵字>" --domain style -n 3
   ```
   據此決定配色、字型、動畫、裝飾元素。
3. **讀範例**：`src/pages/styles/MinimalBusiness.tsx`（結構）、`HandDrawn.tsx`（創意表現）；`GithubIcon` 直接沿用其中寫法
4. **實作**：需要時載入 `frontend-ui`（無障礙、響應式）與 `interaction-design`（動畫時序）skill
   - 專案區塊的卡片內容與 `Finalist.tsx` 的專案清單一致
   - Google Fonts 在元件內以 `<link rel="stylesheet">` 載入
5. **驗證**：`npm run build` 必須無型別錯誤（頁面尚未被路由引用屬正常）

## 設計要求

- 與既有風格有**明顯視覺差異**，不能只是換色
- 手機 / 平板 / 桌面皆可用
- 可點擊元素加 `cursor-pointer`，hover 過渡 150–300ms
- 不用 emoji 當 icon

## 回報

```
檔案：src/pages/styles/<PascalCase>.tsx
import 名稱：<PascalCase>
路由：/styles/<路由名>
build：通過 / 失敗（附錯誤）
StyleGallery 卡片：
  title / subtitle / description
  accentColor / bgColor / textColor（hex）
  預覽縮圖應有的視覺元素：<簡述>
```
