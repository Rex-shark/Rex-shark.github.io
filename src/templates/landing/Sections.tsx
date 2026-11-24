import { useState, type ReactNode } from 'react'
import { ArrowDown, Check, ChevronDown, ListChecks, Menu as MenuIcon, Minus, PackageOpen, PauseCircle, Star, TreePine } from 'lucide-react'
import { cn } from '../lib/cn'
import { useStore } from '../lib/store'
import { formatNT } from '../lib/format'
import { scrollToSection, useScrolled, useScrollSpy } from '../lib/scroll'
import { BRAND, BRAND_RATING } from '../data/brand'
import { productById } from '../data/catalog'
import { avatarTone, personByName } from '../data/people'
import Button from '../ui/Button'
import Badge from '../ui/Badge'
import Accordion from '../ui/Accordion'
import Segmented from '../ui/Segmented'
import { Card } from '../ui/Card'
import { Avatar, Rating } from '../ui/Display'
import { Drawer } from '../ui/Overlay'
import TplImage from '../ui/TplImage'
import { focusRing, heading, labelWeight, muted, numeric, panel } from '../ui/classes'
import { useTplScroll } from '../viewer/context'
import { BOX_ITEMS, FAQ, FEATURES, PLANS, REVIEWS, SECTIONS, SECTION_IDS, STEPS_HOW, type PlanKey } from './data'
import { dispatch, landingStore } from './state'

function Section({ id, title, intro, children, className }: { id?: string; title: string; intro?: ReactNode; children: ReactNode; className?: string }) {
  const titleId = `${id ?? title}-title`
  return (
    <section id={id} aria-labelledby={titleId} className={cn('scroll-mt-20 px-4 py-16 @3xl:px-8 @5xl:py-24', className)}>
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 id={titleId} className={cn('text-3xl @5xl:text-4xl', heading)}>
            {title}
          </h2>
          {intro && <p className={cn('mt-3 text-base leading-relaxed', muted)}>{intro}</p>}
        </div>
        {children}
      </div>
    </section>
  )
}

export function Nav() {
  const scrolled = useScrolled()
  const active = useScrollSpy(SECTION_IDS)
  const scrollEl = useTplScroll()
  const [menuOpen, setMenuOpen] = useState(false)
  const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return (
    <div className="sticky top-0 z-30 -mb-[calc(64px+var(--tpl-shell-inset))] px-(--tpl-shell-inset) pt-(--tpl-shell-inset)">
      <header
        className={cn(
          'rounded-(--tpl-shell-radius) border-(length:--tpl-border-width) transition-[background-color,box-shadow,border-color] duration-200 motion-reduce:transition-none',
          scrolled ? 'border-(--tpl-header-border) bg-(--tpl-header-bg) shadow-(--tpl-header-shadow) [backdrop-filter:var(--tpl-header-backdrop)]' : 'border-transparent bg-transparent shadow-none',
        )}
      >
        <div className="mx-auto flex h-16 max-w-[calc(72rem+4rem)] items-center gap-3 px-3 @3xl:px-8">
          <button
            type="button"
            onClick={() => scrollEl?.scrollTo({ top: 0, behavior: reduced() ? 'auto' : 'smooth' })}
            aria-label="森林盒子，回到頂端"
            className={cn('flex shrink-0 cursor-pointer items-center gap-2 rounded-(--tpl-radius-md)', focusRing)}
          >
            <span className="inline-flex size-9 items-center justify-center rounded-(--tpl-radius-md) bg-(--tpl-primary) text-(--tpl-on-primary) shadow-(--tpl-primary-shadow)">
              <TreePine size={18} aria-hidden />
            </span>
            <span className={cn('text-base', heading)}>
              青森 <span className={cn('text-sm', muted)}>・ 森林盒子</span>
            </span>
          </button>
          <nav aria-label="頁面區塊" className="ml-auto hidden items-center gap-1 @3xl:flex">
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
                  active === s.id ? cn('bg-(--tpl-nav-active-bg) text-(--tpl-nav-active-fg) shadow-(--tpl-control-shadow-pressed)', labelWeight) : 'text-(--tpl-on-surface-variant) hover:text-(--tpl-on-surface)',
                  focusRing,
                )}
              >
                {s.label}
              </a>
            ))}
          </nav>
          <div className="flex-1 @3xl:hidden" />
          <Button size="sm" onClick={() => scrollToSection('land-plans')} className="hidden @md:inline-flex">
            立即訂閱
          </Button>
          <Button variant="ghost" size="icon" aria-label="開啟選單" className="@3xl:hidden" onClick={() => setMenuOpen(true)}>
            <MenuIcon size={20} />
          </Button>
        </div>
      </header>
      <Drawer open={menuOpen} onOpenChange={setMenuOpen} side="full" title="森林盒子">
        <nav aria-label="頁面區塊" className="flex flex-col gap-1">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={(e) => {
                e.preventDefault()
                setMenuOpen(false)
                setTimeout(() => scrollToSection(s.id), 50)
              }}
              className={cn('flex h-14 items-center border-b border-(--tpl-outline) px-1 text-xl', active === s.id ? 'text-(--tpl-accent)' : 'text-(--tpl-on-surface)', labelWeight, focusRing)}
            >
              {s.label}
            </a>
          ))}
          <Button
            className="mt-6"
            onClick={() => {
              setMenuOpen(false)
              setTimeout(() => scrollToSection('land-plans'), 50)
            }}
          >
            立即訂閱
          </Button>
        </nav>
      </Drawer>
    </div>
  )
}

export function Hero() {
  return (
    <section aria-labelledby="land-hero-title" className="px-4 pt-[calc(64px+var(--tpl-shell-inset)+40px)] pb-12 @3xl:px-8 @5xl:pb-20">
      <div className="mx-auto grid max-w-6xl items-center gap-10 @5xl:grid-cols-[1.1fr_1fr]">
        <div>
          <Badge tone="accent">每月 15 日出貨</Badge>
          <h1 id="land-hero-title" className={cn('mt-5 text-4xl leading-tight @5xl:text-6xl', heading)}>
            每個月，
            <br />
            一盒森林寄到你家。
          </h1>
          <p className={cn('mt-5 max-w-lg text-lg leading-relaxed', muted)}>由青森選品團隊挑選 3–6 件生活選物，每月 15 日出貨，隨時可以暫停。</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button onClick={() => scrollToSection('land-plans')}>看方案</Button>
            <Button variant="secondary" onClick={() => scrollToSection('land-box')}>
              本月盒子裡有什麼？
              <ArrowDown size={16} />
            </Button>
          </div>
          <p className={cn('mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm', muted)}>
            已有 <span className={cn('text-(--tpl-on-surface)', numeric, labelWeight)}>2,400+</span> 位訂閱者 ・
            <span className="inline-flex items-center gap-1">
              <Star size={14} className="fill-(--tpl-tertiary) text-(--tpl-tertiary)" aria-hidden />
              平均評價 <span className={cn('text-(--tpl-on-surface)', numeric)}>{BRAND_RATING}</span> / 5
            </span>
          </p>
        </div>
        <div className={cn('aspect-[4/3] overflow-hidden rounded-(--tpl-card-radius-xl)', panel)}>
          <TplImage id="box" label="" alt="森林盒子開箱情境照" />
        </div>
      </div>
    </section>
  )
}

const HOW_ICON = [ListChecks, PackageOpen, PauseCircle]

export function How() {
  return (
    <Section id="land-how" title="怎麼運作" intro="三個步驟，每個月固定收到一盒安靜。">
      <ol className="grid gap-4 @3xl:grid-cols-3 @5xl:gap-6">
        {STEPS_HOW.map((s, i) => {
          const Icon = HOW_ICON[i]
          return (
            <Card as="li" key={s.title} className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="inline-flex size-12 items-center justify-center rounded-(--tpl-radius-md) bg-(--tpl-selected-bg) text-(--tpl-selected-fg) shadow-(--tpl-control-shadow)" aria-hidden>
                  <Icon size={22} />
                </span>
                <span className={cn('text-4xl opacity-20', heading, numeric)} aria-hidden>
                  {i + 1}
                </span>
              </div>
              <h3 className={cn('text-lg', heading)}>
                <span className="sr-only">步驟 {i + 1}：</span>
                {s.title}
              </h3>
              <p className={cn('text-sm leading-relaxed', muted)}>{s.text}</p>
            </Card>
          )
        })}
      </ol>
    </Section>
  )
}

function FeatureValue({ v }: { v: boolean | string }) {
  if (typeof v === 'string') return <span className={numeric}>{v}</span>
  return v ? (
    <>
      <Check size={17} className="mx-auto text-(--tpl-success)" aria-hidden />
      <span className="sr-only">包含</span>
    </>
  ) : (
    <>
      <Minus size={17} className="mx-auto text-(--tpl-on-surface-subtle)" aria-hidden />
      <span className="sr-only">不包含</span>
    </>
  )
}

function Compare() {
  const open = useStore(landingStore, (s) => s.compareOpen)
  return (
    <div className="mt-8">
      <div className="flex justify-center">
        <Button variant="ghost" onClick={() => dispatch({ type: 'compare', open: !open })} aria-expanded={open} aria-controls="land-compare">
          {open ? '收合比較表' : '比較所有功能'}
          <ChevronDown size={16} className={cn('transition-transform', open && 'rotate-180')} />
        </Button>
      </div>
      {open && (
        <div id="land-compare" className={cn('mt-4 overflow-hidden rounded-(--tpl-card-radius) animate-in fade-in duration-200 motion-reduce:animate-none', panel)}>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse text-sm">
              <caption className="sr-only">方案功能比較</caption>
              <thead>
                <tr>
                  <th scope="col" className={cn('sticky left-0 z-10 bg-(--tpl-surface) px-4 py-3 text-left text-(--tpl-table-header-fg)', labelWeight)}>
                    功能
                  </th>
                  {PLANS.map((p) => (
                    <th key={p.key} scope="col" className={cn('px-4 py-3 text-center', labelWeight, p.popular && 'text-(--tpl-accent)')}>
                      {p.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {FEATURES.map((f) => (
                  <tr key={f.label} className="border-t border-(--tpl-outline)">
                    <th scope="row" className="sticky left-0 z-10 bg-(--tpl-surface) px-4 py-3 text-left font-normal">
                      {f.label}
                    </th>
                    {PLANS.map((p) => (
                      <td key={p.key} className="px-4 py-3 text-center">
                        <FeatureValue v={f.values[p.key]} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export function Plans() {
  const billing = useStore(landingStore, (s) => s.billing)
  const open = (plan: PlanKey) => dispatch({ type: 'openSubscribe', plan })
  return (
    <Section id="land-plans" title="方案與價格" intro="三種盒子大小，免運配送，隨時可以暫停或取消。">
      <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
        <Segmented
          size="md"
          ariaLabel="付款週期"
          value={billing}
          onValueChange={(b) => dispatch({ type: 'billing', billing: b })}
          options={[
            { value: 'monthly', label: '月繳' },
            { value: 'yearly', label: '年繳' },
          ]}
        />
        <Badge tone="success">年繳省 2 個月</Badge>
      </div>
      <ul className="grid gap-5 @5xl:grid-cols-3 @5xl:items-stretch">
        {PLANS.map((p) => {
          const features = FEATURES.filter((f) => f.values[p.key] === true).map((f) => f.label)
          const price = billing === 'monthly' ? p.monthly : p.yearlyPerMonth
          return (
            <Card as="li" key={p.key} className={cn('relative flex flex-col gap-5', p.popular && 'ring-2 ring-(--tpl-accent)')}>
              {p.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge tone="accent" className="shadow-(--tpl-control-shadow)">
                    最受歡迎
                  </Badge>
                </span>
              )}
              <div>
                <h3 className={cn('text-xl', heading)}>{p.name}</h3>
                <p className={cn('mt-1 text-sm', muted)}>{p.summary}</p>
              </div>
              <div>
                {/* 切換月繳／年繳時價格淡入更新 */}
                <p key={billing} className="flex items-baseline gap-1 animate-in fade-in duration-300 motion-reduce:animate-none">
                  <span className={cn('text-4xl', heading, numeric)}>{formatNT(price)}</span>
                  <span className={cn('text-sm', muted)}>/ 月</span>
                </p>
                <p className={cn('mt-1 h-5 text-xs', muted, numeric)}>{billing === 'yearly' ? `年繳 ${formatNT(p.yearlyTotal)}` : ' '}</p>
              </div>
              <ul className="flex flex-1 flex-col gap-2 text-sm">
                {features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <Check size={16} className="shrink-0 text-(--tpl-success)" aria-hidden />
                    {f}
                  </li>
                ))}
              </ul>
              <Button variant={p.popular ? 'primary' : 'secondary'} onClick={() => open(p.key)} aria-label={`選擇${p.name}方案`}>
                選擇此方案
              </Button>
            </Card>
          )
        })}
      </ul>
      <Compare />
    </Section>
  )
}

export function Box() {
  const items = BOX_ITEMS.map((b) => ({ ...b, product: productById(b.productId)! }))
  const total = items.reduce((s, i) => s + i.product.price, 0)
  return (
    <Section id="land-box" title="本月盒子內容" intro="11 月 ・ 森林盒。每件商品都附上工匠故事卡。">
      <ul className="grid grid-cols-2 gap-4 @5xl:grid-cols-4 @5xl:gap-6">
        {items.map(({ product, variant }) => (
          <Card as="li" key={product.id} padded={false} className="overflow-hidden">
            <div className="aspect-square">
              <TplImage id={product.id} />
            </div>
            <div className="p-4">
              <p className={cn('text-sm', labelWeight)}>
                {product.name}
                {variant && <span className={muted}>（{variant}）</span>}
              </p>
              <p className={cn('mt-1 text-xs', muted)}>
                單買 <span className={numeric}>{formatNT(product.price)}</span>
              </p>
            </div>
          </Card>
        ))}
      </ul>
      <p className="mt-6 text-center text-base">
        單買價值 <span className={cn(numeric, labelWeight)}>{formatNT(total)}</span>，森林盒每月 <span className={cn('text-(--tpl-accent)', numeric, labelWeight)}>{formatNT(1290)}</span>
      </p>
    </Section>
  )
}

export function Reviews() {
  return (
    <Section title="訂閱者怎麼說">
      <ul className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 @3xl:mx-0 @3xl:grid @3xl:grid-cols-3 @3xl:overflow-visible @3xl:px-0 @5xl:gap-6">
        {REVIEWS.map((r) => (
          <Card as="li" key={r.name} className="flex w-[82%] shrink-0 snap-start flex-col gap-4 @3xl:w-auto">
            <Rating value={5} size={14} />
            <p className="flex-1 text-base leading-relaxed">「{r.text}」</p>
            <div className="flex items-center gap-3">
              <Avatar name={r.name} tone={avatarTone(personByName(r.name)?.id ?? r.name)} />
              <div>
                <p className={cn('text-sm', labelWeight)}>{r.name}</p>
                <p className={cn('text-xs', muted)}>
                  {r.plan} ・ 訂閱 {r.duration}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </ul>
    </Section>
  )
}

export function Faq() {
  return (
    <Section id="land-faq" title="常見問題">
      <div className="mx-auto max-w-3xl">
        <Accordion items={FAQ.map((f, i) => ({ value: `land-faq-${i}`, title: f.q, content: f.a }))} />
      </div>
    </Section>
  )
}

export function Cta() {
  return (
    <section aria-labelledby="land-cta-title" className="px-4 pb-20 @3xl:px-8">
      <div className={cn('mx-auto flex max-w-6xl flex-col items-center gap-5 rounded-(--tpl-card-radius-xl) px-6 py-14 text-center', panel)}>
        <h2 id="land-cta-title" className={cn('text-3xl @5xl:text-4xl', heading)}>
          這個月，給自己一盒安靜。
        </h2>
        <Button onClick={() => scrollToSection('land-plans')}>立即訂閱</Button>
        <p className={cn('text-sm', muted)}>隨時可暫停或取消</p>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-(--tpl-outline) px-4 py-8 @3xl:px-8">
      <div className={cn('mx-auto flex max-w-6xl flex-col gap-2 text-sm @3xl:flex-row @3xl:items-center @3xl:justify-between', muted)}>
        <p>
          <span className={cn('text-(--tpl-on-surface)', labelWeight)}>{BRAND.name}</span> ・ {BRAND.email}
        </p>
        <p className="text-xs">{BRAND.copyright}</p>
      </div>
    </footer>
  )
}
