/**
 * 新藝術背景：右上與左下兩組原創的藤蔓曲線（鞭形曲線＋小葉片），鼠尾草與古金色、低不透明度。
 * 純裝飾（不含文字、不可互動），固定在外框角落；窄螢幕時整體降低（--tpl-decor-opacity）。
 */
function Vine({ className, flip }: { className: string; flip?: boolean }) {
  return (
    <svg viewBox="0 0 240 240" fill="none" className={className} style={flip ? { transform: 'scale(-1,-1)' } : undefined} aria-hidden>
      <path d="M236 4C200 40 196 92 150 112C108 130 86 96 104 74C120 54 150 72 138 96C124 124 70 132 40 176C24 200 20 222 22 236" stroke="#A9A07E" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M236 40C214 60 214 96 186 114C166 126 152 120 150 112" stroke="#A07C34" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M150 112c10-20 34-22 40-12-14 4-26 10-40 12Z" fill="#A9A07E" fillOpacity="0.5" />
      <path d="M70 156c-18-6-24-26-16-34 6 12 12 22 16 34Z" fill="#A9A07E" fillOpacity="0.5" />
      <path d="M196 70c-4-18 10-30 20-28-4 12-10 20-20 28Z" fill="#A07C34" fillOpacity="0.35" />
      <circle cx="104" cy="74" r="3" fill="#8E4F5F" fillOpacity="0.5" />
    </svg>
  )
}

export default function NouveauDecor() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden opacity-[var(--tpl-decor-opacity,1)]">
      <Vine className="absolute -top-[1cqw] -right-[1cqw] size-[26cqw] opacity-[0.35]" />
      <Vine className="absolute -bottom-[1cqw] -left-[1cqw] size-[22cqw] opacity-[0.28]" flip />
    </div>
  )
}
