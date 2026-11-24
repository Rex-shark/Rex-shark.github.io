import { useEffect, useLayoutEffect, useMemo, useState, type CSSProperties, type ReactNode } from 'react'
import { ensureFonts, type TplStyle } from '../styles'
import { TplContext } from './context'
import Toaster from '../ui/Toaster'

interface DeviceFrameProps {
  style: TplStyle
  goToTemplate: (slug: string) => void
  /** 捲動區底部預留空間（避開展示工具列） */
  bottomInset: number
  /** 值改變時捲回頂端（切換版型、重設）。切換風格不會改變它 */
  scrollResetKey: string
  children: ReactNode
}

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches)
  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = () => setMatches(mql.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])
  return matches
}

/**
 * 範本外框：
 * - 掛 --tpl-* 變數（只在這裡，不碰 :root）、字體、容器查詢（@container）
 * - 內含自己的捲動容器（ScrollArea）與浮層掛載點（OverlayRoot）
 * - 切換風格只換變數，子元件不重新掛載（禁止 key={style}）
 */
export default function DeviceFrame({ style, goToTemplate, bottomInset, scrollResetKey, children }: DeviceFrameProps) {
  const [frameEl, setFrameEl] = useState<HTMLDivElement | null>(null)
  const [scrollEl, setScrollEl] = useState<HTMLDivElement | null>(null)
  const [overlayRoot, setOverlayRoot] = useState<HTMLDivElement | null>(null)
  const [frameWidth, setFrameWidth] = useState(1280)
  const [frameHeight, setFrameHeight] = useState(800)
  const reducedTransparency = useMediaQuery('(prefers-reduced-transparency: reduce)')

  useEffect(() => {
    ensureFonts(style)
  }, [style])

  // 所有範本共用同一個捲動容器：切換版型或重設時歸零。
  // 用 layout effect，比範本自己的捲動還原（一般 effect，例如購物網站回列表的位置）先執行。
  useLayoutEffect(() => {
    scrollEl?.scrollTo({ top: 0 })
  }, [scrollResetKey, scrollEl])

  useEffect(() => {
    if (!frameEl) return
    const ro = new ResizeObserver(([entry]) => {
      setFrameWidth(entry.contentRect.width)
      setFrameHeight(entry.contentRect.height)
    })
    ro.observe(frameEl)
    return () => ro.disconnect()
  }, [frameEl])

  const compact = frameWidth < 768

  const frameStyle = useMemo(() => {
    const vars = {
      ...style.vars,
      ...(compact ? style.compactVars : undefined),
      ...(reducedTransparency ? style.reducedTransparencyVars : undefined),
    }
    return {
      // 卡片圓角預設跟隨 radius-lg／xl；風格可改成四角不同的簡寫（例如新藝術的「上圓下方」：'28px 28px 0 0'）
      '--tpl-card-radius': 'var(--tpl-radius-lg)',
      '--tpl-card-radius-xl': 'var(--tpl-radius-xl)',
      ...vars,
      fontFamily: 'var(--tpl-font-sans)',
      color: 'var(--tpl-on-surface)',
      backgroundColor: 'var(--tpl-background)',
      colorScheme: style.meta.scheme,
      '--tpl-bottom-inset': `${bottomInset}px`,
      // 範本可見高度（扣掉工具列）：給 sticky 側欄等需要「滿版高度」的元素用
      '--tpl-view-h': `${Math.max(0, frameHeight - bottomInset)}px`,
      ...style.frameStyle,
    } as CSSProperties
  }, [style, compact, reducedTransparency, bottomInset, frameHeight])

  const ctx = useMemo(
    () => ({ style, overlayRoot, scrollEl, compact, goToTemplate }),
    [style, overlayRoot, scrollEl, compact, goToTemplate],
  )

  const Decor = style.Decor

  return (
    <div
      ref={setFrameEl}
      data-tpl-style={style.slug}
      style={frameStyle}
      className="@container relative isolate h-full w-full overflow-hidden antialiased selection:bg-(--tpl-accent) selection:text-(--tpl-on-accent)"
    >
      {Decor && <Decor />}
      <div
        ref={setScrollEl}
        style={{ paddingBottom: bottomInset }}
        className="relative h-full overflow-x-hidden overflow-y-auto overscroll-contain [scrollbar-color:var(--tpl-outline-strong)_transparent]"
      >
        <TplContext.Provider value={ctx}>
          {children}
          <Toaster />
        </TplContext.Provider>
      </div>
      {/* 浮層掛載點：本身不攔截滑鼠，浮層元件各自加 pointer-events-auto；底部避開展示工具列 */}
      <div
        ref={setOverlayRoot}
        data-tpl-overlay-root
        style={{ bottom: bottomInset }}
        className="pointer-events-none absolute inset-x-0 top-0 z-50"
      />
    </div>
  )
}
