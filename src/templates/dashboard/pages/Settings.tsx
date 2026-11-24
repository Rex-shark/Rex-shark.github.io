import { useState, type ReactNode } from 'react'
import { RotateCcw, Save, Trash2 } from 'lucide-react'
import { cn } from '../../lib/cn'
import { useStore } from '../../lib/store'
import { toast } from '../../lib/toast'
import { fakeSubmit } from '../../lib/fakeSubmit'
import { useSubmitGuard } from '../../lib/useSubmitGuard'
import { email as emailRule, required, validateForm } from '../../lib/validate'
import Button from '../../ui/Button'
import Select from '../../ui/Select'
import { Card, CardHeader } from '../../ui/Card'
import { Switch } from '../../ui/Choice'
import { Dialog } from '../../ui/Overlay'
import { Field, Input, QuantityInput, Textarea } from '../../ui/Field'
import { muted, overlaySurface } from '../../ui/classes'
import type { StoreSettings } from '../data'
import { dashStore, dispatch } from '../state'
import { PageIntro } from '../parts'

const INTRO_MAX = 120

function Section({ title, description, children, danger }: { title: string; description?: string; children: ReactNode; danger?: boolean }) {
  return (
    <Card as="section" className={cn(danger && 'border-(--tpl-error)/40')}>
      <CardHeader title={title} description={description} />
      {children}
    </Card>
  )
}

export default function Settings() {
  const saved = useStore(dashStore, (s) => s.settings)
  const [draft, setDraft] = useState<StoreSettings>(saved)
  const [errors, setErrors] = useState<Partial<Record<'storeName' | 'email', string>>>({})
  const [saving, setSaving] = useState(false)
  const guard = useSubmitGuard()
  const [confirmClear, setConfirmClear] = useState(false)

  const dirty = JSON.stringify(draft) !== JSON.stringify(saved)

  function update<K extends keyof StoreSettings>(key: K, value: StoreSettings[K]) {
    setDraft((d) => ({ ...d, [key]: value }))
    if (key in errors) setErrors((e) => ({ ...e, [key]: undefined }))
  }

  async function save() {
    if (saving) return
    const errs = validateForm({ storeName: draft.storeName, email: draft.email }, { storeName: [required('請輸入商店名稱')], email: [emailRule] })
    setErrors(errs)
    if (Object.keys(errs).length) {
      toast('有欄位需要修正', { tone: 'error' })
      return
    }
    setSaving(true)
    const id = guard.begin()
    await fakeSubmit()
    if (!guard.isCurrent(id)) return
    setSaving(false)
    dispatch({ type: 'saveSettings', settings: draft })
    toast('設定已儲存')
  }

  return (
    <div className="mx-auto max-w-3xl">
      <PageIntro description="商店資料、通知與偏好設定。儲存後，低庫存門檻會同步套用到總覽與商品頁。" />

      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault()
          if (dirty) save()
        }}
        className="flex flex-col gap-4 @4xl:gap-6"
      >
        <Section title="商店資料">
          <div className="grid gap-4 @2xl:grid-cols-2">
            <Field label="商店名稱" required error={errors.storeName}>
              {({ id, describedBy, invalid }) => (
                <Input id={id} aria-describedby={describedBy} aria-invalid={invalid} value={draft.storeName} onChange={(e) => update('storeName', e.target.value)} />
              )}
            </Field>
            <Field label="客服信箱" required error={errors.email}>
              {({ id, describedBy, invalid }) => (
                <Input id={id} type="email" aria-describedby={describedBy} aria-invalid={invalid} value={draft.email} onChange={(e) => update('email', e.target.value)} />
              )}
            </Field>
            <Field label="客服電話">
              {({ id }) => <Input id={id} type="tel" value={draft.phone} onChange={(e) => update('phone', e.target.value)} />}
            </Field>
            <Field label="商店簡介" aside={`${draft.intro.length}/${INTRO_MAX}`} className="@2xl:col-span-2">
              {({ id }) => <Textarea id={id} rows={3} maxLength={INTRO_MAX} value={draft.intro} onChange={(e) => update('intro', e.target.value)} />}
            </Field>
          </div>
        </Section>

        <Section title="通知" description="選擇哪些事件要寄信通知管理員">
          <div className="flex flex-col gap-4">
            <Switch label="新訂單 Email 通知" description="有新訂單時立即通知" checked={draft.notifyOrder} onCheckedChange={(v) => update('notifyOrder', v)} />
            <Switch label="低庫存提醒" description="商品庫存低於門檻時通知" checked={draft.notifyLowStock} onCheckedChange={(v) => update('notifyLowStock', v)} />
            <Switch label="每週營運報表" description="每週一寄送上週摘要" checked={draft.weeklyReport} onCheckedChange={(v) => update('weeklyReport', v)} />
            <Switch label="行銷活動訊息" description="青森的新功能與活動消息" checked={draft.marketing} onCheckedChange={(v) => update('marketing', v)} />
          </div>
        </Section>

        <Section title="庫存與偏好">
          <div className="grid gap-4 @2xl:grid-cols-3">
            <Field label="低庫存門檻" hint="庫存小於等於此數字視為低庫存">
              {() => <QuantityInput label="低庫存門檻" value={draft.lowStock} min={1} max={99} onChange={(v) => update('lowStock', v)} />}
            </Field>
            <Field label="後台語言" hint="示範版只改顯示值">
              {({ id, describedBy }) => (
                <Select
                  id={id}
                  describedBy={describedBy}
                  value={draft.language}
                  onValueChange={(v) => update('language', v)}
                  items={[
                    { value: 'zh-TW', label: '繁體中文' },
                    { value: 'en', label: 'English' },
                    { value: 'ja', label: '日本語' },
                  ]}
                />
              )}
            </Field>
            <Field label="時區">
              {({ id }) => (
                <Select
                  id={id}
                  value={draft.timezone}
                  onValueChange={(v) => update('timezone', v)}
                  items={[
                    { value: 'Asia/Taipei', label: '(GMT+8) 台北' },
                    { value: 'Asia/Tokyo', label: '(GMT+9) 東京' },
                    { value: 'UTC', label: '(GMT+0) UTC' },
                  ]}
                />
              )}
            </Field>
          </div>
        </Section>

        <Section title="危險區" description="這裡的操作無法復原" danger>
          <div className="flex flex-col gap-3 @2xl:flex-row @2xl:items-center @2xl:justify-between">
            <p className={cn('text-sm', muted)}>把訂單、商品、設定、通知全部恢復為初始示範資料。</p>
            <Button variant="danger" onClick={() => setConfirmClear(true)}>
              <Trash2 size={16} />
              清除示範資料
            </Button>
          </div>
        </Section>
        {/* 儲存列：吸附在可見範圍底部（避開展示工具列），捲到哪裡都按得到 */}
        <div
          className={cn(
            'sticky bottom-[calc(var(--tpl-bottom-inset,0px)+12px)] z-10 flex flex-wrap items-center gap-3 rounded-(--tpl-radius-lg) px-4 py-3',
            overlaySurface,
          )}
        >
          <p className={cn('flex-1 text-sm', dirty ? 'text-(--tpl-on-surface)' : muted)} role="status">
            {dirty ? '有尚未儲存的變更' : '所有變更都已儲存'}
          </p>
          {dirty && (
            <Button
              variant="ghost"
              onClick={() => {
                setDraft(saved)
                setErrors({})
              }}
            >
              <RotateCcw size={16} />
              還原
            </Button>
          )}
          <Button type="submit" disabled={!dirty} loading={saving}>
            {!saving && <Save size={16} />}
            {saving ? '儲存中' : '儲存變更'}
          </Button>
        </div>
      </form>

      <Dialog
        open={confirmClear}
        onOpenChange={setConfirmClear}
        role="alert"
        title="確定要清除嗎？"
        description="此動作會把所有資料恢復為初始狀態。"
        footer={
          <>
            <Button variant="secondary" onClick={() => setConfirmClear(false)}>
              取消
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                setConfirmClear(false)
                dashStore.reset()
                toast('已清除示範資料')
              }}
            >
              確定清除
            </Button>
          </>
        }
      />
    </div>
  )
}
