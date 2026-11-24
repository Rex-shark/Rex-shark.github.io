import type { ReactNode } from 'react'
import { Inbox } from 'lucide-react'
import { cn } from '../lib/cn'
import { heading, muted } from './classes'

/** 進度條（免運進度等） */
export function Progress({ value, max = 100, label, tone = 'accent' }: { value: number; max?: number; label: string; tone?: 'accent' | 'success' }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100))
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={Math.round(value)}
      className="h-2 w-full overflow-hidden rounded-full bg-(--tpl-skeleton) shadow-(--tpl-input-shadow)"
    >
      <div
        className={cn('h-full rounded-full transition-[width] duration-300 ease-out motion-reduce:transition-none', tone === 'success' ? 'bg-(--tpl-success)' : 'bg-(--tpl-accent)')}
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}

/** 骨架屏色塊：呼吸動畫，prefers-reduced-motion 時靜止 */
export function Skeleton({ className }: { className?: string }) {
  return <div aria-hidden className={cn('animate-pulse rounded-(--tpl-radius-sm) bg-(--tpl-skeleton) motion-reduce:animate-none', className)} />
}

interface EmptyStateProps {
  title: ReactNode
  description?: ReactNode
  action?: ReactNode
  icon?: ReactNode
  className?: string
}

/** 空狀態 */
export function EmptyState({ title, description, action, icon, className }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center px-6 py-14 text-center', className)}>
      <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-(--tpl-skeleton) text-(--tpl-on-surface-variant) shadow-(--tpl-input-shadow)" aria-hidden>
        {icon ?? <Inbox size={24} />}
      </div>
      <p className={cn('text-base', heading)}>{title}</p>
      {description && <p className={cn('mt-1 max-w-sm text-sm', muted)}>{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}
