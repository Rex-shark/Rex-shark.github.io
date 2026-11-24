import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { CheckCircle2, Info, X, XCircle } from 'lucide-react'
import { cn } from '../lib/cn'
import { useStore } from '../lib/store'
import { dismissToast, toastStore, type ToastItem } from '../lib/toast'
import { useTplCompact, useTplOverlayRoot } from '../viewer/context'
import { focusRing, labelWeight } from './classes'

const ICON = { success: CheckCircle2, info: Info, error: XCircle }
const ICON_COLOR = { success: 'text-(--tpl-success)', info: 'text-(--tpl-info)', error: 'text-(--tpl-error)' }

function ToastRow({ item, compact }: { item: ToastItem; compact: boolean }) {
  useEffect(() => {
    const t = setTimeout(() => dismissToast(item.id), item.duration)
    return () => clearTimeout(t)
  }, [item.id, item.duration])
  const Icon = ICON[item.tone]
  return (
    <div
      role={item.tone === 'error' ? 'alert' : 'status'}
      className={cn(
        'pointer-events-auto flex w-full items-center gap-3 rounded-(--tpl-radius-lg) border-(length:--tpl-border-width) border-(--tpl-overlay-border) bg-(--tpl-toast-bg) py-3 pr-2 pl-4 text-sm text-(--tpl-toast-fg) shadow-(--tpl-overlay-shadow) [backdrop-filter:var(--tpl-overlay-backdrop)]',
        'animate-in fade-in duration-200 motion-reduce:animate-none',
        compact ? 'slide-in-from-bottom-2' : 'slide-in-from-top-2',
      )}
    >
      <Icon size={18} className={cn('shrink-0', ICON_COLOR[item.tone])} aria-hidden />
      <span className="flex-1">{item.title}</span>
      {item.action && (
        <button
          type="button"
          onClick={() => {
            item.action?.onClick()
            dismissToast(item.id)
          }}
          className={cn('shrink-0 cursor-pointer rounded-(--tpl-radius-sm) px-2 py-1 underline underline-offset-2', labelWeight, focusRing)}
        >
          {item.action.label}
        </button>
      )}
      <button
        type="button"
        onClick={() => dismissToast(item.id)}
        aria-label="關閉通知"
        className={cn('inline-flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-full opacity-70 hover:opacity-100', focusRing)}
      >
        <X size={15} />
      </button>
    </div>
  )
}

/** toast 顯示區：桌機右上、窄寬度底部（避開展示工具列）；掛在範本外框內 */
export default function Toaster() {
  const root = useTplOverlayRoot()
  const compact = useTplCompact()
  const items = useStore(toastStore)
  if (!root) return null
  return createPortal(
    <div
      aria-live="polite"
      className={cn(
        'pointer-events-none absolute z-30 flex flex-col gap-2',
        compact ? 'right-3 bottom-3 left-3' : 'top-4 right-4 w-[360px]',
      )}
    >
      {items.map((item) => (
        <ToastRow key={item.id} item={item} compact={compact} />
      ))}
    </div>,
    root,
  )
}
