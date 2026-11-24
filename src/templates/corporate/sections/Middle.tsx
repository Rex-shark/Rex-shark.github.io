import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, Clock, Copy, MapPin, Phone, Quote } from 'lucide-react'
import { cn } from '../../lib/cn'
import { useStore } from '../../lib/store'
import { toast } from '../../lib/toast'
import { STORES, type Region } from '../../data/places'
import { avatarTone } from '../../data/people'
import Button from '../../ui/Button'
import Badge from '../../ui/Badge'
import Tabs from '../../ui/Tabs'
import { Card } from '../../ui/Card'
import { Chip } from '../../ui/Chip'
import { Avatar } from '../../ui/Display'
import { Dialog } from '../../ui/Overlay'
import { EmptyState } from '../../ui/Feedback'
import TplImage from '../../ui/TplImage'
import { focusRing, heading, labelWeight, muted, numeric } from '../../ui/classes'
import { NEWS, TEAM, TESTIMONIALS, type NewsCategory } from '../data'
import { corpStore, dispatch } from '../state'
import { Section } from './Intro'

const REGIONS: (Region | 'all')[] = ['all', '北部', '中部', '南部']

async function copyAddress(address: string) {
  try {
    if (!navigator.clipboard) throw new Error('clipboard unavailable')
    await navigator.clipboard.writeText(address)
    toast('已複製地址')
  } catch {
    toast('這個瀏覽器無法複製，請手動選取地址', { tone: 'error' })
  }
}

/** 與 Button secondary／sm 同樣式的連結（撥打電話用 tel:） */
const linkButton = cn(
  'inline-flex h-8 cursor-pointer items-center justify-center gap-1.5 rounded-(--tpl-radius-control) border-(length:--tpl-border-width) border-(--tpl-btn-secondary-border) bg-(--tpl-btn-secondary-bg) px-3 text-[13px] text-(--tpl-on-surface) shadow-(--tpl-control-shadow) [backdrop-filter:var(--tpl-panel-backdrop)] transition-colors hover:bg-(--tpl-btn-secondary-hover-bg)',
  labelWeight,
  focusRing,
)

export function Stores() {
  const region = useStore(corpStore, (s) => s.storeRegion)
  const list = region === 'all' ? STORES : STORES.filter((s) => s.region === region)
  return (
    <Section id="corp-stores" title="門市據點" intro="六間門市，每一間都有自己的選品主題。可預約課程的門市會特別標示。">
      <Tabs
        ariaLabel="門市地區"
        value={region}
        onValueChange={(r) => dispatch({ type: 'storeRegion', region: r })}
        items={REGIONS.map((r) => ({ value: r, label: r === 'all' ? '全部' : r, count: r === 'all' ? STORES.length : STORES.filter((s) => s.region === r).length }))}
        className="mb-6"
      />
      <ul className="grid gap-4 @3xl:grid-cols-2 @5xl:grid-cols-3 @5xl:gap-6">
        {list.map((s) => (
          <Card as="li" key={s.id} padded={false} className="flex flex-col overflow-hidden">
            <div className="aspect-[16/9]">
              <TplImage id={`store-${s.id}`} label={s.name} alt={`${s.name}門市外觀`} />
            </div>
            <div className="flex flex-1 flex-col gap-3 p-5">
              <div className="flex items-start justify-between gap-2">
                <h3 className={cn('text-lg', heading)}>{s.name}</h3>
                {s.bookable && <Badge tone="accent">可預約課程</Badge>}
              </div>
              <dl className={cn('flex flex-col gap-1.5 text-sm', muted)}>
                <div className="flex items-start gap-2">
                  <dt className="pt-0.5">
                    <MapPin size={15} aria-label="地址" />
                  </dt>
                  <dd className="text-(--tpl-on-surface)">{s.address}</dd>
                </div>
                <div className="flex items-start gap-2">
                  <dt className="pt-0.5">
                    <Phone size={15} aria-label="電話" />
                  </dt>
                  <dd className={numeric}>{s.phone}</dd>
                </div>
                <div className="flex items-start gap-2">
                  <dt className="pt-0.5">
                    <Clock size={15} aria-label="營業時間" />
                  </dt>
                  <dd>
                    <span className={numeric}>{s.hours}</span>（{s.closedLabel}公休）
                  </dd>
                </div>
              </dl>
              <div className="mt-auto flex flex-wrap gap-2 pt-2">
                <Button size="sm" variant="secondary" onClick={() => copyAddress(s.address)} aria-label={`複製${s.name}地址`}>
                  <Copy size={14} />
                  複製地址
                </Button>
                <a href={`tel:${s.phone.replace(/-/g, '')}`} className={linkButton} aria-label={`撥打電話給${s.name}`}>
                  <Phone size={14} aria-hidden />
                  撥打電話
                </a>
              </div>
            </div>
          </Card>
        ))}
      </ul>
    </Section>
  )
}

const NEWS_CATEGORIES: (NewsCategory | 'all')[] = ['all', '品牌', '活動', '媒體']
const NEWS_TONE = { 品牌: 'accent', 活動: 'info', 媒體: 'success' } as const

export function News() {
  const { newsCategory, newsExpanded } = useStore(corpStore)
  const [loading, setLoading] = useState(false)
  const [openId, setOpenId] = useState<string | null>(null)
  const [shownId, setShownId] = useState(NEWS[0].id)
  const filtered = newsCategory === 'all' ? NEWS : NEWS.filter((n) => n.category === newsCategory)
  const shown = newsExpanded ? filtered : filtered.slice(0, 3)
  const article = NEWS.find((n) => n.id === shownId)!

  function loadMore() {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      dispatch({ type: 'newsExpanded' })
    }, 600)
  }

  return (
    <Section id="corp-news" title="最新消息">
      <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label="消息分類">
        {NEWS_CATEGORIES.map((c) => (
          <Chip key={c} selected={newsCategory === c} onClick={() => dispatch({ type: 'newsCategory', category: c })}>
            {c === 'all' ? '全部' : c}
          </Chip>
        ))}
      </div>

      {filtered.length === 0 ? (
        <Card>
          <EmptyState title="這個分類目前沒有消息" description="看看其他分類吧。" />
        </Card>
      ) : (
        <ul className="flex flex-col gap-3">
          {shown.map((n) => (
            <li key={n.id}>
              <button
                type="button"
                onClick={() => {
                  setShownId(n.id)
                  setOpenId(n.id)
                }}
                className={cn(
                  'group flex w-full cursor-pointer flex-col gap-2 rounded-(--tpl-card-radius) border-(length:--tpl-border-width) border-(--tpl-panel-border) bg-(--tpl-panel-bg) p-5 text-left shadow-(--tpl-panel-shadow) [backdrop-filter:var(--tpl-panel-backdrop)] transition-[background-color,border-color] hover:border-(--tpl-outline-strong) hover:bg-(--tpl-panel-hover-bg) @3xl:flex-row @3xl:items-center @3xl:gap-6',
                  focusRing,
                )}
              >
                <span className={cn('shrink-0 text-sm', muted, numeric)}>{n.date}</span>
                <span className="shrink-0">
                  <Badge tone={NEWS_TONE[n.category]}>{n.category}</Badge>
                </span>
                <span className={cn('flex-1 text-base', labelWeight)}>{n.title}</span>
                <ChevronRight size={18} className="hidden shrink-0 text-(--tpl-on-surface-variant) transition-transform group-hover:translate-x-0.5 @3xl:block" aria-hidden />
              </button>
            </li>
          ))}
        </ul>
      )}

      {!newsExpanded && filtered.length > 3 && (
        <div className="mt-6 flex justify-center">
          <Button variant="secondary" loading={loading} onClick={loadMore}>
            {loading ? '載入中' : '載入更多'}
          </Button>
        </div>
      )}

      <Dialog
        open={openId !== null}
        onOpenChange={(o) => !o && setOpenId(null)}
        title={article.title}
        description={
          <span className="flex items-center gap-2">
            <span className={numeric}>{article.date}</span>
            <Badge tone={NEWS_TONE[article.category]}>{article.category}</Badge>
          </span>
        }
        footer={<Button onClick={() => setOpenId(null)}>關閉</Button>}
      >
        <p className="text-base leading-relaxed">{article.body}</p>
      </Dialog>
    </Section>
  )
}

export function Team() {
  return (
    <Section title="團隊" intro="一群喜歡好東西、也喜歡和人分享的人。">
      <ul className="grid gap-4 @3xl:grid-cols-2 @5xl:grid-cols-4 @5xl:gap-6">
        {TEAM.map((m) => (
          <Card as="li" key={m.id} className="flex flex-col items-start gap-4">
            <Avatar name={m.name} tone={avatarTone(m.id)} size="lg" />
            <div>
              <h3 className={cn('text-lg', heading)}>{m.name}</h3>
              <p className="text-sm text-(--tpl-accent)">{m.title}</p>
            </div>
            <p className={cn('text-sm leading-relaxed', muted)}>{m.intro}</p>
          </Card>
        ))}
      </ul>
    </Section>
  )
}

/** 合作客戶好評輪播：6 秒自動切換，hover／focus 時暫停，減少動態時不自動播放 */
export function Testimonials() {
  const [index, setIndex] = useState(0)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [reduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const paused = hovered || focused || reduced
  const n = TESTIMONIALS.length
  const t = TESTIMONIALS[index]

  useEffect(() => {
    if (paused) return
    const timer = setInterval(() => setIndex((i) => (i + 1) % n), 6000)
    return () => clearInterval(timer)
  }, [paused, n])

  const go = (d: number) => setIndex((i) => (i + d + n) % n)

  return (
    <Section title="合作客戶怎麼說">
      <Card
        role="region"
        aria-roledescription="輪播"
        aria-label="合作客戶好評"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false)
        }}
        className="flex flex-col gap-8 p-8 @3xl:p-12"
      >
        <Quote size={36} className="text-(--tpl-accent)" aria-hidden />
        <figure key={index} aria-roledescription="投影片" aria-label={`第 ${index + 1} 則，共 ${n} 則`} className="animate-in fade-in duration-300 motion-reduce:animate-none">
          <blockquote className={cn('text-xl leading-relaxed @5xl:text-2xl', heading)}>{t.text}</blockquote>
          <figcaption className={cn('mt-5 text-sm', muted)}>
            <span className={cn('text-(--tpl-on-surface)', labelWeight)}>{t.company}</span> ・ {t.role}
          </figcaption>
        </figure>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`顯示第 ${i + 1} 則`}
                aria-current={i === index ? 'true' : undefined}
                className={cn('h-2.5 cursor-pointer rounded-full transition-[width,background-color] duration-200', i === index ? 'w-7 bg-(--tpl-accent)' : 'w-2.5 bg-(--tpl-outline-strong)', focusRing)}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" size="icon" aria-label="上一則" onClick={() => go(-1)}>
              <ChevronLeft size={18} />
            </Button>
            <Button variant="secondary" size="icon" aria-label="下一則" onClick={() => go(1)}>
              <ChevronRight size={18} />
            </Button>
          </div>
        </div>
      </Card>
    </Section>
  )
}
