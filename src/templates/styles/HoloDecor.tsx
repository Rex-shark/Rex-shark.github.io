import { useEffect, useRef } from 'react'

/**
 * 全像虹彩背景：兩團大型錐形漸層（粉、青、紫、薄荷）＋模糊，極緩慢旋轉。
 * 不透明度低，文字都放在高不透明度面板上；prefers-reduced-motion 時靜止。
 * 純裝飾（不含文字、不可互動），固定在外框內；窄螢幕時整體降低（--tpl-decor-opacity）。
 */
const SPECTRUM = 'conic-gradient(from 0deg, #FF9AD5, #9FE7FF, #C7B5FF, #B8F5D0, #FFD6A5, #FF9AD5)'

export default function HoloDecor() {
  const refs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const animations = refs.current.map((el, i) =>
      el?.animate([{ transform: 'rotate(0deg)' }, { transform: `rotate(${i ? -360 : 360}deg)` }], { duration: (60 + i * 20) * 1000, iterations: Infinity }),
    )
    return () => animations.forEach((a) => a?.cancel())
  }, [])

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden opacity-[var(--tpl-decor-opacity,1)]">
      {['-top-[20%] -left-[10%] size-[55cqw]', '-bottom-[25%] -right-[12%] size-[50cqw]'].map((pos, i) => (
        <div
          key={pos}
          ref={(el) => {
            refs.current[i] = el
          }}
          className={`absolute rounded-full opacity-35 blur-[90px] ${pos}`}
          style={{ background: SPECTRUM }}
        />
      ))}
    </div>
  )
}
