import { useEffect, useRef, useState, type ReactNode } from 'react'
import { ArrowRight, Gift, Hammer, Infinity as InfinityIcon, Leaf, Palette, Sofa, Store } from 'lucide-react'
import { cn } from '../../lib/cn'
import { formatNT } from '../../lib/format'
import { BRAND, BRAND_STATS } from '../../data/brand'
import { COURSES } from '../../data/places'
import Button from '../../ui/Button'
import { Card } from '../../ui/Card'
import { Dialog } from '../../ui/Overlay'
import TplImage from '../../ui/TplImage'
import { heading, labelWeight, muted, numeric } from '../../ui/classes'
import { useTplScroll } from '../../viewer/context'
import { SERVICES, TIMELINE, VALUES, type ServiceKey } from '../data'
import { scrollToSection, useCountUp } from '../../lib/scroll'

/** 區塊外框：id 給錨點與捲動追蹤；scroll-mt 預留導覽列高度 */
export function Section({ id, title, intro, children, className }: { id?: string; title: string; intro?: ReactNode; children: ReactNode; className?: string }) {
  const titleId = `${id ?? title}-title`
  return (
    <section id={id} aria-labelledby={titleId} className={cn('scroll-mt-20 px-4 py-16 @3xl:px-8 @5xl:py-24', className)}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-2xl">
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

export function Hero() {
  return (
    <section aria-labelledby="corp-hero-title" className="relative overflow-hidden @3xl:min-h-[640px]">
      {/* 桌機：情境大圖鋪在右側，左側與頂部以畫布色漸層淡出，文字與導覽列永遠在實色上 */}
      <div className="absolute inset-y-0 right-0 hidden w-[64%] @3xl:block" aria-hidden>
        <TplImage id="hero" label="" alt="" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--tpl-background)_0%,transparent_45%)]" />
        <div className="absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,var(--tpl-background)_0%,transparent_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(0deg,var(--tpl-background)_0%,transparent_100%)]" />
      </div>
      <div className="relative mx-auto flex max-w-[calc(80rem+4rem)] flex-col gap-8 px-4 pt-[calc(64px+var(--tpl-shell-inset)+48px)] pb-12 @3xl:min-h-[640px] @3xl:justify-center @3xl:px-8 @3xl:pb-20">
        <div className="max-w-xl">
          <p className={cn('text-sm', muted)}>
            {BRAND.name} {BRAND.nameEn} ・ since {BRAND.founded}
          </p>
          <h1 id="corp-hero-title" className={cn('mt-4 text-4xl leading-tight @5xl:text-6xl', heading)}>
            把森林的安靜，
            <br />
            帶回日常。
          </h1>
          <p className={cn('mt-5 text-lg leading-relaxed', muted)}>{BRAND.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button onClick={() => scrollToSection('corp-about')}>
              認識青森
              <ArrowRight size={16} />
            </Button>
            <Button variant="secondary" onClick={() => scrollToSection('corp-services')}>
              預約手作課程
            </Button>
          </div>
        </div>
        <div className="aspect-[4/3] overflow-hidden rounded-(--tpl-card-radius-xl) @3xl:hidden">
          <TplImage id="hero" label="" alt="青森選物品牌情境照" />
        </div>
      </div>
    </section>
  )
}

const VALUE_ICON = { craft: Hammer, lasting: InfinityIcon, quiet: Leaf } as const

function Stat({ label, value, suffix, start }: { label: string; value: number; suffix: string; start: boolean }) {
  const n = useCountUp(value, start)
  return (
    <div className="flex flex-col gap-1">
      <dt className={cn('order-2 text-sm', muted)}>{label}</dt>
      <dd className={cn('order-1 text-4xl @5xl:text-5xl', heading, numeric)}>
        {/* 螢幕閱讀器直接讀最終值，不讀跑動中的數字 */}
        <span aria-hidden>{n}</span>
        <span className="sr-only">{value}</span>
        <span className="text-xl @5xl:text-2xl">{suffix}</span>
      </dd>
    </div>
  )
}

function Stats() {
  const scrollEl = useTplScroll()
  const ref = useRef<HTMLDListElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    if (!scrollEl || !ref.current) return
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { root: scrollEl, threshold: 0.4 })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [scrollEl])
  return (
    <Card className="mt-6 @5xl:mt-8">
      <dl ref={ref} className="grid grid-cols-2 gap-8 @5xl:grid-cols-4">
        {BRAND_STATS.map((s) => (
          <Stat key={s.label} label={s.label} value={s.value} suffix={s.suffix} start={visible} />
        ))}
      </dl>
    </Card>
  )
}

export function About() {
  return (
    <Section id="corp-about" title="關於我們" intro="青森相信好的東西不用很多，但要用得久。我們走訪全台工坊，把值得留在家裡十年的東西帶到你面前。">
      <ul className="grid gap-4 @3xl:grid-cols-3 @5xl:gap-6">
        {VALUES.map((v) => {
          const Icon = VALUE_ICON[v.key]
          return (
            <Card as="li" key={v.key}>
              <span className="mb-4 inline-flex size-11 items-center justify-center rounded-(--tpl-radius-md) bg-(--tpl-selected-bg) text-(--tpl-selected-fg) shadow-(--tpl-control-shadow)" aria-hidden>
                <Icon size={21} />
              </span>
              <h3 className={cn('text-lg', heading)}>{v.title}</h3>
              <p className={cn('mt-2 text-sm leading-relaxed', muted)}>{v.text}</p>
            </Card>
          )
        })}
      </ul>
      <Stats />
    </Section>
  )
}

const SERVICE_ICON: Record<ServiceKey, typeof Store> = { retail: Store, gift: Gift, space: Sofa, course: Palette }

export function Services() {
  const [open, setOpen] = useState<ServiceKey | null>(null)
  const [shown, setShown] = useState<ServiceKey>('retail')
  const service = SERVICES.find((s) => s.key === shown)!

  return (
    <Section id="corp-services" title="服務項目" intro="除了門市與網路商店，也為企業與空間提供選物服務。">
      <ul className="grid gap-4 @3xl:grid-cols-2 @5xl:grid-cols-4 @5xl:gap-6">
        {SERVICES.map((s) => {
          const Icon = SERVICE_ICON[s.key]
          return (
            <Card as="li" key={s.key} className="flex flex-col">
              <Icon size={26} className="mb-5 text-(--tpl-accent)" aria-hidden />
              <h3 className={cn('text-lg', heading)}>{s.name}</h3>
              <p className={cn('mt-2 flex-1 text-sm leading-relaxed', muted)}>{s.summary}</p>
              <div className="mt-5">
                <Button
                  size="sm"
                  variant="ghost"
                  className="-ml-3"
                  aria-label={`了解更多：${s.name}`}
                  onClick={() => {
                    setShown(s.key)
                    setOpen(s.key)
                  }}
                >
                  了解更多
                  <ArrowRight size={15} />
                </Button>
              </div>
            </Card>
          )
        })}
      </ul>

      <Dialog
        open={open !== null}
        onOpenChange={(o) => !o && setOpen(null)}
        title={service.name}
        description={service.summary}
        footer={<Button onClick={() => setOpen(null)}>我知道了</Button>}
      >
        {service.key === 'course' ? (
          <ul className="flex flex-col divide-y divide-(--tpl-outline)">
            {COURSES.map((c) => (
              <li key={c.id} className="flex items-baseline justify-between gap-4 py-3 text-sm first:pt-0 last:pb-0">
                <span>
                  <span className={labelWeight}>{c.name}</span>
                  <span className={cn('ml-2 text-xs', muted)}>{c.duration}</span>
                </span>
                <span className={numeric}>{formatNT(c.price)} / 人</span>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="flex flex-col gap-3">
            {service.points.map((p) => (
              <li key={p} className="flex items-start gap-3 text-sm">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-(--tpl-accent)" aria-hidden />
                {p}
              </li>
            ))}
          </ul>
        )}
      </Dialog>
    </Section>
  )
}

export function Story() {
  return (
    <Section title="品牌故事" intro="從大安區的一間小店開始，十年長成六間門市。">
      <ol className="relative grid gap-8 border-l border-(--tpl-outline-strong) pl-6 @5xl:grid-cols-6 @5xl:gap-6 @5xl:border-t @5xl:border-l-0 @5xl:pt-8 @5xl:pl-0">
        {TIMELINE.map((t) => (
          <li key={t.year} className="relative">
            <span
              aria-hidden
              className="absolute top-1.5 -left-[31px] size-3 rounded-full bg-(--tpl-accent) ring-4 ring-(--tpl-background) @5xl:-top-[39px] @5xl:left-0"
            />
            <p className={cn('text-2xl', heading, numeric)}>{t.year}</p>
            <p className={cn('mt-2 text-sm leading-relaxed', muted)}>{t.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  )
}
