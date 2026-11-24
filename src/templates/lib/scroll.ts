import { useEffect, useState } from 'react'
import { useTplScroll } from '../viewer/context'

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** 平滑捲到指定區塊（捲動容器是範本外框；區塊用 scroll-mt 預留導覽列高度） */
export function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth', block: 'start' })
}

/** 是否已往下捲動超過門檻（導覽列樣式變化用） */
export function useScrolled(threshold = 24) {
  const scrollEl = useTplScroll()
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    if (!scrollEl) return
    const onScroll = () => setScrolled(scrollEl.scrollTop > threshold)
    onScroll()
    scrollEl.addEventListener('scroll', onScroll, { passive: true })
    return () => scrollEl.removeEventListener('scroll', onScroll)
  }, [scrollEl, threshold])
  return scrolled
}

/** 捲動超過一個畫面高（回到頂端按鈕用） */
export function usePastFirstScreen() {
  const scrollEl = useTplScroll()
  const [past, setPast] = useState(false)
  useEffect(() => {
    if (!scrollEl) return
    const onScroll = () => setPast(scrollEl.scrollTop > scrollEl.clientHeight)
    onScroll()
    scrollEl.addEventListener('scroll', onScroll, { passive: true })
    return () => scrollEl.removeEventListener('scroll', onScroll)
  }, [scrollEl])
  return past
}

/** 捲動追蹤：回傳目前位在畫面中段的區塊 id（以範本捲動容器為 root）。ids 需為穩定參照（模組常數） */
export function useScrollSpy<T extends string>(ids: readonly T[]): T | null {
  const scrollEl = useTplScroll()
  const [active, setActive] = useState<T | null>(null)
  useEffect(() => {
    if (!scrollEl) return
    const visible = new Map<string, boolean>()
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => visible.set(e.target.id, e.isIntersecting))
        const first = ids.find((id) => visible.get(id))
        setActive(first ?? null)
      },
      { root: scrollEl, rootMargin: '-35% 0px -60% 0px' },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [scrollEl, ids])
  return active
}

/** 進入畫面時從 0 跑到目標值（1.2 秒，ease-out）；prefers-reduced-motion 時直接顯示 */
export function useCountUp(target: number, start: boolean, duration = 1200) {
  const [reduced] = useState(reducedMotion)
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!start || reduced) return
    let raf = 0
    const t0 = performance.now()
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      setValue(Math.round(target * eased))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, start, duration, reduced])
  return reduced ? target : value
}
