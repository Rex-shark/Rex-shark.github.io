import { useMemo, useState, type ReactNode } from 'react'
import { Bell, LogOut, Search, Settings, ShoppingBag, Trash2, User } from 'lucide-react'
import { cn } from '../lib/cn'
import { CATEGORIES, PRODUCTS } from '../data/catalog'
import { PEOPLE, avatarTone } from '../data/people'
import { formatNT } from '../lib/format'
import { toast } from '../lib/toast'
import { fakeSubmit } from '../lib/fakeSubmit'
import { email as emailRule, runValidators } from '../lib/validate'
import { useTplStyle } from '../viewer/context'
import Button from '../ui/Button'
import { Field, Input, QuantityInput, Textarea } from '../ui/Field'
import Select from '../ui/Select'
import { Checkbox, RadioGroup, Switch } from '../ui/Choice'
import Segmented from '../ui/Segmented'
import Tabs from '../ui/Tabs'
import { Chip, RemovableChip } from '../ui/Chip'
import Badge from '../ui/Badge'
import { Card, CardHeader } from '../ui/Card'
import { Pagination, SortTH, TD, TH, THead, TR, Table, type SortDir } from '../ui/Table'
import { Dialog, Drawer, Menu, Popover, Tooltip } from '../ui/Overlay'
import { EmptyState, Progress, Skeleton } from '../ui/Feedback'
import Steps from '../ui/Steps'
import { Avatar, Rating } from '../ui/Display'
import Accordion from '../ui/Accordion'
import TplImage from '../ui/TplImage'
import LineChart from '../ui/charts/LineChart'
import DonutChart from '../ui/charts/DonutChart'
import BarList from '../ui/charts/BarList'
import { heading, muted, numeric } from '../ui/classes'

/*
 * 元件總覽（/templates/kit）：所有共用元件在各種狀態下的樣子，作為風格驗收基準。
 * 不列在總覽頁、不進 sitemap。狀態用元件內 state，切換風格時不會重置（驗證不重新掛載）。
 */

const SAMPLE_MONTHS = [812, 768, 845, 901, 934, 988, 1042, 1016, 1097, 1121, 1143, 1284.6].map((v, i) => ({
  label: i === 0 ? '12月' : `${i}月`,
  value: v,
}))

function Section({ title, children, className }: { title: string; children: ReactNode; className?: string }) {
  return (
    <Card as="section" className={className}>
      <CardHeader title={title} />
      {children}
    </Card>
  )
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2 @3xl:flex-row @3xl:items-center @3xl:gap-4">
      <span className={cn('w-20 shrink-0 text-xs', muted)}>{label}</span>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  )
}

export default function KitView() {
  const style = useTplStyle()
  // 表單
  const [name, setName] = useState('')
  const [mail, setMail] = useState('rex@')
  const [note, setNote] = useState('包裝很用心，拆箱的時候還有一張手寫卡片。')
  const [category, setCategory] = useState<string | null>(null)
  const [qty, setQty] = useState(1)
  const [checks, setChecks] = useState({ a: true, b: false })
  const [pay, setPay] = useState<'card' | 'linepay' | 'atm'>('card')
  const [ship, setShip] = useState<'home' | 'store'>('home')
  const [notify, setNotify] = useState(true)
  const [weekly, setWeekly] = useState(false)
  // 選擇
  const [chip, setChip] = useState('all')
  const [range, setRange] = useState<'7d' | '12m'>('12m')
  const [tab, setTab] = useState('all')
  const [applied, setApplied] = useState(['家具', 'NT$1,000 以下', '只看有庫存'])
  // 表格
  const [sort, setSort] = useState<{ key: 'price' | 'stock'; dir: SortDir }>({ key: 'price', dir: 'desc' })
  const [selected, setSelected] = useState<Set<string>>(new Set(['P03']))
  const [page, setPage] = useState(1)
  // 浮層
  const [dialog, setDialog] = useState(false)
  const [alert, setAlert] = useState(false)
  const [drawer, setDrawer] = useState(false)
  const [sheet, setSheet] = useState(false)
  const [saving, setSaving] = useState(false)
  // 步驟
  const [step, setStep] = useState(1)

  const mailError = runValidators(mail, emailRule)

  const rows = useMemo(() => {
    const list = [...PRODUCTS].sort((a, b) => (sort.dir === 'asc' ? 1 : -1) * (a[sort.key] - b[sort.key]))
    return list.slice((page - 1) * 5, page * 5)
  }, [sort, page])

  const allOnPage = rows.every((r) => selected.has(r.id))
  const someOnPage = rows.some((r) => selected.has(r.id))

  function toggleSort(key: 'price' | 'stock') {
    setSort((s) => ({ key, dir: s.key === key && s.dir === 'desc' ? 'asc' : 'desc' }))
  }

  async function save() {
    setSaving(true)
    await fakeSubmit()
    setSaving(false)
    toast('設定已儲存')
  }

  const topFive = [...PRODUCTS].sort((a, b) => b.monthlySales - a.monthlySales).slice(0, 5)

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 @3xl:px-8 @3xl:py-12">
      <header className="mb-8">
        <p className={cn('text-sm', muted)}>設計範本 ・ 元件總覽</p>
        <h1 className={cn('mt-1 text-3xl @3xl:text-4xl', heading)}>{style.meta.name}</h1>
        <p className={cn('mt-2 max-w-2xl text-sm leading-relaxed', muted)}>{style.meta.tagline}</p>
      </header>

      <div className="grid gap-6 @5xl:grid-cols-2">
        <Section title="文字與色票" className="@5xl:col-span-2">
          <div className="grid gap-6 @3xl:grid-cols-2">
            <div className="space-y-2">
              <p className={cn('text-4xl', heading)}>把森林的安靜</p>
              <p className={cn('text-2xl', heading)}>帶回日常的選物</p>
              <p className={cn('text-lg', heading)}>標題 Headline 20</p>
              <p className="text-base leading-relaxed">內文：來自台灣的木作與生活選物品牌，與在地工匠合作，做能用很久的東西。</p>
              <p className={cn('text-sm', muted)}>次要說明文字 on-surface-variant</p>
              <p className="text-sm text-(--tpl-on-surface-subtle)">輔助文字 on-surface-subtle</p>
              <p className={cn('text-3xl', heading, numeric)}>NT$1,284,600</p>
              <a href="#kit" onClick={(e) => e.preventDefault()} className="text-sm text-(--tpl-link) underline underline-offset-4">
                這是一個連結
              </a>
            </div>
            <ul className="grid grid-cols-4 gap-3 text-[11px] @md:grid-cols-6">
              {['primary', 'secondary', 'tertiary', 'accent', 'surface', 'surface-raised', 'outline', 'success', 'warning', 'error', 'info', 'chart-1', 'chart-2', 'chart-3', 'chart-4'].map((k) => (
                <li key={k} className="flex flex-col gap-1">
                  <span className="h-10 rounded-(--tpl-radius-sm) ring-1 ring-(--tpl-outline)" style={{ backgroundColor: `var(--tpl-${k})` }} />
                  <span className={muted}>{k}</span>
                </li>
              ))}
            </ul>
          </div>
        </Section>

        <Section title="按鈕">
          <div className="space-y-4">
            <Row label="變體">
              <Button>主要按鈕</Button>
              <Button variant="secondary">次要按鈕</Button>
              <Button variant="ghost">文字按鈕</Button>
              <Button variant="danger">
                <Trash2 size={16} />
                刪除
              </Button>
            </Row>
            <Row label="狀態">
              <Button disabled>停用</Button>
              <Button variant="secondary" disabled>
                停用
              </Button>
              <Button loading>儲存中</Button>
            </Row>
            <Row label="尺寸">
              <Button size="sm">小按鈕</Button>
              <Button size="sm" variant="secondary">
                小按鈕
              </Button>
              <Button size="icon" variant="secondary" aria-label="搜尋">
                <Search size={18} />
              </Button>
              <Button size="icon" variant="ghost" aria-label="設定">
                <Settings size={18} />
              </Button>
            </Row>
          </div>
        </Section>

        <Section title="輸入">
          <div className="grid gap-4 @3xl:grid-cols-2">
            <Field label="姓名" required hint="請填寫真實姓名">
              {({ id, describedBy, invalid }) => (
                <Input id={id} aria-describedby={describedBy} aria-invalid={invalid} value={name} onChange={(e) => setName(e.target.value)} placeholder="例如：林雨潔" />
              )}
            </Field>
            <Field label="Email" required error={mailError}>
              {({ id, describedBy, invalid }) => (
                <Input id={id} type="email" aria-describedby={describedBy} aria-invalid={invalid} value={mail} onChange={(e) => setMail(e.target.value)} />
              )}
            </Field>
            <Field label="售價" required>
              {({ id }) => <Input id={id} prefixText="NT$" inputMode="numeric" defaultValue="1,280" />}
            </Field>
            <Field label="已停用">
              {({ id }) => <Input id={id} disabled value="不可編輯" readOnly />}
            </Field>
            <Field label="分類" required>
              {({ id, describedBy }) => (
                <Select
                  id={id}
                  describedBy={describedBy}
                  value={category}
                  onValueChange={setCategory}
                  placeholder="選擇分類"
                  items={CATEGORIES.map((c) => ({ value: c.slug, label: c.name }))}
                />
              )}
            </Field>
            <Field label="數量">
              {() => <QuantityInput value={qty} max={5} onChange={setQty} />}
            </Field>
            <Field label="商店簡介" aside={`${note.length}/120`} className="@3xl:col-span-2">
              {({ id }) => <Textarea id={id} value={note} maxLength={120} onChange={(e) => setNote(e.target.value)} />}
            </Field>
          </div>
        </Section>

        <Section title="核取、單選、開關">
          <div className="space-y-5">
            <Row label="核取方塊">
              <Checkbox label="新品" checked={checks.a} onCheckedChange={(v) => setChecks((c) => ({ ...c, a: v }))} />
              <Checkbox label="熱銷" checked={checks.b} onCheckedChange={(v) => setChecks((c) => ({ ...c, b: v }))} />
              <Checkbox label="半選" checked={false} indeterminate onCheckedChange={() => {}} />
              <Checkbox label="停用" checked disabled onCheckedChange={() => {}} />
            </Row>
            <Row label="單選">
              <RadioGroup
                ariaLabel="配送方式"
                value={ship}
                onValueChange={setShip}
                options={[
                  { value: 'home', label: '宅配' },
                  { value: 'store', label: '超商取貨' },
                ]}
                className="flex-row gap-5"
              />
            </Row>
            <RadioGroup
              ariaLabel="付款方式"
              variant="cards"
              value={pay}
              onValueChange={setPay}
              className="@3xl:grid-cols-3"
              options={[
                { value: 'card', label: '信用卡', description: '示範網站，不會實際付款' },
                { value: 'linepay', label: 'LINE Pay' },
                { value: 'atm', label: 'ATM 轉帳', description: '3 天內完成轉帳' },
              ]}
            />
            <div className="space-y-3">
              <Switch label="新訂單 Email 通知" description="有新訂單時寄信給管理員" checked={notify} onCheckedChange={setNotify} />
              <Switch label="每週營運報表" checked={weekly} onCheckedChange={setWeekly} />
              <Switch label="停用的開關" checked disabled onCheckedChange={() => {}} />
            </div>
          </div>
        </Section>

        <Section title="Chip、分段控制、頁籤">
          <div className="space-y-5">
            <div className="flex flex-wrap gap-2">
              {['all', ...CATEGORIES.map((c) => c.slug)].map((c) => (
                <Chip key={c} selected={chip === c} onClick={() => setChip(c)}>
                  {c === 'all' ? '全部' : CATEGORIES.find((x) => x.slug === c)?.name}
                </Chip>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {applied.map((a) => (
                <RemovableChip key={a} removeLabel={`移除條件：${a}`} onRemove={() => setApplied((l) => l.filter((x) => x !== a))}>
                  {a}
                </RemovableChip>
              ))}
              {applied.length === 0 && <span className={cn('text-sm', muted)}>沒有套用條件</span>}
            </div>
            <Segmented
              ariaLabel="期間"
              value={range}
              onValueChange={setRange}
              options={[
                { value: '7d', label: '近 7 天' },
                { value: '12m', label: '近 12 個月' },
              ]}
            />
            <Tabs
              ariaLabel="訂單狀態"
              value={tab}
              onValueChange={setTab}
              items={[
                { value: 'all', label: '全部', count: 12 },
                { value: 'unpaid', label: '待付款', count: 1 },
                { value: 'paid', label: '已付款', count: 2 },
                { value: 'shipping', label: '出貨中', count: 3 },
                { value: 'done', label: '已完成', count: 5 },
                { value: 'cancel', label: '已取消', count: 1 },
              ]}
            />
          </div>
        </Section>

        <Section title="徽章、進度、頭像、星等">
          <div className="space-y-5">
            <Row label="徽章">
              <Badge tone="warning">待付款</Badge>
              <Badge tone="info">已付款</Badge>
              <Badge tone="accent">出貨中</Badge>
              <Badge tone="success">已完成</Badge>
              <Badge tone="neutral">已取消</Badge>
              <Badge tone="error" dot>
                售完
              </Badge>
            </Row>
            <Row label="進度">
              <div className="w-64 space-y-2">
                <p className="text-sm">
                  再買 <span className={numeric}>{formatNT(240)}</span> 即可免運
                </p>
                <Progress value={1260} max={1500} label="免運進度" />
                <Progress value={1500} max={1500} label="已達免運" tone="success" />
              </div>
            </Row>
            <Row label="頭像">
              {PEOPLE.slice(0, 6).map((p) => (
                <Avatar key={p.id} name={p.name} tone={avatarTone(p.id)} />
              ))}
            </Row>
            <Row label="星等">
              <Rating value={4.8} count={412} />
              <Rating value={4.4} />
            </Row>
            <Row label="骨架屏">
              <div className="flex w-64 items-center gap-3">
                <Skeleton className="size-10 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-3 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
            </Row>
          </div>
        </Section>

        <Card padded={false} as="section" className="overflow-hidden @5xl:col-span-2">
          <div className="p-5 @3xl:p-6">
            <CardHeader
              className="mb-0"
              title="表格"
              description="排序、勾選（含半選）、hover、分頁"
              action={
                selected.size > 0 && (
                  <Button size="sm" variant="secondary" onClick={() => toast(`已更新 ${selected.size} 筆`)}>
                    標記 {selected.size} 筆為出貨中
                  </Button>
                )
              }
            />
          </div>
          <Table>
            <THead>
              <tr>
                <TH className="w-12">
                  <Checkbox
                    ariaLabel="全選本頁"
                    checked={allOnPage}
                    indeterminate={!allOnPage && someOnPage}
                    onCheckedChange={(v) =>
                      setSelected((s) => {
                        const next = new Set(s)
                        rows.forEach((r) => (v ? next.add(r.id) : next.delete(r.id)))
                        return next
                      })
                    }
                  />
                </TH>
                <TH>商品</TH>
                <TH>分類</TH>
                <SortTH label="售價" align="right" active={sort.key === 'price'} dir={sort.dir} onSort={() => toggleSort('price')} />
                <SortTH label="庫存" align="right" active={sort.key === 'stock'} dir={sort.dir} onSort={() => toggleSort('stock')} />
                <TH>狀態</TH>
              </tr>
            </THead>
            <tbody>
              {rows.map((p) => (
                <TR key={p.id} selected={selected.has(p.id)} clickable>
                  <TD>
                    <Checkbox
                      ariaLabel={`選取 ${p.name}`}
                      checked={selected.has(p.id)}
                      onCheckedChange={(v) =>
                        setSelected((s) => {
                          const next = new Set(s)
                          if (v) next.add(p.id)
                          else next.delete(p.id)
                          return next
                        })
                      }
                    />
                  </TD>
                  <TD>
                    <div className="flex items-center gap-3">
                      <span className="size-10 shrink-0 overflow-hidden rounded-(--tpl-radius-sm)">
                        <TplImage id={p.id} />
                      </span>
                      <span className="whitespace-nowrap">{p.name}</span>
                    </div>
                  </TD>
                  <TD className={muted}>{CATEGORIES.find((c) => c.slug === p.category)?.name}</TD>
                  <TD align="right" num>
                    {formatNT(p.price)}
                  </TD>
                  <TD align="right" num>
                    {p.stock}
                  </TD>
                  <TD>
                    {p.stock === 0 ? <Badge tone="error">售完</Badge> : p.stock <= 10 ? <Badge tone="warning">低庫存</Badge> : <Badge tone="success">正常</Badge>}
                  </TD>
                </TR>
              ))}
            </tbody>
          </Table>
          <div className="border-t border-(--tpl-outline) px-5 py-3">
            <Pagination page={page} pageSize={5} total={PRODUCTS.length} onPageChange={setPage} />
          </div>
        </Card>

        <Section title="浮層">
          <div className="flex flex-wrap gap-3">
            <Button variant="secondary" onClick={() => setDialog(true)}>
              對話框
            </Button>
            <Button variant="danger" onClick={() => setAlert(true)}>
              危險確認
            </Button>
            <Button variant="secondary" onClick={() => setDrawer(true)}>
              右側抽屜
            </Button>
            <Button variant="secondary" onClick={() => setSheet(true)}>
              底部抽屜
            </Button>
            <Menu
              trigger={
                <Button variant="secondary">
                  <User size={16} />
                  使用者選單
                </Button>
              }
              header={
                <div className="flex items-center gap-2.5">
                  <Avatar name="何雅琪" tone={avatarTone('A01')} size="sm" />
                  <div>
                    <p className="text-sm">何雅琪</p>
                    <p className={cn('text-xs', muted)}>admin@qingsen.example.com</p>
                  </div>
                </div>
              }
              items={[
                { label: '個人資料', icon: <User size={16} />, disabled: true, hint: '未開放' },
                { label: '說明中心', icon: <Settings size={16} />, disabled: true, hint: '未開放' },
                { label: '登出', icon: <LogOut size={16} />, onSelect: () => toast('示範版不提供登出', { tone: 'info' }) },
              ]}
            />
            <Popover
              title="通知"
              trigger={
                <Button variant="secondary" size="icon" aria-label="通知（3 則未讀）">
                  <Bell size={18} />
                </Button>
              }
            >
              <div className="border-b border-(--tpl-outline) px-4 py-3 text-sm">通知</div>
              <ul className="p-2 text-sm">
                {['新訂單 QS-261109-0418', '藤編休閒椅 庫存剩 3 件', '手沖咖啡壺 已售完'].map((n) => (
                  <li key={n} className="rounded-(--tpl-radius-sm) px-3 py-2.5 hover:bg-(--tpl-row-hover-bg)">
                    {n}
                  </li>
                ))}
              </ul>
            </Popover>
            <Tooltip content="示範版未開放">
              <Button variant="ghost" aria-disabled className="cursor-not-allowed text-(--tpl-on-disabled) hover:bg-transparent hover:text-(--tpl-on-disabled)">
                <ShoppingBag size={16} />
                停用項目（hover 看提示）
              </Button>
            </Tooltip>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button size="sm" variant="ghost" onClick={() => toast('已新增商品')}>
              成功 toast
            </Button>
            <Button size="sm" variant="ghost" onClick={() => toast('到貨時會通知你（示範）', { tone: 'info' })}>
              資訊 toast
            </Button>
            <Button size="sm" variant="ghost" onClick={() => toast('折扣碼無效或已過期', { tone: 'error' })}>
              錯誤 toast
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => toast('已移除 粗陶馬克杯', { action: { label: '復原', onClick: () => toast('已復原', { tone: 'info' }) }, duration: 5000 })}
            >
              含復原 toast
            </Button>
          </div>

          <Dialog
            open={dialog}
            onOpenChange={setDialog}
            title="新增商品"
            description="新增的商品只存在本次瀏覽。"
            footer={
              <>
                <Button variant="secondary" onClick={() => setDialog(false)}>
                  取消
                </Button>
                <Button
                  loading={saving}
                  onClick={async () => {
                    await save()
                    setDialog(false)
                  }}
                >
                  新增
                </Button>
              </>
            }
          >
            <div className="space-y-4">
              <Field label="商品名稱" required>
                {({ id }) => <Input id={id} placeholder="最多 20 字" />}
              </Field>
              <Switch label="立即上架" checked={notify} onCheckedChange={setNotify} />
            </div>
          </Dialog>
          <Dialog
            open={alert}
            onOpenChange={setAlert}
            role="alert"
            title="確定要清除嗎？"
            description="此動作會把所有資料恢復為初始狀態。"
            footer={
              <>
                <Button variant="secondary" onClick={() => setAlert(false)}>
                  取消
                </Button>
                <Button
                  variant="danger"
                  onClick={() => {
                    setAlert(false)
                    toast('已清除示範資料')
                  }}
                >
                  確定清除
                </Button>
              </>
            }
          />
          <Drawer open={drawer} onOpenChange={setDrawer} title="QS-261109-0418" titleAside={<Badge tone="info">已付款</Badge>} footer={<Button className="w-full">更改狀態</Button>}>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className={muted}>顧客</dt>
                <dd>林雨潔</dd>
              </div>
              <div className="flex justify-between">
                <dt className={muted}>商品</dt>
                <dd>粗陶馬克杯（霧白）×2</dd>
              </div>
              <div className="flex justify-between">
                <dt className={muted}>合計</dt>
                <dd className={numeric}>{formatNT(1260)}</dd>
              </div>
            </dl>
          </Drawer>
          <Drawer open={sheet} onOpenChange={setSheet} side="bottom" title="篩選">
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <Chip key={c.slug}>{c.name}</Chip>
              ))}
            </div>
          </Drawer>
        </Section>

        <Section title="步驟條與手風琴">
          <div className="space-y-5">
            <Steps steps={['選課程', '選時間', '填資料', '確認']} current={step} onStepClick={setStep} />
            <div className="flex gap-2">
              <Button size="sm" variant="secondary" disabled={step === 0} onClick={() => setStep((s) => s - 1)}>
                上一步
              </Button>
              <Button size="sm" disabled={step === 3} onClick={() => setStep((s) => s + 1)}>
                下一步
              </Button>
            </div>
            <Accordion
              defaultOpen={['desc']}
              items={[
                { value: 'desc', title: '商品說明', content: PRODUCTS[0].description },
                { value: 'ship', title: '運送方式', content: '宅配 2–3 個工作天送達；超商取貨 3–5 個工作天。' },
                { value: 'return', title: '退換貨說明', content: '到貨 7 天內可申請退換貨，商品需保持完整包裝。' },
              ]}
            />
          </div>
        </Section>

        <Section title="營收趨勢（折線圖）" className="@5xl:col-span-2">
          <LineChart data={SAMPLE_MONTHS} ariaLabel="近 12 個月營收" format={(v) => `${formatNT(v * 1000)}`} axisFormat={(v) => `${Math.round(v)}k`} />
        </Section>

        <Section title="分類占比（甜甜圈圖）">
          <DonutChart ariaLabel="分類營收占比" segments={CATEGORIES.map((c) => ({ key: c.slug, label: c.name, value: c.revenueShare }))} />
        </Section>

        <Section title="熱銷商品（長條清單）">
          <BarList
            ariaLabel="熱銷商品 Top 5"
            rows={topFive.map((p) => ({
              key: p.id,
              label: p.name,
              value: p.monthlySales,
              valueLabel: `${p.monthlySales} 件`,
              leading: (
                <span className="size-9 shrink-0 overflow-hidden rounded-(--tpl-radius-sm)">
                  <TplImage id={p.id} />
                </span>
              ),
            }))}
          />
        </Section>

        <Section title="空狀態">
          <EmptyState
            title="找不到符合「藤椅」的訂單"
            description="換個關鍵字試試，或清除搜尋看全部訂單。"
            action={
              <Button variant="secondary" size="sm">
                清除搜尋
              </Button>
            }
          />
        </Section>

        <Section title="商品圖片（佔位）">
          <ul className="grid grid-cols-3 gap-3">
            {['P01', 'P04', 'P07', 'P10', 'P04:alt1', 'P04:alt2'].map((k) => {
              const [id, variant] = k.split(':') as [string, 'alt1' | 'alt2' | undefined]
              return (
                <li key={k} className="aspect-square overflow-hidden rounded-(--tpl-radius-md)">
                  <TplImage id={id} variant={variant ?? 'main'} />
                </li>
              )
            })}
          </ul>
        </Section>
      </div>
    </div>
  )
}
