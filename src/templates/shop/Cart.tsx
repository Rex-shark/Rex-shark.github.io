import { useState, type FormEvent } from 'react'
import { PartyPopper, ShoppingBag, Tag, Trash2, X } from 'lucide-react'
import { cn } from '../lib/cn'
import { useStore } from '../lib/store'
import { formatNT } from '../lib/format'
import { toast } from '../lib/toast'
import { productById } from '../data/catalog'
import Button from '../ui/Button'
import { Drawer } from '../ui/Overlay'
import { EmptyState, Progress } from '../ui/Feedback'
import { QuantityInput } from '../ui/Field'
import TplImage from '../ui/TplImage'
import { focusRing, heading, inputBase, labelWeight, muted, numeric } from '../ui/classes'
import { COUPON_CODE, FREE_SHIPPING, cartTotals, dispatch, lineMax, shopStore, unitPrice, type CartLine, type Shipping } from './state'

/** 折扣碼欄位（購物車抽屜與結帳摘要共用） */
export function CouponField() {
  const coupon = useStore(shopStore, (s) => s.coupon)
  const cart = useStore(shopStore, (s) => s.cart)
  const [code, setCode] = useState('')
  const [error, setError] = useState<string>()
  const { discount } = cartTotals(cart, coupon)

  function apply(e: FormEvent) {
    e.preventDefault()
    if (code.trim().toUpperCase() === COUPON_CODE) {
      dispatch({ type: 'setCoupon', code: COUPON_CODE })
      setCode('')
      setError(undefined)
    } else {
      setError('折扣碼無效或已過期')
    }
  }

  if (coupon) {
    return (
      <div className="flex items-center justify-between gap-3 rounded-(--tpl-radius-md) bg-(--tpl-success-container) px-3 py-2.5 text-sm text-(--tpl-on-success-container)">
        <span className="flex items-center gap-2">
          <Tag size={15} aria-hidden />
          已套用 {COUPON_CODE}（−<span className={numeric}>{formatNT(discount)}</span>）
        </span>
        <button
          type="button"
          onClick={() => dispatch({ type: 'setCoupon', code: null })}
          aria-label="移除折扣碼"
          className={cn('inline-flex size-7 cursor-pointer items-center justify-center rounded-full hover:bg-(--tpl-on-success-container)/10', focusRing)}
        >
          <X size={15} />
        </button>
      </div>
    )
  }

  return (
    <form noValidate onSubmit={apply} className="flex flex-col gap-1.5">
      <div className="flex gap-2">
        <input
          value={code}
          onChange={(e) => {
            setCode(e.target.value)
            if (error) setError(undefined)
          }}
          placeholder="輸入折扣碼"
          aria-label="折扣碼"
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={error ? 'tpl-coupon-error' : undefined}
          className={cn(inputBase, 'min-w-0 flex-1 uppercase placeholder:normal-case')}
        />
        <Button type="submit" variant="secondary" disabled={!code.trim()}>
          套用
        </Button>
      </div>
      {error && (
        <p id="tpl-coupon-error" role="alert" className="text-[13px] text-(--tpl-error)">
          {error}
        </p>
      )}
    </form>
  )
}

/** 金額明細（購物車與結帳共用） */
export function Totals({ shipping = 'home' }: { shipping?: Shipping }) {
  const cart = useStore(shopStore, (s) => s.cart)
  const coupon = useStore(shopStore, (s) => s.coupon)
  const t = cartTotals(cart, coupon, shipping)
  const row = 'flex items-baseline justify-between gap-4 text-sm'
  return (
    <dl className="flex flex-col gap-2">
      <div className={row}>
        <dt className={muted}>商品小計</dt>
        <dd className={numeric}>{formatNT(t.subtotal)}</dd>
      </div>
      {t.discount > 0 && (
        <div className={row}>
          <dt className={muted}>折扣（{COUPON_CODE}）</dt>
          <dd className={cn('text-(--tpl-success)', numeric)}>−{formatNT(t.discount)}</dd>
        </div>
      )}
      <div className={row}>
        <dt className={muted}>運費（{shipping === 'home' ? '宅配' : '超商取貨'}）</dt>
        <dd className={numeric}>{t.shippingFee === 0 ? '免運' : formatNT(t.shippingFee)}</dd>
      </div>
      <div className={cn(row, 'mt-1 border-t border-(--tpl-outline) pt-3')}>
        <dt className={labelWeight}>合計</dt>
        <dd className={cn('text-xl', heading, numeric)}>{formatNT(t.total)}</dd>
      </div>
    </dl>
  )
}

export function FreeShippingProgress() {
  const cart = useStore(shopStore, (s) => s.cart)
  const coupon = useStore(shopStore, (s) => s.coupon)
  const { afterDiscount } = cartTotals(cart, coupon)
  const remaining = FREE_SHIPPING - afterDiscount
  const reached = remaining <= 0
  return (
    <div className={cn('flex flex-col gap-2 rounded-(--tpl-radius-md) p-3', reached ? 'bg-(--tpl-success-container) text-(--tpl-on-success-container)' : 'bg-(--tpl-skeleton)')}>
      <p className="flex items-center gap-2 text-sm" role="status">
        {reached ? (
          <>
            <PartyPopper size={16} aria-hidden />
            已享免運
          </>
        ) : (
          <>
            再買 <span className={cn(numeric, labelWeight)}>{formatNT(remaining)}</span> 即可免運
          </>
        )}
      </p>
      <Progress value={Math.min(afterDiscount, FREE_SHIPPING)} max={FREE_SHIPPING} label="免運進度" tone={reached ? 'success' : 'accent'} />
    </div>
  )
}

function Line({ line, index }: { line: CartLine; index: number }) {
  const cart = useStore(shopStore, (s) => s.cart)
  const product = productById(line.productId)
  if (!product) return null
  const price = unitPrice(line.productId, line.variant)

  function remove() {
    dispatch({ type: 'removeLine', key: line.key })
    toast(`已移除 ${product!.name}`, {
      tone: 'info',
      duration: 5000,
      action: { label: '復原', onClick: () => dispatch({ type: 'restoreLine', line, index }) },
    })
  }

  return (
    <li className="flex gap-3 py-4 first:pt-0">
      <span className="size-18 shrink-0 overflow-hidden rounded-(--tpl-radius-md)">
        <TplImage id={product.id} />
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className={cn('truncate text-sm', labelWeight)}>{product.name}</p>
            <p className={cn('text-xs', muted, numeric)}>
              {line.variant ? `${product.variant?.label}：${line.variant} ・ ` : ''}
              {formatNT(price)}
            </p>
          </div>
          <button
            type="button"
            onClick={remove}
            aria-label={`移除 ${product.name}`}
            className={cn('inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full text-(--tpl-on-surface-variant) hover:bg-(--tpl-ghost-hover-bg) hover:text-(--tpl-error)', focusRing)}
          >
            <Trash2 size={16} />
          </button>
        </div>
        <div className="flex items-center justify-between gap-2">
          <QuantityInput size="sm" label={`${product.name} 數量`} value={line.qty} max={lineMax(cart, line)} onChange={(qty) => dispatch({ type: 'setQty', key: line.key, qty })} />
          <span className={cn('text-sm', numeric)}>{formatNT(price * line.qty)}</span>
        </div>
      </div>
    </li>
  )
}

export default function CartDrawer() {
  const { cart, cartOpen } = useStore(shopStore)
  const count = cartTotals(cart, null).count
  const close = () => dispatch({ type: 'cart', open: false })

  return (
    <Drawer
      open={cartOpen}
      onOpenChange={(o) => dispatch({ type: 'cart', open: o })}
      title={`購物車（${count} 件）`}
      footer={
        cart.length > 0 ? (
          <div className="flex flex-col gap-4">
            <Totals />
            <div className="flex gap-2">
              <Button variant="secondary" className="flex-1" onClick={close}>
                繼續購物
              </Button>
              <Button className="flex-1" onClick={() => dispatch({ type: 'goCheckout' })}>
                前往結帳
              </Button>
            </div>
          </div>
        ) : (
          <Button className="w-full" disabled>
            前往結帳
          </Button>
        )
      }
    >
      {cart.length === 0 ? (
        <EmptyState
          icon={<ShoppingBag size={24} />}
          title="購物車是空的"
          description="去看看有什麼喜歡的東西吧。"
          action={<Button onClick={() => dispatch({ type: 'goList' })}>去逛逛</Button>}
        />
      ) : (
        <div className="flex flex-col gap-5">
          <FreeShippingProgress />
          <ul className="flex flex-col divide-y divide-(--tpl-outline)">
            {cart.map((line, i) => (
              <Line key={line.key} line={line} index={i} />
            ))}
          </ul>
          <CouponField />
        </div>
      )}
    </Drawer>
  )
}
