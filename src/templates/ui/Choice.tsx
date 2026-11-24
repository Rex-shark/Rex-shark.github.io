import type { ReactNode } from 'react'
import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox'
import { Radio } from '@base-ui/react/radio'
import { RadioGroup as BaseRadioGroup } from '@base-ui/react/radio-group'
import { Switch as BaseSwitch } from '@base-ui/react/switch'
import { Check, Minus } from 'lucide-react'
import { cn } from '../lib/cn'
import { focusRing, muted } from './classes'

interface CheckboxProps {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  indeterminate?: boolean
  disabled?: boolean
  /** 可見標籤；不傳時必須給 ariaLabel */
  label?: ReactNode
  ariaLabel?: string
  /** 驗證失敗（例如必勾的條款） */
  invalid?: boolean
  describedBy?: string
  id?: string
  className?: string
}

/** 核取方塊（可含半選狀態） */
export function Checkbox({ checked, onCheckedChange, indeterminate, disabled, label, ariaLabel, invalid, describedBy, id, className }: CheckboxProps) {
  const box = (
    <BaseCheckbox.Root
      checked={checked}
      indeterminate={indeterminate}
      onCheckedChange={(v) => onCheckedChange(Boolean(v))}
      disabled={disabled}
      id={id}
      aria-label={label ? undefined : ariaLabel}
      aria-invalid={invalid || undefined}
      aria-describedby={describedBy}
      className={cn(
        'inline-flex size-[18px] shrink-0 cursor-pointer items-center justify-center rounded-[5px] border-(length:--tpl-border-width) border-(--tpl-outline-strong) bg-(--tpl-input-bg) text-(--tpl-on-accent) shadow-(--tpl-input-shadow) transition-colors',
        'data-[checked]:border-(--tpl-accent) data-[checked]:bg-(--tpl-accent) data-[checked]:shadow-none data-[indeterminate]:border-(--tpl-accent) data-[indeterminate]:bg-(--tpl-accent) data-[indeterminate]:shadow-none',
        'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-60',
        invalid && 'border-(--tpl-error) ring-2 ring-(--tpl-error)/25',
        focusRing,
      )}
    >
      <BaseCheckbox.Indicator className="flex data-[unchecked]:hidden">
        {indeterminate ? <Minus size={13} strokeWidth={3} /> : <Check size={13} strokeWidth={3} />}
      </BaseCheckbox.Indicator>
    </BaseCheckbox.Root>
  )
  if (!label) return <span className={className}>{box}</span>
  return (
    <label className={cn('inline-flex cursor-pointer items-center gap-2.5 text-sm', disabled && 'cursor-not-allowed opacity-70', className)}>
      {box}
      <span>{label}</span>
    </label>
  )
}

interface RadioOption<V extends string> {
  value: V
  label: ReactNode
  description?: ReactNode
  disabled?: boolean
}

interface RadioGroupProps<V extends string> {
  value: V | null
  onValueChange: (value: V) => void
  options: RadioOption<V>[]
  ariaLabel: string
  /** list：一般單選；cards：可點選的卡片（付款方式、方案等） */
  variant?: 'list' | 'cards'
  className?: string
}

/** 單選群組（一般或卡片樣式），鍵盤方向鍵切換由 base-ui 處理 */
export function RadioGroup<V extends string>({ value, onValueChange, options, ariaLabel, variant = 'list', className }: RadioGroupProps<V>) {
  return (
    <BaseRadioGroup
      value={value ?? ''}
      onValueChange={(v) => onValueChange(v as V)}
      aria-label={ariaLabel}
      className={cn(variant === 'cards' ? 'grid gap-3' : 'flex flex-col gap-2.5', className)}
    >
      {options.map((o) => (
        <label
          key={o.value}
          className={cn(
            'flex cursor-pointer items-start gap-3 text-sm',
            variant === 'cards' &&
              'rounded-(--tpl-radius-md) border-(length:--tpl-border-width) border-(--tpl-panel-border) bg-(--tpl-panel-bg) p-4 shadow-(--tpl-control-shadow) transition-[border-color,box-shadow,background-color] has-[[data-checked]]:border-(--tpl-accent) has-[[data-checked]]:bg-(--tpl-selected-bg) has-[[data-checked]]:shadow-(--tpl-control-shadow-pressed)',
            o.disabled && 'cursor-not-allowed opacity-60',
          )}
        >
          <Radio.Root
            value={o.value}
            disabled={o.disabled}
            className={cn(
              'mt-0.5 inline-flex size-[18px] shrink-0 cursor-pointer items-center justify-center rounded-full border-(length:--tpl-border-width) border-(--tpl-outline-strong) bg-(--tpl-input-bg) shadow-(--tpl-input-shadow) data-[checked]:border-(--tpl-accent) data-[checked]:bg-(--tpl-accent) data-[checked]:shadow-none',
              focusRing,
            )}
          >
            <Radio.Indicator className="size-2 rounded-full bg-(--tpl-on-accent) data-[unchecked]:hidden" />
          </Radio.Root>
          <span className="flex flex-col gap-0.5">
            <span className={variant === 'cards' ? 'font-medium' : undefined}>{o.label}</span>
            {o.description && <span className={cn('text-xs', muted)}>{o.description}</span>}
          </span>
        </label>
      ))}
    </BaseRadioGroup>
  )
}

interface SwitchProps {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  disabled?: boolean
  label?: ReactNode
  description?: ReactNode
  ariaLabel?: string
  className?: string
}

/** 開關。有 label 時整列可點 */
export function Switch({ checked, onCheckedChange, disabled, label, description, ariaLabel, className }: SwitchProps) {
  const control = (
    <BaseSwitch.Root
      checked={checked}
      onCheckedChange={onCheckedChange}
      disabled={disabled}
      aria-label={label ? undefined : ariaLabel}
      className={cn(
        'relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full bg-(--tpl-switch-off) p-0.5 shadow-(--tpl-control-shadow-pressed) transition-colors duration-150 data-[checked]:bg-(--tpl-switch-on) data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
        focusRing,
      )}
    >
      <BaseSwitch.Thumb className="size-5 rounded-full bg-(--tpl-switch-thumb) shadow-[0_1px_3px_rgba(0,0,0,0.25)] transition-transform duration-150 ease-out data-[checked]:translate-x-5 motion-reduce:transition-none" />
    </BaseSwitch.Root>
  )
  if (!label) return control
  return (
    <label className={cn('flex cursor-pointer items-center justify-between gap-4', disabled && 'cursor-not-allowed opacity-70', className)}>
      <span className="flex flex-col gap-0.5">
        <span className="text-sm">{label}</span>
        {description && <span className={cn('text-xs', muted)}>{description}</span>}
      </span>
      {control}
    </label>
  )
}
