import { forwardRef, useId, type InputHTMLAttributes, type ReactNode, type TextareaHTMLAttributes } from 'react'
import { AlertCircle, Minus, Plus } from 'lucide-react'
import { cn } from '../lib/cn'
import { focusRing, inputBase, labelWeight, muted, numeric } from './classes'

interface FieldProps {
  label: ReactNode
  /** 欄位說明（顯示在輸入框下方） */
  hint?: ReactNode
  error?: string
  required?: boolean
  /** 右側附加資訊，例如字數 12/120 */
  aside?: ReactNode
  className?: string
  children: (ids: { id: string; describedBy: string | undefined; invalid: boolean }) => ReactNode
}

/** 表單欄位外框：標籤在上、錯誤訊息在下，並串好 aria 關聯 */
export function Field({ label, hint, error, required, aside, className, children }: FieldProps) {
  const id = useId()
  const hintId = `${id}-hint`
  const errorId = `${id}-error`
  const describedBy = [hint ? hintId : null, error ? errorId : null].filter(Boolean).join(' ') || undefined
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <div className="flex items-baseline justify-between gap-2">
        <label htmlFor={id} className={cn('text-[13px] text-(--tpl-on-surface)', labelWeight)}>
          {label}
          {required && (
            <span className="ml-0.5 text-(--tpl-error)" aria-hidden>
              *
            </span>
          )}
        </label>
        {aside && <span className={cn('text-xs', muted, numeric)}>{aside}</span>}
      </div>
      {children({ id, describedBy, invalid: Boolean(error) })}
      {hint && !error && (
        <p id={hintId} className={cn('text-xs', muted)}>
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="flex items-center gap-1 text-[13px] text-(--tpl-error)">
          <AlertCircle size={14} aria-hidden className="shrink-0" />
          {error}
        </p>
      )}
    </div>
  )
}

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement> & { prefixText?: string }>(function Input(
  { className, prefixText, ...rest },
  ref,
) {
  if (prefixText) {
    return (
      <div className="relative">
        <span className={cn('pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-sm', muted)}>{prefixText}</span>
        <input ref={ref} className={cn(inputBase, 'pl-12', className)} {...rest} />
      </div>
    )
  }
  return <input ref={ref} className={cn(inputBase, className)} {...rest} />
})

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(function Textarea(
  { className, rows = 4, ...rest },
  ref,
) {
  return <textarea ref={ref} rows={rows} className={cn(inputBase, 'h-auto resize-y py-2.5 leading-relaxed', className)} {...rest} />
})

interface QuantityInputProps {
  value: number
  min?: number
  max: number
  onChange: (value: number) => void
  label?: string
  size?: 'md' | 'sm'
}

/** 數量步進器 − [n] + */
export function QuantityInput({ value, min = 1, max, onChange, label = '數量', size = 'md' }: QuantityInputProps) {
  const btn = cn(
    'inline-flex shrink-0 cursor-pointer items-center justify-center text-(--tpl-on-surface) transition-colors hover:bg-(--tpl-ghost-hover-bg) disabled:cursor-not-allowed disabled:text-(--tpl-on-disabled) disabled:hover:bg-transparent',
    focusRing,
    size === 'md' ? 'size-(--tpl-control-h)' : 'size-8',
  )
  return (
    <div
      role="group"
      aria-label={label}
      className={cn(
        'inline-flex items-center overflow-hidden rounded-(--tpl-radius-control) border-(length:--tpl-border-width) border-(--tpl-input-border) bg-(--tpl-input-bg) shadow-(--tpl-input-shadow)',
        size === 'sm' && 'h-8',
      )}
    >
      <button type="button" className={btn} onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min} aria-label={`減少${label}`}>
        <Minus size={size === 'md' ? 16 : 14} />
      </button>
      <span aria-live="polite" className={cn('min-w-8 text-center text-sm', numeric)}>
        {value}
      </span>
      <button type="button" className={btn} onClick={() => onChange(Math.min(max, value + 1))} disabled={value >= max} aria-label={`增加${label}`}>
        <Plus size={size === 'md' ? 16 : 14} />
      </button>
    </div>
  )
}
