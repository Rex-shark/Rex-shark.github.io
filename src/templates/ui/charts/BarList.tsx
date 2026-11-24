import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'
import { muted, numeric } from '../classes'

export interface BarRow {
  key: string
  label: ReactNode
  value: number
  /** 左側縮圖等 */
  leading?: ReactNode
  valueLabel?: string
}

/** 水平長條清單：以第一名為 100% */
export default function BarList({ rows, ariaLabel }: { rows: BarRow[]; ariaLabel: string }) {
  const max = Math.max(...rows.map((r) => r.value), 1)
  return (
    <ol aria-label={ariaLabel} className="flex flex-col gap-3.5">
      {rows.map((r, i) => (
        <li key={r.key} className="flex items-center gap-3">
          <span className={cn('w-4 shrink-0 text-center text-xs', muted, numeric)}>{i + 1}</span>
          {r.leading}
          <div className="min-w-0 flex-1">
            <div className="mb-1.5 flex items-baseline justify-between gap-2 text-sm">
              <span className="truncate">{r.label}</span>
              <span className={cn('shrink-0 text-[13px]', numeric)}>{r.valueLabel ?? r.value}</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-(--tpl-skeleton)" aria-hidden>
              <div className="h-full rounded-full bg-(--tpl-chart-1)" style={{ width: `${(r.value / max) * 100}%` }} />
            </div>
          </div>
        </li>
      ))}
    </ol>
  )
}
