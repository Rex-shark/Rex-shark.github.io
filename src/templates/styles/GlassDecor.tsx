import { useEffect, useRef } from 'react'

/**
 * 玻璃態背景：三團「同色系」柔光（--tpl-glow-1／2／3，由各玻璃風格決定顏色；玻璃態為玫瑰、蜜桃、淡紫粉，玻璃態 2 為天藍、薄荷、長春花藍），
 * 只比底色深一點，整體仍是單一色調，但讓毛玻璃面板有東西可以透、可以模糊。
 * 純裝飾（不含文字、不可互動），固定在外框內不隨內容捲動。
 * 不透明度上限依對比計算：光暈最濃處 on-surface-subtle、primary 文字仍 ≥ 4.5:1（見 DESIGN.md Colors）。
 * 用瀏覽器原生 Web Animations 極緩慢漂移（不拉進 Framer Motion），prefers-reduced-motion 時靜止；
 * 窄螢幕時整體降低（--tpl-decor-opacity，由 compactVars 設定）。
 */
const BLOBS = [
  { className: '-top-[18%] -left-[12%] size-[52cqw] bg-(--tpl-glow-1) opacity-40', to: 'translate(4cqw, 3cqw)', duration: 26 },
  { className: 'top-[30%] -right-[14%] size-[44cqw] bg-(--tpl-glow-2) opacity-45', to: 'translate(-4cqw, 3cqw)', duration: 32 },
  { className: '-bottom-[22%] left-[18%] size-[40cqw] bg-(--tpl-glow-3) opacity-35', to: 'translate(3cqw, -3cqw)', duration: 29 },
]

export default function GlassDecor() {
  const refs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const animations = refs.current.map((el, i) =>
      el?.animate([{ transform: 'translate(0, 0)' }, { transform: BLOBS[i].to }], {
        duration: BLOBS[i].duration * 1000,
        iterations: Infinity,
        direction: 'alternate',
        easing: 'ease-in-out',
      }),
    )
    return () => animations.forEach((a) => a?.cancel())
  }, [])

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden opacity-[var(--tpl-decor-opacity,1)]">
      {BLOBS.map((b, i) => (
        <div
          key={i}
          ref={(el) => {
            refs.current[i] = el
          }}
          className={`absolute rounded-full blur-[100px] ${b.className}`}
        />
      ))}
    </div>
  )
}
