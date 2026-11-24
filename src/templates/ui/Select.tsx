import { Select as BaseSelect } from '@base-ui/react/select'
import { Check, ChevronDown } from 'lucide-react'
import { cn } from '../lib/cn'
import { useTplOverlayRoot } from '../viewer/context'
import { inputBase, overlaySurface, popIn } from './classes'

export interface SelectItem<V extends string> {
  value: V
  label: string
  disabled?: boolean
}

interface SelectProps<V extends string> {
  value: V | null
  onValueChange: (value: V) => void
  items: SelectItem<V>[]
  placeholder?: string
  /** 搭配 Field 時傳入 id／aria-describedby／invalid */
  id?: string
  describedBy?: string
  invalid?: boolean
  ariaLabel?: string
  disabled?: boolean
  className?: string
}

/** 下拉選單（取代原生 select，浮層掛在範本外框內） */
export default function Select<V extends string>({
  value, onValueChange, items, placeholder = '請選擇', id, describedBy, invalid, ariaLabel, disabled, className,
}: SelectProps<V>) {
  const root = useTplOverlayRoot()
  const current = items.find((i) => i.value === value)
  return (
    <BaseSelect.Root<V> value={value} onValueChange={(v) => v !== null && onValueChange(v)} disabled={disabled}>
      <BaseSelect.Trigger
        id={id}
        aria-label={ariaLabel}
        aria-describedby={describedBy}
        aria-invalid={invalid || undefined}
        className={cn(inputBase, 'flex cursor-pointer items-center justify-between gap-2 text-left data-[popup-open]:border-(--tpl-focus-ring)', className)}
      >
        <span className={cn('truncate', !current && 'text-(--tpl-on-surface-subtle)')}>{current?.label ?? placeholder}</span>
        <ChevronDown size={16} className="shrink-0 text-(--tpl-on-surface-variant)" aria-hidden />
      </BaseSelect.Trigger>
      {root && (
        <BaseSelect.Portal container={root}>
          <BaseSelect.Positioner alignItemWithTrigger={false} sideOffset={6} collisionPadding={12} className="pointer-events-auto z-10 outline-none">
            <BaseSelect.Popup
              className={cn('max-h-72 min-w-(--anchor-width) overflow-y-auto rounded-(--tpl-radius-md) p-1.5 outline-none', overlaySurface, popIn)}
            >
              {items.map((item) => (
                <BaseSelect.Item
                  key={item.value}
                  value={item.value}
                  disabled={item.disabled}
                  className="flex h-9 cursor-pointer items-center justify-between gap-3 rounded-(--tpl-radius-sm) px-3 text-sm outline-none select-none data-[disabled]:cursor-not-allowed data-[disabled]:text-(--tpl-on-disabled) data-[highlighted]:bg-(--tpl-ghost-hover-bg) data-[selected]:text-(--tpl-accent)"
                >
                  <BaseSelect.ItemText>{item.label}</BaseSelect.ItemText>
                  <BaseSelect.ItemIndicator>
                    <Check size={15} aria-hidden />
                  </BaseSelect.ItemIndicator>
                </BaseSelect.Item>
              ))}
            </BaseSelect.Popup>
          </BaseSelect.Positioner>
        </BaseSelect.Portal>
      )}
    </BaseSelect.Root>
  )
}
