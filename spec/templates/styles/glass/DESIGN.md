---
version: alpha
name: 玻璃態 Glassmorphism
description: 淡粉紅底上三團同色系柔光，內容放在通透的白色毛玻璃面板上，以多重亮邊與柔和陰影做層次。輕盈、乾淨、帶一點甜，像隔著霧面玻璃看見午後的光。
colors:
  primary: "#A82B56"
  on-primary: "#FFFFFF"
  primary-hover: "#8E2348"
  secondary: "#6A3FB5"
  on-secondary: "#FFFFFF"
  tertiary: "#F6A6C6"
  on-tertiary: "#4A0D2C"
  neutral: "#FBEAF0"
  background: "{colors.neutral}"
  surface: "#FDF3F7"
  surface-raised: "#FFFCFD"
  on-surface: "#2B1621"
  on-surface-variant: "#5C3F4E"
  on-surface-subtle: "#74505F"
  glass-fill: "#FFFFFF73"
  glass-fill-strong: "#FFFFFFE0"
  glass-border: "#FFFFFFCC"
  glass-highlight: "#FFFFFF"
  glow-1: "#F3B6CB"
  glow-2: "#F9C9B4"
  glow-3: "#E9B8E0"
  outline: "#EDD3DD"
  outline-strong: "#A86F88"
  disabled: "#F4DFE7"
  on-disabled: "#76566A"
  scrim: "#3A1A2A59"
  success: "#1D7044"
  success-container: "#D9F2E3"
  on-success-container: "#145533"
  warning: "#8A5300"
  warning-container: "#FCE9C5"
  on-warning-container: "#6E4200"
  error: "#B4233A"
  on-error: "#FFFFFF"
  error-container: "#FDE0E5"
  on-error-container: "#8F1A2D"
  info: "#2D5BB0"
  info-container: "#DFE8FB"
  on-info-container: "#1C4690"
  chart-1: "#D6457A"
  chart-2: "#7C5CD6"
  chart-3: "#2BA7A0"
  chart-4: "#E0A030"
typography:
  display:
    fontFamily: Manrope, Noto Sans TC
    fontSize: 56px
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: -0.03em
  headline-lg:
    fontFamily: Manrope, Noto Sans TC
    fontSize: 36px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Manrope, Noto Sans TC
    fontSize: 26px
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Manrope, Noto Sans TC
    fontSize: 20px
    fontWeight: 600
    lineHeight: 1.4
  title-md:
    fontFamily: Manrope, Noto Sans TC
    fontSize: 16px
    fontWeight: 600
    lineHeight: 1.5
  body-lg:
    fontFamily: Manrope, Noto Sans TC
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.75
  body-md:
    fontFamily: Manrope, Noto Sans TC
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.7
  body-sm:
    fontFamily: Manrope, Noto Sans TC
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.6
  label-lg:
    fontFamily: Manrope, Noto Sans TC
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1.2
  label-md:
    fontFamily: Manrope, Noto Sans TC
    fontSize: 13px
    fontWeight: 600
    lineHeight: 1.2
  label-sm:
    fontFamily: Manrope, Noto Sans TC
    fontSize: 12px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: 0.03em
  number-xl:
    fontFamily: Manrope
    fontSize: 36px
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: -0.02em
    fontFeature: "'tnum' 1"
  number-md:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1.4
    fontFeature: "'tnum' 1"
rounded:
  none: 0px
  sm: 8px
  md: 12px
  lg: 20px
  xl: 28px
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
  4xl: 112px
  gutter: 24px
  margin-desktop: 32px
  margin-mobile: 16px
  container: 1200px
  sidebar: 248px
  control-height: 44px
components:
  page:
    backgroundColor: "{colors.background}"
    textColor: "{colors.on-surface}"
  backdrop-glow-1:
    backgroundColor: "{colors.glow-1}"
  backdrop-glow-2:
    backgroundColor: "{colors.glow-2}"
  backdrop-glow-3:
    backgroundColor: "{colors.glow-3}"
  glass-panel:
    backgroundColor: "{colors.glass-fill}"
    rounded: "{rounded.lg}"
  glass-panel-strong:
    backgroundColor: "{colors.glass-fill-strong}"
    rounded: "{rounded.lg}"
  glass-edge:
    backgroundColor: "{colors.glass-border}"
  glass-edge-highlight:
    backgroundColor: "{colors.glass-highlight}"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: 24px
  card-muted-text:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface-variant}"
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.full}"
    padding: 20px
    height: 44px
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "{colors.on-primary}"
  button-primary-disabled:
    backgroundColor: "{colors.disabled}"
    textColor: "{colors.on-disabled}"
  button-secondary:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.on-surface}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.full}"
    padding: 20px
    height: 44px
  button-secondary-hover:
    backgroundColor: "{colors.outline}"
    textColor: "{colors.on-surface}"
  button-ghost:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.full}"
    padding: 16px
    height: 44px
  button-ghost-hover:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.on-surface}"
  button-danger:
    backgroundColor: "{colors.error}"
    textColor: "{colors.on-error}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.full}"
    padding: 20px
    height: 44px
  link:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.secondary}"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    padding: 14px
    height: 44px
  input-placeholder:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface-subtle}"
  input-error-message:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.error}"
    typography: "{typography.body-sm}"
  sidebar:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface-variant}"
    width: 248px
  nav-item-active:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.on-surface}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.md}"
  chip:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    height: 34px
    padding: 14px
  chip-selected:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
  badge-neutral:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.full}"
    padding: 8px
  badge-success:
    backgroundColor: "{colors.success-container}"
    textColor: "{colors.on-success-container}"
  badge-warning:
    backgroundColor: "{colors.warning-container}"
    textColor: "{colors.on-warning-container}"
  badge-error:
    backgroundColor: "{colors.error-container}"
    textColor: "{colors.on-error-container}"
  badge-info:
    backgroundColor: "{colors.info-container}"
    textColor: "{colors.on-info-container}"
  badge-accent:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.on-tertiary}"
  table-header:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface-subtle}"
    typography: "{typography.label-md}"
    height: 44px
  table-row:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-sm}"
    height: 56px
  table-row-hover:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.on-surface}"
  table-row-selected:
    backgroundColor: "{colors.outline}"
    textColor: "{colors.on-surface}"
  switch-on:
    backgroundColor: "{colors.secondary}"
    width: 40px
    height: 22px
    rounded: "{rounded.full}"
  switch-off:
    backgroundColor: "{colors.outline-strong}"
  tooltip:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.sm}"
    padding: 8px
  toast:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    padding: 16px
  dialog:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.xl}"
    padding: 28px
  drawer:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    width: 440px
  overlay-scrim:
    backgroundColor: "{colors.scrim}"
  skeleton:
    backgroundColor: "{colors.surface-raised}"
    rounded: "{rounded.sm}"
  step-active:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    size: 30px
    rounded: "{rounded.full}"
  step-done:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.on-secondary}"
  step-upcoming:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.on-surface-variant}"
  status-success:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.success}"
  status-warning:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.warning}"
  status-info:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.info}"
  chart-series-1:
    backgroundColor: "{colors.chart-1}"
  chart-series-2:
    backgroundColor: "{colors.chart-2}"
  chart-series-3:
    backgroundColor: "{colors.chart-3}"
  chart-series-4:
    backgroundColor: "{colors.chart-4}"
---

# 玻璃態 Glassmorphism

## Overview

**淡粉、通透、柔光。** 畫布是淡粉紅，上面浮著三團只比底色深一點的同色系柔光（玫瑰粉、蜜桃粉、淡紫粉），整體仍是單一粉色調、不花；所有內容放在通透的白色毛玻璃面板上，透出背後的柔光。層次感來自「低透明度白 + 模糊 + 多重亮邊」。

- **適合推薦給**：美妝保養、生活風格與選物品牌、App 與數位服務、婚禮與甜點、年輕女性取向的品牌、想要「輕盈、現代、有質感」的客戶。
- **情緒目標**：客戶看到時覺得「很乾淨、很柔和、有精緻感」。
- **密度**：後台中等偏鬆（列高 56px、控制項 44px）；前台寬鬆、大字（主標 56px）。
- **個性所在**：面板的多重亮邊（頂邊純白高光、左邊次高光）、透出柔光的毛玻璃、玫瑰色主按鈕與全圓角膠囊。玻璃是這套風格的**主角材質**，不是點綴——但每一片玻璃都承載內容，不做純裝飾的玻璃塊。
- **改版紀錄**：
  - 2026-11-09：原本深夜藍底＋紫青粉三團柔光，Rex 認為底色太花，改為單一淡粉紅的淺色版本。
  - 2026-11-24：純色底讓毛玻璃沒東西可透、玻璃感不足，加回柔光但限定**同色系、低對比**，並把面板改得更通透、亮邊更明顯。

## Colors

色彩策略是**淡粉畫布＋同色系柔光＋白色玻璃＋玫瑰／紫羅蘭強調色**。

- **Background 淡粉（#FBEAF0）**：整個畫布底色。
- **背景柔光（glow-1 玫瑰粉 #F3B6CB、glow-2 蜜桃粉 #F9C9B4、glow-3 淡紫粉 #E9B8E0）**：三個直徑 40–52% 外框寬的模糊圓（`blur(100px)`、不透明度 35–45%），固定在左上、右中、下方。**只用同色系、只比底色深一階**，不可加入藍、綠等對比色（那會回到「太花」）。純裝飾、不帶資訊、不可互動。
- **玻璃材質**：`glass-fill`（白 45%）為一般面板、`glass-fill-strong`（白 88%）為浮層與 hover；邊框 `glass-border`（白 80%）；頂邊 1px `glass-highlight`（純白）。
- **Surface 不透明對照色（#FDF3F7 / #FFFCFD）**：玻璃面板疊在畫布上的「等效實色」，用途：不支援 `backdrop-filter`、`prefers-reduced-transparency` 時的退路，以及對比計算基準。
- **對比以「柔光最濃處」計算**：柔光中心的等效底色約 #F8D5E1，文字色都要在這裡 ≥ 4.5:1。因此主色與提示文字比一般淡粉底再深一階。
- **文字**：主要文字深梅色 `on-surface`（#2B1621），次要 `on-surface-variant`（#5C3F4E），提示 `on-surface-subtle`（#74505F）。不用純黑。
- **Primary 玫瑰（#A82B56）**：主要按鈕、選中 chip、目前步驟，搭配白字。
- **Secondary 紫羅蘭（#6A3FB5）**：連結、開關開啟、已完成步驟、focus 外框。
- **Tertiary 櫻粉（#F6A6C6）**：只用於「新品」「最受歡迎」這類吸睛徽章，搭配深酒紅字，一個畫面最多一處。
- **狀態色**：中低明度的綠／琥珀／紅／藍，可直接當文字用；徽章用「淺色 container 底＋深色字」。
- **圖表**：玫瑰、紫羅蘭、青綠、琥珀。

## Typography

拉丁字母用 **Manrope**（Google Fonts，幾何無襯線、字形開闊、數字漂亮），中文用 **Noto Sans TC**。

- **標題**：700 字重、字距收緊（主標 −0.03em），大字級（56 / 36 / 26 / 20）。
- **內文**：16px、行高 1.7，顏色 `on-surface`；次要說明用 `on-surface-variant`。
- **標籤**：600 字重，`label-sm` 字距 0.03em。
- **數字**：KPI 用 `number-xl`（36px、700），表格用 `number-md`，皆開啟 `tnum`。
- 不使用漸層文字；強調靠字級與字重。

## Layout

- **前台**：最大寬度 1200px，12 欄、欄距 24px；區塊間距 112px（手機 72px）。主視覺允許標題置中並放大到 `display`。
- **後台**：左側 248px 玻璃側邊欄（與頁面邊緣保留 12px 間距，四角 20px 圓角，看起來像漂浮的面板），內容區內距 32px；KPI 卡 4 欄、圖表 2:1。
- **漂浮感**：主要面板（側邊欄、頂部列、卡片）與畫布邊緣都留間距，不貼邊；面板之間 20–24px。
- **間距系統**：4px 為基本單位，常用 8 / 16 / 24 / 32 / 48 / 64 / 112。
- **響應式**：≥1280 桌機、768–1279 平板（側邊欄收為 icon 列）、<768 手機（單欄、側邊欄改抽屜、表格改卡片）。手機上柔光整體降到 70%。

## Elevation & Depth

**以白色透明度、模糊與多重亮邊做層次。**

| 層級 | 用途 | 實作 |
|---|---|---|
| 0 | 畫布 | `background` ＋三團同色系柔光 |
| 1 | 側邊欄、頂部列、卡片、表格 | `glass-fill`（白 45%）＋ `backdrop-filter: blur(24px) saturate(180%)` ＋ 1px `glass-border` ＋ 亮邊（頂邊純白、左邊白 70%、底邊白 30%）＋ 陰影 `0 8px 32px rgba(168,43,86,0.10)` |
| 2 | 下拉選單、tooltip、toast | `glass-fill-strong` ＋ `blur(28px) saturate(180%)` ＋ 同樣邊框與亮邊 ＋ 陰影 `0 16px 48px rgba(168,43,86,0.16)` |
| 3 | 對話框、抽屜 | 同層級 2，背後鋪 `scrim`（35% 深梅色）並對畫布加 `blur(6px)` |

- 卡片 hover：玻璃填色從 45% 提高到 88%，**不位移、不放大**。
- 巢狀玻璃最多兩層（例如玻璃卡片內的輸入框）；第二層用 `surface` 實色＋邊框，不再疊模糊。
- `prefers-reduced-transparency: reduce` 或不支援 `backdrop-filter` 時：層級 1 改 `surface`、層級 2–3 改 `surface-raised`，保留邊框與陰影。

## Shapes

**大圓角、柔和。** 按鈕與 chip、徽章用全圓膠囊；輸入框 12px；卡片、側邊欄、頂部列 20px；對話框 28px；tooltip 8px。圖片圓角比所在面板小 4px（例如 20px 卡片內的圖用 16px），視覺上與玻璃邊緣保持等距。

## Components

- **按鈕**：高 44px、全圓角。主要按鈕實心玫瑰＋白字，hover 加深並出現 `0 0 0 4px` 的玫瑰 20% 外光環；次要按鈕為玻璃材質＋深梅字；文字按鈕無底，hover 出現玻璃底。危險按鈕實心 `error`＋白字。停用：`disabled` 底、`on-disabled` 字、無光環。
- **輸入框**：高 44px、12px 圓角、`surface` 實色底（不用玻璃，確保打字清楚）＋1px `outline-strong` 邊框。focus：邊框改紫羅蘭＋`0 0 0 3px` 紫羅蘭 25% 光環。錯誤：邊框 `error`＋下方 `error` 文字。
- **核取方塊／單選**：18px，選中為實心紫羅蘭＋白色勾。
- **開關**：40×22px，開啟紫羅蘭、關閉 `outline-strong`。
- **chip**：高 34px 膠囊，未選玻璃材質、選中實心玫瑰。
- **徽章**：膠囊、`label-sm`、淺底深字；「新品／最受歡迎」用櫻粉實心＋深酒紅字。
- **卡片**：層級 1 玻璃、20px 圓角、內距 24px。
- **表格**：整張表放在一片玻璃面板內；表頭無底色、`on-surface-subtle` 字；列與列之間 1px `outline` 分隔；hover 列加白 50% 底；勾選列加玫瑰 10% 底。
- **頁籤**：膠囊形分段控制，選中項為白色實底＋深梅字＋柔和陰影。
- **側邊欄導覽**：選中項目白 80% 底＋深梅字。
- **對話框／抽屜**：層級 3；對話框寬 480px、抽屜寬 440px。
- **toast**：層級 2 玻璃，左側狀態 icon 用狀態色。
- **骨架屏**：淡粉 → 白的橫向光澤掃過（1.4 秒），`prefers-reduced-motion` 時靜止。
- **步驟條**：30px 圓形節點，目前步驟玫瑰、已完成紫羅蘭＋勾、未到達玻璃底。
- **focus**：所有可互動元素 focus-visible 時 2px 紫羅蘭外框、3px offset。
- **動態**：hover／浮層進出 200ms，ease-out。背景柔光 26–32 秒極緩慢漂移（位移 ≤ 4% 外框寬），`prefers-reduced-motion` 時完全靜止。

## Do's and Don'ts

- Do 柔光只用同色系粉調、只比底色深一階，畫面整體仍是單一粉色
- Do 把每一片玻璃都用來承載內容，玻璃是材質不是貼紙
- Do 以柔光最濃處的等效底色檢查文字對比 ≥ 4.5:1
- Do 輸入框使用實色底，確保輸入內容清楚
- Do 提供 `prefers-reduced-transparency` 與不支援 `backdrop-filter` 時的實色退路
- Don't 在柔光裡加入藍、綠、黃等對比色，或讓柔光快速移動、閃爍
- Don't 疊超過兩層玻璃，或在玻璃上再疊模糊
- Don't 使用漸層文字或彩虹漸層按鈕
- Don't 用純黑文字，一律用深梅色系
- Don't 把櫻粉用在超過一處的強調上
