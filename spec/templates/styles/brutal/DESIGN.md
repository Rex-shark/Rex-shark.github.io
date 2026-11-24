---
version: alpha
name: 新粗野 Neo-brutalism
description: 奶油色底、2px 黑色粗框與不模糊的實心偏移陰影，高飽和色塊配超粗黑體，直接、大膽、有點吵但很好記。
colors:
  primary: "#FFD23F"
  on-primary: "#111111"
  primary-hover: "#FFC21A"
  secondary: "#FF6B9D"
  tertiary: "#4D7CFE"
  neutral: "#FFF6E5"
  background: "{colors.neutral}"
  surface: "#FFFFFF"
  surface-raised: "#FFFFFF"
  on-surface: "#111111"
  on-surface-variant: "#3D3D3D"
  on-surface-subtle: "#595959"
  outline: "#111111"
  outline-strong: "#111111"
  link: "#2F5BDB"
  disabled: "#E8E2D6"
  on-disabled: "#595959"
  scrim: "#11111166"
  accent-container: "#FFD23F"
  on-accent-container: "#111111"
  inverse-surface: "#111111"
  on-inverse-surface: "#FFF6E5"
  success: "#127A3D"
  success-container: "#B8F2C9"
  on-success-container: "#0B4D26"
  warning: "#8A5A00"
  warning-container: "#FFE58A"
  on-warning-container: "#5C3D00"
  error: "#C41E3A"
  on-error: "#FFFFFF"
  error-container: "#FFC2C2"
  on-error-container: "#7A0A0A"
  info: "#1F4FD1"
  info-container: "#C7D9FF"
  on-info-container: "#0B2E7A"
  chart-1: "#4D7CFE"
  chart-2: "#E5487F"
  chart-3: "#1A9E92"
  chart-4: "#111111"
typography:
  display:
    fontFamily: Archivo Black, Noto Sans TC
    fontSize: 56px
    fontWeight: 900
    lineHeight: 1.12
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Archivo Black, Noto Sans TC
    fontSize: 36px
    fontWeight: 900
    lineHeight: 1.25
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Archivo Black, Noto Sans TC
    fontSize: 28px
    fontWeight: 900
    lineHeight: 1.3
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Archivo Black, Noto Sans TC
    fontSize: 21px
    fontWeight: 900
    lineHeight: 1.4
  title-md:
    fontFamily: Archivo Black, Noto Sans TC
    fontSize: 16px
    fontWeight: 900
    lineHeight: 1.5
  body-lg:
    fontFamily: Archivo, Noto Sans TC
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.75
  body-md:
    fontFamily: Archivo, Noto Sans TC
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.7
  body-sm:
    fontFamily: Archivo, Noto Sans TC
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.6
  label-lg:
    fontFamily: Archivo, Noto Sans TC
    fontSize: 14px
    fontWeight: 700
    lineHeight: 1.2
  label-md:
    fontFamily: Archivo, Noto Sans TC
    fontSize: 13px
    fontWeight: 700
    lineHeight: 1.2
  label-sm:
    fontFamily: Archivo, Noto Sans TC
    fontSize: 12px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: 0.02em
  number-xl:
    fontFamily: Archivo
    fontSize: 32px
    fontWeight: 700
    lineHeight: 1.1
    fontFeature: "'tnum' 1"
  number-md:
    fontFamily: Archivo
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.4
    fontFeature: "'tnum' 1"
rounded:
  none: 0px
  sm: 4px
  md: 8px
  lg: 12px
  xl: 16px
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
  row-height: 52px
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
    rounded: "{rounded.md}"
    padding: 16px
    height: 44px
  button-secondary-hover:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.on-surface}"
  button-ghost-hover:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.on-surface}"
  button-danger:
    backgroundColor: "{colors.error}"
    textColor: "{colors.on-error}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.md}"
  link:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.link}"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
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
    width: 240px
  nav-item-active:
    backgroundColor: "{colors.accent-container}"
    textColor: "{colors.on-surface}"
    typography: "{typography.label-lg}"
  chip:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
  chip-selected:
    backgroundColor: "{colors.inverse-surface}"
    textColor: "{colors.on-inverse-surface}"
  badge-neutral:
    backgroundColor: "{colors.neutral}"
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
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.on-surface}"
  table-header:
    backgroundColor: "{colors.accent-container}"
    textColor: "{colors.on-surface}"
    typography: "{typography.label-md}"
  table-row:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    height: 52px
  table-row-hover:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.on-surface}"
  table-row-selected:
    backgroundColor: "{colors.accent-container}"
    textColor: "{colors.on-accent-container}"
  switch-on:
    backgroundColor: "{colors.tertiary}"
    rounded: "{rounded.full}"
  switch-off:
    backgroundColor: "{colors.disabled}"
  switch-thumb:
    backgroundColor: "{colors.surface}"
  tooltip:
    backgroundColor: "{colors.inverse-surface}"
    textColor: "{colors.on-inverse-surface}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.sm}"
  toast:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.lg}"
  dialog:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.xl}"
    padding: 24px
  skeleton:
    backgroundColor: "{colors.disabled}"
  step-active:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.full}"
  step-done:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.on-surface}"
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
---

# 新粗野 Neo-brutalism

## Overview

**直接、大膽、好記。** 奶油色畫布上，每個元件都有 2px 黑色粗框與不模糊的實心偏移陰影，像剪貼報或貼紙；按鈕是高飽和的黃，標題是超粗黑體。刻意不精緻、不圓滑，讓品牌個性先被看見。

- **適合推薦給**：年輕品牌、創意工作室、餐飲與手搖、市集與活動、獨立創作者——想要「有態度、不一樣」的客戶。
- **情緒目標**：客戶看到時覺得「好有個性、一眼記住」。
- **密度**：適中，元件之間至少 16px，讓粗框與陰影不互相打架。
- **個性所在**：2px 黑框、實心偏移陰影、黃粉藍色塊、按下時陰影消失像真的被壓下去。

## Colors

- **Neutral 奶油（#FFF6E5）**：畫布；元件內部一律純白 `surface`。
- **Primary 黃（#FFD23F）**：主要按鈕、選中導覽、表頭、勾選列，搭配黑字。
- **Secondary 粉（#FF6B9D）**：「新品／最受歡迎」徽章等吸睛點綴，搭配黑字。
- **Tertiary 藍（#4D7CFE）**：開關開啟、已完成步驟、focus 外框。
- **Ink 黑（#111111）**：所有邊框、陰影、文字與選中 chip 的底色。
- **連結（#2F5BDB）**：比 tertiary 深一階，白底文字對比 ≥ 4.5:1。
- **狀態色**：飽和的淺底＋深字徽章；錯誤色 #C41E3A 同時用於危險按鈕（白字）。

## Typography

標題用 **Archivo Black**（拉丁）＋ **Noto Sans TC 900**（中文），內文用 **Archivo**＋ **Noto Sans TC**。

- 標題 900 字重、字距 −0.01em，字級大（主標 56px）。
- 按鈕與標籤 700 字重，讀起來有份量。
- 禁止偽粗體（外框設定 `font-synthesis-weight: none`），確保 900 是真實字重。

## Layout

- 側欄與頂部列漂浮在畫布上（距外框 12px），各自有粗框與偏移陰影。
- 前台最大寬度 1200px，區塊間距 96px。
- 元件之間至少 16px，陰影偏移 3–6px 需要空間。
- 間距系統 4px 為基本單位。

## Elevation & Depth

**以實心偏移陰影表達層次，陰影一律純黑、不模糊。**

| 層級 | 用途 | 陰影 |
|---|---|---|
| 1 | 輸入框 | `2px 2px 0 #111111` |
| 2 | 按鈕、chip | `3px 3px 0 #111111` |
| 3 | 卡片、側欄、頂部列 | `4px 4px 0 #111111` |
| 4 | 對話框、抽屜、toast | `6px 6px 0 #111111` |

- 按下：陰影歸零，看起來像被壓進紙面。
- 遮罩：40% 黑，不模糊。

## Shapes

**中等圓角＋粗框。** 控制項 8px、卡片 12px、浮層 16px；所有面板、輸入框、按鈕、chip 都有 2px 黑框。徽章、開關、頭像為全圓。

## Components

- **按鈕**：主要＝黃底黑字黑框＋3px 偏移陰影；次要＝白底黑框；危險＝紅底白字黑框。
- **輸入框**：白底、2px 黑框、2px 偏移陰影，focus 時外加藍色光環。
- **頁籤與分段控制**：白底黑框軌道，選中項黃底。
- **表格**：表頭黃底黑字，列高 52px，hover 列奶油色。
- **chip**：未選白底黑框，選中黑底奶油字。
- **徽章**：粉、綠、黃、紅、藍的淺色塊＋深字。

## Do's and Don'ts

- Do 每個元件都有 2px 黑框與實心偏移陰影
- Do 用「陰影消失」表達按下
- Do 讓黃色只當主要動作與選中狀態
- Don't 使用模糊陰影或漸層
- Don't 讓陰影顏色不是純黑
- Don't 把元件擠在一起，陰影需要空間
- Don't 對中文標題套用偽粗體
