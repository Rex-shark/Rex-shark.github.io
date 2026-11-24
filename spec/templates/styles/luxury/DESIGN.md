---
version: alpha
name: 奢華精品 Luxury
description: 深墨黑畫布與香檳金，襯線大標題、極細金線、寬鬆字距與緩慢的節奏，安靜而昂貴。
colors:
  primary: "#C9A96E"
  on-primary: "#0E0D0B"
  primary-hover: "#D8BC86"
  secondary: "#8C7A5B"
  tertiary: "#E5D3B0"
  neutral: "#0E0D0B"
  background: "{colors.neutral}"
  surface: "#161411"
  surface-raised: "#1E1B17"
  surface-sunken: "#121110"
  on-surface: "#F2EDE4"
  on-surface-variant: "#B9B0A2"
  on-surface-subtle: "#9C9384"
  outline: "#2B2721"
  outline-strong: "#4A4338"
  disabled: "#1E1B17"
  on-disabled: "#9C9384"
  scrim: "#000000A6"
  accent-container: "#2A2418"
  on-accent-container: "#E5D3B0"
  inverse-surface: "#F2EDE4"
  on-inverse-surface: "#0E0D0B"
  success: "#8FC29A"
  success-container: "#16241A"
  on-success-container: "#A8D3B0"
  warning: "#E0B46C"
  warning-container: "#2A2012"
  on-warning-container: "#E8C48A"
  error: "#E08A7C"
  on-error: "#1A0B08"
  error-container: "#2C1512"
  on-error-container: "#EBA79C"
  info: "#9BB4D4"
  info-container: "#141C26"
  on-info-container: "#B5C8E0"
  chart-1: "#C9A96E"
  chart-2: "#E5D3B0"
  chart-3: "#8C7A5B"
  chart-4: "#7D8C9C"
typography:
  display:
    fontFamily: Cormorant Garamond, Noto Serif TC
    fontSize: 60px
    fontWeight: 500
    lineHeight: 1.12
    letterSpacing: 0.01em
  headline-lg:
    fontFamily: Cormorant Garamond, Noto Serif TC
    fontSize: 40px
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: 0.01em
  headline-md:
    fontFamily: Cormorant Garamond, Noto Serif TC
    fontSize: 30px
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: 0.01em
  headline-sm:
    fontFamily: Cormorant Garamond, Noto Serif TC
    fontSize: 22px
    fontWeight: 500
    lineHeight: 1.4
  title-md:
    fontFamily: Cormorant Garamond, Noto Serif TC
    fontSize: 16px
    fontWeight: 500
    lineHeight: 1.5
  body-lg:
    fontFamily: Noto Sans TC
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.75
  body-md:
    fontFamily: Noto Sans TC
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.7
  body-sm:
    fontFamily: Noto Sans TC
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.6
  label-lg:
    fontFamily: Noto Sans TC
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: 0.12em
  label-md:
    fontFamily: Noto Sans TC
    fontSize: 13px
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: 0.12em
  label-sm:
    fontFamily: Noto Sans TC
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: 0.12em
  number-xl:
    fontFamily: Cormorant Garamond
    fontSize: 32px
    fontWeight: 500
    lineHeight: 1.1
    fontFeature: "'tnum' 1"
  number-md:
    fontFamily: Cormorant Garamond
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.4
    fontFeature: "'tnum' 1"
rounded:
  none: 0px
  sm: 0px
  md: 0px
  lg: 2px
  xl: 2px
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
  control-height: 46px
  row-height: 60px
components:
  page:
    backgroundColor: "{colors.background}"
    textColor: "{colors.on-surface}"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: 24px
  card-muted-text:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface-variant}"
  surface-raised-panel:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.on-surface}"
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.md}"
    padding: 16px
    height: 46px
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
    height: 46px
  button-secondary-hover:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.on-surface}"
  button-ghost-hover:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.on-surface}"
  button-danger:
    backgroundColor: "{colors.error}"
    textColor: "{colors.on-error}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.md}"
  link:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
  input:
    backgroundColor: "{colors.surface-sunken}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    height: 46px
  input-placeholder:
    backgroundColor: "{colors.surface-sunken}"
    textColor: "{colors.on-surface-subtle}"
  input-error-message:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.error}"
    typography: "{typography.body-sm}"
  sidebar:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.on-surface-variant}"
    width: 240px
  nav-item-active:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.primary}"
    typography: "{typography.label-lg}"
  chip:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
  chip-selected:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
  badge-neutral:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.full}"
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
    backgroundColor: "{colors.accent-container}"
    textColor: "{colors.on-accent-container}"
  table-header:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.label-md}"
  table-row:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    height: 60px
  table-row-hover:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.on-surface}"
  table-row-selected:
    backgroundColor: "{colors.accent-container}"
    textColor: "{colors.on-accent-container}"
  switch-on:
    backgroundColor: "{colors.primary}"
    rounded: "{rounded.full}"
  switch-off:
    backgroundColor: "{colors.outline-strong}"
  switch-thumb:
    backgroundColor: "{colors.on-surface}"
  tooltip:
    backgroundColor: "{colors.inverse-surface}"
    textColor: "{colors.on-inverse-surface}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.sm}"
  toast:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.lg}"
  dialog:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.xl}"
    padding: 24px
  skeleton:
    backgroundColor: "{colors.surface-raised}"
  step-active:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.full}"
  step-done:
    backgroundColor: "{colors.accent-container}"
    textColor: "{colors.on-accent-container}"
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
  divider:
    backgroundColor: "{colors.outline}"
  divider-strong:
    backgroundColor: "{colors.outline-strong}"
  chart-series-1:
    backgroundColor: "{colors.chart-1}"
  chart-series-2:
    backgroundColor: "{colors.chart-2}"
  chart-series-3:
    backgroundColor: "{colors.chart-3}"
  chart-series-4:
    backgroundColor: "{colors.chart-4}"
  swatch-secondary:
    backgroundColor: "{colors.secondary}"
  swatch-tertiary:
    backgroundColor: "{colors.tertiary}"
---

# 奢華精品 Luxury

## Overview

**安靜、昂貴、有距離感。** 深墨黑畫布與香檳金，襯線大標題、極細的金色線條、拉開字距的標籤與從容的間距；沒有多餘的顏色與裝飾，讓少數元素顯得珍貴。

- **適合推薦給**：精品與珠寶、高端旅宿、建案與豪宅、醫美、高級餐飲。
- **情緒目標**：客戶看到時覺得「高級、有品味、捨得花錢」。
- **密度**：八種風格中最鬆（控制項 46px、表格列高 60px）。
- **個性所在**：Cormorant Garamond 襯線大標題、香檳金細線與按鈕、0.12em 的標籤字距、直角。

## Colors

- **Neutral 墨黑（#0E0D0B）**：畫布與側欄；面板 `surface`（#161411），浮層 `surface-raised`（#1E1B17）。
- **Primary 香檳金（#C9A96E）**：主要按鈕、連結、頁籤底線、選中導覽文字、開關、圖表主色；搭配墨黑字。
- **Tertiary 淡金（#E5D3B0）／Secondary 古銅（#8C7A5B）**：圖表與選中 container 的文字。
- **線條**：`outline`（#2B2721）面板細線、`outline-strong`（#4A4338）輸入框與分段控制；次要按鈕用金色細框。
- **文字**：象牙白 `on-surface`（#F2EDE4）、`on-surface-variant`（#B9B0A2）。
- **狀態色**：降低彩度的鼠尾草綠、琥珀、珊瑚、霧藍，深底淺字。

## Typography

標題與數字用 **Cormorant Garamond**（襯線）＋ **Noto Serif TC**（中文明體），內文用 **Noto Sans TC**。

- 標題 500 字重、大字級（主標 60px），靠字級而不是字重表現份量。
- 標籤與按鈕字距 0.12em，營造品牌標誌般的節奏。
- 金額用襯線數字，像價目卡；表格數字仍開啟 `tnum`。

## Layout

- 後台：側欄與頂部列貼齊外框，墨黑底＋1px 細線。
- 前台：最大寬度 1200px，區塊間距 128px；大量留白。
- 元件之間間距比其他風格多一階。
- 間距系統 4px 為基本單位。

## Elevation & Depth

**平面＋細線。** 面板 `surface`＋1px `outline`，無投影；浮層 `surface-raised`＋1px `outline-strong`＋`0 24px 64px rgba(0,0,0,0.6)`；遮罩 65% 黑。主要按鈕 hover 時外加 4px 香檳金 18% 光環。

## Shapes

**直角。** 按鈕、輸入框、卡片皆 0–2px，像名片與精品包裝的切邊；只有頭像、開關、徽章保留全圓。

## Components

- **按鈕**：主要＝香檳金實心墨黑字；次要＝透明底＋金色 1px 框；字距 0.12em。
- **輸入框**：`surface-sunken` 底＋`outline-strong` 細框，focus 時金色邊框。
- **頁籤**：底線式，選中項金色文字＋1px 金色底線。
- **分段控制**：細框軌道，選中項金色實心。
- **表格**：表頭與內容同底、細線分隔、列高 60px；勾選列深金 container。
- **toast**：`surface-raised`＋象牙白字；tooltip 反白。

## Do's and Don'ts

- Do 讓香檳金只出現在主要動作、連結與選中狀態
- Do 保留大量留白與直角
- Do 標題用襯線字、標籤拉開字距
- Don't 使用多種強調色、漸層或毛玻璃
- Don't 用圓角膠囊按鈕
- Don't 讓金色大面積鋪滿版面
