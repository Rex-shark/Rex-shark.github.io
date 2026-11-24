import { useEffect, useRef, useState } from 'react'
import { CheckCircle2, Lock } from 'lucide-react'
import { cn } from '../lib/cn'
import { useStore } from '../lib/store'
import { fakeSubmit } from '../lib/fakeSubmit'
import { useSubmitGuard } from '../lib/useSubmitGuard'
import { email as emailRule, required, validateForm } from '../lib/validate'
import Button from '../ui/Button'
import Segmented from '../ui/Segmented'
import Select from '../ui/Select'
import { Checkbox, RadioGroup, Switch } from '../ui/Choice'
import { Dialog } from '../ui/Overlay'
import { Field, Input, Textarea } from '../ui/Field'
import { heading, muted, numeric } from '../ui/classes'
import { PLANS, START_MONTHS, amountLabel } from './data'
import { dispatch, landingStore, type SubscribeForm } from './state'

type ErrorKey = 'startMonth' | 'name' | 'email' | 'recipient' | 'terms'
const CARD_MAX = 60

export default function SubscribeDialog() {
  const { dialogOpen, form, subscribed } = useStore(landingStore)
  const [errors, setErrors] = useState<Partial<Record<ErrorKey, string>>>({})
  const [saving, setSaving] = useState(false)
  const guard = useSubmitGuard()
  const [attempt, setAttempt] = useState(0)
  const bodyRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (!attempt) return
    const first = bodyRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')
    first?.scrollIntoView({ block: 'center', behavior: 'smooth' })
    first?.focus({ preventScroll: true })
  }, [attempt])

  function set<K extends keyof SubscribeForm>(k: K, v: SubscribeForm[K]) {
    dispatch({ type: 'form', patch: { [k]: v } })
    if (k in errors) setErrors((e) => ({ ...e, [k]: undefined }))
  }

  function close() {
    // 送出中取消：讓等待中的送出失效，訂閱不成立
    guard.cancel()
    setSaving(false)
    dispatch({ type: 'closeSubscribe' })
    setErrors({})
  }

  async function submit() {
    if (saving) return
    const errs: Partial<Record<ErrorKey, string>> = validateForm(
      { startMonth: form.startMonth, name: form.name, email: form.email, recipient: form.recipient },
      { startMonth: [required('請選擇首次出貨月份')], name: [required('請輸入姓名')], email: [emailRule], ...(form.gift ? { recipient: [required('請輸入收禮人姓名')] } : {}) },
    )
    if (!form.terms) errs.terms = '請勾選同意訂閱條款'
    setErrors(errs)
    if (Object.keys(errs).length) {
      setAttempt((n) => n + 1)
      return
    }
    setSaving(true)
    const id = guard.begin()
    await fakeSubmit()
    if (!guard.isCurrent(id)) return
    setSaving(false)
    dispatch({ type: 'subscribed' })
  }

  const startMonth = START_MONTHS.find((m) => m.value === form.startMonth)

  return (
    <Dialog
      open={dialogOpen}
      onOpenChange={(o) => !o && close()}
      title={subscribed ? '訂閱成功' : '訂閱森林盒子'}
      description={subscribed ? undefined : '示範網站，不會實際扣款。'}
      footer={
        subscribed ? (
          <Button onClick={close}>完成</Button>
        ) : (
          <div className="flex w-full flex-wrap items-center justify-between gap-3">
            <p className="text-sm">
              <span className={muted}>應付金額 </span>
              <span className={cn('text-lg', heading, numeric)}>{amountLabel(form.plan, form.billing)}</span>
            </p>
            <div className="flex gap-2">
              <Button variant="secondary" onClick={close}>
                取消
              </Button>
              <Button loading={saving} onClick={submit}>
                {saving ? '處理中' : '確認訂閱'}
              </Button>
            </div>
          </div>
        )
      }
    >
      {subscribed ? (
        <div role="status" className="flex flex-col items-center gap-4 py-6 text-center">
          <span className="inline-flex size-14 items-center justify-center rounded-full bg-(--tpl-success-container) text-(--tpl-success)" aria-hidden>
            <CheckCircle2 size={28} />
          </span>
          <p className={cn('text-xl', heading)}>訂閱成功！</p>
          <p className={cn('text-sm', muted)}>第一盒將於 {startMonth?.month} 月 15 日出貨。</p>
        </div>
      ) : (
        <form
          ref={bodyRef}
          noValidate
          onSubmit={(e) => {
            e.preventDefault()
            submit()
          }}
          className="flex flex-col gap-5"
        >
          <RadioGroup
            ariaLabel="方案"
            variant="cards"
            value={form.plan}
            onValueChange={(v) => set('plan', v)}
            options={PLANS.map((p) => ({
              value: p.key,
              label: `${p.name}${p.popular ? '（最受歡迎）' : ''}`,
              description: `${p.summary} ・ ${amountLabel(p.key, form.billing)}`,
            }))}
          />
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-[13px]">付款週期</span>
            <Segmented
              ariaLabel="付款週期"
              value={form.billing}
              onValueChange={(v) => set('billing', v)}
              options={[
                { value: 'monthly', label: '月繳' },
                { value: 'yearly', label: '年繳（省 2 個月）' },
              ]}
            />
          </div>
          <Field label="首次出貨月份" required error={errors.startMonth}>
            {({ id, describedBy, invalid }) => (
              <Select id={id} describedBy={describedBy} invalid={invalid} value={form.startMonth || null} onValueChange={(v) => set('startMonth', v)} placeholder="選擇月份" items={START_MONTHS.map((m) => ({ value: m.value, label: m.label }))} />
            )}
          </Field>
          <div className="grid gap-4 @md:grid-cols-2">
            <Field label="姓名" required error={errors.name}>
              {({ id, describedBy, invalid }) => <Input id={id} autoComplete="name" aria-describedby={describedBy} aria-invalid={invalid} value={form.name} onChange={(e) => set('name', e.target.value)} />}
            </Field>
            <Field label="Email" required error={errors.email}>
              {({ id, describedBy, invalid }) => (
                <Input id={id} type="email" autoComplete="email" aria-describedby={describedBy} aria-invalid={invalid} value={form.email} onChange={(e) => set('email', e.target.value)} />
              )}
            </Field>
          </div>
          <Switch label="這是一份禮物" description="開啟後填寫收禮人，盒中會附上你的祝福卡" checked={form.gift} onCheckedChange={(v) => set('gift', v)} />
          {form.gift && (
            <div className="grid gap-4 animate-in fade-in duration-200 motion-reduce:animate-none">
              <Field label="收禮人姓名" required error={errors.recipient}>
                {({ id, describedBy, invalid }) => <Input id={id} aria-describedby={describedBy} aria-invalid={invalid} value={form.recipient} onChange={(e) => set('recipient', e.target.value)} />}
              </Field>
              <Field label="祝福卡內容（選填）" aside={`${form.card.length}/${CARD_MAX}`}>
                {({ id }) => <Textarea id={id} rows={2} maxLength={CARD_MAX} value={form.card} onChange={(e) => set('card', e.target.value)} />}
              </Field>
            </div>
          )}
          <div className="flex flex-col gap-1.5">
            <Checkbox
              id="tpl-land-terms"
              label="我同意訂閱條款"
              checked={form.terms}
              invalid={Boolean(errors.terms)}
              describedBy={errors.terms ? 'tpl-land-terms-error' : undefined}
              onCheckedChange={(v) => set('terms', v)}
            />
            {errors.terms && (
              <p id="tpl-land-terms-error" className="text-[13px] text-(--tpl-error)">
                {errors.terms}
              </p>
            )}
          </div>
          <p className={cn('flex items-center gap-2 text-xs', muted)}>
            <Lock size={13} aria-hidden />
            示範網站，不會實際扣款
          </p>
          <button type="submit" hidden aria-hidden tabIndex={-1} />
        </form>
      )}
    </Dialog>
  )
}
