import type { ReactElement, ReactNode } from 'react'
import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import { Menu as BaseMenu } from '@base-ui/react/menu'
import { Popover as BasePopover } from '@base-ui/react/popover'
import { Tooltip as BaseTooltip } from '@base-ui/react/tooltip'
import { X } from 'lucide-react'
import { cn } from '../lib/cn'
import { useTplOverlayRoot } from '../viewer/context'
import { focusRing, heading, muted, overlaySurface, popIn } from './classes'

/*
 * 所有浮層的 Portal 都掛在 DeviceFrame 的 OverlayRoot（不是 body），
 * 才能留在 --tpl-* 變數範圍內、也不會在裝置預覽時跑出框外。
 * overlayRoot 首次 render 為 null，此時不渲染 Portal（避免 base-ui 退回掛到 body）。
 */

const backdropClass =
  'pointer-events-auto absolute inset-0 bg-(--tpl-scrim) [backdrop-filter:var(--tpl-scrim-backdrop,none)] transition-opacity duration-200 data-[starting-style]:opacity-0 data-[ending-style]:opacity-0 motion-reduce:transition-none'

function CloseButton({ label = '關閉' }: { label?: string }) {
  return (
    <BaseDialog.Close
      aria-label={label}
      className={cn(
        'inline-flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-(--tpl-radius-control) text-(--tpl-on-surface-variant) transition-colors hover:bg-(--tpl-ghost-hover-bg) hover:text-(--tpl-on-surface)',
        focusRing,
      )}
    >
      <X size={18} />
    </BaseDialog.Close>
  )
}

interface DialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: ReactNode
  description?: ReactNode
  children?: ReactNode
  footer?: ReactNode
  /** alert：危險確認，點遮罩不關閉 */
  role?: 'dialog' | 'alert'
}

/** 對話框（置中） */
export function Dialog({ open, onOpenChange, title, description, children, footer, role = 'dialog' }: DialogProps) {
  const root = useTplOverlayRoot()
  return (
    <BaseDialog.Root open={open} onOpenChange={(o) => onOpenChange(o)} disablePointerDismissal={role === 'alert'}>
      {root && (
        <BaseDialog.Portal container={root}>
          <BaseDialog.Backdrop className={backdropClass} />
          <BaseDialog.Popup
            role={role === 'alert' ? 'alertdialog' : 'dialog'}
            className={cn(
              'pointer-events-auto absolute top-1/2 left-1/2 flex max-h-[calc(100%-32px)] w-[calc(100%-32px)] max-w-[480px] -translate-x-1/2 -translate-y-1/2 flex-col rounded-(--tpl-radius-xl) outline-none',
              overlaySurface,
              'transition-[opacity,scale] duration-200 ease-out data-[starting-style]:scale-95 data-[starting-style]:opacity-0 data-[ending-style]:scale-95 data-[ending-style]:opacity-0 motion-reduce:transition-none',
            )}
          >
            <div className="flex items-start justify-between gap-3 border-b border-(--tpl-outline) px-6 pt-5 pb-4">
              <div className="min-w-0">
                <BaseDialog.Title className={cn('text-lg', heading)}>{title}</BaseDialog.Title>
                {description && <BaseDialog.Description className={cn('mt-1 text-sm', muted)}>{description}</BaseDialog.Description>}
              </div>
              <CloseButton />
            </div>
            {children && <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">{children}</div>}
            {footer && <div className="flex flex-wrap justify-end gap-2 border-t border-(--tpl-outline) px-6 py-4">{footer}</div>}
          </BaseDialog.Popup>
        </BaseDialog.Portal>
      )}
    </BaseDialog.Root>
  )
}

const DRAWER_SIDE = {
  right:
    'top-0 right-0 bottom-0 w-[min(440px,100%)] rounded-l-(--tpl-radius-xl) data-[starting-style]:translate-x-full data-[ending-style]:translate-x-full',
  left: 'top-0 bottom-0 left-0 w-[min(300px,88%)] rounded-r-(--tpl-radius-xl) data-[starting-style]:-translate-x-full data-[ending-style]:-translate-x-full',
  bottom:
    'right-0 bottom-0 left-0 max-h-[88%] rounded-t-(--tpl-radius-xl) data-[starting-style]:translate-y-full data-[ending-style]:translate-y-full',
  /** 全螢幕選單（淡入淡出） */
  full: 'inset-0 rounded-none border-0 transition-opacity data-[starting-style]:opacity-0 data-[ending-style]:opacity-0',
} as const

interface DrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: ReactNode
  /** 標題旁的附加內容（徽章等） */
  titleAside?: ReactNode
  side?: keyof typeof DRAWER_SIDE
  children: ReactNode
  footer?: ReactNode
}

/** 側邊抽屜（右側詳情、左側選單、底部篩選） */
export function Drawer({ open, onOpenChange, title, titleAside, side = 'right', children, footer }: DrawerProps) {
  const root = useTplOverlayRoot()
  return (
    <BaseDialog.Root open={open} onOpenChange={(o) => onOpenChange(o)}>
      {root && (
        <BaseDialog.Portal container={root}>
          <BaseDialog.Backdrop className={backdropClass} />
          <BaseDialog.Popup
            className={cn(
              'pointer-events-auto absolute flex flex-col outline-none transition-transform duration-250 ease-out motion-reduce:transition-none',
              overlaySurface,
              DRAWER_SIDE[side],
            )}
          >
            <div className="flex items-center justify-between gap-3 border-b border-(--tpl-outline) px-5 py-4">
              <div className="flex min-w-0 items-center gap-2">
                <BaseDialog.Title className={cn('truncate text-lg', heading)}>{title}</BaseDialog.Title>
                {titleAside}
              </div>
              <CloseButton />
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5">{children}</div>
            {footer && <div className="border-t border-(--tpl-outline) px-5 py-4">{footer}</div>}
          </BaseDialog.Popup>
        </BaseDialog.Portal>
      )}
    </BaseDialog.Root>
  )
}

export interface MenuItem {
  label: ReactNode
  icon?: ReactNode
  onSelect?: () => void
  disabled?: boolean
  /** 停用原因（顯示在項目右側） */
  hint?: ReactNode
  danger?: boolean
}

interface MenuProps {
  trigger: ReactElement
  items: MenuItem[]
  header?: ReactNode
  align?: 'start' | 'center' | 'end'
}

/** 下拉選單（使用者選單等） */
export function Menu({ trigger, items, header, align = 'end' }: MenuProps) {
  const root = useTplOverlayRoot()
  return (
    <BaseMenu.Root>
      <BaseMenu.Trigger render={trigger} />
      {root && (
        <BaseMenu.Portal container={root}>
          <BaseMenu.Positioner sideOffset={8} align={align} className="pointer-events-auto z-10 outline-none">
            <BaseMenu.Popup className={cn('min-w-52 rounded-(--tpl-radius-md) p-1.5 outline-none', overlaySurface, popIn)}>
              {header && <div className="border-b border-(--tpl-outline) px-3 pt-2 pb-3">{header}</div>}
              {items.map((item, i) => (
                <BaseMenu.Item
                  key={i}
                  disabled={item.disabled}
                  onClick={item.onSelect}
                  className={cn(
                    'flex h-9 cursor-pointer items-center gap-2.5 rounded-(--tpl-radius-sm) px-3 text-sm outline-none select-none data-[highlighted]:bg-(--tpl-ghost-hover-bg) data-[disabled]:cursor-not-allowed data-[disabled]:text-(--tpl-on-disabled)',
                    item.danger && 'text-(--tpl-error)',
                  )}
                >
                  {item.icon && <span className="shrink-0 opacity-80">{item.icon}</span>}
                  <span className="flex-1">{item.label}</span>
                  {item.hint && <span className={cn('text-xs', muted)}>{item.hint}</span>}
                </BaseMenu.Item>
              ))}
            </BaseMenu.Popup>
          </BaseMenu.Positioner>
        </BaseMenu.Portal>
      )}
    </BaseMenu.Root>
  )
}

interface PopoverProps {
  trigger: ReactElement
  title: ReactNode
  children: ReactNode
  align?: 'start' | 'center' | 'end'
  widthClass?: string
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

/** 彈出面板（通知清單等） */
export function Popover({ trigger, title, children, align = 'end', widthClass = 'w-[min(360px,calc(100cqw-24px))]', open, onOpenChange }: PopoverProps) {
  const root = useTplOverlayRoot()
  return (
    <BasePopover.Root open={open} onOpenChange={onOpenChange ? (o) => onOpenChange(o) : undefined}>
      <BasePopover.Trigger render={trigger} />
      {root && (
        <BasePopover.Portal container={root}>
          <BasePopover.Positioner sideOffset={8} align={align} collisionPadding={12} className="pointer-events-auto z-10 outline-none">
            <BasePopover.Popup className={cn('rounded-(--tpl-radius-lg) outline-none', overlaySurface, popIn, widthClass)}>
              <BasePopover.Title className="sr-only">{title}</BasePopover.Title>
              {children}
            </BasePopover.Popup>
          </BasePopover.Positioner>
        </BasePopover.Portal>
      )}
    </BasePopover.Root>
  )
}

interface TooltipProps {
  content: ReactNode
  children: ReactElement
  side?: 'top' | 'right' | 'bottom' | 'left'
}

/** 工具提示：hover 與 focus 都會出現 */
export function Tooltip({ content, children, side = 'top' }: TooltipProps) {
  const root = useTplOverlayRoot()
  return (
    <BaseTooltip.Root>
      <BaseTooltip.Trigger render={children} delay={200} />
      {root && (
        <BaseTooltip.Portal container={root}>
          <BaseTooltip.Positioner side={side} sideOffset={8} className="z-20">
            <BaseTooltip.Popup
              className={cn(
                'max-w-60 rounded-(--tpl-radius-sm) bg-(--tpl-tooltip-bg) px-2.5 py-1.5 text-xs leading-snug text-(--tpl-tooltip-fg) shadow-(--tpl-overlay-shadow)',
                popIn,
              )}
            >
              {content}
            </BaseTooltip.Popup>
          </BaseTooltip.Positioner>
        </BaseTooltip.Portal>
      )}
    </BaseTooltip.Root>
  )
}
