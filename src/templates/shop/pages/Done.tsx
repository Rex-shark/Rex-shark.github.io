import { CheckCircle2 } from 'lucide-react'
import { cn } from '../../lib/cn'
import { useStore } from '../../lib/store'
import { formatNT } from '../../lib/format'
import { productById } from '../../data/catalog'
import Button from '../../ui/Button'
import { Card } from '../../ui/Card'
import { heading, labelWeight, muted, numeric } from '../../ui/classes'
import { PAYMENT_LABEL, SHIPPING_LABEL, dispatch, shopStore, type Payment } from '../state'

const PAYMENT_NOTE: Record<Payment, string> = {
  card: '付款完成',
  linepay: '付款完成',
  atm: '請於 3 天內轉帳至示範帳號',
  cod: '到貨時付款',
}

export default function Done() {
  const order = useStore(shopStore, (s) => s.lastOrder)
  if (!order) return null
  const row = 'flex items-baseline justify-between gap-4 py-1.5 text-sm'
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-6 py-6 text-center">
      <span className="inline-flex size-16 items-center justify-center rounded-full bg-(--tpl-success-container) text-(--tpl-success) shadow-(--tpl-control-shadow)" aria-hidden>
        <CheckCircle2 size={34} />
      </span>
      <div>
        <h1 className={cn('text-3xl', heading)}>訂單已成立</h1>
        <p className={cn('mt-2 text-sm', muted)}>
          訂單編號 <span className={cn('text-(--tpl-on-surface)', numeric, labelWeight)}>{order.id}</span>
        </p>
        <p className="mt-1 text-sm">{PAYMENT_NOTE[order.payment]}</p>
      </div>

      <Card className="w-full text-left">
        <h2 className={cn('mb-3 text-base', heading)}>訂單摘要</h2>
        <ul className="flex flex-col divide-y divide-(--tpl-outline) border-b border-(--tpl-outline) pb-2">
          {order.lines.map((l) => (
            <li key={l.key} className={row}>
              <span>
                {productById(l.productId)?.name}
                {l.variant && <span className={muted}>（{l.variant}）</span>} × <span className={numeric}>{l.qty}</span>
              </span>
            </li>
          ))}
        </ul>
        <dl className="mt-2">
          <div className={row}>
            <dt className={muted}>付款方式</dt>
            <dd>{PAYMENT_LABEL[order.payment]}</dd>
          </div>
          <div className={row}>
            <dt className={muted}>配送方式</dt>
            <dd>{SHIPPING_LABEL[order.shipping]}</dd>
          </div>
          {order.discount > 0 && (
            <div className={row}>
              <dt className={muted}>折扣</dt>
              <dd className={cn('text-(--tpl-success)', numeric)}>−{formatNT(order.discount)}</dd>
            </div>
          )}
          <div className={row}>
            <dt className={muted}>運費</dt>
            <dd className={numeric}>{order.shippingFee === 0 ? '免運' : formatNT(order.shippingFee)}</dd>
          </div>
          <div className={cn(row, 'mt-1 border-t border-(--tpl-outline) pt-3')}>
            <dt className={labelWeight}>合計</dt>
            <dd className={cn('text-xl', heading, numeric)}>{formatNT(order.total)}</dd>
          </div>
        </dl>
      </Card>

      <Button onClick={() => dispatch({ type: 'continueShopping' })}>繼續購物</Button>
    </div>
  )
}
