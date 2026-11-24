/**
 * 黃昏城市背景：底部一道夕陽橘地平線光暈＋一排深色城市剪影（比畫布更深，不降低文字對比）。
 * 純裝飾（不含文字、不可互動），固定在外框底部不隨內容捲動；窄螢幕時整體降低（--tpl-decor-opacity）。
 * 剪影為程式產生的原創矩形組合。
 */
const BUILDINGS = [
  [0, 10, 4], [4, 16, 3], [7, 8, 5], [12, 22, 2.5], [14.5, 13, 4], [18.5, 6, 6], [24.5, 18, 3], [27.5, 26, 2],
  [29.5, 12, 5], [34.5, 9, 4], [38.5, 20, 3.5], [42, 14, 4], [46, 7, 6], [52, 16, 3], [55, 24, 2.5], [57.5, 11, 5],
  [62.5, 8, 4], [66.5, 19, 3], [69.5, 13, 5], [74.5, 28, 2], [76.5, 10, 6], [82.5, 15, 3.5], [86, 9, 5], [91, 21, 3], [94, 12, 6],
] as const

export default function DuskDecor() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden opacity-[var(--tpl-decor-opacity,1)]">
      <div className="absolute inset-x-0 bottom-0 h-[38%]" style={{ background: 'linear-gradient(to top, rgba(242,149,75,0.16), rgba(242,149,75,0.05) 45%, transparent)' }} />
      <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-[14%] w-full" fill="#06202A" aria-hidden>
        {BUILDINGS.map(([x, h, w]) => (
          <rect key={x} x={x} y={30 - h} width={w} height={h} />
        ))}
      </svg>
    </div>
  )
}
