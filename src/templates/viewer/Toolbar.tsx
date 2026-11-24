import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import { Link, useNavigate } from 'react-router'
import {
  ArrowLeft,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  EyeOff,
  Info,
  LayoutTemplate,
  Monitor,
  MoreHorizontal,
  RotateCcw,
  Smartphone,
  SlidersHorizontal,
  Tablet,
  X,
} from 'lucide-react'
import { cn } from '../lib/cn'
import type { StyleSlug, TplStyle } from '../styles'
import { TEMPLATE_GROUPS, type TemplateEntry } from '../registry'
import type { Device } from './context'

interface ToolbarProps {
  styles: TplStyle[]
  style: TplStyle
  onStyle: (slug: StyleSlug) => void
  templates: TemplateEntry[]
  template: TemplateEntry
  onTemplate: (slug: string) => void
  device: Device
  onDevice: (device: Device) => void
  onInfo: () => void
  infoOpen: boolean
  /** 沒有可重設資料的版型（元件總覽）不傳，按鈕停用 */
  onReset?: () => void
  resetFlash: boolean
  hidden: boolean
  onHidden: (hidden: boolean) => void
}

type Panel = 'template' | 'style' | 'more' | null
type SchemeFilter = 'all' | 'light' | 'dark'

const DEVICES: { value: Device; label: string; Icon: typeof Monitor }[] = [
  { value: 'desktop', label: '桌機', Icon: Monitor },
  { value: 'tablet', label: '平板', Icon: Tablet },
  { value: 'mobile', label: '手機', Icon: Smartphone },
]

const SCHEME_FILTERS: { value: SchemeFilter; label: string }[] = [
  { value: 'all', label: '全部' },
  { value: 'light', label: '亮色' },
  { value: 'dark', label: '暗色' },
]

const focus = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900'
const iconBtn = cn(
  'inline-flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-lg text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent',
  focus,
)
const pickerBtn = cn(
  'inline-flex h-9 min-w-0 cursor-pointer items-center gap-2 rounded-lg bg-zinc-100 px-2.5 font-medium text-zinc-900 transition-colors hover:bg-zinc-200 aria-expanded:bg-zinc-900 aria-expanded:text-white',
  focus,
)
const divider = 'mx-0.5 h-6 w-px shrink-0 bg-zinc-200'

/**
 * radiogroup／選項格的方向鍵切換：← ↑ 上一個、→ ↓ 下一個，循環；搭配 roving tabindex。
 * select=false 時只移動焦點，不立即選取（版型面板：選了會換頁，用 Enter／點擊確認）。
 */
function arrowKeys<T>(values: T[], current: T, onChange: (v: T) => void, select = true) {
  return (e: KeyboardEvent<HTMLElement>) => {
    const step = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0
    if (!step) return
    e.preventDefault()
    const items = [...e.currentTarget.querySelectorAll<HTMLElement>('[data-option]')]
    const from = items.indexOf(document.activeElement as HTMLElement)
    const i = from >= 0 ? from : values.indexOf(current)
    const next = (i + step + values.length) % values.length
    if (select) onChange(values[next])
    items[next]?.focus()
  }
}

function Swatches({ colors, size = 'sm' }: { colors: string[]; size?: 'sm' | 'lg' }) {
  return (
    <span className="flex shrink-0 -space-x-1" aria-hidden>
      {colors.slice(0, size === 'lg' ? 4 : 3).map((c) => (
        <span key={c} className={cn('rounded-full ring-1 ring-black/15', size === 'lg' ? 'size-4' : 'size-3')} style={{ backgroundColor: c }} />
      ))}
    </span>
  )
}

/** 工具列上方展開的面板：寬度跟工具列一樣，內容太多時自己捲動 */
function PanelShell({ title, onClose, children, aside }: { title: string; onClose: () => void; children: ReactNode; aside?: ReactNode }) {
  return (
    <div
      role="dialog"
      aria-label={title}
      className="absolute inset-x-0 bottom-full mb-2 flex max-h-[min(60dvh,520px)] flex-col overflow-hidden rounded-2xl bg-white text-zinc-800 shadow-[0_10px_40px_rgba(0,0,0,0.18)] ring-1 ring-black/10 animate-in fade-in slide-in-from-bottom-1 duration-150 motion-reduce:animate-none"
    >
      <div className="flex items-center gap-2 border-b border-zinc-100 px-4 py-2.5">
        <h2 className="flex-1 text-sm font-semibold text-zinc-900">{title}</h2>
        {aside}
        <button type="button" onClick={onClose} className={cn(iconBtn, 'size-8')} aria-label="關閉">
          <X size={16} />
        </button>
      </div>
      <div className="overflow-y-auto overscroll-contain p-2">{children}</div>
    </div>
  )
}

/** 展示工具列：固定中性樣式，不受範本風格影響。寬度固定，版型與風格再多也不會變寬（選項放在展開面板） */
export default function Toolbar(props: ToolbarProps) {
  const { styles, style, onStyle, templates, template, onTemplate, device, onDevice, onInfo, infoOpen, onReset, resetFlash, hidden, onHidden } = props
  const navigate = useNavigate()
  const [panel, setPanel] = useState<Panel>(null)
  const [scheme, setScheme] = useState<SchemeFilter>('all')
  const rootRef = useRef<HTMLDivElement>(null)
  const templateBtn = useRef<HTMLButtonElement>(null)
  const styleBtn = useRef<HTMLButtonElement>(null)
  const moreBtn = useRef<HTMLButtonElement>(null)

  // 面板開啟時：點工具列外面或按 Esc 關閉（Esc 後焦點回到觸發按鈕）
  useEffect(() => {
    if (!panel) return
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setPanel(null)
    }
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key !== 'Escape') return
      const trigger = panel === 'template' ? templateBtn : panel === 'style' ? styleBtn : moreBtn
      setPanel(null)
      trigger.current?.focus()
    }
    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [panel])

  // 面板打開後把焦點移到目前選中的項目
  useEffect(() => {
    if (panel !== 'template' && panel !== 'style') return
    const dialog = rootRef.current?.querySelector('[role="dialog"]')
    const target = dialog?.querySelector<HTMLElement>('[data-option][aria-checked="true"]') ?? dialog?.querySelector<HTMLElement>('[data-option][tabindex="0"]')
    target?.focus()
  }, [panel])

  if (hidden) {
    return (
      <button
        type="button"
        onClick={() => onHidden(false)}
        aria-label="顯示展示工具列"
        className={cn(
          'absolute right-4 bottom-4 z-[60] inline-flex size-11 cursor-pointer items-center justify-center rounded-full bg-zinc-900 text-white shadow-lg ring-1 ring-black/10 transition-transform hover:scale-105',
          focus,
        )}
      >
        <SlidersHorizontal size={18} />
      </button>
    )
  }

  const toggle = (p: Panel) => setPanel((cur) => (cur === p ? null : p))
  const styleIndex = styles.findIndex((s) => s.slug === style.slug)
  const stepStyle = (step: number) => onStyle(styles[(styleIndex + step + styles.length) % styles.length].slug)
  const visibleStyles = scheme === 'all' ? styles : styles.filter((s) => s.meta.scheme === scheme)
  const groups = TEMPLATE_GROUPS.map((g) => ({ name: g, items: templates.filter((t) => t.group === g) })).filter((g) => g.items.length)

  return (
    <div
      ref={rootRef}
      role="toolbar"
      aria-label="設計範本展示工具列"
      // 單列、寬度固定：手機滿版（左右留 12px），平板以上依內容寬度置中
      className="absolute bottom-3 left-1/2 z-[60] w-[calc(100%-1.5rem)] -translate-x-1/2 font-sans text-sm sm:w-auto"
    >
      {/* ── 版型面板 ── */}
      {panel === 'template' && (
        <PanelShell title={`版型（${templates.length}）`} onClose={() => setPanel(null)}>
          {groups.map((g) => (
            <section key={g.name} className="mb-1 last:mb-0">
              <h3 className="px-2 pt-2 pb-1 text-xs font-medium text-zinc-500">{g.name}</h3>
              <div
                role="radiogroup"
                aria-label={g.name}
                onKeyDown={arrowKeys(
                  g.items.map((t) => t.slug),
                  template.slug,
                  onTemplate,
                  false,
                )}
                className="grid gap-1 sm:grid-cols-2"
              >
                {g.items.map((t) => {
                  const active = t.slug === template.slug
                  return (
                    <button
                      key={t.slug}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      data-option
                      tabIndex={active || (!g.items.some((x) => x.slug === template.slug) && t === g.items[0]) ? 0 : -1}
                      onClick={() => {
                        setPanel(null)
                        if (!active) onTemplate(t.slug)
                      }}
                      className={cn(
                        'flex cursor-pointer items-start gap-3 rounded-xl px-3 py-2.5 text-left transition-colors',
                        active ? 'bg-zinc-900 text-white' : 'hover:bg-zinc-100',
                        focus,
                      )}
                    >
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-1.5 font-medium">
                          {t.name}
                          {t.status !== 'ready' && <span className="rounded bg-amber-100 px-1.5 text-[11px] text-amber-800">建置中</span>}
                        </span>
                        <span className={cn('mt-0.5 block truncate text-xs', active ? 'text-zinc-300' : 'text-zinc-500')}>{t.scenario}</span>
                      </span>
                      {active && <Check size={16} className="mt-0.5 shrink-0" aria-hidden />}
                    </button>
                  )
                })}
              </div>
            </section>
          ))}
        </PanelShell>
      )}

      {/* ── 風格面板：選了不關閉，方便連續比較 ── */}
      {panel === 'style' && (
        <PanelShell
          title={`風格（${styles.length}）`}
          onClose={() => setPanel(null)}
          aside={
            <div role="radiogroup" aria-label="依明暗篩選" className="flex rounded-lg bg-zinc-100 p-0.5 text-xs">
              {SCHEME_FILTERS.map((f) => (
                <button
                  key={f.value}
                  type="button"
                  role="radio"
                  aria-checked={scheme === f.value}
                  onClick={() => setScheme(f.value)}
                  className={cn(
                    'cursor-pointer rounded-md px-2.5 py-1 font-medium transition-colors',
                    scheme === f.value ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500 hover:text-zinc-900',
                    focus,
                  )}
                >
                  {f.label}
                </button>
              ))}
            </div>
          }
        >
          <div
            role="radiogroup"
            aria-label="切換風格"
            onKeyDown={arrowKeys(
              visibleStyles.map((s) => s.slug),
              style.slug,
              onStyle,
            )}
            className="grid grid-cols-2 gap-1 sm:grid-cols-3"
          >
            {visibleStyles.map((s) => {
              const active = s.slug === style.slug
              const tabbable = active || (!visibleStyles.some((x) => x.slug === style.slug) && s === visibleStyles[0])
              return (
                <button
                  key={s.slug}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  data-option
                  tabIndex={tabbable ? 0 : -1}
                  title={s.meta.tagline}
                  onClick={() => onStyle(s.slug)}
                  className={cn(
                    'flex cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2.5 text-left transition-colors',
                    active ? 'bg-zinc-900 text-white' : 'hover:bg-zinc-100',
                    focus,
                  )}
                >
                  <Swatches colors={s.meta.swatches} size="lg" />
                  <span className="min-w-0">
                    <span className="block truncate font-medium">{s.meta.name}</span>
                    <span className={cn('block truncate text-xs', active ? 'text-zinc-300' : 'text-zinc-500')}>{s.meta.nameEn}</span>
                  </span>
                </button>
              )
            })}
          </div>
        </PanelShell>
      )}

      {/* ── 手機「更多」選單 ── */}
      {panel === 'more' && (
        <div role="menu" aria-label="更多操作" className="absolute right-0 bottom-full mb-2 w-48 rounded-2xl bg-white p-1.5 text-zinc-800 shadow-[0_10px_40px_rgba(0,0,0,0.18)] ring-1 ring-black/10">
          {[
            { label: '返回總覽', Icon: ArrowLeft, onClick: () => navigate('/templates'), disabled: false },
            { label: '風格說明', Icon: Info, onClick: onInfo, disabled: false },
            { label: '重設範本資料', Icon: RotateCcw, onClick: onReset, disabled: !onReset },
            { label: '隱藏工具列', Icon: EyeOff, onClick: () => onHidden(true), disabled: false },
          ].map(({ label, Icon, onClick, disabled }) => (
            <button
              key={label}
              type="button"
              role="menuitem"
              disabled={disabled}
              onClick={() => {
                setPanel(null)
                onClick?.()
              }}
              className={cn('flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-left hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-40', focus)}
            >
              <Icon size={16} className="text-zinc-500" aria-hidden />
              {label}
            </button>
          ))}
        </div>
      )}

      {/* ── 工具列本體 ── */}
      <div className="flex items-center gap-1 rounded-2xl bg-white/95 p-1.5 text-zinc-800 shadow-[0_10px_40px_rgba(0,0,0,0.18)] ring-1 ring-black/10 backdrop-blur">
        <Link to="/templates" className={cn(iconBtn, 'hidden sm:inline-flex')} aria-label="返回設計範本總覽" title="返回總覽">
          <ArrowLeft size={18} />
        </Link>

        {/* 版型 */}
        <button
          ref={templateBtn}
          type="button"
          aria-haspopup="dialog"
          aria-expanded={panel === 'template'}
          aria-label={`版型：${template.name}，點擊選擇其他版型`}
          onClick={() => toggle('template')}
          className={cn(pickerBtn, 'max-w-[40%] shrink-0 sm:max-w-none')}
        >
          <LayoutTemplate size={16} className="hidden shrink-0 opacity-70 sm:block" aria-hidden />
          <span className="truncate">{template.name}</span>
          <ChevronsUpDown size={14} className="hidden shrink-0 opacity-60 sm:block" aria-hidden />
        </button>

        <div className={cn(divider, 'hidden sm:block')} aria-hidden />

        {/* 風格：‹ 目前風格 › */}
        <div className="flex min-w-0 flex-1 items-center gap-0.5 sm:flex-none">
          <button type="button" onClick={() => stepStyle(-1)} className={cn(iconBtn, 'w-7 sm:w-9')} aria-label="上一個風格" title="上一個風格（←）">
            <ChevronLeft size={18} />
          </button>
          <button
            ref={styleBtn}
            type="button"
            aria-haspopup="dialog"
            aria-expanded={panel === 'style'}
            aria-label={`風格：${style.meta.name}（第 ${styleIndex + 1} / ${styles.length} 種），點擊瀏覽全部風格`}
            onClick={() => toggle('style')}
            className={cn(pickerBtn, 'flex-1 sm:w-44 sm:flex-none')}
          >
            <Swatches colors={style.meta.swatches} />
            <span className="flex-1 truncate text-left">{style.meta.name}</span>
            <span className="hidden shrink-0 text-xs tabular-nums opacity-60 sm:inline">
              {styleIndex + 1}/{styles.length}
            </span>
          </button>
          <button type="button" onClick={() => stepStyle(1)} className={cn(iconBtn, 'w-7 sm:w-9')} aria-label="下一個風格" title="下一個風格（→）">
            <ChevronRight size={18} />
          </button>
        </div>

        {/* 裝置寬度（平板以上才有意義） */}
        <div className={cn(divider, 'hidden md:block')} aria-hidden />
        <div
          role="radiogroup"
          aria-label="預覽裝置寬度"
          onKeyDown={arrowKeys(
            DEVICES.map((d) => d.value),
            device,
            onDevice,
          )}
          className="hidden shrink-0 items-center gap-0.5 md:flex"
        >
          {DEVICES.map(({ value, label, Icon }) => (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={device === value}
              data-option
              tabIndex={device === value ? 0 : -1}
              aria-label={label}
              title={label}
              onClick={() => onDevice(value)}
              className={cn(iconBtn, device === value && 'bg-zinc-900 text-white hover:bg-zinc-900 hover:text-white')}
            >
              <Icon size={17} />
            </button>
          ))}
        </div>

        {/* 其他操作：平板以上直接顯示，手機收進「更多」 */}
        <div className={cn(divider, 'hidden sm:block')} aria-hidden />
        <div className="hidden items-center gap-0.5 sm:flex">
          <button type="button" onClick={onInfo} aria-pressed={infoOpen} className={cn(iconBtn, infoOpen && 'bg-zinc-100 text-zinc-900')} aria-label="風格說明" title="風格說明">
            <Info size={18} />
          </button>
          <button
            type="button"
            onClick={onReset}
            disabled={!onReset}
            className={cn(iconBtn, 'w-auto gap-1.5 px-2')}
            aria-label="重設範本資料"
            title={onReset ? '重設範本資料' : '此頁沒有可重設的資料'}
          >
            <RotateCcw size={17} />
            {resetFlash && <span className="text-xs font-medium whitespace-nowrap text-emerald-700">已重設</span>}
          </button>
          <button type="button" onClick={() => onHidden(true)} className={iconBtn} aria-label="隱藏工具列" title="隱藏工具列">
            <ChevronDown size={18} />
          </button>
        </div>
        <button
          ref={moreBtn}
          type="button"
          aria-haspopup="menu"
          aria-expanded={panel === 'more'}
          onClick={() => toggle('more')}
          className={cn(iconBtn, 'sm:hidden', panel === 'more' && 'bg-zinc-100 text-zinc-900')}
          aria-label="更多操作"
        >
          <MoreHorizontal size={18} />
        </button>
        {resetFlash && (
          <span className="sr-only" role="status">
            已重設
          </span>
        )}
      </div>
    </div>
  )
}
