import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { X } from 'lucide-react'
import { cn } from '../lib/cn'
import { focusRing, labelWeight } from './classes'

interface ChipProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  selected?: boolean
  children: ReactNode
}

/** 篩選用 chip（切換按鈕，aria-pressed） */
export function Chip({ selected = false, className, children, ...rest }: ChipProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      className={cn(
        'inline-flex h-8 shrink-0 cursor-pointer items-center gap-1.5 rounded-full border-(length:--tpl-border-width) px-3.5 text-[13px] whitespace-nowrap transition-[background-color,box-shadow,color,border-color] duration-150',
        labelWeight,
        focusRing,
        selected
          ? 'border-transparent bg-(--tpl-chip-selected-bg) text-(--tpl-chip-selected-fg) shadow-(--tpl-control-shadow-pressed)'
          : 'border-(--tpl-panel-border) bg-(--tpl-panel-bg) text-(--tpl-on-surface-variant) shadow-(--tpl-control-shadow) [backdrop-filter:var(--tpl-panel-backdrop)] hover:text-(--tpl-on-surface)',
        'disabled:cursor-not-allowed disabled:opacity-60',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  )
}

/** 已套用條件 chip（可移除） */
export function RemovableChip({ children, onRemove, removeLabel }: { children: ReactNode; onRemove: () => void; removeLabel: string }) {
  return (
    <span className="inline-flex h-7 items-center gap-1 rounded-full bg-(--tpl-selected-bg) pr-1 pl-3 text-xs text-(--tpl-selected-fg)">
      {children}
      <button
        type="button"
        onClick={onRemove}
        aria-label={removeLabel}
        className={cn('inline-flex size-5 cursor-pointer items-center justify-center rounded-full hover:bg-(--tpl-on-surface)/10', focusRing)}
      >
        <X size={12} />
      </button>
    </span>
  )
}
