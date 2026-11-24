import { useState, type ReactNode } from 'react'
import { Check, Printer } from 'lucide-react'
import { cn } from '../lib/cn'
import { useStore } from '../lib/store'
import { formatNT } from '../lib/format'
import { toast } from '../lib/toast'
import { productById } from '../data/catalog'
import { personByName } from '../data/people'
import Button from '../ui/Button'
import Select from '../ui/Select'
import { Drawer, Tooltip } from '../ui/Overlay'
import { useTplCompact } from '../viewer/context'
import { heading, labelWeight, muted, numeric } from '../ui/classes'
import { DEMO_ADDRESS, STATUS_LABEL, STATUS_ORDER, orderShipping, orderSubtotal, orderTotal, type Order, type OrderStatus } from './data'
import { dashStore, dispatch } from './state'
import { ProductThumb, StatusBadge } from './parts'

function timeline(status: OrderStatus): { label: string; state: 'done' | 'current' | 'upcoming' }[] {
  if (status === 'cancelled') {
    return [
      { label: '下單', state: 'done' },
      { label: '已取消', state: 'current' },
    ]
  }
  const reached = { unpaid: 0, paid: 1, shipping: 2, done: 3 }[status]
  return ['下單', '付款', '出貨', '完成'].map((label, i) => ({
    label,
    state: i < reached ? 'done' : i === reached ? 'current' : 'upcoming',
  }))
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-b border-(--tpl-outline) py-5 first:pt-0 last:border-b-0">
      <h3 className={cn('mb-3 text-sm', heading)}>{title}</h3>
      {children}
    </section>
  )
}

function Row({ label, children, strong }: { label: string; children: ReactNode; strong?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-1 text-sm">
      <dt className={muted}>{label}</dt>
      <dd className={cn('text-right', numeric, strong && cn('text-base', heading))}>{children}</dd>
    </div>
  )
}

function OrderDetail({ order }: { order: Order }) {
  const customer = personByName(order.customer)
  return (
    <>
      <Section title="變更狀態">
        <Select
          ariaLabel="訂單狀態"
          value={order.status}
          onValueChange={(status) => {
            if (status === order.status) return
            dispatch({ type: 'setStatus', id: order.id, status })
            toast('狀態已更新')
          }}
          items={STATUS_ORDER.map((s) => ({ value: s, label: STATUS_LABEL[s] }))}
        />
      </Section>

      <Section title="顧客">
        <dl>
          <Row label="姓名">{order.customer}</Row>
          <Row label="Email">{customer?.email ?? '—'}</Row>
          <Row label="收件地址">{DEMO_ADDRESS}</Row>
          <Row label="下單時間">{order.createdAt}</Row>
        </dl>
      </Section>

      <Section title="商品明細">
        <ul className="flex flex-col gap-3">
          {order.items.map((item) => {
            const p = productById(item.productId)
            return (
              <li key={`${item.productId}-${item.variant ?? ''}`} className="flex items-center gap-3">
                <ProductThumb id={item.productId} size="sm" />
                <div className="min-w-0 flex-1 text-sm">
                  <p className="truncate">{p?.name}</p>
                  <p className={cn('text-xs', muted, numeric)}>
                    {item.variant ? `${item.variant} ・ ` : ''}
                    {formatNT(item.unitPrice)} × {item.qty}
                  </p>
                </div>
                <span className={cn('text-sm', numeric)}>{formatNT(item.unitPrice * item.qty)}</span>
              </li>
            )
          })}
        </ul>
        <dl className="mt-4 border-t border-dashed border-(--tpl-outline-strong) pt-3">
          <Row label="商品小計">{formatNT(orderSubtotal(order))}</Row>
          <Row label="運費">{orderShipping(order) === 0 ? '免運' : formatNT(orderShipping(order))}</Row>
          <Row label="合計" strong>
            {formatNT(orderTotal(order))}
          </Row>
          <Row label="付款方式">{order.payment}</Row>
        </dl>
      </Section>

      <Section title="訂單進度">
        <ol className="flex flex-col">
          {timeline(order.status).map((step, i, all) => (
            <li key={step.label} className="relative flex gap-3 pb-5 last:pb-0">
              {i < all.length - 1 && (
                <span aria-hidden className={cn('absolute top-7 left-[13px] h-[calc(100%-24px)] w-px', step.state === 'done' ? 'bg-(--tpl-step-done-bg)' : 'bg-(--tpl-outline-strong)')} />
              )}
              <span
                className={cn(
                  'relative inline-flex size-7 shrink-0 items-center justify-center rounded-full text-xs',
                  labelWeight,
                  step.state === 'done' && 'bg-(--tpl-step-done-bg) text-(--tpl-step-done-fg)',
                  step.state === 'current' && 'bg-(--tpl-primary) text-(--tpl-on-primary) shadow-(--tpl-primary-shadow)',
                  step.state === 'upcoming' && 'bg-(--tpl-skeleton) text-(--tpl-on-surface-variant) shadow-(--tpl-control-shadow-pressed)',
                )}
              >
                {step.state === 'done' ? <Check size={14} strokeWidth={3} aria-hidden /> : i + 1}
              </span>
              <span className={cn('pt-1 text-sm', step.state === 'upcoming' ? muted : undefined, step.state === 'current' && labelWeight)}>
                {step.label}
                <span className="sr-only">（{step.state === 'done' ? '已完成' : step.state === 'current' ? '目前狀態' : '未到達'}）</span>
              </span>
            </li>
          ))}
        </ol>
      </Section>
    </>
  )
}

/** 訂單詳情抽屜：桌機右側、手機底部全寬 */
export default function OrderDrawer() {
  const openId = useStore(dashStore, (s) => s.openOrderId)
  const orders = useStore(dashStore, (s) => s.orders)
  const compact = useTplCompact()
  const order = orders.find((o) => o.id === openId) ?? null
  // 關閉動畫期間保留最後一筆內容，避免抽屜滑出時內容先消失
  const [last, setLast] = useState<Order | null>(null)
  if (order && order !== last) setLast(order)
  const shown = order ?? last
  const close = () => dispatch({ type: 'openOrder', id: null })

  return (
    <Drawer
      open={Boolean(order)}
      onOpenChange={(o) => !o && close()}
      side={compact ? 'bottom' : 'right'}
      title={shown?.id ?? ''}
      titleAside={shown && <StatusBadge status={shown.status} />}
      footer={
        <div className="flex gap-2">
          <Tooltip content="示範版未開放">
            <Button variant="secondary" aria-disabled className="flex-1 cursor-not-allowed text-(--tpl-on-disabled) hover:bg-(--tpl-btn-secondary-bg)">
              <Printer size={16} />
              列印出貨單
            </Button>
          </Tooltip>
          <Button className="flex-1" onClick={close}>
            關閉
          </Button>
        </div>
      }
    >
      {shown && <OrderDetail order={shown} />}
    </Drawer>
  )
}
