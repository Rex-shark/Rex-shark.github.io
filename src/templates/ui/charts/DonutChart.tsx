import { useState } from 'react'
import { cn } from '../../lib/cn'
import { focusRing, heading, muted, numeric } from '../classes'

export interface DonutSegment {
  key: string
  label: string
  value: number
}

const COLORS = ['var(--tpl-chart-1)', 'var(--tpl-chart-2)', 'var(--tpl-chart-3)', 'var(--tpl-chart-4)']

interface DonutChartProps {
  segments: DonutSegment[]
  ariaLabel: string
  centerLabel?: string
}

/**
 * 甜甜圈圖＋可切換的圖例。點圖例隱藏／顯示分類，剩下的分類重新計算占比。
 * 顏色依序取 --tpl-chart-1..4；區塊之間留畫布色間隔。
 */
export default function DonutChart({ segments, ariaLabel, centerLabel = '占比' }: DonutChartProps) {
  const [hidden, setHidden] = useState<Set<string>>(new Set())
  const visible = segments.filter((s) => !hidden.has(s.key))
  const total = visible.reduce((sum, s) => sum + s.value, 0)

  const R = 70
  const C = 2 * Math.PI * R
  const GAP = visible.length > 1 ? 3 : 0
  const arcs = visible.map((s, i) => {
    const len = total ? (s.value / total) * C : 0
    const start = visible.slice(0, i).reduce((sum, v) => sum + (total ? (v.value / total) * C : 0), 0)
    return { s, dash: Math.max(0, len - GAP), start }
  })

  function toggle(key: string) {
    setHidden((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else if (segments.length - next.size > 1) next.add(key) // 至少保留一個分類
      return next
    })
  }

  const share = (s: DonutSegment) => (total ? Math.round((s.value / total) * 1000) / 10 : 0)

  return (
    // 自己是容器：依卡片實際寬度決定圖例在下方或右側
    <div className="@container">
    <div className="flex flex-col items-center gap-6 @sm:flex-row @sm:items-center">
      <svg viewBox="0 0 180 180" className="size-40 shrink-0 -rotate-90" role="img" aria-label={`${ariaLabel}：${visible.map((s) => `${s.label} ${share(s)}%`).join('、')}`}>
        <circle cx="90" cy="90" r={R} fill="none" stroke="var(--tpl-skeleton)" strokeWidth="22" />
        {arcs.map(({ s, dash, start }) => (
            <circle
              key={s.key}
              cx="90"
              cy="90"
              r={R}
              fill="none"
              stroke={COLORS[segments.indexOf(s) % COLORS.length]}
              strokeWidth="22"
              strokeDasharray={`${dash} ${C - dash}`}
              strokeDashoffset={-start}
              className="transition-[stroke-dasharray,stroke-dashoffset] duration-300 motion-reduce:transition-none"
            />
        ))}
        <g className="rotate-90 [transform-origin:90px_90px]">
          <text x="90" y="84" textAnchor="middle" fontSize="12" fill="var(--tpl-on-surface-variant)">
            {centerLabel}
          </text>
          <text x="90" y="106" textAnchor="middle" fontSize="20" fontWeight="700" fill="var(--tpl-on-surface)">
            {visible.length}/{segments.length} 類
          </text>
        </g>
      </svg>
      <ul className="grid w-full flex-1 gap-1">
        {segments.map((s, i) => {
          const off = hidden.has(s.key)
          return (
            <li key={s.key}>
              <button
                type="button"
                aria-pressed={!off}
                onClick={() => toggle(s.key)}
                className={cn(
                  'flex w-full cursor-pointer items-center gap-3 rounded-(--tpl-radius-sm) px-2 py-1.5 text-left text-sm transition-colors hover:bg-(--tpl-row-hover-bg)',
                  focusRing,
                  off && 'opacity-50',
                )}
              >
                <span className="size-3 shrink-0 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} aria-hidden />
                <span className={cn('flex-1', off && 'line-through')}>{s.label}</span>
                <span className={cn(numeric, off ? muted : heading, 'text-sm')}>{off ? '已隱藏' : `${share(s)}%`}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
    </div>
  )
}
