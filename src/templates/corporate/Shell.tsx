import { useState } from 'react'
import { createPortal } from 'react-dom'
import { ArrowUp, Menu as MenuIcon, ShoppingBag, TreePine } from 'lucide-react'
import { cn } from '../lib/cn'
import { BRAND } from '../data/brand'
import { STORES } from '../data/places'
import Button from '../ui/Button'
import { Drawer } from '../ui/Overlay'
import { focusRing, heading, labelWeight, muted } from '../ui/classes'
import { useTplNavigate, useTplOverlayRoot, useTplScroll } from '../viewer/context'
import { SECTIONS } from './data'

const SECTION_IDS = SECTIONS.map((s) => s.id)
import { scrollToSection, usePastFirstScreen, useScrolled, useScrollSpy } from '../lib/scroll'

function scrollTop(scrollEl: HTMLElement | null) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  scrollEl?.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })
}

function Logo() {
  const scrollEl = useTplScroll()
  return (
    <button type="button" onClick={() => scrollTop(scrollEl)} aria-label="青森選物，回到頂端" className={cn('flex shrink-0 cursor-pointer items-center gap-2 rounded-(--tpl-radius-md)', focusRing)}>
      <span className="inline-flex size-9 items-center justify-center rounded-(--tpl-radius-md) bg-(--tpl-primary) text-(--tpl-on-primary) shadow-(--tpl-primary-shadow)">
        <TreePine size={18} aria-hidden />
      </span>
      <span className={cn('text-lg', heading)}>青森</span>
    </button>
  )
}

/** 導覽列：頁面頂部時透明疊在主視覺上，往下捲後換成風格的頂部列材質；捲到哪個區塊就標示哪個連結 */
export function Nav() {
  const scrolled = useScrolled()
  const active = useScrollSpy(SECTION_IDS)
  const goToTemplate = useTplNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="sticky top-0 z-30 -mb-[calc(64px+var(--tpl-shell-inset))] px-(--tpl-shell-inset) pt-(--tpl-shell-inset)">
      <header
        className={cn(
          'rounded-(--tpl-shell-radius) border-(length:--tpl-border-width) transition-[background-color,box-shadow,border-color] duration-200 motion-reduce:transition-none',
          scrolled
            ? 'border-(--tpl-header-border) bg-(--tpl-header-bg) shadow-(--tpl-header-shadow) [backdrop-filter:var(--tpl-header-backdrop)]'
            : 'border-transparent bg-transparent shadow-none',
        )}
      >
        {/* 寬度與區塊一致（80rem＋左右內距），內容左緣和下方區塊對齊 */}
        <div className="mx-auto flex h-16 max-w-[calc(80rem+4rem)] items-center gap-3 px-3 @3xl:px-8">
          <Logo />
          <nav aria-label="頁面區塊" className="ml-4 hidden flex-1 items-center gap-1 @5xl:flex">
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                aria-current={active === s.id ? 'true' : undefined}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection(s.id)
                }}
                className={cn(
                  'rounded-(--tpl-radius-control) px-3 py-2 text-sm whitespace-nowrap transition-colors',
                  active === s.id
                    ? cn('bg-(--tpl-nav-active-bg) text-(--tpl-nav-active-fg) shadow-(--tpl-control-shadow-pressed)', labelWeight)
                    : 'text-(--tpl-on-surface-variant) hover:text-(--tpl-on-surface)',
                  focusRing,
                )}
              >
                {s.label}
              </a>
            ))}
          </nav>
          <div className="flex-1 @5xl:hidden" />
          <Button size="sm" onClick={() => goToTemplate('shop')} className="hidden @md:inline-flex">
            <ShoppingBag size={15} />
            線上商店
          </Button>
          <Button variant="ghost" size="icon" aria-label="開啟選單" className="@5xl:hidden" onClick={() => setMenuOpen(true)}>
            <MenuIcon size={20} />
          </Button>
        </div>
      </header>

      <Drawer open={menuOpen} onOpenChange={setMenuOpen} side="full" title="青森選物">
        <nav aria-label="頁面區塊" className="flex h-full flex-col gap-1">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              aria-current={active === s.id ? 'true' : undefined}
              onClick={(e) => {
                e.preventDefault()
                setMenuOpen(false)
                // 等選單關閉動畫開始後再捲動
                setTimeout(() => scrollToSection(s.id), 50)
              }}
              className={cn(
                'flex h-14 items-center border-b border-(--tpl-outline) px-1 text-xl',
                active === s.id ? 'text-(--tpl-accent)' : 'text-(--tpl-on-surface)',
                labelWeight,
                focusRing,
              )}
            >
              {s.label}
            </a>
          ))}
          <Button
            className="mt-6"
            onClick={() => {
              setMenuOpen(false)
              goToTemplate('shop')
            }}
          >
            <ShoppingBag size={16} />
            線上商店
          </Button>
        </nav>
      </Drawer>
    </div>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-(--tpl-outline) px-4 pt-12 pb-8 @3xl:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 @3xl:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className={cn('text-lg', heading)}>{BRAND.name}</p>
          <p className={cn('mt-1 text-sm', muted)}>{BRAND.slogan}</p>
        </div>
        <nav aria-label="頁尾導覽">
          <h3 className={cn('mb-3 text-sm', heading)}>網站導覽</h3>
          <ul className="grid grid-cols-2 gap-2 text-sm">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection(s.id)
                  }}
                  className={cn('rounded-(--tpl-radius-sm) text-(--tpl-on-surface-variant) hover:text-(--tpl-on-surface) hover:underline hover:underline-offset-4', focusRing)}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h3 className={cn('mb-3 text-sm', heading)}>門市</h3>
          <ul className={cn('grid grid-cols-2 gap-2 text-sm', muted)}>
            {STORES.map((s) => (
              <li key={s.id}>{s.name}</li>
            ))}
          </ul>
        </div>
      </div>
      <p className={cn('mx-auto mt-10 max-w-7xl border-t border-(--tpl-outline) pt-6 text-xs', muted)}>{BRAND.copyright}</p>
    </footer>
  )
}

/** 回到頂端：捲動超過一個畫面高後出現，掛在浮層區（已避開展示工具列） */
export function BackToTop() {
  const root = useTplOverlayRoot()
  const scrollEl = useTplScroll()
  const past = usePastFirstScreen()
  if (!root || !past) return null
  return createPortal(
    <button
      type="button"
      onClick={() => scrollTop(scrollEl)}
      aria-label="回到頂端"
      className={cn(
        'pointer-events-auto absolute right-4 bottom-4 z-20 inline-flex size-12 cursor-pointer items-center justify-center rounded-full border-(length:--tpl-border-width) border-(--tpl-overlay-border) bg-(--tpl-overlay-bg) text-(--tpl-on-surface) shadow-(--tpl-overlay-shadow) [backdrop-filter:var(--tpl-overlay-backdrop)] transition-transform hover:-translate-y-0.5 animate-in fade-in duration-200 motion-reduce:animate-none',
        focusRing,
      )}
    >
      <ArrowUp size={20} />
    </button>,
    root,
  )
}
