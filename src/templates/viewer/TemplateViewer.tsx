import { Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { Navigate, useNavigate, useParams, useSearchParams } from 'react-router'
import { Hammer } from 'lucide-react'
import { STYLES, getStyle, type StyleSlug } from '../styles'
import { TEMPLATES, getTemplate, type TemplateEntry } from '../registry'
import { DEVICE_WIDTH, type Device } from './context'
import DeviceFrame from './DeviceFrame'
import Toolbar from './Toolbar'
import StyleInfoPanel from './StyleInfoPanel'
import { useLocalStorage } from './useLocalStorage'
import { clearToasts } from '../lib/toast'

/** 工具列高度＋間距（單列，手機與桌機相同） */
const TOOLBAR_SPACE = 76

function isDevice(v: string | null): v is Device {
  return v === 'desktop' || v === 'tablet' || v === 'mobile'
}

/** 版型尚未完成時，框內顯示的提示（使用範本變數，所以三種風格下樣子不同） */
function BuildingNotice({ entry }: { entry: TemplateEntry }) {
  return (
    <div className="flex min-h-full items-center justify-center p-8">
      <div className="max-w-md rounded-(--tpl-radius-lg) border border-(--tpl-panel-border) bg-(--tpl-panel-bg) p-8 text-center shadow-(--tpl-panel-shadow) [backdrop-filter:var(--tpl-panel-backdrop)]">
        <Hammer className="mx-auto mb-4 text-(--tpl-accent)" size={28} aria-hidden />
        <h1 className="font-(family-name:--tpl-font-heading) text-xl [font-weight:var(--tpl-heading-weight)]">{entry.name} 建置中</h1>
        <p className="mt-2 text-sm text-(--tpl-on-surface-variant)">{entry.description}</p>
      </div>
    </div>
  )
}

function FrameLoading() {
  return (
    <div className="flex min-h-full items-center justify-center p-8 text-sm text-(--tpl-on-surface-variant)" role="status">
      載入中…
    </div>
  )
}

export default function TemplateViewer() {
  const { template: slug } = useParams()
  const [params, setParams] = useSearchParams()
  const navigate = useNavigate()
  const entry = getTemplate(slug)
  const style = getStyle(params.get('style'))
  const deviceParam = params.get('device')
  const device: Device = isDevice(deviceParam) ? deviceParam : 'desktop'

  const [toolbarHidden, setToolbarHidden] = useLocalStorage('tpl-toolbar-hidden', false)
  const toolbarSpace = TOOLBAR_SPACE
  const [infoOpen, setInfoOpen] = useState(false)
  const [resetFlash, setResetFlash] = useState(false)
  const [resetCount, setResetCount] = useState(0)
  const flashTimer = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => () => clearTimeout(flashTimer.current), [])

  // 切換版型時清掉 toast：舊版型的「復原」等動作不能留到新版型
  useEffect(() => {
    clearToasts()
  }, [slug])

  const setParam = useCallback(
    (key: string, value: string | null) => {
      setParams(
        (prev) => {
          const next = new URLSearchParams(prev)
          if (value === null) next.delete(key)
          else next.set(key, value)
          return next
        },
        { replace: true },
      )
    },
    [setParams],
  )

  const setStyle = useCallback((s: StyleSlug) => setParam('style', s), [setParam])
  const setDevice = useCallback((d: Device) => setParam('device', d === 'desktop' ? null : d), [setParam])

  const goToTemplate = useCallback(
    (to: string) => {
      const q = new URLSearchParams({ style: style.slug })
      if (device !== 'desktop') q.set('device', device)
      navigate(`/templates/${to}?${q}`)
    },
    [navigate, style.slug, device],
  )

  // ← → 切換風格（焦點在範本內或輸入框時不攔截）
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return
      if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return
      const target = e.target as HTMLElement | null
      if (target?.closest('[data-tpl-style], input, textarea, select, [contenteditable="true"], [role="radiogroup"]')) return
      const i = STYLES.findIndex((s) => s.slug === style.slug)
      const next = STYLES[(i + (e.key === 'ArrowRight' ? 1 : -1) + STYLES.length) % STYLES.length]
      setStyle(next.slug)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [style.slug, setStyle])

  useEffect(() => {
    if (entry) document.title = `${entry.name}・${style.meta.name}｜設計範本｜Rex`
  }, [entry, style])

  const closeInfo = useCallback(() => setInfoOpen(false), [])

  if (!entry) return <Navigate to="/templates" replace />

  const listed = TEMPLATES.filter((t) => !t.hidden || t.slug === entry.slug)
  const width = DEVICE_WIDTH[device]
  const framed = width !== null
  const View = entry.View

  function reset() {
    if (!entry?.reset) return
    entry.reset()
    clearToasts()
    setResetCount((n) => n + 1)
    setResetFlash(true)
    clearTimeout(flashTimer.current)
    flashTimer.current = setTimeout(() => setResetFlash(false), 1500)
  }

  return (
    <div className="relative flex h-dvh flex-col overflow-hidden bg-zinc-100 font-sans">
      <main
        className="flex min-h-0 flex-1 justify-center"
        style={framed ? { padding: `24px 24px ${toolbarHidden ? 24 : toolbarSpace}px` } : undefined}
      >
        <div
          className={framed ? 'h-full max-w-full overflow-hidden rounded-[28px] shadow-2xl ring-8 ring-zinc-800' : 'h-full w-full'}
          style={framed ? { width } : undefined}
        >
          <DeviceFrame style={style} goToTemplate={goToTemplate} bottomInset={!framed && !toolbarHidden ? toolbarSpace : 0} scrollResetKey={`${entry.slug}:${resetCount}`}>
            <Suspense fallback={<FrameLoading />}>{View ? <View /> : <BuildingNotice entry={entry} />}</Suspense>
          </DeviceFrame>
        </div>
      </main>

      <Toolbar
        styles={STYLES}
        style={style}
        onStyle={setStyle}
        templates={listed}
        template={entry}
        onTemplate={goToTemplate}
        device={device}
        onDevice={setDevice}
        onInfo={() => setInfoOpen((v) => !v)}
        infoOpen={infoOpen}
        onReset={entry.reset ? reset : undefined}
        resetFlash={resetFlash}
        hidden={toolbarHidden}
        onHidden={setToolbarHidden}
      />

      {infoOpen && <StyleInfoPanel style={style} onClose={closeInfo} />}
    </div>
  )
}
