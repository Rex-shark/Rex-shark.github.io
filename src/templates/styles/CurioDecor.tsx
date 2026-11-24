/**
 * 古典博物誌背景：四邊極淡的暗角＋細緻紙紋（兩層交錯的細線）。
 * 純裝飾（不含文字、不可互動），固定在外框內；暗角很淡，不影響文字對比。
 */
export default function CurioDecor() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(110,80,40,0.05) 0 1px, transparent 1px 3px), repeating-linear-gradient(90deg, rgba(110,80,40,0.035) 0 1px, transparent 1px 5px)',
        }}
      />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 85% 80% at 50% 45%, transparent 60%, rgba(110,80,40,0.10) 100%)' }} />
    </div>
  )
}
