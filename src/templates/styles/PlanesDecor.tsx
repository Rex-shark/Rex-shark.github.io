/**
 * 透疊色面背景：右上一片青色、左下一片萊姆色的大型半透明直角色面，彼此錯位。
 * 純裝飾（不含文字、不可互動），固定在外框內不隨內容捲動；窄螢幕時整體降低（--tpl-decor-opacity）。
 */
export default function PlanesDecor() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden opacity-[var(--tpl-decor-opacity,1)]">
      <div className="absolute -top-[6%] -right-[4%] h-[42%] w-[34%] bg-[rgba(63,163,184,0.16)]" />
      <div className="absolute top-[8%] right-[10%] h-[30%] w-[20%] bg-[rgba(238,241,153,0.38)]" />
      <div className="absolute -bottom-[8%] -left-[6%] h-[38%] w-[30%] bg-[rgba(238,241,153,0.32)]" />
      <div className="absolute bottom-[6%] left-[8%] h-[22%] w-[18%] bg-[rgba(200,36,63,0.07)]" />
    </div>
  )
}
