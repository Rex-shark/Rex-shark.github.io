import type { ReactNode } from 'react'
import { cn } from '../lib/cn'
import Badge, { type BadgeTone } from '../ui/Badge'
import TplImage from '../ui/TplImage'
import { heading, muted } from '../ui/classes'
import { STATUS_LABEL, type OrderStatus } from './data'

const STATUS_TONE: Record<OrderStatus, BadgeTone> = {
  unpaid: 'warning',
  paid: 'info',
  shipping: 'accent',
  done: 'success',
  cancelled: 'neutral',
}

/** 訂單狀態徽章：待付款＝警示、已付款＝資訊、出貨中＝主色、已完成＝成功、已取消＝中性 */
export function StatusBadge({ status }: { status: OrderStatus }) {
  return (
    <Badge tone={STATUS_TONE[status]} dot>
      {STATUS_LABEL[status]}
    </Badge>
  )
}

/** 庫存徽章：0＝售完、≤ 門檻＝低庫存 */
export function StockBadge({ stock, threshold }: { stock: number; threshold: number }) {
  if (stock === 0) return <Badge tone="error">售完</Badge>
  if (stock <= threshold) return <Badge tone="warning">低庫存</Badge>
  return null
}

export function ProductThumb({ id, label, size = 'md' }: { id: string; label?: string; size?: 'sm' | 'md' | 'lg' }) {
  return (
    <span
      className={cn(
        'block shrink-0 overflow-hidden rounded-(--tpl-radius-sm)',
        size === 'sm' && 'size-9',
        size === 'md' && 'size-10',
        size === 'lg' && 'aspect-square w-full rounded-(--tpl-radius-md)',
      )}
    >
      <TplImage id={id} label={label} />
    </span>
  )
}

/** 頁面說明列：頁面標題在頂部列，這裡放說明與主要動作 */
export function PageIntro({ description, actions }: { description: ReactNode; actions?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-col gap-3 @2xl:flex-row @2xl:items-center @2xl:justify-between">
      <p className={cn('text-sm', muted)}>{description}</p>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  )
}

/** 區塊標題（卡片外） */
export function SectionTitle({ children }: { children: ReactNode }) {
  return <h2 className={cn('mb-3 text-base', heading)}>{children}</h2>
}
