import { useEffect, useState } from 'react'

/** 量測元素寬度（圖表依實際像素繪製，避免 SVG 縮放造成文字變形） */
export function useWidth<T extends HTMLElement>(fallback = 600) {
  const [el, setEl] = useState<T | null>(null)
  const [width, setWidth] = useState(fallback)
  useEffect(() => {
    if (!el) return
    const ro = new ResizeObserver(([entry]) => setWidth(Math.max(1, Math.round(entry.contentRect.width))))
    ro.observe(el)
    return () => ro.disconnect()
  }, [el])
  return [setEl, width] as const
}
