import { useRef, type KeyboardEvent, type ReactNode } from 'react'
import { cn } from '../lib/cn'
import { focusRing, labelWeight } from './classes'

interface SegmentedOption<V extends string> {
  value: V
  label: ReactNode
  /** 只有圖示時的無障礙名稱 */
  ariaLabel?: string
}

interface SegmentedProps<V extends string> {
  value: V
  onValueChange: (value: V) => void
  options: SegmentedOption<V>[]
  ariaLabel: string
  size?: 'md' | 'sm'
  className?: string
}

/** 分段控制（radiogroup）：方向鍵切換 */
export default function Segmented<V extends string>({ value, onValueChange, options, ariaLabel, size = 'sm', className }: SegmentedProps<V>) {
  const refs = useRef<(HTMLButtonElement | null)[]>([])

  function onKeyDown(e: KeyboardEvent, index: number) {
    const dir = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0
    if (!dir) return
    e.preventDefault()
    e.stopPropagation()
    const next = (index + dir + options.length) % options.length
    onValueChange(options[next].value)
    refs.current[next]?.focus()
  }

  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className={cn(
        'inline-flex items-center gap-1 rounded-(--tpl-radius-control) bg-(--tpl-seg-track-bg) p-1 shadow-(--tpl-seg-track-shadow)',
        className,
      )}
    >
      {options.map((o, i) => {
        const active = o.value === value
        return (
          <button
            key={o.value}
            ref={(el) => {
              refs.current[i] = el
            }}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={o.ariaLabel}
            tabIndex={active ? 0 : -1}
            onClick={() => onValueChange(o.value)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={cn(
              'inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-(--tpl-radius-control) px-3 whitespace-nowrap transition-[background-color,box-shadow,color] duration-150',
              labelWeight,
              focusRing,
              size === 'sm' ? 'h-7 text-[13px]' : 'h-9 text-sm',
              active
                ? 'bg-(--tpl-seg-active-bg) text-(--tpl-seg-active-fg) shadow-(--tpl-seg-active-shadow)'
                : 'text-(--tpl-on-surface-variant) hover:text-(--tpl-on-surface)',
            )}
          >
            {o.label}
          </button>
        )
      })}
    </div>
  )
}
