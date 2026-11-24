import { useState, type FormEvent } from 'react'
import { BarChart3, Bell, CalendarDays, HelpCircle, LayoutDashboard, LogOut, Menu as MenuIcon, Package, Search, Settings, ShoppingBag, TreePine, User, Users, X } from 'lucide-react'
import { cn } from '../lib/cn'
import { useStore } from '../lib/store'
import { toast } from '../lib/toast'
import { avatarTone } from '../data/people'
import Button from '../ui/Button'
import { Avatar } from '../ui/Display'
import { Drawer, Menu, Popover, Tooltip } from '../ui/Overlay'
import { focusRing, heading, inputBase, labelWeight, muted, numeric } from '../ui/classes'
import { PERIOD_LABEL } from './data'
import { dashStore, dispatch, pendingCount, type DashPage } from './state'

const PAGE_TITLE: Record<DashPage, string> = {
  overview: '總覽',
  orders: '訂單',
  products: '商品',
  settings: '設定',
}

type NavKey = DashPage | 'customers' | 'reports'

const NAV: { key: NavKey; label: string; Icon: typeof LayoutDashboard; disabled?: boolean }[] = [
  { key: 'overview', label: '總覽', Icon: LayoutDashboard },
  { key: 'orders', label: '訂單', Icon: ShoppingBag },
  { key: 'products', label: '商品', Icon: Package },
  { key: 'customers', label: '顧客', Icon: Users, disabled: true },
  { key: 'reports', label: '報表', Icon: BarChart3, disabled: true },
  { key: 'settings', label: '設定', Icon: Settings },
]

function Logo({ compactLabel }: { compactLabel?: boolean }) {
  return (
    <div className="flex items-center gap-2.5 px-2">
      <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-(--tpl-radius-md) bg-(--tpl-primary) text-(--tpl-on-primary) shadow-(--tpl-primary-shadow)">
        <TreePine size={18} aria-hidden />
      </span>
      <span className={cn('flex flex-col leading-tight', compactLabel && '@max-5xl:sr-only')}>
        <span className={cn('text-base', heading)}>青森</span>
        <span className={cn('text-xs', muted)}>選物後台</span>
      </span>
    </div>
  )
}

/** 導覽清單：側欄（平板為 icon 欄）與手機抽屜共用 */
function NavList({ variant, onNavigate }: { variant: 'sidebar' | 'drawer'; onNavigate?: () => void }) {
  const page = useStore(dashStore, (s) => s.page)
  const orders = useStore(dashStore, (s) => s.orders)
  const pending = pendingCount(orders)
  const rail = variant === 'sidebar'

  return (
    <nav aria-label="後台導覽">
      <ul className="flex flex-col gap-1">
        {NAV.map(({ key, label, Icon, disabled }) => {
          const active = key === page
          const itemClass = cn(
            'relative flex h-10 w-full items-center gap-3 rounded-(--tpl-radius-md) px-3 text-sm transition-[background-color,color,box-shadow] duration-150',
            focusRing,
            rail && '@max-5xl:justify-center @max-5xl:px-0',
            active
              ? cn('bg-(--tpl-nav-active-bg) text-(--tpl-nav-active-fg) shadow-(--tpl-control-shadow-pressed)', labelWeight)
              : 'text-(--tpl-on-surface-variant) hover:bg-(--tpl-ghost-hover-bg) hover:text-(--tpl-on-surface)',
            disabled && 'cursor-not-allowed text-(--tpl-on-disabled) hover:bg-transparent hover:text-(--tpl-on-disabled)',
            !disabled && 'cursor-pointer',
          )
          const content = (
            <>
              <Icon size={18} aria-hidden className="shrink-0" />
              <span className={cn('flex-1 text-left', rail && '@max-5xl:sr-only')}>{label}</span>
              {key === 'orders' && pending > 0 && (
                <span
                  className={cn(
                    'inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-(--tpl-primary) px-1.5 text-[11px] text-(--tpl-on-primary)',
                    numeric,
                    labelWeight,
                    rail && '@max-5xl:absolute @max-5xl:top-0.5 @max-5xl:right-1 @max-5xl:h-4 @max-5xl:min-w-4 @max-5xl:px-1 @max-5xl:text-[10px]',
                  )}
                  aria-label={`${pending} 筆待處理`}
                >
                  {pending}
                </span>
              )}
            </>
          )
          return (
            <li key={key}>
              {disabled ? (
                <Tooltip content="示範版未開放" side="right">
                  <button type="button" aria-disabled className={itemClass}>
                    {content}
                  </button>
                </Tooltip>
              ) : (
                <button
                  type="button"
                  aria-current={active ? 'page' : undefined}
                  title={rail ? label : undefined}
                  className={itemClass}
                  onClick={() => {
                    dispatch({ type: 'page', page: key as DashPage })
                    onNavigate?.()
                  }}
                >
                  {content}
                </button>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

function UserCard({ rail }: { rail?: boolean }) {
  return (
    <div className={cn('flex items-center gap-3 rounded-(--tpl-radius-md) p-2', rail && '@max-5xl:justify-center')}>
      <Avatar name="何雅琪" tone={avatarTone('A01')} size="sm" />
      <div className={cn('min-w-0 leading-tight', rail && '@max-5xl:sr-only')}>
        <p className="truncate text-sm">何雅琪</p>
        <p className={cn('truncate text-xs', muted)}>後台管理員</p>
      </div>
    </div>
  )
}

/** 側欄：手機隱藏（改抽屜）、平板為 icon 欄、桌機 240px */
export function Sidebar() {
  return (
    <aside className="sticky top-0 hidden h-(--tpl-view-h) shrink-0 p-(--tpl-shell-inset) pr-0 @3xl:block @3xl:w-[88px] @5xl:w-[264px]">
      <div className="flex h-full flex-col gap-6 rounded-(--tpl-shell-radius) border-(length:--tpl-border-width) border-(--tpl-sidebar-border) bg-(--tpl-sidebar-bg) px-3 py-5 shadow-(--tpl-sidebar-shadow) [backdrop-filter:var(--tpl-panel-backdrop)]">
        <Logo compactLabel />
        <div className="min-h-0 flex-1 overflow-y-auto">
          <NavList variant="sidebar" />
        </div>
        <UserCard rail />
      </div>
    </aside>
  )
}

function Notifications() {
  const notifications = useStore(dashStore, (s) => s.notifications)
  const [open, setOpen] = useState(false)
  const unread = notifications.filter((n) => !n.read).length

  return (
    <Popover
      title="通知"
      open={open}
      onOpenChange={setOpen}
      trigger={
        <Button variant="ghost" size="icon" aria-label={unread ? `通知（${unread} 則未讀）` : '通知'} className="relative">
          <Bell size={19} />
          {unread > 0 && (
            <span
              aria-hidden
              className={cn(
                'absolute top-1.5 right-1.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-(--tpl-error) px-1 text-[10px] text-(--tpl-on-error)',
                numeric,
                labelWeight,
              )}
            >
              {unread}
            </span>
          )}
        </Button>
      }
    >
      <div className="flex items-center justify-between gap-3 border-b border-(--tpl-outline) px-4 py-3">
        <p className={cn('text-sm', heading)}>通知</p>
        <button
          type="button"
          disabled={unread === 0}
          onClick={() => dispatch({ type: 'readAllNotifications' })}
          className={cn('cursor-pointer rounded-(--tpl-radius-sm) text-[13px] text-(--tpl-link) disabled:cursor-default disabled:text-(--tpl-on-disabled)', focusRing)}
        >
          全部標為已讀
        </button>
      </div>
      <ul className="max-h-80 overflow-y-auto p-1.5">
        {notifications.map((n) => (
          <li key={n.id}>
            <button
              type="button"
              onClick={() => {
                dispatch({ type: 'readNotification', id: n.id })
                if (n.orderId) {
                  setOpen(false)
                  dispatch({ type: 'openOrder', id: n.orderId })
                }
              }}
              className={cn(
                'flex w-full cursor-pointer items-start gap-3 rounded-(--tpl-radius-sm) px-3 py-2.5 text-left text-sm transition-colors hover:bg-(--tpl-row-hover-bg)',
                focusRing,
              )}
            >
              <span className={cn('mt-1.5 size-2 shrink-0 rounded-full', n.read ? 'bg-transparent' : 'bg-(--tpl-accent)')} aria-hidden />
              <span className="min-w-0 flex-1">
                <span className={cn('block', !n.read && labelWeight, n.read && muted)}>{n.text}</span>
                <span className={cn('mt-0.5 block text-xs', muted)}>
                  {n.time}
                  {!n.read && <span className="sr-only">（未讀）</span>}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </Popover>
  )
}

function UserMenu() {
  return (
    <Menu
      trigger={
        <button type="button" aria-label="使用者選單：何雅琪" className={cn('flex cursor-pointer items-center gap-2 rounded-full p-0.5 pr-0.5 @5xl:pr-3', focusRing)}>
          <Avatar name="何雅琪" tone={avatarTone('A01')} size="sm" />
          <span className="hidden text-sm @5xl:inline">何雅琪</span>
        </button>
      }
      header={
        <div>
          <p className="text-sm">何雅琪</p>
          <p className={cn('text-xs', muted)}>admin@qingsen.example.com</p>
        </div>
      }
      items={[
        { label: '個人資料', icon: <User size={16} />, disabled: true, hint: '未開放' },
        { label: '說明中心', icon: <HelpCircle size={16} />, disabled: true, hint: '未開放' },
        { label: '登出', icon: <LogOut size={16} />, onSelect: () => toast('示範版不提供登出', { tone: 'info' }) },
      ]}
    />
  )
}

/** 頂部列：手機為漢堡＋標題＋搜尋 icon＋通知＋頭像 */
export function Topbar() {
  const page = useStore(dashStore, (s) => s.page)
  const [navOpen, setNavOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')

  function submit(e: FormEvent) {
    e.preventDefault()
    dispatch({ type: 'globalSearch', query: query.trim() })
    setSearchOpen(false)
  }

  const searchForm = (mobile: boolean) => (
    <form role="search" onSubmit={submit} className={cn('relative', mobile ? 'flex-1' : 'hidden w-72 @3xl:block')}>
      <Search size={16} aria-hidden className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-(--tpl-on-surface-subtle)" />
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="搜尋訂單編號或顧客，Enter 搜尋"
        aria-label="搜尋訂單"
        autoFocus={mobile}
        className={cn(inputBase, 'h-10 pl-9 text-[13px]')}
      />
    </form>
  )

  return (
    <div className="sticky top-0 z-20 px-(--tpl-shell-inset) pt-(--tpl-shell-inset)">
      <header className="flex h-16 items-center gap-3 rounded-(--tpl-shell-radius) border-(length:--tpl-border-width) border-(--tpl-header-border) bg-(--tpl-header-bg) px-3 shadow-(--tpl-header-shadow) [backdrop-filter:var(--tpl-header-backdrop)] @3xl:px-5">
        {searchOpen ? (
          <>
            {searchForm(true)}
            <Button variant="ghost" size="icon" aria-label="關閉搜尋" onClick={() => setSearchOpen(false)}>
              <X size={19} />
            </Button>
          </>
        ) : (
          <>
            <Button variant="ghost" size="icon" aria-label="開啟選單" className="@3xl:hidden" onClick={() => setNavOpen(true)}>
              <MenuIcon size={20} />
            </Button>
            <h1 className={cn('min-w-0 flex-1 truncate text-lg @3xl:text-xl', heading)}>{PAGE_TITLE[page]}</h1>
            {searchForm(false)}
            <Button variant="ghost" size="icon" aria-label="搜尋訂單" className="@3xl:hidden" onClick={() => setSearchOpen(true)}>
              <Search size={19} />
            </Button>
            <span className={cn('hidden items-center gap-1.5 text-[13px] whitespace-nowrap @5xl:inline-flex', muted)}>
              <CalendarDays size={15} aria-hidden />
              {PERIOD_LABEL}
            </span>
            <Notifications />
            <UserMenu />
          </>
        )}
      </header>

      <Drawer open={navOpen} onOpenChange={setNavOpen} side="left" title="青森選物後台">
        <div className="flex h-full flex-col gap-6">
          <NavList variant="drawer" onNavigate={() => setNavOpen(false)} />
          <div className="mt-auto border-t border-(--tpl-outline) pt-4">
            <UserCard />
          </div>
        </div>
      </Drawer>
    </div>
  )
}
