---
version: alpha
name: 玻璃態 Ⅱ Glassmorphism II
description: 冰藍畫布上三團天藍、薄荷、長春花藍的同色系柔光，內容放在通透的白色毛玻璃面板上；卡片上方直角、下方圓角，像掛在牆上的玻璃標牌，清爽、乾淨、可信賴。
colors:
  primary: "#1D5E8C"
  on-primary: "#FFFFFF"
  primary-hover: "#164B70"
  secondary: "#0E6B66"
  on-secondary: "#FFFFFF"
  tertiary: "#DB9A2C"
  on-tertiary: "#3A2500"
  neutral: "#E9F2F7"
  background: "{colors.neutral}"
  surface: "#F3F8FB"
  surface-raised: "#FCFEFF"
  on-surface: "#10243A"
  on-surface-variant: "#33475C"
  on-surface-subtle: "#4B5D70"
  glass-fill: "#FFFFFF73"
  glass-fill-strong: "#FFFFFFE0"
  glass-border: "#FFFFFFCC"
  glass-highlight: "#FFFFFF"
  glow-1: "#A9D4F0"
  glow-2: "#B4E6D6"
  glow-3: "#C3C8F2"
  outline: "#CFE0EA"
  outline-strong: "#6F8DA3"
  disabled: "#DDE9F0"
  on-disabled: "#4E6276"
  scrim: "#10243A59"
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
  chart-1: "#2E86C1"
  chart-2: "#7C6FD6"
  chart-3: "#12A08F"
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

> 與「玻璃態」同一套材質與元件規則（白色毛玻璃＋同色系柔光＋多重亮邊），只換配色與卡片形狀。卡片「上方直角、下方圓角」為 Rex 指定（2026-11-24）。

# 玻璃態 Ⅱ Glassmorphism II

## Overview

**冰藍、清透、可信賴。** 冰藍色畫布上浮著三團同色系柔光（天藍、薄荷、長春花藍），內容放在通透的白色毛玻璃面板上。卡片**上方直角、下方圓角**，像從上緣懸掛的玻璃標牌，比一般圓角卡片多一點結構感。

- **適合推薦給**：醫療與健康、金融科技、旅遊與航空、清潔與家電、SaaS 產品。
- **情緒目標**：客戶看到時覺得「很乾淨、很專業、讓人放心」。
- **密度**：後台中等偏鬆（列高 56px、控制項 44px）；前台寬鬆、大字（主標 56px）。
- **個性所在**：上方下圓的玻璃卡片、通透毛玻璃透出冷色柔光、深海藍主按鈕。

## Colors

色彩策略是**冰藍畫布＋冷色同色系柔光＋白色玻璃＋深海藍／青綠強調色**。

- **Background 冰藍（#E9F2F7）**：整個畫布底色。
- **背景柔光（glow-1 天藍 #A9D4F0、glow-2 薄荷 #B4E6D6、glow-3 長春花藍 #C3C8F2）**：三個大型模糊圓（`blur(100px)`、不透明度 35–45%）。只用冷色同色系，不加暖色。
- **玻璃材質**：`glass-fill`（白 45%）一般面板、`glass-fill-strong`（白 88%）浮層與 hover；邊框白 80%；頂邊純白高光。
- **Surface 不透明對照色（#F3F8FB / #FCFEFF）**：減少透明度、不支援模糊時的退路與對比基準。
- **對比以柔光最濃處計算**：柔光中心等效底色約 #CFE6F4，所有文字在此 ≥ 4.5:1（實測提示文字 5.25、主色 5.37、連結 4.91）。
- **文字**：深海軍（#10243A）、次要（#33475C）、提示（#4B5D70）。
- **Primary 深海藍（#1D5E8C）**：主要按鈕、選中 chip、目前步驟，配白字。
- **Secondary 青綠（#0E6B66）**：連結、開關、已完成步驟、focus 外框。
- **Tertiary 琥珀（#DB9A2C）**：評分星等與「新品／最受歡迎」徽章（配深棕字）。
- **圖表**：天藍、長春花紫、青綠、琥珀。

## Typography

與玻璃態相同：**Manrope** ＋ **Noto Sans TC**；標題 700、字距收緊，主標 56px；內文 16px、行高 1.7；數字 `tnum`。

## Layout

與玻璃態相同：前台最大寬度 1200px；後台 248px 漂浮玻璃側欄（四周 12px）；面板之間 20–24px。手機上柔光降到 70%。

## Elevation & Depth

與玻璃態相同的四層：畫布＋柔光 → 玻璃面板（白 45%＋`blur(24px) saturate(180%)`＋多重亮邊＋深海藍 10% 陰影）→ 浮層（白 88%）→ 對話框（加 scrim）。減少透明度時改實色。

## Shapes

**上方直角、下方圓角**是這個風格與玻璃態最大的差別：

- 卡片：`border-radius: 0 0 20px 20px`（`--tpl-card-radius`）。
- 大圖與主視覺：`0 0 28px 28px`（`--tpl-card-radius-xl`）。
- 按鈕、chip、徽章維持全圓膠囊；輸入框 12px；對話框四角 28px（浮層不做這個形狀）；漂浮側欄與頂部列維持四角 20px。

## Components

與玻璃態相同，只換顏色：主要按鈕深海藍＋白字、hover 出現深海藍 20% 光環；連結、開關、focus 用青綠；頁籤為膠囊分段控制；表格放在一片玻璃面板內；輸入框實色底。

## Do's and Don'ts

- Do 卡片一律上方直角、下方圓角
- Do 柔光只用冷色同色系
- Do 以柔光最濃處檢查文字對比
- Don't 在柔光加入粉、橘等暖色
- Don't 讓浮層也套用上方直角（會像被切掉）
