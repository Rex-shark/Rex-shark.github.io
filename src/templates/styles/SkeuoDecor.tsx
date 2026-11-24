/**
 * 擬物背景：細緻的亞麻布紋（經緯兩組細線交錯），極低對比，不影響文字。
 * 純裝飾（不含文字、不可互動），固定在外框內。
 */
export default function SkeuoDecor() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage:
          'repeating-linear-gradient(0deg, rgba(255,255,255,0.22) 0 1px, transparent 1px 3px), repeating-linear-gradient(90deg, rgba(90,70,45,0.05) 0 1px, transparent 1px 3px), radial-gradient(ellipse 90% 80% at 50% 40%, transparent 65%, rgba(90,70,45,0.08))',
      }}
    />
  )
}
