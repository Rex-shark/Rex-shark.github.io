import { useEffect, useRef, useState, type FormEvent } from 'react'
import { AtSign, Briefcase, CheckCircle2, Clock, Mail, MapPin, MessageCircle, Phone, Send, ThumbsUp } from 'lucide-react'
import { cn } from '../../lib/cn'
import { useStore } from '../../lib/store'
import { fakeSubmit } from '../../lib/fakeSubmit'
import { useSubmitGuard } from '../../lib/useSubmitGuard'
import { email as emailRule, lengthBetween, required, validateForm } from '../../lib/validate'
import { BRAND } from '../../data/brand'
import Button from '../../ui/Button'
import Badge from '../../ui/Badge'
import Accordion from '../../ui/Accordion'
import Select from '../../ui/Select'
import { Card } from '../../ui/Card'
import { Checkbox } from '../../ui/Choice'
import { Field, Input, Textarea } from '../../ui/Field'
import { heading, labelWeight, muted, numeric } from '../../ui/classes'
import { CAREERS, CONTACT_CATEGORIES, FAQ, type ContactCategory } from '../data'
import { corpStore, dispatch, type ContactValues } from '../state'
import { scrollToSection } from '../../lib/scroll'
import { Section } from './Intro'

const MESSAGE_MAX = 500

export function Careers() {
  return (
    <Section id="corp-careers" title="加入我們" intro="我們正在找喜歡好東西、也願意花時間把事情做好的夥伴。">
      <Accordion
        items={CAREERS.map((job) => ({
          value: job.id,
          title: (
            <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <Briefcase size={17} aria-hidden className="text-(--tpl-accent)" />
              {job.title}
              <span className="flex gap-1.5">
                <Badge tone="neutral">{job.location}</Badge>
                <Badge tone="neutral">{job.type}</Badge>
              </span>
            </span>
          ),
          content: (
            <div className="grid gap-5 pt-1 text-(--tpl-on-surface) @3xl:grid-cols-[1fr_1fr_auto] @3xl:items-end">
              <div>
                <h3 className={cn('mb-2 text-sm', labelWeight)}>工作內容</h3>
                <ul className={cn('flex list-disc flex-col gap-1 pl-5 text-sm', muted)}>
                  {job.duties.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className={cn('mb-2 text-sm', labelWeight)}>條件</h3>
                <ul className={cn('flex list-disc flex-col gap-1 pl-5 text-sm', muted)}>
                  {job.requirements.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              </div>
              <div>
                <Button
                  onClick={() => {
                    dispatch({ type: 'contact', patch: { category: '應徵職缺', message: `我想應徵：${job.title}` } })
                    scrollToSection('corp-contact')
                  }}
                >
                  <Send size={15} />
                  我要應徵
                </Button>
              </div>
            </div>
          ),
        }))}
      />
    </Section>
  )
}

export function Faq() {
  return (
    <Section title="常見問題">
      <Accordion multiple items={FAQ.map((f, i) => ({ value: `faq-${i}`, title: f.q, content: f.a }))} />
    </Section>
  )
}

const SOCIALS = [
  { label: 'Instagram', Icon: AtSign },
  { label: 'Facebook', Icon: ThumbsUp },
  { label: 'LINE 官方帳號', Icon: MessageCircle },
]

type ErrorKey = 'name' | 'email' | 'category' | 'message' | 'privacy'

function ContactForm() {
  const { contact, contactSent } = useStore(corpStore)
  const [errors, setErrors] = useState<Partial<Record<ErrorKey, string>>>({})
  const [sending, setSending] = useState(false)
  const guard = useSubmitGuard()
  const [attempt, setAttempt] = useState(0)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (!attempt) return
    const first = formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')
    first?.scrollIntoView({ block: 'center', behavior: 'smooth' })
    first?.focus({ preventScroll: true })
  }, [attempt])

  function set<K extends keyof ContactValues>(k: K, v: ContactValues[K]) {
    dispatch({ type: 'contact', patch: { [k]: v } })
    if (errors[k as ErrorKey]) setErrors((e) => ({ ...e, [k]: undefined }))
  }

  async function submit(e: FormEvent) {
    e.preventDefault()
    if (sending) return
    const errs: Partial<Record<ErrorKey, string>> = validateForm(
      { name: contact.name, email: contact.email, category: contact.category, message: contact.message },
      { name: [required('請輸入姓名')], email: [emailRule], category: [required('請選擇詢問類別')], message: [required('請輸入訊息'), lengthBetween(10, MESSAGE_MAX)] },
    )
    if (!contact.privacy) errs.privacy = '請勾選同意後再送出'
    setErrors(errs)
    if (Object.keys(errs).length) {
      setAttempt((n) => n + 1)
      return
    }
    setSending(true)
    const id = guard.begin()
    await fakeSubmit()
    if (!guard.isCurrent(id)) return
    setSending(false)
    dispatch({ type: 'contactSent' })
  }

  if (contactSent) {
    return (
      <div role="status" className="flex flex-col items-center gap-4 py-10 text-center">
        <span className="inline-flex size-14 items-center justify-center rounded-full bg-(--tpl-success-container) text-(--tpl-success)" aria-hidden>
          <CheckCircle2 size={28} />
        </span>
        <div>
          <p className={cn('text-xl', heading)}>已收到你的訊息</p>
          <p className={cn('mt-1 text-sm', muted)}>我們會盡快與你聯繫。</p>
        </div>
        <Button
          variant="secondary"
          onClick={() => {
            dispatch({ type: 'contactReset' })
            setErrors({})
          }}
        >
          再寄一封
        </Button>
      </div>
    )
  }

  return (
    <form ref={formRef} noValidate onSubmit={submit} className="grid gap-4 @3xl:grid-cols-2">
      <Field label="姓名" required error={errors.name}>
        {({ id, describedBy, invalid }) => <Input id={id} autoComplete="name" aria-describedby={describedBy} aria-invalid={invalid} value={contact.name} onChange={(e) => set('name', e.target.value)} />}
      </Field>
      <Field label="Email" required error={errors.email}>
        {({ id, describedBy, invalid }) => (
          <Input id={id} type="email" autoComplete="email" aria-describedby={describedBy} aria-invalid={invalid} value={contact.email} onChange={(e) => set('email', e.target.value)} />
        )}
      </Field>
      <Field label="電話（選填）">
        {({ id }) => <Input id={id} type="tel" autoComplete="tel" value={contact.phone} onChange={(e) => set('phone', e.target.value)} />}
      </Field>
      <Field label="詢問類別" required error={errors.category}>
        {({ id, describedBy, invalid }) => (
          <Select<ContactCategory>
            id={id}
            describedBy={describedBy}
            invalid={invalid}
            value={contact.category || null}
            onValueChange={(v) => set('category', v)}
            placeholder="選擇類別"
            items={CONTACT_CATEGORIES.map((c) => ({ value: c, label: c }))}
          />
        )}
      </Field>
      <Field label="訊息" required error={errors.message} aside={`${contact.message.length}/${MESSAGE_MAX}`} className="@3xl:col-span-2">
        {({ id, describedBy, invalid }) => (
          <Textarea id={id} rows={5} maxLength={MESSAGE_MAX} aria-describedby={describedBy} aria-invalid={invalid} value={contact.message} onChange={(e) => set('message', e.target.value)} placeholder="至少 10 個字" />
        )}
      </Field>
      <div className="flex flex-col gap-1.5 @3xl:col-span-2">
        <Checkbox
          id="tpl-corp-privacy"
          label="我同意青森依隱私權政策處理我的資料"
          checked={contact.privacy}
          invalid={Boolean(errors.privacy)}
          describedBy={errors.privacy ? 'tpl-corp-privacy-error' : undefined}
          onCheckedChange={(v) => set('privacy', v)}
        />
        {errors.privacy && (
          <p id="tpl-corp-privacy-error" className="text-[13px] text-(--tpl-error)">
            {errors.privacy}
          </p>
        )}
      </div>
      <div className="@3xl:col-span-2">
        <Button type="submit" loading={sending} className="w-full @3xl:w-auto @3xl:px-10">
          {!sending && <Send size={16} />}
          {sending ? '送出中' : '送出訊息'}
        </Button>
      </div>
    </form>
  )
}

export function Contact() {
  const rows = [
    { Icon: MapPin, label: '總部地址', value: BRAND.address },
    { Icon: Phone, label: '電話', value: BRAND.phone, num: true },
    { Icon: Mail, label: '信箱', value: BRAND.email },
    { Icon: Clock, label: '營業時間', value: BRAND.hours },
  ]
  return (
    <Section id="corp-contact" title="聯絡我們" intro="合作、採購、媒體或任何想法，都歡迎留言給我們。">
      <div className="grid gap-6 @5xl:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
        <Card className="flex flex-col gap-6">
          <dl className="flex flex-col gap-4">
            {rows.map(({ Icon, label, value, num }) => (
              <div key={label} className="flex items-start gap-3">
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-(--tpl-radius-md) bg-(--tpl-selected-bg) text-(--tpl-selected-fg)" aria-hidden>
                  <Icon size={18} />
                </span>
                <div>
                  <dt className={cn('text-xs', muted)}>{label}</dt>
                  <dd className={cn('text-sm', num && numeric)}>{value}</dd>
                </div>
              </div>
            ))}
          </dl>
          <div>
            <p className={cn('mb-2 text-xs', muted)}>社群</p>
            <ul className="flex flex-wrap gap-2">
              {SOCIALS.map(({ label, Icon }) => (
                <li key={label}>
                  <a href="#" onClick={(e) => e.preventDefault()} className="inline-flex h-9 items-center gap-1.5 rounded-full bg-(--tpl-badge-neutral-bg) px-3 text-[13px] text-(--tpl-badge-neutral-fg) hover:text-(--tpl-on-surface)">
                    <Icon size={14} aria-hidden />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Card>
        <Card>
          <ContactForm />
        </Card>
      </div>
    </Section>
  )
}
