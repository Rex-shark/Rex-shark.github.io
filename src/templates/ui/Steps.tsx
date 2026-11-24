import { Check } from 'lucide-react'
import { cn } from '../lib/cn'
import { focusRing, labelWeight, muted } from './classes'

interface StepsProps {
  steps: string[]
  /** 目前步驟（0 起算） */
  current: number
  /** 點已完成步驟回到該步（未傳則不可點） */
  onStepClick?: (index: number) => void
  className?: string
}

/** 步驟條：已完成／目前／未到達三種樣式；窄寬度只顯示「步驟 2 / 4 ・ 名稱」 */
export default function Steps({ steps, current, onStepClick, className }: StepsProps) {
  return (
    <nav aria-label="步驟" className={className}>
      <p className={cn('text-sm @3xl:hidden', muted)}>
        步驟 {current + 1} / {steps.length} ・ <span className="text-(--tpl-on-surface)">{steps[current]}</span>
      </p>
      <ol className="hidden items-center @3xl:flex">
        {steps.map((label, i) => {
          const state = i < current ? 'done' : i === current ? 'current' : 'upcoming'
          const clickable = state === 'done' && onStepClick
          const node = (
            <>
              <span
                className={cn(
                  'inline-flex size-8 shrink-0 items-center justify-center rounded-full text-[13px]',
                  labelWeight,
                  state === 'done' && 'bg-(--tpl-step-done-bg) text-(--tpl-step-done-fg)',
                  state === 'current' && 'bg-(--tpl-primary) text-(--tpl-on-primary) shadow-(--tpl-primary-shadow)',
                  state === 'upcoming' && 'bg-(--tpl-skeleton) text-(--tpl-on-surface-variant) shadow-(--tpl-control-shadow-pressed)',
                )}
              >
                {state === 'done' ? <Check size={15} strokeWidth={3} /> : i + 1}
              </span>
              <span className={cn('text-sm whitespace-nowrap', state === 'upcoming' ? muted : 'text-(--tpl-on-surface)', state === 'current' && labelWeight)}>
                {label}
              </span>
            </>
          )
          return (
            <li key={label} className="flex flex-1 items-center gap-3 last:flex-none" aria-current={state === 'current' ? 'step' : undefined}>
              {clickable ? (
                <button type="button" onClick={() => onStepClick(i)} className={cn('flex cursor-pointer items-center gap-2.5 rounded-full pr-2', focusRing)}>
                  {node}
                </button>
              ) : (
                <span className="flex items-center gap-2.5">{node}</span>
              )}
              {i < steps.length - 1 && (
                <span aria-hidden className={cn('mx-1 h-px flex-1', i < current ? 'bg-(--tpl-step-done-bg)' : 'bg-(--tpl-outline-strong)')} />
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
