import type { ReactNode } from 'react'
import { cn } from '../lib/cn'
import { labelWeight } from './classes'

export type BadgeTone = 'neutral' | 'success' | 'warning' | 'error' | 'info' | 'accent'

const TONE: Record<BadgeTone, string> = {
  neutral: 'bg-(--tpl-badge-neutral-bg) text-(--tpl-badge-neutral-fg)',
  success: 'bg-(--tpl-success-container) text-(--tpl-on-success-container)',
  warning: 'bg-(--tpl-warning-container) text-(--tpl-on-warning-container)',
  error: 'bg-(--tpl-error-container) text-(--tpl-on-error-container)',
  info: 'bg-(--tpl-info-container) text-(--tpl-on-info-container)',
  accent: 'bg-(--tpl-badge-accent-bg) text-(--tpl-badge-accent-fg)',
}

/** 狀態徽章：一律「淺底深字」（玻璃態為深底淺字），不使用實心彩色 */
export default function Badge({ tone = 'neutral', children, className, dot }: { tone?: BadgeTone; children: ReactNode; className?: string; dot?: boolean }) {
  return (
    <span
      className={cn(
        'inline-flex h-6 shrink-0 items-center gap-1.5 rounded-full px-2.5 text-xs whitespace-nowrap',
        labelWeight,
        TONE[tone],
        className,
      )}
    >
      {dot && <span className="size-1.5 rounded-full bg-current" aria-hidden />}
      {children}
    </span>
  )
}
