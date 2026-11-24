/**
 * Aqua 背景：2px 間隔的白色細條紋（pinstripes），低對比、不影響文字。
 * 純裝飾（不含文字、不可互動），固定在外框內。
 */
export default function AquaDecor() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{ backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.6) 0 2px, transparent 2px 4px)' }}
    />
  )
}
