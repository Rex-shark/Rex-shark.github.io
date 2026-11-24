import { useState, type FormEvent, type MouseEvent } from 'react'
import { Heart, Mail, Menu as MenuIcon, Phone, Clock, Search, ShoppingBag, TreePine, X } from 'lucide-react'
import { cn } from '../lib/cn'
import { useStore } from '../lib/store'
import { fakeSubmit } from '../lib/fakeSubmit'
import { email as emailRule } from '../lib/validate'
import { BRAND } from '../data/brand'
import { CATEGORIES, type CategorySlug } from '../data/catalog'
import Button from '../ui/Button'
import { Drawer } from '../ui/Overlay'
import { focusRing, heading, inputBase, labelWeight, muted, numeric } from '../ui/classes'
import { cartTotals, dispatch, shopStore } from './state'

const NAV: { value: CategorySlug | 'all'; label: string }[] = [{ value: 'all', label: '全部' }, ...CATEGORIES.map((c) => ({ value: c.slug, label: c.name }))]

function Logo() {
  return (
    <button
      type="button"
      onClick={() => dispatch({ type: 'goList', resetFilters: true })}
      aria-label="青森選物，回商品列表"
      className={cn('flex shrink-0 cursor-pointer items-center gap-2 rounded-(--tpl-radius-md)', focusRing)}
    >
      <span className="inline-flex size-9 items-center justify-center rounded-(--tpl-radius-md) bg-(--tpl-primary) text-(--tpl-on-primary) shadow-(--tpl-primary-shadow)">
        <TreePine size={18} aria-hidden />
      </span>
      <span className={cn('text-lg', heading)}>青森</span>
    </button>
  )
}

function CountBadge({ count }: { count: number }) {
  if (count === 0) return null
  return (
    <span
      aria-hidden
      className={cn(
        'absolute -top-0.5 -right-0.5 inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-(--tpl-primary) px-1 text-[11px] text-(--tpl-on-primary)',
        numeric,
        labelWeight,
      )}
    >
      {count}
    </span>
  )
}

export function Announcement() {
  const closed = useStore(shopStore, (s) => s.announcementClosed)
  if (closed) return null
  return (
    <div className="relative flex items-center justify-center bg-(--tpl-primary) px-10 py-2 text-center text-[13px] text-(--tpl-on-primary)">
      <p>
        全館滿 <span className={numeric}>NT$1,500</span> 免運 ・ 結帳輸入 <span className={labelWeight}>QINGSEN10</span> 享 9 折
      </p>
      <button
        type="button"
        onClick={() => dispatch({ type: 'closeAnnouncement' })}
        aria-label="關閉公告"
        className={cn('absolute top-1/2 right-2 inline-flex size-7 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full hover:bg-(--tpl-on-primary)/15', focusRing)}
      >
        <X size={15} />
      </button>
    </div>
  )
}

export function Header() {
  const { filters, page, favorites, cart } = useStore(shopStore)
  const [navOpen, setNavOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState(filters.keyword)
  // 關鍵字在別處被清除（移除條件 chip、清除全部篩選）時，同步清空搜尋框
  const [syncedKeyword, setSyncedKeyword] = useState(filters.keyword)
  if (filters.keyword !== syncedKeyword) {
    setSyncedKeyword(filters.keyword)
    setQuery(filters.keyword)
  }
  const count = cartTotals(cart, null).count

  function submit(e: FormEvent) {
    e.preventDefault()
    dispatch({ type: 'goList', filters: { keyword: query.trim() } })
    setSearchOpen(false)
  }

  const searchForm = (mobile: boolean) => (
    <form role="search" onSubmit={submit} className={cn('relative', mobile ? 'flex-1' : 'hidden w-56 @5xl:block')}>
      <Search size={16} aria-hidden className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-(--tpl-on-surface-subtle)" />
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="搜尋商品，Enter 搜尋"
        aria-label="搜尋商品"
        autoFocus={mobile}
        className={cn(inputBase, 'h-10 pl-9 text-[13px]')}
      />
    </form>
  )

  const navButton = (n: (typeof NAV)[number], onDone?: () => void, block?: boolean) => {
    const active = page === 'list' && filters.category === n.value && !filters.favOnly
    return (
      <button
        key={n.value}
        type="button"
        aria-current={active ? 'page' : undefined}
        onClick={() => {
          dispatch({ type: 'goList', filters: { category: n.value, favOnly: false } })
          onDone?.()
        }}
        className={cn(
          'cursor-pointer rounded-(--tpl-radius-control) px-3 text-sm whitespace-nowrap transition-colors',
          block ? 'flex h-11 w-full items-center' : 'h-9',
          active ? cn('bg-(--tpl-nav-active-bg) text-(--tpl-nav-active-fg) shadow-(--tpl-control-shadow-pressed)', labelWeight) : 'text-(--tpl-on-surface-variant) hover:text-(--tpl-on-surface)',
          focusRing,
        )}
      >
        {n.label}
      </button>
    )
  }

  return (
    <div className="sticky top-0 z-20 px-(--tpl-shell-inset) pt-(--tpl-shell-inset)">
      <header className="rounded-(--tpl-shell-radius) border-(length:--tpl-border-width) border-(--tpl-header-border) bg-(--tpl-header-bg) shadow-(--tpl-header-shadow) [backdrop-filter:var(--tpl-header-backdrop)]">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-2 px-3 @3xl:gap-4 @3xl:px-5">
        {searchOpen ? (
          <>
            {searchForm(true)}
            <Button variant="ghost" size="icon" aria-label="關閉搜尋" onClick={() => setSearchOpen(false)}>
              <X size={19} />
            </Button>
          </>
        ) : (
          <>
            <Button variant="ghost" size="icon" aria-label="開啟分類選單" className="@3xl:hidden" onClick={() => setNavOpen(true)}>
              <MenuIcon size={20} />
            </Button>
            <Logo />
            <nav aria-label="商品分類" className="ml-2 hidden items-center gap-1 @3xl:flex">
              {NAV.map((n) => navButton(n))}
            </nav>
            <div className="flex-1" />
            {searchForm(false)}
            <Button variant="ghost" size="icon" aria-label="搜尋商品" className="@5xl:hidden" onClick={() => setSearchOpen(true)}>
              <Search size={19} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              aria-label={`收藏（${favorites.length} 件），只看收藏商品`}
              onClick={() => dispatch({ type: 'goList', filters: { favOnly: true } })}
            >
              <Heart size={19} />
              <CountBadge count={favorites.length} />
            </Button>
            <Button variant="ghost" size="icon" className="relative" aria-label={`購物車（${count} 件）`} onClick={() => dispatch({ type: 'cart', open: true })}>
              <ShoppingBag size={19} />
              <CountBadge count={count} />
            </Button>
          </>
        )}
        </div>
      </header>

      <Drawer open={navOpen} onOpenChange={setNavOpen} side="left" title="商品分類">
        <nav aria-label="商品分類" className="flex flex-col gap-1">
          {NAV.map((n) => navButton(n, () => setNavOpen(false), true))}
          <div className="my-3 h-px bg-(--tpl-outline)" />
          <button
            type="button"
            onClick={() => {
              dispatch({ type: 'goList', filters: { favOnly: true } })
              setNavOpen(false)
            }}
            className={cn('flex h-11 w-full cursor-pointer items-center gap-2 rounded-(--tpl-radius-control) px-3 text-sm text-(--tpl-on-surface-variant) hover:text-(--tpl-on-surface)', focusRing)}
          >
            <Heart size={16} aria-hidden />
            我的收藏（<span className={numeric}>{favorites.length}</span>）
          </button>
        </nav>
      </Drawer>
    </div>
  )
}

const preventJump = (e: MouseEvent) => e.preventDefault()

function Newsletter() {
  const [value, setValue] = useState('')
  const [error, setError] = useState<string>()
  const [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle')

  async function submit(e: FormEvent) {
    e.preventDefault()
    const err = emailRule(value)
    setError(err)
    if (err) return
    setStatus('loading')
    await fakeSubmit()
    setStatus('done')
  }

  return (
    <div>
      <h3 className={cn('mb-2 text-sm', heading)}>訂閱電子報</h3>
      <p className={cn('mb-3 text-sm', muted)}>每月一封，新品與工匠故事。</p>
      {status === 'done' ? (
        <p role="status" className="rounded-(--tpl-radius-md) bg-(--tpl-success-container) px-4 py-3 text-sm text-(--tpl-on-success-container)">
          已訂閱，謝謝！
        </p>
      ) : (
        <form noValidate onSubmit={submit} className="flex flex-col gap-1.5">
          <div className="flex gap-2">
            <input
              type="email"
              value={value}
              onChange={(e) => {
                setValue(e.target.value)
                if (error) setError(undefined)
              }}
              placeholder="you@example.com"
              aria-label="電子報 Email"
              aria-invalid={Boolean(error) || undefined}
              aria-describedby={error ? 'tpl-newsletter-error' : undefined}
              className={cn(inputBase, 'min-w-0 flex-1')}
            />
            <Button type="submit" loading={status === 'loading'}>
              訂閱
            </Button>
          </div>
          {error && (
            <p id="tpl-newsletter-error" className="text-[13px] text-(--tpl-error)">
              {error}
            </p>
          )}
        </form>
      )}
    </div>
  )
}

const LINK_GROUPS = [
  { title: '購物說明', links: ['運送方式', '退換貨', '付款方式'] },
  { title: '關於青森', links: ['品牌故事', '門市據點', '手作課程'] },
]

export function Footer() {
  return (
    <footer className="mt-16 border-t border-(--tpl-outline) px-4 pt-12 pb-8 @3xl:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 @3xl:grid-cols-2 @5xl:grid-cols-[1.3fr_1fr_1fr_1.5fr]">
        <div>
          <p className={cn('text-lg', heading)}>{BRAND.name}</p>
          <p className={cn('mt-1 text-sm', muted)}>{BRAND.slogan}</p>
          <ul className={cn('mt-4 flex flex-col gap-1.5 text-sm', muted)}>
            <li className="flex items-center gap-2">
              <Phone size={14} aria-hidden />
              <span className={numeric}>{BRAND.phone}</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={14} aria-hidden />
              {BRAND.email}
            </li>
            <li className="flex items-center gap-2">
              <Clock size={14} aria-hidden />
              {BRAND.hours}
            </li>
          </ul>
        </div>
        {LINK_GROUPS.map((g) => (
          <nav key={g.title} aria-label={g.title}>
            <h3 className={cn('mb-3 text-sm', heading)}>{g.title}</h3>
            <ul className="flex flex-col gap-2 text-sm">
              {g.links.map((l) => (
                <li key={l}>
                  <a href="#" onClick={preventJump} className={cn('rounded-(--tpl-radius-sm) text-(--tpl-on-surface-variant) hover:text-(--tpl-on-surface) hover:underline hover:underline-offset-4', focusRing)}>
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
        <Newsletter />
      </div>
      <p className={cn('mx-auto mt-10 max-w-7xl border-t border-(--tpl-outline) pt-6 text-xs', muted)}>{BRAND.copyright}</p>
    </footer>
  )
}
