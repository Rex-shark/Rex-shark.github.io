/**
 * 液態金屬背景：兩團液態銀光斑（帶亮點的徑向漸層）＋一道水平高光線，極低不透明度。
 * 純裝飾（不含文字、不可互動），固定在外框內；窄螢幕時整體降低（--tpl-decor-opacity）。
 */
export default function ChromeDecor() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden opacity-[var(--tpl-decor-opacity,1)]">
      <div
        className="absolute -top-[18%] -right-[10%] size-[46cqw] rounded-full opacity-[0.14] blur-[40px]"
        style={{ background: 'radial-gradient(circle at 35% 30%, #FFFFFF 0%, #C9D1DC 18%, #5B6470 45%, transparent 70%)' }}
      />
      <div
        className="absolute -bottom-[22%] -left-[12%] size-[40cqw] rounded-full opacity-[0.10] blur-[40px]"
        style={{ background: 'radial-gradient(circle at 60% 40%, #FFFFFF 0%, #AEB8C6 20%, #3E4651 50%, transparent 72%)' }}
      />
      <div className="absolute inset-x-0 top-[38%] h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
    </div>
  )
}
