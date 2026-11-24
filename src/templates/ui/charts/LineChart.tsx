import { useId, useState, type KeyboardEvent, type PointerEvent } from 'react'
import { cn } from '../../lib/cn'
import { focusRing, numeric } from '../classes'
import { useWidth } from './useWidth'

export interface LinePoint {
  label: string
  value: number
}

interface LineChartProps {
  data: LinePoint[]
  /** tooltip 與 y 軸的數值格式 */
  format: (value: number) => string
  /** y 軸刻度格式（較短），預設同 format */
  axisFormat?: (value: number) => string
  height?: number
  ariaLabel: string
}

const PAD = { top: 16, right: 16, bottom: 28, left: 52 }

function niceMax(v: number) {
  const pow = 10 ** Math.floor(Math.log10(v))
  const steps = [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10]
  return (steps.find((s) => s * pow >= v) ?? 10) * pow
}

/**
 * 折線＋面積圖（自繪 SVG）。滑鼠移動或鍵盤 ← → 逐點檢視，tooltip 顯示日期與數值。
 * 顏色取 --tpl-chart-1。
 */
export default function LineChart({ data, format, axisFormat = format, height = 240, ariaLabel }: LineChartProps) {
  const [ref, width] = useWidth<HTMLDivElement>()
  const [active, setActive] = useState<number | null>(null)
  const gradId = useId()

  const innerW = Math.max(1, width - PAD.left - PAD.right)
  const innerH = height - PAD.top - PAD.bottom
  const max = niceMax(Math.max(...data.map((d) => d.value)) * 1.05)
  const x = (i: number) => PAD.left + (data.length === 1 ? innerW / 2 : (i / (data.length - 1)) * innerW)
  const y = (v: number) => PAD.top + innerH - (v / max) * innerH
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((t) => t * max)

  const line = data.map((d, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(d.value).toFixed(1)}`).join(' ')
  const area = `${line} L${x(data.length - 1).toFixed(1)},${PAD.top + innerH} L${x(0).toFixed(1)},${PAD.top + innerH} Z`
  const labelEvery = width < 480 && data.length > 7 ? 2 : 1

  function onPointerMove(e: PointerEvent<SVGSVGElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    const px = e.clientX - rect.left
    let best = 0
    data.forEach((_, i) => {
      if (Math.abs(x(i) - px) < Math.abs(x(best) - px)) best = i
    })
    setActive(best)
  }

  function onKeyDown(e: KeyboardEvent) {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return
    e.preventDefault()
    e.stopPropagation()
    setActive((cur) => {
      const base = cur ?? (e.key === 'ArrowRight' ? -1 : data.length)
      return Math.max(0, Math.min(data.length - 1, base + (e.key === 'ArrowRight' ? 1 : -1)))
    })
  }

  const point = active !== null ? data[active] : null

  return (
    <div ref={ref} className="relative w-full">
      <svg
        width={width}
        height={height}
        role="img"
        aria-label={`${ariaLabel}。用左右方向鍵逐點檢視。`}
        tabIndex={0}
        onPointerMove={onPointerMove}
        onPointerLeave={() => setActive(null)}
        onKeyDown={onKeyDown}
        onBlur={() => setActive(null)}
        className={cn('block rounded-(--tpl-radius-sm)', focusRing)}
      >
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="var(--tpl-chart-1)" stopOpacity="0.22" />
            <stop offset="1" stopColor="var(--tpl-chart-1)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {ticks.map((t) => (
          <g key={t}>
            <line x1={PAD.left} x2={width - PAD.right} y1={y(t)} y2={y(t)} stroke="var(--tpl-outline)" strokeDasharray={t === 0 ? undefined : '3 4'} />
            <text x={PAD.left - 10} y={y(t)} dy="0.32em" textAnchor="end" fontSize="11" fill="var(--tpl-on-surface-subtle)" className="tabular-nums">
              {axisFormat(t)}
            </text>
          </g>
        ))}
        <path d={area} fill={`url(#${gradId})`} />
        <path d={line} fill="none" stroke="var(--tpl-chart-1)" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
        {data.map((d, i) =>
          i % labelEvery === 0 || i === data.length - 1 ? (
            <text key={d.label} x={x(i)} y={height - 8} textAnchor="middle" fontSize="11" fill="var(--tpl-on-surface-subtle)">
              {d.label}
            </text>
          ) : null,
        )}
        {active !== null && (
          <g aria-hidden>
            <line x1={x(active)} x2={x(active)} y1={PAD.top} y2={PAD.top + innerH} stroke="var(--tpl-outline-strong)" />
            <circle cx={x(active)} cy={y(data[active].value)} r="5" fill="var(--tpl-chart-1)" stroke="var(--tpl-surface)" strokeWidth="2" />
          </g>
        )}
      </svg>
      {point && active !== null && (
        <div
          role="status"
          className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full rounded-(--tpl-radius-sm) bg-(--tpl-tooltip-bg) px-2.5 py-1.5 text-xs whitespace-nowrap text-(--tpl-tooltip-fg) shadow-(--tpl-overlay-shadow)"
          style={{ left: Math.min(Math.max(x(active), 60), width - 60), top: y(point.value) - 10 }}
        >
          <span className="opacity-80">{point.label}</span>
          <span className={cn('ml-2 font-semibold', numeric)}>{format(point.value)}</span>
        </div>
      )}
    </div>
  )
}
