---
version: alpha
name: 實木擬物 Real-Wood Skeuomorphism
description: 實木打造的介面：橡木地板般的畫布、楓木面板加上深色木框、胡桃木的厚實按鈕、刻進木頭的凹槽與輸入框，溫暖、厚重、做工講究。
colors:
  primary: "#6B3518"
  on-primary: "#FBF0DA"
  primary-hover: "#57290F"
  secondary: "#5E440C"
  tertiary: "#9A6416"
  neutral: "#E2C59A"
  background: "{colors.neutral}"
  surface: "#F6E6C8"
  surface-raised: "#FBF0DA"
  surface-sunken: "#EBD3A8"
  on-surface: "#2A160A"
  on-surface-variant: "#4A2C17"
  on-surface-subtle: "#5A3A22"
  outline: "#CDA978"
  outline-strong: "#9C6E3C"
  disabled: "#E5D2B0"
  on-disabled: "#5A3A22"
  scrim: "#2A160A66"
  accent-container: "#E9C99A"
  on-accent-container: "#3A1F0B"
  inverse-surface: "#2A160A"
  on-inverse-surface: "#FBF0DA"
  success: "#1E5233"
  success-container: "#DCE8CF"
  on-success-container: "#1A4A2D"
  warning: "#5E3D05"
  warning-container: "#F2DDB0"
  on-warning-container: "#5E3D05"
  error: "#871B10"
  on-error: "#FBF0DA"
  error-container: "#F3D2C4"
  on-error-container: "#7A180E"
  info: "#174466"
  info-container: "#D6E2EA"
  on-info-container: "#153E5D"
  chart-1: "#6B3518"
  chart-2: "#B5813F"
  chart-3: "#5E440C"
  chart-4: "#3F5A2A"
typography:
  display:
    fontFamily: Bitter, Noto Serif TC
    fontSize: 50px
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Bitter, Noto Serif TC
    fontSize: 34px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Bitter, Noto Serif TC
    fontSize: 26px
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Bitter, Noto Serif TC
    fontSize: 20px
    fontWeight: 700
    lineHeight: 1.4
  title-md:
    fontFamily: Bitter, Noto Serif TC
    fontSize: 16px
    fontWeight: 700
    lineHeight: 1.5
  body-lg:
    fontFamily: Bitter, Noto Serif TC
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.75
  body-md:
    fontFamily: Bitter, Noto Serif TC
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.7
  body-sm:
    fontFamily: Bitter, Noto Serif TC
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.6
  label-lg:
    fontFamily: Bitter, Noto Serif TC
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: 0.01em
  label-md:
    fontFamily: Bitter, Noto Serif TC
    fontSize: 13px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Bitter, Noto Serif TC
    fontSize: 12px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: 0.01em
  number-xl:
    fontFamily: Bitter
    fontSize: 32px
    fontWeight: 700
    lineHeight: 1.1
    fontFeature: "'tnum' 1"
  number-md:
    fontFamily: Bitter
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1.4
    fontFeature: "'tnum' 1"
rounded:
  none: 0px
  sm: 8px
  md: 12px
  lg: 14px
  xl: 20px
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
  control-height: 44px
  row-height: 54px
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
    rounded: "{rounded.full}"
    padding: 18px
    height: 44px
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
    padding: 18px
    height: 44px
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
    rounded: "{rounded.full}"
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
    height: 44px
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
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
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
    backgroundColor: "{colors.surface-sunken}"
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
    height: 54px
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

> 靈感來源：daisyUI UI Design Trends #023「Real-Wood Skeuomorphism」（https://trends.daisyui.com/）的公開風格描述；木紋全部以 CSS 漸層程式產生，非照片貼圖。只借用風格語彙，配色數值與裝飾圖形皆為原創，**不使用其範例程式碼、截圖或情緒板圖片**。

# 實木擬物 Real-Wood Skeuomorphism

## Overview

**溫暖、厚實、手作。** 整個介面像一件木作家具：畫布是橡木地板（一片片木板、細細的拼接縫），卡片是嵌著木框的楓木面板，主按鈕是有厚度的胡桃木塊，輸入框和分段控制像刻進木頭裡的凹槽。

- **適合推薦給**：家具與木作、咖啡館與餐酒館、樂器與音響、露營與戶外、手作與工藝品牌。
- **情緒目標**：客戶看到時覺得「好溫暖、很有質感、做工很細」。
- **密度**：中等（控制項 44px、表格列高 54px）；材質需要空間，元件之間留 20–24px。
- **個性所在**：橡木地板的木板與拼接縫、楓木面板的木紋與 6px 內框、胡桃木按鈕下方的厚度、刻槽式輸入框與軌道。

## Colors

色彩全部來自木材的不同樹種與塗裝深淺，用「木色深淺」建立層級。

- **Background 橡木（#E2C59A）**＋木板與木紋（最深處比底色深約 6%，木板縫 12%、只有 1px）。
- **Surface 楓木（#F6E6C8）**＋寬而平滑的木紋色帶（最深 3.5%，沒有細線，避免切過文字）；**浮層（#FBF0DA）**；**凹槽（#EBD3A8）**。
- **Primary 胡桃木（#6B3518）**：主要按鈕、連結、開關、側欄選中，配奶油字。
- **Secondary 黃銅（#5E440C）**、**Tertiary 琥珀（#9A6416）**：圖表、評分星等。
- **Accent container 蜂蜜（#E9C99A）**：選中列、徽章、已完成步驟。
- **文字**：深棕（#2A160A／#4A2C17／#5A3A22）。
- **狀態色刻意加深**（綠 #1E5233、琥珀 #5E3D05、紅 #871B10、藍 #174466）：畫布是中淺色木頭，一般亮度的狀態色在深色木紋上會掉到 4.5:1 以下。
- **對比以最深木紋計算**：橡木最深處約 #D9BC93，所有文字在此 ≥ 4.5:1。
- **木紋不能干擾閱讀**（2026-11-24 Rex 回饋：後台文字被木紋干擾）：面板上不用細線紋理，只用寬色帶；背景木紋也降到很淡。

## Typography

**Bitter**（粗壯的板式襯線，像烙印在木頭上的字）＋ **Noto Serif TC**。標題 700、字距 −0.01em、主標 50px；標籤 600；內文 16px。不使用超細字。

## Layout

- 介面像組裝起來的木作：區塊是木板、卡片是嵌框面板。
- **後台**：側欄是較深的木色（#D9B686）＋右側刻線；選中項胡桃木膠囊。
- 元件之間 20–24px，讓木框與厚度陰影有空間。

## Elevation & Depth

**實體厚度**：

| 元件 | 實作 |
|---|---|
| 卡片 | 1px 深木邊＋內側 5px 淺木框＋1px 框線＋頂邊高光＋`0 2px 0` 厚度＋`0 8px 16px` 投影 |
| 主要按鈕 | 上緣高光＋下緣暗部＋`0 3px 0 #3A1A08`（木塊厚度）＋投影 |
| 次要按鈕 | 楓木凸起，下方 2px 木色厚度；按下時改內凹 |
| 輸入框／軌道 | 內凹陰影 `inset 0 2px 3–4px`，像刻出來的槽 |

## Shapes

圓潤的木塊：輸入框 8px、卡片 14px、對話框 20px；按鈕、chip、徽章是雕刻出的膠囊。

## Components

- **按鈕**：胡桃木厚塊＋奶油字；次要按鈕楓木凸起。
- **卡片**：楓木＋木紋＋內框。
- **分段控制／頁籤**：刻槽軌道裡放一塊凸起的楓木選中鍵。
- **背景裝飾**：橡木地板（約 120px 一片的木板、1px 淡拼接縫、平滑的寬木紋色帶），以 CSS 漸層產生；不可互動。
- **focus**：2px 胡桃木外框。

## Do's and Don'ts

- Do 光源統一在上方：頂邊高光、下方厚度
- Do 木紋保持極低對比，最深處也要讓文字 ≥ 4.5:1
- Do 用木色深淺分層級，金屬（黃銅）只少量點綴
- Don't 在放文字的面板上使用細線木紋（會切過每一行字）
- Don't 使用照片木紋貼圖（版權與載入成本），一律用 CSS 產生
- Don't 用超細字或亮色螢光色
