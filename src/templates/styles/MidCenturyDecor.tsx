/**
 * 中世紀現代背景：右上與左下各一組同心圓環（焦橘、青藍）＋一個實心小圓點。
 * 純裝飾（不含文字、不可互動），固定在外框內不隨內容捲動；窄螢幕時整體降低（--tpl-decor-opacity）。
 * 圖形為原創幾何，不取自任何既有作品。
 */
function Rings({ className, color, count }: { className: string; color: string; count: number }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" aria-hidden>
      {Array.from({ length: count }, (_, i) => (
        <circle key={i} cx="100" cy="100" r={96 - i * 14} stroke={color} strokeWidth="3" />
      ))}
    </svg>
  )
}

export default function MidCenturyDecor() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden opacity-[var(--tpl-decor-opacity,1)]">
      <Rings className="absolute -top-[8cqw] -right-[8cqw] size-[30cqw] opacity-[0.16]" color="#D9532A" count={5} />
      <Rings className="absolute -bottom-[10cqw] -left-[10cqw] size-[34cqw] opacity-[0.14]" color="#1C9AAB" count={6} />
      <div className="absolute right-[18cqw] bottom-[14cqw] size-[3cqw] rounded-full bg-[#13324B] opacity-[0.08]" />
    </div>
  )
}
