---
version: alpha
name: 古典博物誌 Cabinet of Curiosities
description: 羊皮紙色畫布、深褐墨色文字與鏽紅點綴，襯線字與小型大寫標題，雙線框與花飾分隔，像翻開一本維多利亞時代的博物圖鑑。
colors:
  primary: "#7E3313"
  on-primary: "#FBF5E6"
  primary-hover: "#632609"
  secondary: "#55601A"
  tertiary: "#9A3F17"
  neutral: "#EDE3CB"
  background: "{colors.neutral}"
  surface: "#F6EEDA"
  surface-raised: "#FBF5E6"
  surface-sunken: "#E6DABD"
  on-surface: "#3A2716"
  on-surface-variant: "#5A442E"
  on-surface-subtle: "#69533B"
  outline: "#D6C6A2"
  outline-strong: "#B59E72"
  disabled: "#E4D8BD"
  on-disabled: "#66563F"
  scrim: "#3A271666"
  accent-container: "#F1D9C4"
  on-accent-container: "#6E2A0E"
  inverse-surface: "#3A2716"
  on-inverse-surface: "#F6EEDA"
  success: "#4A6620"
  success-container: "#E3EBCF"
  on-success-container: "#3B5218"
  warning: "#835409"
  warning-container: "#F4E2BF"
  on-warning-container: "#6B4508"
  error: "#9E2B1C"
  on-error: "#FBF5E6"
  error-container: "#F3D9CF"
  on-error-container: "#7D2114"
  info: "#2F5670"
  info-container: "#DCE5EA"
  on-info-container: "#24445A"
  chart-1: "#7E3313"
  chart-2: "#5F6A1E"
  chart-3: "#B07A2A"
  chart-4: "#3A5A6E"
typography:
  display:
    fontFamily: IM Fell English SC, Noto Serif TC
    fontSize: 50px
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: 0.02em
  headline-lg:
    fontFamily: IM Fell English SC, Noto Serif TC
    fontSize: 34px
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: 0.02em
  headline-md:
    fontFamily: IM Fell English SC, Noto Serif TC
    fontSize: 26px
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: 0.02em
  headline-sm:
    fontFamily: IM Fell English SC, Noto Serif TC
    fontSize: 20px
    fontWeight: 500
    lineHeight: 1.4
  title-md:
    fontFamily: IM Fell English SC, Noto Serif TC
    fontSize: 16px
    fontWeight: 500
    lineHeight: 1.5
  body-lg:
    fontFamily: Libre Caslon Text, Noto Serif TC
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.75
  body-md:
    fontFamily: Libre Caslon Text, Noto Serif TC
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.7
  body-sm:
    fontFamily: Libre Caslon Text, Noto Serif TC
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.6
  label-lg:
    fontFamily: Libre Caslon Text, Noto Serif TC
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: 0.06em
  label-md:
    fontFamily: Libre Caslon Text, Noto Serif TC
    fontSize: 13px
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: 0.06em
  label-sm:
    fontFamily: Libre Caslon Text, Noto Serif TC
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: 0.06em
  number-xl:
    fontFamily: Libre Caslon Text
    fontSize: 32px
    fontWeight: 700
    lineHeight: 1.1
    fontFeature: "'tnum' 1"
  number-md:
    fontFamily: Libre Caslon Text
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.4
    fontFeature: "'tnum' 1"
rounded:
  none: 0px
  sm: 2px
  md: 2px
  lg: 3px
  xl: 4px
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
  control-height: 42px
  row-height: 56px
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
    rounded: "{rounded.sm}"
    padding: 18px
    height: 42px
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
    rounded: "{rounded.sm}"
    padding: 18px
    height: 42px
  button-secondary-hover:
    backgroundColor: "{colors.surface-sunken}"
    textColor: "{colors.on-surface}"
  button-ghost-hover:
    backgroundColor: "{colors.surface-sunken}"
    textColor: "{colors.on-surface}"
  button-danger:
    backgroundColor: "{colors.error}"
    textColor: "{colors.on-error}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.sm}"
  link:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
  link-on-page:
    backgroundColor: "{colors.background}"
    textColor: "{colors.primary}"
  input:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.sm}"
    height: 42px
  input-placeholder:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.on-surface-subtle}"
  input-error-message:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.error}"
    typography: "{typography.body-sm}"
  sidebar:
    backgroundColor: "{colors.surface-sunken}"
    textColor: "{colors.on-surface-variant}"
    width: 240px
  nav-item-active:
    backgroundColor: "{colors.accent-container}"
    textColor: "{colors.on-accent-container}"
    typography: "{typography.label-lg}"
  chip:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.label-md}"
    rounded: "{rounded.sm}"
  chip-selected:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
  badge-neutral:
    backgroundColor: "{colors.surface-sunken}"
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.sm}"
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
    height: 56px
  table-row-hover:
    backgroundColor: "{colors.surface-sunken}"
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
    backgroundColor: "{colors.surface-raised}"
  tooltip:
    backgroundColor: "{colors.inverse-surface}"
    textColor: "{colors.on-inverse-surface}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.sm}"
  toast:
    backgroundColor: "{colors.inverse-surface}"
    textColor: "{colors.on-inverse-surface}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.lg}"
  dialog:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.xl}"
    padding: 24px
  skeleton:
    backgroundColor: "{colors.surface-sunken}"
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
  rating-star:
    backgroundColor: "{colors.tertiary}"
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
---

> 靈感來源：CSS Zen Garden #213「Under the Sea」（Eric Stoltz）。只借用風格語彙（舊紙品色調、襯線與小型大寫、裝飾框線），配色數值、圖形與版面皆為原創；原作為 CC BY-NC-SA 授權且註明不可複製，**不得使用原作的圖片、CSS 或可辨識的版面**。

# 古典博物誌 Cabinet of Curiosities

## Overview

**典雅、懷舊、有收藏感。** 像翻開一本維多利亞時代的博物圖鑑：羊皮紙色的頁面、深褐墨水的文字、鏽紅色的標題與按鈕，卡片有細細的雙線框，標題是小型大寫的古典字體。

- **適合推薦給**：古書與古物、咖啡與烘焙、精釀與調酒、博物館與導覽、手作與老店品牌。
- **情緒目標**：客戶看到時覺得「有故事、有歲月、值得慢慢看」。
- **密度**：中等偏鬆（控制項 42px、表格列高 56px）。
- **個性所在**：卡片的雙線框、頁首下方的雙線、小型大寫標題、羊皮紙邊緣微微的暗角。

## Colors

色彩策略是**羊皮紙畫布＋深褐墨色＋鏽紅主色＋橄欖點綴**，全部偏暖、低彩度。

- **Background 羊皮紙（#EDE3CB）**：整個畫布，邊緣有極淡的暗角。
- **Surface 淺紙（#F6EEDA）**：卡片；`surface-sunken`（#E6DABD）用於側欄、hover。
- **On-surface 深褐墨（#3A2716）**：不用純黑。
- **Primary 鏽紅（#7E3313）**：主要按鈕、連結、開關、選中項、focus。
- **Secondary 橄欖（#55601A）**：次要強調、圖表。
- **圖表**：鏽紅、橄欖、黃銅（#B07A2A）、舊藍（#3A5A6E）。
- **狀態色**：都往暖、灰調整，避免現代螢光色。

## Typography

標題 **IM Fell English SC**（古典小型大寫），內文與數字 **Libre Caslon Text**，中文一律 **Noto Serif TC**（明體）。

- **標題**：英文為小型大寫，中文明體 500 字重，字距 0.02em；主標 50px。
- **內文**：襯線 16px、行高 1.7。
- **標籤**：字距 0.06em。
- **數字**：Libre Caslon Text，強制等高數字（lining）與等寬。

## Layout

- **前台**：最大寬度 1200px；區塊之間 96px，標題上下留白比一般風格多。
- **後台**：側欄 240px，`surface-sunken` 底＋右側 1px 深線。
- **間距系統**：4px 為單位。

## Elevation & Depth

**以框線取代陰影。** 卡片是「外 1px 深線＋3px 紙色間隔＋內 1px 淺線」的雙線框，只加一點點 1px 投影；頁首下方同樣是雙線。浮層用較深的暖色陰影 `0 14px 36px rgba(58,39,22,0.22)`。

## Shapes

幾乎直角：圓角 2–4px，像紙張與印刷框。開關與步驟節點保留圓形。

## Components

- **按鈕**：高 42px、2px 圓角。主要按鈕鏽紅底＋紙色字；次要按鈕淺紙底＋1px 深線框。
- **輸入框**：淺紙底、1px 深線框、內側一點點凹陷陰影，像壓印。
- **分段控制**：外框 1px 線，選中項鏽紅實心。
- **頁籤**：選中項下方 2px 鏽紅線。
- **側欄**：選中項淺鏽色底＋深鏽紅字。
- **背景裝飾**：畫布四邊極淡的暗角＋細緻紙紋，不可互動；不影響文字對比。
- **focus**：2px 鏽紅外框。

## Do's and Don'ts

- Do 中文一律用明體，英文標題用小型大寫
- Do 以雙線框、細線分隔組織版面
- Do 色彩維持暖、低彩度
- Don't 使用現代螢光色或高彩度漸層
- Don't 使用大圓角或膠囊按鈕
- Don't 放仿古插圖或拍賣圖片素材（版權風險），裝飾只用線條與紙紋
