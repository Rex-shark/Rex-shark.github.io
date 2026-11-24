---
version: alpha
name: 簡約 Minimal
description: 大量留白、細線分隔、近黑主色加一個森林綠強調色。資訊清楚、不搶戲，讓內容自己說話。
colors:
  primary: "#1C1917"
  on-primary: "#FFFFFF"
  primary-hover: "#3A3532"
  secondary: "#57534E"
  tertiary: "#2F6B57"
  on-tertiary: "#FFFFFF"
  tertiary-container: "#E6F0EB"
  on-tertiary-container: "#1F4A3C"
  neutral: "#FAFAF9"
  background: "#FFFFFF"
  surface: "#FFFFFF"
  surface-muted: "#F5F5F4"
  on-surface: "#1C1917"
  on-surface-variant: "#57534E"
  on-surface-subtle: "#6F6862"
  outline: "#E7E5E4"
  outline-strong: "#D6D3D1"
  disabled: "#F5F5F4"
  on-disabled: "#736C66"
  scrim: "#1C191766"
  success: "#15803D"
  success-container: "#ECFDF3"
  on-success-container: "#166534"
  warning: "#B45309"
  warning-container: "#FFF7E6"
  on-warning-container: "#92400E"
  error: "#B91C1C"
  error-container: "#FEF2F2"
  on-error-container: "#991B1B"
  info: "#1D4ED8"
  info-container: "#EFF6FF"
  on-info-container: "#1E40AF"
  chart-1: "#2F6B57"
  chart-2: "#7FA99B"
  chart-3: "#B7893F"
  chart-4: "#57534E"
typography:
  display:
    fontFamily: Geist, Noto Sans TC
    fontSize: 48px
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Geist, Noto Sans TC
    fontSize: 32px
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Geist, Noto Sans TC
    fontSize: 24px
    fontWeight: 600
    lineHeight: 1.3
  headline-sm:
    fontFamily: Geist, Noto Sans TC
    fontSize: 20px
    fontWeight: 600
    lineHeight: 1.4
  title-md:
    fontFamily: Geist, Noto Sans TC
    fontSize: 16px
    fontWeight: 600
    lineHeight: 1.5
  body-lg:
    fontFamily: Geist, Noto Sans TC
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.75
  body-md:
    fontFamily: Geist, Noto Sans TC
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.7
  body-sm:
    fontFamily: Geist, Noto Sans TC
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.6
  label-lg:
    fontFamily: Geist, Noto Sans TC
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.2
  label-md:
    fontFamily: Geist, Noto Sans TC
    fontSize: 13px
    fontWeight: 500
    lineHeight: 1.2
  label-sm:
    fontFamily: Geist, Noto Sans TC
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: 0.02em
  number-xl:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: -0.02em
    fontFeature: "'tnum' 1"
  number-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.4
    fontFeature: "'tnum' 1"
rounded:
  none: 0px
  sm: 4px
  md: 6px
  lg: 8px
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
  4xl: 96px
  gutter: 24px
  margin-desktop: 32px
  margin-mobile: 16px
  container: 1200px
  sidebar: 240px
  control-height: 40px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.md}"
    padding: 16px
    height: 40px
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
    rounded: "{rounded.md}"
    padding: 16px
    height: 40px
  button-secondary-hover:
    backgroundColor: "{colors.surface-muted}"
    textColor: "{colors.on-surface}"
  button-ghost:
    backgroundColor: "{colors.background}"
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.md}"
    padding: 12px
    height: 40px
  button-ghost-hover:
    backgroundColor: "{colors.surface-muted}"
    textColor: "{colors.on-surface}"
  button-danger:
    backgroundColor: "{colors.error}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.md}"
    padding: 16px
    height: 40px
  link:
    textColor: "{colors.tertiary}"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    padding: 12px
    height: 40px
  input-placeholder:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface-subtle}"
  input-error-message:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.error}"
    typography: "{typography.body-sm}"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: 24px
  card-muted-text:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface-variant}"
  page:
    backgroundColor: "{colors.background}"
    textColor: "{colors.on-surface}"
  sidebar:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.on-surface-variant}"
    width: 240px
  nav-item-active:
    backgroundColor: "{colors.surface-muted}"
    textColor: "{colors.on-surface}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.md}"
  chip:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    height: 32px
    padding: 12px
  chip-selected:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
  badge-neutral:
    backgroundColor: "{colors.surface-muted}"
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
    backgroundColor: "{colors.tertiary-container}"
    textColor: "{colors.on-tertiary-container}"
  table-header:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.label-md}"
    height: 40px
  table-row:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-sm}"
    height: 52px
  table-row-hover:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.on-surface}"
  table-row-selected:
    backgroundColor: "{colors.tertiary-container}"
    textColor: "{colors.on-tertiary-container}"
  switch-on:
    backgroundColor: "{colors.tertiary}"
    width: 36px
    height: 20px
    rounded: "{rounded.full}"
  switch-off:
    backgroundColor: "{colors.outline-strong}"
  tooltip:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.sm}"
    padding: 8px
  toast:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.lg}"
    padding: 16px
  dialog:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: 24px
  drawer:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    width: 420px
  skeleton:
    backgroundColor: "{colors.surface-muted}"
    rounded: "{rounded.sm}"
  step-active:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    size: 28px
    rounded: "{rounded.full}"
  step-done:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.on-tertiary}"
  step-upcoming:
    backgroundColor: "{colors.surface-muted}"
    textColor: "{colors.on-surface-variant}"
  overlay-scrim:
    backgroundColor: "{colors.scrim}"
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

# 簡約 Minimal

## Overview

**安靜、精準、可信。** 這套風格把版面讓給內容：白底、細線、近黑文字，只用一個森林綠當作「這裡可以互動／這是重點」的訊號。像一本排版講究的型錄，不用花俏效果，靠留白、對齊與字重層級建立秩序。

- **適合推薦給**：專業服務、B2B、顧問與事務所、重視可讀性的後台、想要「乾淨、不出錯」的客戶。
- **情緒目標**：客戶看到時覺得「清楚、專業、不浮誇」。
- **密度**：後台中等密度（表格列高 52px）；前台寬鬆（區塊間距 96px）。
- **個性所在**：字重與字級的對比、精準的 1px 線條、數字使用等寬數字（tabular numbers）對齊。不靠顏色和陰影。

## Colors

色彩策略是**中性色撐起 95% 的畫面，強調色只出現在需要注意的地方**。

- **Primary 墨黑（#1C1917）**：主要按鈕、選中的 chip、tooltip、toast、標題文字。暖調近黑，比純黑柔和。
- **Secondary 石灰（#57534E）**：次要文字、說明、表頭、圖示。白底對比約 7.4:1。
- **Tertiary 森林綠（#2F6B57）**：唯一的彩色強調：連結、focus 外框、開關開啟、表格勾選列、圖表主色、步驟條已完成。**一個畫面中大面積使用不超過一處。**
- **Neutral 霧白（#FAFAF9）**：側邊欄、表頭、表格 hover 列的底色，與純白頁面做出極輕的層次。
- **線條**：`outline`（#E7E5E4）用於卡片、分隔線、表格列線；`outline-strong`（#D6D3D1）用於輸入框與次要按鈕邊框，確保表單邊界看得見。
- **狀態色**：success / warning / error / info 只出現在徽章、提示與驗證訊息，徽章一律用「淺底＋深字」的 container 組合，不使用實心彩色徽章。
- **圖表**：依序 chart-1 ～ chart-4（森林綠、灰綠、黃銅、石灰），與白底對比皆 ≥ 3:1。
- **`on-surface-subtle`（#6F6862）**：只用於 placeholder 與輔助說明，白底對比 ≥ 4.5:1，不可再更淡。

## Typography

拉丁字母用 **Geist**（專案已安裝的 Geist Variable），中文用 **Noto Sans TC**（Google Fonts，載入 400 / 500 / 600）。兩者都是幾何感無襯線，混排時字重與 x-height 接近。

- **標題**：600 字重，字距略收（−0.01 ～ −0.02em），層級以字級拉開：48 / 32 / 24 / 20。
- **內文**：16px、行高 1.7。中文行高比英文寬，避免擁擠；單行最多約 40 個中文字（約 680px）。
- **標籤**：按鈕、表頭、chip 用 500 字重的 label 系列；`label-sm` 加 0.02em 字距，用於徽章。
- **數字**：KPI 大數字用 `number-xl`，表格金額與數量用 `number-md`，皆開啟 `tnum` 讓數字欄位對齊。金額一律右對齊。
- 每個畫面最多三種字重（400 / 500 / 600），不使用 700 以上。

## Layout

- **前台（購物、官網、方案頁）**：最大寬度 1200px 置中，12 欄網格、欄距 24px；頁面左右邊距桌機 32px、手機 16px。區塊之間 96px（手機 64px），標題與內文之間 16px。
- **後台（儀表板）**：左側 240px 固定側邊欄＋流動內容區，內容區內距 32px；KPI 卡 4 欄、圖表區 2:1 分欄、表格滿版。
- **間距系統**：4px 為基本單位，常用 8 / 16 / 24 / 32 / 48 / 64 / 96。群組內緊、群組間鬆：同一卡片內元素間距 8–16px，卡片之間 24px。
- **對齊**：所有內容對齊網格左緣，不做置中排版（主視覺標題除外）。
- **響應式**：≥1280 桌機、768–1279 平板（KPI 2 欄、側邊欄收合為 icon 列）、<768 手機（單欄、側邊欄改抽屜、表格改卡片）。

## Elevation & Depth

**平面設計，以線條與底色建立層次，幾乎不用陰影。**

- 層級 0：頁面白底（`background`）。
- 層級 1：卡片、表格——白底＋1px `outline` 邊框，**無陰影**。
- 層級 1 的區隔：側邊欄與表頭用 `neutral` 底色，不加邊框陰影。
- 層級 2（只給浮層）：下拉選單、tooltip、toast、對話框、抽屜使用唯一一組陰影：`0 8px 24px rgba(28,25,23,0.08), 0 2px 6px rgba(28,25,23,0.06)`。
- 遮罩：對話框與抽屜背後鋪 `scrim`（40% 墨黑），不加模糊。
- hover 不浮起：卡片 hover 只把邊框改為 `outline-strong`，不加陰影、不位移。

## Shapes

**小圓角、俐落。** 控制項（按鈕、輸入框、下拉）6px，卡片、對話框、toast 8px，tooltip 4px。chip、徽章、開關、頭像用全圓（`full`）。同一個元件內不混用不同圓角；圖片圓角與其所在卡片一致（8px）。

## Components

- **按鈕**：高度 40px、左右內距 16px。主要按鈕實心墨黑；次要按鈕白底＋1px `outline-strong` 邊框；文字按鈕無底色，hover 才出現 `surface-muted` 底。危險按鈕實心 `error`。停用時一律 `disabled` 底＋`on-disabled` 字、拿掉邊框，游標 not-allowed（文字仍維持 4.5:1，可辨識但明顯失去份量）。每個畫面只放一個主要按鈕。
- **輸入框**：白底、1px `outline-strong` 邊框、高 40px。focus 時邊框改 `tertiary` 並加 3px `tertiary` 20% 透明外光圈。錯誤時邊框改 `error`，下方 13px `error` 文字訊息。標籤在輸入框上方，間距 6px。
- **核取方塊／單選**：16px，未選 1px `outline-strong` 邊框；選中實心 `primary`、白色勾。
- **開關**：36×20px，開啟 `tertiary`、關閉 `outline-strong`，白色圓鈕。
- **chip**：高 32px，未選白底＋`outline` 邊框；選中實心墨黑。
- **徽章**：全圓、`label-sm`、淺底深字的狀態 container 組合。
- **卡片**：白底、1px `outline` 邊框、8px 圓角、內距 24px。
- **表格**：表頭 `neutral` 底、`label-md`；列高 52px，列與列之間 1px `outline` 分隔；hover 列 `neutral` 底；勾選列 `tertiary-container` 底。數字欄右對齊。
- **頁籤**：文字頁籤，選中項目下方 2px 墨黑底線，其他項目 `on-surface-variant`。
- **側邊欄導覽**：項目高 36px、圓角 6px；選中項目 `surface-muted` 底＋墨黑字＋600 字重。
- **對話框／抽屜**：白底、層級 2 陰影；對話框寬 480px，抽屜寬 420px；標題列與內容以 1px `outline` 分隔。
- **toast**：墨黑底白字、8px 圓角，左側狀態 icon 用對應狀態色的淺色版本。
- **骨架屏**：`surface-muted` 色塊，1.2 秒循環的透明度呼吸（0.6 ↔ 1），`prefers-reduced-motion` 時靜止。
- **步驟條**：28px 圓形節點，目前步驟墨黑實心、已完成森林綠實心＋勾、未到達 `surface-muted`；節點之間 1px 線。
- **focus**：所有可互動元素 focus-visible 時 2px `tertiary` 外框、2px offset。
- **動態**：只做透明度與位移，時長 150ms（hover）／200ms（浮層進出），ease-out。不做彈跳。

## Do's and Don'ts

- Do 把森林綠留給互動與重點，一個畫面大面積只用一處
- Do 用 1px 線條與底色區分層次，讓陰影只屬於浮層
- Do 金額、數量使用等寬數字並右對齊
- Do 維持文字對比 ≥ 4.5:1，placeholder 也不例外
- Don't 為卡片加陰影或 hover 浮起效果
- Don't 使用漸層、毛玻璃、彩色大色塊背景
- Don't 使用 700 以上字重或超過三種字重
- Don't 使用實心彩色徽章，狀態一律淺底深字
- Don't 置中排版長段落，內文一律靠左
