---
version: alpha
name: 中世紀現代 Mid-Century Modern
description: 奶油色畫布上的海軍藍、焦橘與青藍色塊，膠囊按鈕與幾何圓環，帶出 1950–60 年代現代主義的樂觀與秩序。
colors:
  primary: "#13324B"
  on-primary: "#FBF6EE"
  primary-hover: "#0B2236"
  secondary: "#17707D"
  tertiary: "#C9481F"
  neutral: "#F4ECDF"
  background: "{colors.neutral}"
  surface: "#FBF6EE"
  surface-raised: "#FFFCF7"
  surface-sunken: "#EDE2D0"
  on-surface: "#13293D"
  on-surface-variant: "#3F5163"
  on-surface-subtle: "#566574"
  outline: "#E3D5BF"
  outline-strong: "#B9A584"
  disabled: "#EAE0CF"
  on-disabled: "#5A6470"
  scrim: "#13293D66"
  accent-container: "#FADCCB"
  on-accent-container: "#8A2E10"
  inverse-surface: "#13293D"
  on-inverse-surface: "#FBF6EE"
  success: "#2F6B45"
  success-container: "#DDEEDF"
  on-success-container: "#22512F"
  warning: "#8A5410"
  warning-container: "#F7E6C9"
  on-warning-container: "#6A400A"
  error: "#B23A26"
  on-error: "#FFFFFF"
  error-container: "#F8DED6"
  on-error-container: "#8A2A18"
  info: "#1F5E8C"
  info-container: "#DCE9F3"
  on-info-container: "#174A6E"
  chart-1: "#13324B"
  chart-2: "#D9532A"
  chart-3: "#1C9AAB"
  chart-4: "#B5649B"
typography:
  display:
    fontFamily: Fira Sans, Noto Sans TC
    fontSize: 52px
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Fira Sans, Noto Sans TC
    fontSize: 34px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Fira Sans, Noto Sans TC
    fontSize: 26px
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Fira Sans, Noto Sans TC
    fontSize: 20px
    fontWeight: 700
    lineHeight: 1.4
  title-md:
    fontFamily: Fira Sans, Noto Sans TC
    fontSize: 16px
    fontWeight: 700
    lineHeight: 1.5
  body-lg:
    fontFamily: Fira Sans, Noto Sans TC
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.75
  body-md:
    fontFamily: Fira Sans, Noto Sans TC
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.7
  body-sm:
    fontFamily: Fira Sans, Noto Sans TC
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.6
  label-lg:
    fontFamily: Fira Sans, Noto Sans TC
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: 0.02em
  label-md:
    fontFamily: Fira Sans, Noto Sans TC
    fontSize: 13px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Fira Sans, Noto Sans TC
    fontSize: 12px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: 0.02em
  number-xl:
    fontFamily: Fira Sans
    fontSize: 32px
    fontWeight: 700
    lineHeight: 1.1
    fontFeature: "'tnum' 1"
  number-md:
    fontFamily: Fira Sans
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1.4
    fontFeature: "'tnum' 1"
rounded:
  none: 0px
  sm: 4px
  md: 6px
  lg: 10px
  xl: 14px
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
    textColor: "{colors.secondary}"
  link-on-page:
    backgroundColor: "{colors.background}"
    textColor: "{colors.secondary}"
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
    backgroundColor: "{colors.secondary}"
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

> 靈感來源：CSS Zen Garden #221「Mid Century Modern」（Andrew Lohman）。只借用風格語彙（色塊拼接、幾何圓形意象、人文無襯線字），配色數值、圖形與版面皆為原創；原作為 CC BY-NC-SA 授權且註明不可複製，**不得使用原作的圖片、CSS 或可辨識的版面**。

# 中世紀現代 Mid-Century Modern

## Overview

**樂觀、秩序、幾何。** 1950–60 年代現代主義的語彙：奶油色紙張般的畫布，上面是海軍藍、焦橘、青藍的扁平色塊，按鈕是圓潤的膠囊，背景角落點綴幾何圓環。乾淨但不冷，有手作家具和老海報的溫度。

- **適合推薦給**：家具與居家選物、咖啡與餐飲、設計工作室、文創品牌、建築與室內設計。
- **情緒目標**：客戶看到時覺得「有品味、有個性，但很好親近」。
- **密度**：中等（控制項 44px、表格列高 54px）。
- **個性所在**：海軍藍實心的導覽選中項、焦橘的頁籤底線、膠囊按鈕、角落的幾何圓環。

## Colors

色彩策略是**奶油畫布＋海軍藍主色＋焦橘／青藍兩個點綴色**，像老海報的套色印刷。

- **Background 奶油（#F4ECDF）**：整個畫布；卡片用更亮的 `surface`（#FBF6EE），不加邊框，靠色差分層。
- **Primary 海軍藍（#13324B）**：主要按鈕、選中 chip、側欄選中項、目前步驟，配奶油白字。
- **Secondary 青藍（#17707D）**：連結、開關、已完成步驟、focus 外框（青藍原色 #1C9AAB 只用在圖表與裝飾，當文字對比不足）。
- **Tertiary 焦橘（#C9481F）**：頁籤底線、評分星等、徽章；當大面積強調色時用較亮的 #D9532A（圖表、裝飾圓環）。
- **圖表**：海軍藍、焦橘、青藍、蘭花紫（#B5649B），四色明度與色相都拉開。
- **狀態色**：中低明度的綠／琥珀／紅／藍，可直接當文字用。

## Typography

**Fira Sans**（人文無襯線，筆畫有手感、數字清楚）＋ **Noto Sans TC**。

- **標題**：700 字重、字距 −0.01em，主標 52px。
- **內文**：16px、行高 1.7。
- **標籤**：600 字重、字距 0.02em。
- **數字**：Fira Sans 等寬數字，KPI 32px／700。

## Layout

- **前台**：最大寬度 1200px、12 欄、欄距 24px；區塊之間 96px。
- **後台**：側欄 240px，底色是比畫布深一階的 `surface-sunken`，沒有分隔線；內容區卡片之間 24px。
- **間距系統**：4px 為單位，常用 8 / 16 / 24 / 32 / 48 / 64 / 96。

## Elevation & Depth

**扁平色面，不靠陰影。** 卡片與畫布只差一階亮度，最多一條 1px 極淡的底部陰影；浮層（選單、對話框）才用柔和的海軍藍陰影 `0 16px 40px rgba(19,41,61,0.18)`。

## Shapes

按鈕、chip、徽章用全圓膠囊；輸入框 4px；卡片 10px；對話框 14px。背景裝飾只用正圓與同心圓環。

## Components

- **按鈕**：高 44px 膠囊。主要按鈕海軍藍實心；次要按鈕奶油底＋1px 海軍藍邊框；危險按鈕紅底白字。
- **側欄**：選中項海軍藍實心＋奶油白字，是整個介面最強的色塊。
- **頁籤**：選中項下方 3px 焦橘底線。
- **分段控制**：選中項海軍藍實心。
- **徽章**：膠囊、淺色底深色字；「新品／熱銷」用淺橘底。
- **背景裝飾**：右上與左下各一組同心圓環（焦橘、青藍），低不透明度、不可互動，不壓在文字正後方；手機上再降低。
- **focus**：2px 青藍外框。

## Do's and Don'ts

- Do 讓海軍藍當主角，焦橘與青藍只做點綴
- Do 用扁平色塊與色差分層，少用陰影
- Do 背景裝飾只用幾何正圓
- Don't 用漸層或擬物材質
- Don't 把青藍原色或焦橘亮色拿來當小字
- Don't 一個畫面同時出現超過三個色塊顏色
