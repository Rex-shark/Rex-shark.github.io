---
version: alpha
name: 柔和 UI Soft UI
description: 暖米色畫布，元件像從同一塊黏土裡輕輕壓出或推起，以一亮一暗的柔和陰影塑形；大圓角、圓體字、陶土紅點綴，觸感溫和親切。
colors:
  primary: "#A0452F"
  on-primary: "#FFFFFF"
  primary-hover: "#8A3A27"
  primary-container: "#F6DED5"
  on-primary-container: "#7A3423"
  secondary: "#6F8F73"
  secondary-container: "#DCE8DC"
  on-secondary-container: "#3B5540"
  tertiary: "#D9A441"
  neutral: "#EFEBE5"
  background: "{colors.neutral}"
  surface: "#EFEBE5"
  surface-raised: "#F6F3EE"
  surface-inset: "#E8E3DB"
  on-surface: "#3D3833"
  on-surface-variant: "#5F5750"
  on-surface-subtle: "#665E57"
  shadow-dark: "#D3CBBF"
  shadow-light: "#FFFFFF"
  outline: "#DDD6CC"
  outline-strong: "#B9AFA2"
  disabled: "#E6E1D9"
  on-disabled: "#665E57"
  scrim: "#3D383366"
  success: "#356B42"
  success-container: "#DDEBDD"
  on-success-container: "#2C5A38"
  warning: "#8A5A14"
  warning-container: "#F5E3C8"
  on-warning-container: "#6E420E"
  error: "#B3402F"
  error-container: "#F5D9D3"
  on-error-container: "#8A2E21"
  info: "#3F6A99"
  info-container: "#DCE6F0"
  on-info-container: "#2C4D72"
  chart-1: "#B4533A"
  chart-2: "#6F8F73"
  chart-3: "#D9A441"
  chart-4: "#8C7B6B"
typography:
  display:
    fontFamily: Nunito, Huninn, Noto Sans TC
    fontSize: 52px
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Nunito, Huninn, Noto Sans TC
    fontSize: 34px
    fontWeight: 800
    lineHeight: 1.25
  headline-md:
    fontFamily: Nunito, Huninn, Noto Sans TC
    fontSize: 26px
    fontWeight: 700
    lineHeight: 1.3
  headline-sm:
    fontFamily: Nunito, Huninn, Noto Sans TC
    fontSize: 21px
    fontWeight: 700
    lineHeight: 1.4
  title-md:
    fontFamily: Nunito, Huninn, Noto Sans TC
    fontSize: 17px
    fontWeight: 700
    lineHeight: 1.5
  body-lg:
    fontFamily: Nunito, Noto Sans TC
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.8
  body-md:
    fontFamily: Nunito, Noto Sans TC
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.75
  body-sm:
    fontFamily: Nunito, Noto Sans TC
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.65
  label-lg:
    fontFamily: Nunito, Huninn, Noto Sans TC
    fontSize: 15px
    fontWeight: 700
    lineHeight: 1.2
  label-md:
    fontFamily: Nunito, Huninn, Noto Sans TC
    fontSize: 13px
    fontWeight: 700
    lineHeight: 1.2
  label-sm:
    fontFamily: Nunito, Huninn, Noto Sans TC
    fontSize: 12px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: 0.02em
  number-xl:
    fontFamily: Nunito
    fontSize: 34px
    fontWeight: 800
    lineHeight: 1.1
    fontFeature: "'tnum' 1"
  number-md:
    fontFamily: Nunito
    fontSize: 14px
    fontWeight: 700
    lineHeight: 1.4
    fontFeature: "'tnum' 1"
rounded:
  none: 0px
  sm: 10px
  md: 16px
  lg: 24px
  xl: 32px
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
  4xl: 104px
  gutter: 28px
  margin-desktop: 36px
  margin-mobile: 18px
  container: 1180px
  sidebar: 252px
  control-height: 48px
components:
  page:
    backgroundColor: "{colors.background}"
    textColor: "{colors.on-surface}"
  soft-shadow-dark:
    backgroundColor: "{colors.shadow-dark}"
  soft-shadow-light:
    backgroundColor: "{colors.shadow-light}"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: 28px
  card-muted-text:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface-variant}"
  card-highlight:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.full}"
    padding: 24px
    height: 48px
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "{colors.on-primary}"
  button-primary-disabled:
    backgroundColor: "{colors.disabled}"
    textColor: "{colors.on-disabled}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.full}"
    padding: 24px
    height: 48px
  button-secondary-pressed:
    backgroundColor: "{colors.surface-inset}"
    textColor: "{colors.on-surface}"
  button-ghost:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.full}"
    padding: 16px
    height: 48px
  button-ghost-hover:
    backgroundColor: "{colors.surface-inset}"
    textColor: "{colors.on-surface}"
  button-danger:
    backgroundColor: "{colors.error}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.full}"
    padding: 24px
    height: 48px
  link:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
  input:
    backgroundColor: "{colors.surface-inset}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    padding: 16px
    height: 48px
  input-placeholder:
    backgroundColor: "{colors.surface-inset}"
    textColor: "{colors.on-surface-subtle}"
  input-error-message:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.error}"
    typography: "{typography.body-sm}"
  sidebar:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface-variant}"
    width: 252px
  nav-item-active:
    backgroundColor: "{colors.surface-inset}"
    textColor: "{colors.primary}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.md}"
  chip:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    height: 36px
    padding: 16px
  chip-selected:
    backgroundColor: "{colors.primary-container}"
    textColor: "{colors.on-primary-container}"
  badge-neutral:
    backgroundColor: "{colors.surface-inset}"
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.full}"
    padding: 10px
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
    backgroundColor: "{colors.secondary-container}"
    textColor: "{colors.on-secondary-container}"
  badge-honey:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.on-surface}"
  table-header:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.label-md}"
    height: 44px
  table-row:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-sm}"
    height: 60px
  table-row-hover:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.on-surface}"
  table-row-selected:
    backgroundColor: "{colors.primary-container}"
    textColor: "{colors.on-primary-container}"
  switch-on:
    backgroundColor: "{colors.secondary}"
    width: 48px
    height: 26px
    rounded: "{rounded.full}"
  switch-off:
    backgroundColor: "{colors.surface-inset}"
  tooltip:
    backgroundColor: "{colors.on-surface}"
    textColor: "{colors.surface-raised}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.sm}"
    padding: 10px
  toast:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.lg}"
    padding: 18px
  dialog:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.xl}"
    padding: 32px
  drawer:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    width: 440px
  overlay-scrim:
    backgroundColor: "{colors.scrim}"
  skeleton:
    backgroundColor: "{colors.surface-inset}"
    rounded: "{rounded.sm}"
  step-active:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    size: 34px
    rounded: "{rounded.full}"
  step-done:
    backgroundColor: "{colors.secondary-container}"
    textColor: "{colors.on-secondary-container}"
  step-upcoming:
    backgroundColor: "{colors.surface-inset}"
    textColor: "{colors.on-surface-variant}"
  border-high-contrast:
    backgroundColor: "{colors.outline-strong}"
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

# 柔和 UI Soft UI

## Overview

**溫暖、柔軟、好親近。** 整個畫面像一塊暖米色的黏土：卡片與按鈕從表面輕輕「推起」，輸入框與選中狀態則「壓下去」。形體靠一亮（左上）一暗（右下）兩道柔和陰影塑造，而不是邊框。搭配大圓角、圓體字與陶土紅點綴，觸感溫和但不幼稚。

- **適合推薦給**：生活風格、手作與選物、健康與身心靈、親子教育、美業、精品咖啡與烘焙——想要「溫暖、有人味」的客戶。
- **情緒目標**：客戶看到時覺得「好舒服、很想摸摸看」。
- **密度**：三種風格中最鬆（控制項 48px、表格列高 60px），留足夠空間讓陰影呼吸。
- **個性所在**：凸起與內凹的對比、圓體字、全圓膠囊按鈕。為了避免傳統 Neumorphism「邊界看不清、按鈕不像按鈕」的問題，本系統做了三項修正：主要按鈕實心上色、輸入框內凹＋細邊框、所有文字對比 ≥ 4.5:1。

## Colors

色彩策略是**畫布與元件同色，用陰影分層；彩色只給行動與狀態**。

- **Neutral 暖米（#EFEBE5）**：畫布與大部分元件的共同底色（`background` = `surface` = 此色）。
- **陰影雙色**：`shadow-dark`（#D3CBBF）往右下、`shadow-light`（#FFFFFF）往左上，構成所有凸起與內凹效果。只能用這兩色，不另調陰影色。
- **`surface-raised`（#F6F3EE）**：比畫布略亮，用於 toast、hover 列與需要再浮一點的卡片。
- **`surface-inset`（#E8E3DB）**：比畫布略暗，用於輸入框、選中的導覽項目、按下中的按鈕、骨架屏。
- **Primary 陶土紅（#A0452F）**：主要按鈕、連結、目前步驟、選中導覽的文字色、圖表主色。白字、畫布、內凹底上的對比皆 ≥ 4.5:1（圖表用較亮的 `chart-1` #B4533A）。
- **Secondary 鼠尾草綠（#6F8F73）**：開關開啟、已完成步驟的淡底版（`secondary-container`）、圖表第二色。實心 `secondary` 不放文字。
- **Tertiary 蜂蜜黃（#D9A441）**：「新品／最受歡迎」小徽章（搭配深字）、圖表第三色，一個畫面最多一處。
- **狀態色**：偏暖、降低飽和度的綠／黃／紅／藍，徽章一律「淡底＋深字」。
- **圖表**：陶土紅、鼠尾草綠、蜂蜜黃、可可棕；長條與甜甜圈的區塊加 2px 畫布色間隔，看起來像分開的黏土塊。

## Typography

拉丁字母用 **Nunito**（Google Fonts，圓端無襯線），中文標題與標籤用 **Huninn 粉圓**（Google Fonts，jf open 粉圓，圓體），中文內文用 **Noto Sans TC**（長文可讀性較佳）。

- **Huninn 只有 400 一種字重**：中文標題的份量靠字級拉開（52 / 34 / 26 / 21），拉丁字母則用 Nunito 700–800。不要對 Huninn 套用偽粗體（`font-synthesis: none`）。
- **內文**：16px、行高 1.75，比其他兩種風格更寬鬆。
- **標籤**：按鈕、chip、表頭用 `label` 系列（Huninn＋Nunito 700）。
- **數字**：KPI 用 `number-xl`（Nunito 800），表格用 `number-md`，皆開啟 `tnum`。
- 文字色一律暖深棕（`on-surface` #3D3833），不使用純黑。

## Layout

- **前台**：最大寬度 1180px，12 欄、欄距 28px；區塊間距 104px（手機 64px）。
- **後台**：左側 252px 側邊欄（與畫布同色，靠凸起陰影與內容區分開），內容區內距 36px；KPI 卡 4 欄、圖表 2:1。
- **陰影需要空間**：凸起元件之間至少 20px，元件與容器邊緣至少 16px，否則陰影互相疊到會髒。
- **間距系統**：4px 為基本單位，常用 8 / 16 / 24 / 32 / 48 / 64 / 104。
- **響應式**：≥1280 桌機、768–1279 平板（側邊欄收為 icon 列）、<768 手機（單欄、側邊欄改抽屜、表格改卡片）。手機上陰影距離與模糊減半。

## Elevation & Depth

**凸起（raised）與內凹（inset）兩種方向，各有固定陰影組。**

| 層級 | 用途 | 陰影 |
|---|---|---|
| 內凹 −1 | 輸入框、選中導覽、按下中的按鈕、開關軌道、選中的分段控制 | `inset 3px 3px 6px #D3CBBF, inset -3px -3px 6px #FFFFFF` |
| 平面 0 | 畫布、表格內部 | 無 |
| 凸起 1 | 卡片、次要按鈕、chip、側邊欄 | `6px 6px 14px #D3CBBF, -6px -6px 14px #FFFFFF` |
| 凸起 1（小） | 徽章、表格內的小按鈕、開關圓鈕 | `3px 3px 8px #D3CBBF, -3px -3px 8px #FFFFFF` |
| 浮層 2 | 下拉、tooltip、toast、對話框、抽屜 | 凸起 1 ＋ `0 16px 40px rgba(61,56,51,0.16)` |

- **按壓**：次要按鈕、chip 被按下時從凸起 1 切換到內凹 −1（150ms），這是本風格最重要的互動回饋。
- **選中**：chip、分段控制、導覽項目選中時呈內凹，再加上主色文字或淡底。
- hover：凸起元件陰影距離 6px → 8px，不位移、不放大。
- 遮罩：對話框背後鋪 `scrim`（40% 暖深棕），不加模糊。
- 高對比模式（`prefers-contrast: more`）：所有凸起與內凹元件加上 1px `outline-strong` 邊框。

## Shapes

**大圓角、圓潤。** 按鈕、chip、徽章、開關為全圓膠囊；輸入框 16px；卡片 24px；對話框 32px；tooltip 10px。圖片圓角比所在卡片小 8px（24px 卡片內的圖用 16px）。icon 使用 Lucide 並把 `strokeWidth` 設為 2.25，線條端點與圓角語言一致。

## Components

- **按鈕**：高 48px、全圓。主要按鈕實心陶土紅＋白字＋凸起 1 陰影（暗面用 `rgba(138,58,39,0.35)` 取代 `shadow-dark`，讓陰影帶一點紅）；按下時改為內凹並加深底色。次要按鈕與畫布同色＋凸起 1，按下變內凹。文字按鈕無陰影，hover 時出現內凹淡底。危險按鈕實心 `error`。停用：`disabled` 底、無陰影、`on-disabled` 字。
- **輸入框**：高 48px、16px 圓角、`surface-inset` 底＋內凹陰影＋1px `outline` 邊框（確保邊界可見）。focus：邊框改陶土紅＋`0 0 0 3px` 陶土紅 20% 外光圈。錯誤：邊框 `error`＋下方 `error` 文字。
- **核取方塊／單選**：20px 內凹小格，選中後填入陶土紅實心＋白勾。
- **開關**：48×26px 內凹軌道，開啟時軌道為鼠尾草綠；圓鈕為凸起 1（小）的畫布色。
- **chip**：高 36px 膠囊，未選凸起、選中內凹＋`primary-container` 底＋深紅字。
- **徽章**：膠囊、`label-sm`、淡底深字、凸起 1（小）。
- **卡片**：與畫布同色、凸起 1、24px 圓角、內距 28px。卡片內不再放凸起卡片（最多一層凸起，內部元素用內凹或平面）。
- **表格**：整張表在一張凸起卡片內；表頭無底、`on-surface-variant` 字；列之間 1px `outline` 分隔；hover 列 `surface-raised`；勾選列 `primary-container`。
- **頁籤／分段控制**：整條內凹軌道，選中項為凸起的膠囊（像一顆滑塊）。
- **側邊欄導覽**：選中項目內凹＋陶土紅文字與 icon。
- **對話框／抽屜**：浮層 2；對話框寬 480px、32px 圓角；抽屜寬 440px。
- **toast**：`surface-raised` 底、浮層 2、左側狀態 icon 放在對應狀態淡底的圓形內。
- **骨架屏**：`surface-inset` 內凹色塊，1.2 秒透明度呼吸；`prefers-reduced-motion` 時靜止。
- **步驟條**：34px 圓形節點，目前步驟陶土紅實心凸起、已完成鼠尾草淡底＋勾、未到達內凹；節點之間是內凹的細軌道。
- **日期格**（預約版型）：每格凸起的圓角方塊，選中內凹＋陶土紅字，停用為平面＋`on-disabled` 字。
- **focus**：所有可互動元素 focus-visible 時 2px 陶土紅外框、3px offset。
- **動態**：凸起 ↔ 內凹切換 150ms ease-out；浮層進出 220ms，從 96% 縮放到 100% 並淡入。不做彈跳。

## Do's and Don'ts

- Do 讓畫布與元件同色，形體只靠一亮一暗兩道陰影塑造
- Do 主要按鈕實心上色，讓它一眼看得出是按鈕
- Do 輸入框加 1px 細邊框，確保邊界清楚
- Do 用「凸起 → 內凹」表達按下與選中
- Do 元件之間保留至少 20px，讓陰影有空間
- Don't 在凸起卡片內再放凸起卡片
- Don't 使用純黑文字、純黑陰影或硬邊陰影
- Don't 對 Huninn 粉圓套用粗體
- Don't 把鼠尾草綠或蜂蜜黃實心色當作文字底色放白字
- Don't 讓陰影色偏離 `shadow-dark` 與 `shadow-light`（主要按鈕的紅色陰影除外）
