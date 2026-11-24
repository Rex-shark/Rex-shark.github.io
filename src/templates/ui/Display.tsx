import { Star } from 'lucide-react'
import { cn } from '../lib/cn'
import { labelWeight, muted, numeric } from './classes'

/** 星等（唯讀），支援小數，例如 4.8 */
export function Rating({ value, count, size = 14 }: { value: number; count?: number; size?: number }) {
  return (
    <span className="inline-flex items-center gap-1.5" aria-label={`${value} 顆星（滿分 5）${count !== undefined ? `，${count} 則評論` : ''}`}>
      <span className="relative inline-flex" aria-hidden>
        <span className="flex text-(--tpl-outline-strong)">
          {Array.from({ length: 5 }, (_, i) => (
            <Star key={i} size={size} fill="currentColor" strokeWidth={0} />
          ))}
        </span>
        <span className="absolute inset-y-0 left-0 flex overflow-hidden text-(--tpl-tertiary)" style={{ width: `${(value / 5) * 100}%` }}>
          {Array.from({ length: 5 }, (_, i) => (
            <Star key={i} size={size} fill="currentColor" strokeWidth={0} className="shrink-0" />
          ))}
        </span>
      </span>
      <span className={cn('text-[13px]', numeric)}>{value.toFixed(1)}</span>
      {count !== undefined && <span className={cn('text-[13px]', muted, numeric)}>（{count}）</span>}
    </span>
  )
}

const AVATAR_TONE = [
  'bg-(--tpl-selected-bg) text-(--tpl-selected-fg)',
  'bg-(--tpl-success-container) text-(--tpl-on-success-container)',
  'bg-(--tpl-warning-container) text-(--tpl-on-warning-container)',
  'bg-(--tpl-info-container) text-(--tpl-on-info-container)',
  'bg-(--tpl-error-container) text-(--tpl-on-error-container)',
  'bg-(--tpl-badge-neutral-bg) text-(--tpl-badge-neutral-fg)',
]

/** 文字頭像（姓名第一個字），底色依 tone 固定，不使用真人照片 */
export function Avatar({ name, tone = 0, size = 'md' }: { name: string; tone?: number; size?: 'sm' | 'md' | 'lg' }) {
  return (
    <span
      aria-hidden
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-full shadow-(--tpl-control-shadow)',
        labelWeight,
        AVATAR_TONE[tone % AVATAR_TONE.length],
        size === 'sm' && 'size-7 text-xs',
        size === 'md' && 'size-9 text-sm',
        size === 'lg' && 'size-14 text-lg',
      )}
    >
      {name.slice(0, 1)}
    </span>
  )
}
