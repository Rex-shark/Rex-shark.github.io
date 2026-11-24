import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { ArrowLeft, ChevronDown, Lock, ShoppingBag } from 'lucide-react'
import { cn } from '../../lib/cn'
import { useStore } from '../../lib/store'
import { formatNT } from '../../lib/format'
import { fakeSubmit } from '../../lib/fakeSubmit'
import { useSubmitGuard } from '../../lib/useSubmitGuard'
import { email as emailRule, mobileTW, required, validateForm } from '../../lib/validate'
import { productById } from '../../data/catalog'
import { nextOrderId } from '../../data/sequence'
import Button from '../../ui/Button'
import Select from '../../ui/Select'
import { Card, CardHeader } from '../../ui/Card'
import { Checkbox, RadioGroup } from '../../ui/Choice'
import { EmptyState } from '../../ui/Feedback'
import { Field, Input, Textarea } from '../../ui/Field'
import TplImage from '../../ui/TplImage'
import { focusRing, heading, labelWeight, muted, numeric, panel } from '../../ui/classes'
import { CouponField, Totals } from '../Cart'
import { PAYMENT_LABEL, SHIPPING_FEE, TW_COUNTIES, cartTotals, dispatch, shopStore, unitPrice, type Payment, type Shipping } from '../state'

const NOTE_MAX = 100
const PICKUP_STORES = ['示範門市 A', '示範門市 B', '示範門市 C']

type Values = { name: string; phone: string; email: string; county: string; address: string; pickup: string; note: string }
type ErrorKey = keyof Values | 'terms'

/** 訂單摘要：桌機固定在右側；手機／平板收合在頂部，可展開 */
function SummaryPanel({ shipping }: { shipping: Shipping }) {
  const cart = useStore(shopStore, (s) => s.cart)
  const coupon = useStore(shopStore, (s) => s.coupon)
  const [open, setOpen] = useState(false)
  const { total } = cartTotals(cart, coupon, shipping)
  return (
    <aside aria-labelledby="shop-summary-title" className={cn('rounded-(--tpl-card-radius) p-5 @5xl:sticky @5xl:top-28', panel)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={cn('flex w-full cursor-pointer items-center justify-between gap-3 @5xl:hidden', focusRing)}
      >
        <span className={cn('flex items-center gap-2 text-sm', labelWeight)}>
          <ShoppingBag size={16} aria-hidden />
          {open ? '隱藏訂單摘要' : '顯示訂單摘要'}
          <ChevronDown size={16} aria-hidden className={cn('transition-transform', open && 'rotate-180')} />
        </span>
        <span className={cn('text-base', heading, numeric)}>{formatNT(total)}</span>
      </button>
      <div className={cn(open ? 'mt-5 flex' : 'hidden', 'flex-col gap-5 @5xl:mt-0 @5xl:flex')}>
        <h2 id="shop-summary-title" className={cn('text-lg', heading)}>
          訂單摘要
        </h2>
        <ul className="flex flex-col gap-3">
          {cart.map((l) => {
            const p = productById(l.productId)
            return (
              <li key={l.key} className="flex items-center gap-3 text-sm">
                <span className="relative size-12 shrink-0 overflow-hidden rounded-(--tpl-radius-sm)">
                  <TplImage id={l.productId} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate">
                    {p?.name} × <span className={numeric}>{l.qty}</span>
                  </span>
                  {l.variant && <span className={cn('text-xs', muted)}>{l.variant}</span>}
                </span>
                <span className={numeric}>{formatNT(unitPrice(l.productId, l.variant) * l.qty)}</span>
              </li>
            )
          })}
        </ul>
        <CouponField />
        <Totals shipping={shipping} />
      </div>
    </aside>
  )
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Card as="section">
      <CardHeader title={title} />
      {children}
    </Card>
  )
}

export default function Checkout() {
  const cart = useStore(shopStore, (s) => s.cart)
  const coupon = useStore(shopStore, (s) => s.coupon)
  const [values, setValues] = useState<Values>({ name: '', phone: '', email: '', county: '', address: '', pickup: '', note: '' })
  const [shipping, setShipping] = useState<Shipping>('home')
  const [payment, setPayment] = useState<Payment>('card')
  const [terms, setTerms] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<ErrorKey, string>>>({})
  const [attempt, setAttempt] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const guard = useSubmitGuard()
  const formRef = useRef<HTMLFormElement>(null)

  // 驗證失敗：捲到第一個錯誤欄位並 focus
  useEffect(() => {
    if (!attempt) return
    const first = formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')
    if (!first) return
    first.scrollIntoView({ block: 'center', behavior: 'smooth' })
    first.focus({ preventScroll: true })
  }, [attempt])

  const set = (k: keyof Values) => (v: string) => {
    setValues((s) => ({ ...s, [k]: v }))
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }))
  }

  if (cart.length === 0) {
    return (
      <Card>
        <EmptyState
          icon={<ShoppingBag size={24} />}
          title="購物車是空的"
          description="先挑幾件喜歡的商品再來結帳。"
          action={<Button onClick={() => dispatch({ type: 'goList' })}>去逛逛</Button>}
        />
      </Card>
    )
  }

  async function submit(e: FormEvent) {
    e.preventDefault()
    if (submitting) return
    const errs: Partial<Record<ErrorKey, string>> = validateForm(values, {
      name: [required('請輸入姓名')],
      phone: [mobileTW],
      email: [emailRule],
      ...(shipping === 'home' ? { county: [required('請選擇縣市')], address: [required('請輸入地址')] } : { pickup: [required('請選擇取貨門市')] }),
    })
    if (!terms) errs.terms = '請閱讀並同意購物條款'
    setErrors(errs)
    if (Object.keys(errs).length) {
      setAttempt((n) => n + 1)
      return
    }
    setSubmitting(true)
    const id = guard.begin()
    await fakeSubmit()
    // 等待中按了「重設」：範本已重新掛載，舊的購物車不能再成立訂單
    if (!guard.isCurrent(id)) return
    const t = cartTotals(cart, coupon, shipping)
    dispatch({
      type: 'placeOrder',
      order: { id: nextOrderId(), lines: cart.map((l) => ({ ...l })), subtotal: t.subtotal, discount: t.discount, shippingFee: t.shippingFee, total: t.total, shipping, payment },
    })
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Button
          variant="ghost"
          size="sm"
          className="-ml-2"
          onClick={() => {
            dispatch({ type: 'goList' })
            dispatch({ type: 'cart', open: true })
          }}
        >
          <ArrowLeft size={16} />
          返回購物車
        </Button>
        <h1 className={cn('mt-2 text-3xl', heading)}>結帳</h1>
      </div>

      <div className="grid gap-6 @5xl:grid-cols-[minmax(0,1fr)_380px] @5xl:items-start">
        <div className="@5xl:order-2">
          <SummaryPanel shipping={shipping} />
        </div>

        <form ref={formRef} noValidate onSubmit={submit} className="flex flex-col gap-5 @5xl:order-1">
          <Section title="聯絡資訊">
            <div className="grid gap-4 @3xl:grid-cols-2">
              <Field label="姓名" required error={errors.name} className="@3xl:col-span-2">
                {({ id, describedBy, invalid }) => <Input id={id} autoComplete="name" aria-describedby={describedBy} aria-invalid={invalid} value={values.name} onChange={(e) => set('name')(e.target.value)} />}
              </Field>
              <Field label="手機" required error={errors.phone}>
                {({ id, describedBy, invalid }) => (
                  <Input id={id} type="tel" inputMode="numeric" autoComplete="tel" placeholder="0912345678" aria-describedby={describedBy} aria-invalid={invalid} value={values.phone} onChange={(e) => set('phone')(e.target.value)} />
                )}
              </Field>
              <Field label="Email" required error={errors.email}>
                {({ id, describedBy, invalid }) => (
                  <Input id={id} type="email" autoComplete="email" placeholder="you@example.com" aria-describedby={describedBy} aria-invalid={invalid} value={values.email} onChange={(e) => set('email')(e.target.value)} />
                )}
              </Field>
            </div>
          </Section>

          <Section title="配送方式">
            <RadioGroup
              ariaLabel="配送方式"
              variant="cards"
              value={shipping}
              onValueChange={setShipping}
              className="@3xl:grid-cols-2"
              options={[
                { value: 'home', label: '宅配', description: `2–3 個工作天，未滿 NT$1,500 運費 ${formatNT(SHIPPING_FEE.home)}` },
                { value: 'store', label: '超商取貨', description: `3–5 個工作天，未滿 NT$1,500 運費 ${formatNT(SHIPPING_FEE.store)}` },
              ]}
            />
            <div className="mt-5 grid gap-4 @3xl:grid-cols-[200px_1fr]">
              {shipping === 'home' ? (
                <>
                  <Field label="縣市" required error={errors.county}>
                    {({ id, describedBy, invalid }) => (
                      <Select id={id} describedBy={describedBy} invalid={invalid} value={values.county || null} onValueChange={set('county')} placeholder="選擇縣市" items={TW_COUNTIES.map((c) => ({ value: c, label: c }))} />
                    )}
                  </Field>
                  <Field label="地址" required error={errors.address}>
                    {({ id, describedBy, invalid }) => (
                      <Input id={id} autoComplete="street-address" placeholder="區、路名、門牌" aria-describedby={describedBy} aria-invalid={invalid} value={values.address} onChange={(e) => set('address')(e.target.value)} />
                    )}
                  </Field>
                </>
              ) : (
                <Field label="取貨門市" required error={errors.pickup} className="@3xl:col-span-2">
                  {({ id, describedBy, invalid }) => (
                    <Select id={id} describedBy={describedBy} invalid={invalid} value={values.pickup || null} onValueChange={set('pickup')} placeholder="選擇門市" items={PICKUP_STORES.map((s) => ({ value: s, label: s }))} />
                  )}
                </Field>
              )}
            </div>
          </Section>

          <Section title="付款方式">
            <RadioGroup
              ariaLabel="付款方式"
              variant="cards"
              value={payment}
              onValueChange={setPayment}
              className="@3xl:grid-cols-2"
              options={(Object.keys(PAYMENT_LABEL) as Payment[]).map((p) => ({ value: p, label: PAYMENT_LABEL[p] }))}
            />
            <p className={cn('mt-4 flex items-center gap-2 text-sm', muted)}>
              <Lock size={15} aria-hidden />
              示範網站，不會實際付款
            </p>
          </Section>

          <Section title="備註與條款">
            <div className="flex flex-col gap-5">
              <Field label="訂單備註（選填）" aside={`${values.note.length}/${NOTE_MAX}`}>
                {({ id }) => <Textarea id={id} rows={3} maxLength={NOTE_MAX} value={values.note} onChange={(e) => set('note')(e.target.value)} placeholder="例如：請在週末送達" />}
              </Field>
              <div className="flex flex-col gap-1.5">
                <Checkbox
                  id="tpl-terms"
                  label="我已閱讀並同意購物條款"
                  checked={terms}
                  invalid={Boolean(errors.terms)}
                  describedBy={errors.terms ? 'tpl-terms-error' : undefined}
                  onCheckedChange={(v) => {
                    setTerms(v)
                    if (v) setErrors((e) => ({ ...e, terms: undefined }))
                  }}
                />
                {errors.terms && (
                  <p id="tpl-terms-error" className="text-[13px] text-(--tpl-error)">
                    {errors.terms}
                  </p>
                )}
              </div>
            </div>
          </Section>

          <Button type="submit" loading={submitting} className="w-full @3xl:w-auto @3xl:self-end @3xl:px-10">
            {submitting ? '送出中' : '送出訂單'}
          </Button>
        </form>
      </div>
    </div>
  )
}
