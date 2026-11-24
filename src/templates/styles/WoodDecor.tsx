/**
 * 實木擬物背景：橡木地板。約 120px 一片的水平木板＋1px 拼接縫，加兩組細木紋與每片木板輕微的色差。
 * 全部以 CSS 漸層程式產生（非照片貼圖）；木紋改為平滑寬色帶、最深處約比底色深 6%，文字對比以此計算。
 * 純裝飾（不含文字、不可互動），固定在外框內；窄螢幕時整體降低（--tpl-decor-opacity）。
 */
export default function WoodDecor() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-[var(--tpl-decor-opacity,1)]"
      style={{
        backgroundImage: [
          // 木板拼接縫（1px 淡深線＋1px 亮線，像刨過的倒角）
          'repeating-linear-gradient(180deg, transparent 0 118px, rgba(90,52,20,0.12) 118px 119px, rgba(255,240,215,0.3) 119px 120px)',
          // 每片木板交錯的色差
          'repeating-linear-gradient(180deg, rgba(120,72,30,0.025) 0 120px, transparent 120px 240px, rgba(255,235,200,0.07) 240px 360px)',
          // 木紋：寬而平滑的色帶（不用 1px 細線，避免切過文字；2026-11-24 依 Rex 回饋改淡）
          'repeating-linear-gradient(179deg, transparent 0, rgba(110,66,26,0.035) 18px, transparent 40px, rgba(255,240,215,0.06) 58px, transparent 80px)',
        ].join(', '),
      }}
    />
  )
}
