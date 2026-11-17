import { useEffect, useRef, type ReactNode } from 'react'
import { Link } from 'react-router'
import { motion, type Variants } from 'framer-motion'
import { profile } from '@/data/profile'
import { BRIEFS } from '../content/briefs'
import { cardTitle, type CardData } from '../content/cards'
import { GithubIcon, LockIcon } from '../content/icons'

/** 退場時要縮回去的位置（卡片中心、實際寬度、旋轉角） */
export interface ExitTarget {
  cx: number
  cy: number
  w: number
  rotate: number
}

interface Props {
  card: CardData
  no: number
  vw: number
  vh: number
  narrow: boolean
  /** 場上那張卡的中心與實際寬度：放大動畫從這裡長出來 */
  from: { cx: number; cy: number; w: number }
  onClose: () => void
  /** 收回手牌（同時關閉） */
  onReturn: () => void
}

/** 英雄卡的「詳細」是經典版首頁（完整自介、技能、聯絡） */
export const HERO_DETAIL = '/classic'

/**
 * 點場上的卡：翻面放大成「簡易介紹」，一個畫面看完。
 * 完整內容不在這裡，按「看完整介紹」進 showcase 頁（英雄卡進經典版首頁）。
 */
export default function BriefView({ card, no, vw, vh, narrow, from, onClose, onReturn }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const hero = card.kind === 'intro'

  const w = narrow ? vw - 24 : Math.min(580, vw - 48)
  const start = { x: from.cx - vw / 2, y: from.cy - vh / 2, scale: from.w / w }
  // 退場：預設縮回場地格；按「收回手牌」時 Home 透過 AnimatePresence 的 custom 給手牌位置
  const variants: Variants = {
    closed: (to: ExitTarget | null | undefined) => ({
      ...(to ? { x: to.cx - vw / 2, y: to.cy - vh / 2, scale: to.w / w, rotate: to.rotate } : start),
      rotateY: -180,
      opacity: 0,
      transition: { duration: 0.32, ease: 'easeIn' as const },
    }),
  }

  useEffect(() => {
    closeRef.current?.focus({ preventScroll: true })
  }, [])

  return (
    <motion.div
      className="fixed inset-0 z-[400] grid place-items-center"
      initial={{ backgroundColor: 'rgba(10,12,16,0)' }}
      animate={{ backgroundColor: 'rgba(10,12,16,0.72)' }}
      exit={{ backgroundColor: 'rgba(10,12,16,0)' }}
      onPointerDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={cardTitle(card)}
        className={`inspect-frame ${narrow ? 'is-narrow' : ''} ${hero ? 'is-hero' : ''}`}
        // 前半圈是鏡像的背面，藏起來，轉過 90 度才出現，看起來就是翻牌
        style={{ width: w, maxHeight: vh - (narrow ? 24 : 48), transformPerspective: 1800, backfaceVisibility: 'hidden' }}
        initial={{ ...start, rotateY: -180, opacity: 0.2 }}
        animate={{ x: 0, y: 0, scale: 1, rotateY: 0, opacity: 1 }}
        variants={variants}
        exit="closed"
        transition={{ type: 'spring', stiffness: 170, damping: 22 }}
      >
        <div
          className={`flex max-h-[inherit] flex-col overflow-hidden bg-deck-surface text-deck-fg ${narrow ? 'rounded-[10px]' : 'rounded-[18px]'}`}
          style={{ maxHeight: vh - (narrow ? 24 + 8 : 48 + 18) }}
        >
          <header className="relative z-10 flex h-14 shrink-0 items-center gap-3 pr-3 pl-3 shadow-[0_6px_14px_var(--header-shadow)]">
            <span className={`card-badge grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-extrabold ${hero ? 'is-hero' : ''}`}>
              {hero ? '★' : no}
            </span>
            <p className="min-w-0 flex-1 truncate text-base font-bold tracking-[-0.02em]">{cardTitle(card)}</p>
            <button
              type="button"
              onClick={onReturn}
              className="soft-pill shrink-0 cursor-pointer rounded-full px-3.5 py-1.5 text-xs font-semibold text-deck-accent transition-shadow hover:shadow-[var(--raise-sm)] focus-visible:outline-2 focus-visible:outline-deck-accent active:shadow-[var(--press-sm)]"
            >
              收回手牌
            </button>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="關閉"
              className="soft-pill shrink-0 cursor-pointer rounded-full px-3.5 py-1.5 text-xs font-semibold transition-shadow hover:shadow-[var(--raise-sm)] focus-visible:outline-2 focus-visible:outline-deck-accent active:shadow-[var(--press-sm)]"
            >
              關閉 ✕
            </button>
          </header>

          {/* 正常情況一個畫面放得下；很矮的螢幕才需要捲 */}
          <div className="min-h-0 flex-1 overflow-y-auto px-5 pt-5 pb-6 sm:px-7 sm:pt-6 sm:pb-7">
            {card.kind === 'intro' ? <HeroBrief /> : <ProjectBrief card={card} />}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function HeroBrief() {
  return (
    <>
      <div className="flex items-center gap-5">
        <img
          src={profile.avatar}
          alt={profile.name}
          draggable={false}
          className="h-24 w-24 shrink-0 rounded-full border-4 border-deck-surface bg-deck-shade object-cover shadow-[var(--raise-sm)] sm:h-28 sm:w-28"
        />
        <div className="min-w-0">
          <p className="text-3xl font-bold tracking-[-0.03em]">{profile.name}</p>
          <p className="mt-1 text-xs font-bold tracking-[0.12em] text-deck-accent uppercase">{profile.titleEn}</p>
          <div className="mt-2.5 flex flex-wrap gap-2">
            {profile.roles.map((r) => (
              <Chip key={r}>{r}</Chip>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 space-y-2 text-[15px] leading-7 text-deck-muted">
        {profile.intro.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>

      <dl className="mt-5 grid grid-cols-[auto_1fr] gap-x-5 gap-y-1.5 text-sm">
        <dt className="text-deck-muted">Email</dt>
        <dd className="min-w-0 break-all">
          <a className="underline decoration-deck-accent/60 underline-offset-4 hover:text-deck-accent" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
        </dd>
        <dt className="text-deck-muted">GitHub</dt>
        <dd>
          <a
            className="underline decoration-deck-accent/60 underline-offset-4 hover:text-deck-accent"
            href={profile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            @{profile.githubHandle}
          </a>
        </dd>
      </dl>

      <Actions>
        <DetailLink to={HERO_DETAIL}>看完整自介、技能（經典版）</DetailLink>
      </Actions>
    </>
  )
}

function ProjectBrief({ card }: { card: Extract<CardData, { kind: 'project' }> }) {
  const p = card.project
  // cards.ts 載入時已檢查每個專案都有簡易介紹
  const b = BRIEFS[card.id]

  return (
    <>
      <figure>
        <div className="card-art relative overflow-hidden rounded-xl bg-deck-shade">
          <img src={b.shot.image} alt={b.shot.caption} draggable={false} className="h-[min(30vh,230px)] w-full object-cover object-top" />
        </div>
        <figcaption className="mt-1.5 text-xs leading-5 text-deck-muted">{b.shot.caption}</figcaption>
      </figure>

      <div className="mt-4 flex flex-wrap gap-2">
        {p.tags.map((t) => (
          <Chip key={t}>{t}</Chip>
        ))}
      </div>

      <p className="mt-3 text-[15px] leading-7">{p.desc}</p>

      <ul className="mt-4 space-y-2 text-[15px] leading-6 text-deck-muted">
        {b.points.map((t) => (
          <li key={t} className="flex gap-2.5">
            <span aria-hidden="true" className="shrink-0 text-deck-accent">
              ◆
            </span>
            {t}
          </li>
        ))}
      </ul>

      <Actions>
        <DetailLink to={p.to}>{p.to === '/gallery' ? '進設計實驗室' : '看完整介紹'}</DetailLink>
        {p.href ? (
          <a
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            className="soft-pill inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-shadow hover:shadow-[var(--raise-sm)] focus-visible:outline-2 focus-visible:outline-deck-accent active:shadow-[var(--press-sm)]"
          >
            <GithubIcon size={16} />
            GitHub ↗
          </a>
        ) : (
          // 私人專案：repo 不公開，不放連結
          <span className="inline-flex items-center gap-2 px-2 py-2.5 text-sm font-semibold text-deck-muted">
            <LockIcon size={16} />
            私人專案
          </span>
        )}
      </Actions>
    </>
  )
}

function Actions({ children }: { children: ReactNode }) {
  return <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-deck-fg/10 pt-5">{children}</div>
}

/** 主要按鈕：站內換頁到完整介紹；牌桌狀態已存在 sessionStorage，上一頁回來會原樣還原 */
function DetailLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-2 rounded-full bg-deck-accent px-5 py-2.5 text-sm font-bold text-(color:--deck-on-accent) transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-deck-accent"
    >
      {children}
      <span aria-hidden="true">→</span>
    </Link>
  )
}

function Chip({ children }: { children: ReactNode }) {
  return <span className="soft-pill rounded-full px-3 py-1 text-xs">{children}</span>
}
