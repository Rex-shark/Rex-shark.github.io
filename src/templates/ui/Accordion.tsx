import type { ReactNode } from 'react'
import { Accordion as BaseAccordion } from '@base-ui/react/accordion'
import { ChevronDown } from 'lucide-react'
import { cn } from '../lib/cn'
import { focusRing, labelWeight, muted, panel } from './classes'

export interface AccordionEntry {
  value: string
  title: ReactNode
  content: ReactNode
}

interface AccordionProps {
  items: AccordionEntry[]
  /** 可同時展開多個 */
  multiple?: boolean
  defaultOpen?: string[]
  value?: string[]
  onValueChange?: (value: string[]) => void
  className?: string
}

/** 手風琴：整組放在一片面板內，項目之間以細線分隔 */
export default function Accordion({ items, multiple = false, defaultOpen, value, onValueChange, className }: AccordionProps) {
  return (
    <BaseAccordion.Root
      multiple={multiple}
      defaultValue={defaultOpen}
      value={value}
      onValueChange={onValueChange ? (v) => onValueChange(v as string[]) : undefined}
      className={cn('divide-y divide-(--tpl-outline) overflow-hidden rounded-(--tpl-card-radius)', panel, className)}
    >
      {items.map((item) => (
        <BaseAccordion.Item key={item.value} value={item.value}>
          <BaseAccordion.Header>
            <BaseAccordion.Trigger
              className={cn(
                'group flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left text-[15px] transition-colors hover:bg-(--tpl-row-hover-bg)',
                labelWeight,
                focusRing,
                '-outline-offset-2',
              )}
            >
              {item.title}
              <ChevronDown
                size={18}
                aria-hidden
                className="shrink-0 text-(--tpl-on-surface-variant) transition-transform duration-200 group-data-[panel-open]:rotate-180 motion-reduce:transition-none"
              />
            </BaseAccordion.Trigger>
          </BaseAccordion.Header>
          <BaseAccordion.Panel className="h-(--accordion-panel-height) overflow-hidden transition-[height] duration-200 ease-out data-[ending-style]:h-0 data-[starting-style]:h-0 motion-reduce:transition-none">
            <div className={cn('px-5 pb-5 text-sm leading-relaxed', muted)}>{item.content}</div>
          </BaseAccordion.Panel>
        </BaseAccordion.Item>
      ))}
    </BaseAccordion.Root>
  )
}
