import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '../lib/cn'
import { focusRing, labelWeight } from './classes'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
export type ButtonSize = 'md' | 'sm' | 'icon' | 'icon-sm'

const VARIANT: Record<ButtonVariant, string> = {
  primary:
    'border-(length:--tpl-border-width) border-(--tpl-primary-border) bg-(--tpl-primary) text-(--tpl-on-primary) shadow-(--tpl-primary-shadow) hover:bg-(--tpl-primary-hover) hover:ring-4 hover:ring-(--tpl-primary-glow) active:shadow-(--tpl-control-shadow-pressed)',
  secondary:
    'border-(length:--tpl-border-width) border-(--tpl-btn-secondary-border) bg-(--tpl-btn-secondary-bg) text-(--tpl-on-surface) shadow-(--tpl-control-shadow) [backdrop-filter:var(--tpl-panel-backdrop)] hover:bg-(--tpl-btn-secondary-hover-bg) active:shadow-(--tpl-control-shadow-pressed)',
  ghost:
    'bg-transparent text-(--tpl-on-surface-variant) hover:bg-(--tpl-ghost-hover-bg) hover:text-(--tpl-on-surface) active:shadow-(--tpl-control-shadow-pressed)',
  danger: 'border-(length:--tpl-border-width) border-(--tpl-primary-border) bg-(--tpl-error) text-(--tpl-on-error) hover:brightness-95 active:shadow-(--tpl-control-shadow-pressed)',
}

const SIZE: Record<ButtonSize, string> = {
  md: 'h-(--tpl-control-h) px-5 text-sm',
  sm: 'h-8 px-3 text-[13px]',
  icon: 'size-(--tpl-control-h) p-0',
  'icon-sm': 'size-8 p-0',
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
}

/** 按鈕：主要／次要／文字／危險。loading 時顯示轉圈並停用 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', loading = false, disabled, className, children, type = 'button', ...rest },
  ref,
) {
  const isDisabled = disabled || loading
  return (
    <button
      ref={ref}
      type={type}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      className={cn(
        'relative inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-(--tpl-radius-control) whitespace-nowrap select-none transition-[background-color,box-shadow,color,filter] duration-150 ease-out',
        labelWeight,
        focusRing,
        VARIANT[variant],
        SIZE[size],
        isDisabled &&
          'cursor-not-allowed border-transparent bg-(--tpl-disabled) text-(--tpl-on-disabled) shadow-none hover:bg-(--tpl-disabled) hover:text-(--tpl-on-disabled) hover:ring-0 hover:brightness-100 active:shadow-none',
        loading && 'cursor-progress',
        className,
      )}
      {...rest}
    >
      {loading && <Loader2 size={16} className="animate-spin motion-reduce:animate-none" aria-hidden />}
      {children}
    </button>
  )
})

export default Button
