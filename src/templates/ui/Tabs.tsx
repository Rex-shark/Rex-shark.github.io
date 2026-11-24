import { useEffect, useRef, type ReactNode } from 'react'
import { Tabs as BaseTabs } from '@base-ui/react/tabs'
import { cn } from '../lib/cn'
import { focusRing, labelWeight, numeric } from './classes'

export interface TabItem<V extends string> {
  value: V
  label: ReactNode
  /** 右側計數（例如訂單狀態筆數） */
  count?: number
}

interface TabsProps<V extends string> {
  value: V
  onValueChange: (value: V) => void
  items: TabItem<V>[]
  ariaLabel: string
  className?: string
}

/**
 * 頁籤列（只負責切換，內容由使用端依 value 呈現）。
 * 外觀取自 --tpl-tab-*：簡約為底線、玻璃為膠囊、柔和為內凹軌道＋凸起滑塊。
 *
 * 橫向捲動交給外層 div：base-ui 的 Tabs.List 掛載時會自行 scrollTo 到錯誤位置（窄寬度時把頁籤列捲到最右），
 * 讓 List 本身不可捲動，它的 scrollTo 就不會生效；再由這裡確保選中的頁籤在可見範圍內。
 */
export default function Tabs<V extends string>({ value, onValueChange, items, ariaLabel, className }: TabsProps<V>) {
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const tab = wrap?.querySelector<HTMLElement>('[data-active]')
    if (!wrap || !tab) return
    const left = tab.offsetLeft
    const right = left + tab.offsetWidth
    if (left < wrap.scrollLeft) wrap.scrollLeft = left - 4
    else if (right > wrap.scrollLeft + wrap.clientWidth) wrap.scrollLeft = right - wrap.clientWidth + 4
  }, [value])

  return (
    <BaseTabs.Root value={value} onValueChange={(v) => onValueChange(v as V)}>
      <div
        ref={wrapRef}
        className={cn(
          'relative inline-block max-w-full self-start overflow-x-auto rounded-(--tpl-radius-control) bg-(--tpl-tab-track-bg) align-top shadow-(--tpl-tab-track-shadow) [scrollbar-width:none]',
          className,
        )}
      >
      <BaseTabs.List aria-label={ariaLabel} className="flex w-max items-center gap-1 p-1">
        {items.map((item) => (
          <BaseTabs.Tab
            key={item.value}
            value={item.value}
            className={cn(
              'inline-flex h-8 shrink-0 cursor-pointer items-center gap-1.5 rounded-(--tpl-radius-control) px-3 text-[13px] whitespace-nowrap text-(--tpl-on-surface-variant) transition-[background-color,box-shadow,color] duration-150 hover:text-(--tpl-on-surface)',
              'data-[active]:bg-(--tpl-tab-active-bg) data-[active]:text-(--tpl-tab-active-fg) data-[active]:shadow-(--tpl-tab-active-shadow)',
              labelWeight,
              focusRing,
            )}
          >
            {item.label}
            {item.count !== undefined && <span className={cn('text-xs opacity-75', numeric)}>{item.count}</span>}
          </BaseTabs.Tab>
        ))}
      </BaseTabs.List>
      </div>
    </BaseTabs.Root>
  )
}
