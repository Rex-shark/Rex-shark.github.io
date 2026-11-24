import { useState } from 'react'
import { LayoutGrid, List, Plus, Search } from 'lucide-react'
import { cn } from '../../lib/cn'
import { useStore } from '../../lib/store'
import { formatNT } from '../../lib/format'
import { toast } from '../../lib/toast'
import { fakeSubmit } from '../../lib/fakeSubmit'
import { useSubmitGuard } from '../../lib/useSubmitGuard'
import { intBetween, maxLength, required, validateForm } from '../../lib/validate'
import { CATEGORIES, categoryName, type CategorySlug, type ProductTag } from '../../data/catalog'
import Button from '../../ui/Button'
import Segmented from '../../ui/Segmented'
import Select from '../../ui/Select'
import Badge from '../../ui/Badge'
import { Card } from '../../ui/Card'
import { Checkbox, Switch } from '../../ui/Choice'
import { Dialog } from '../../ui/Overlay'
import { EmptyState } from '../../ui/Feedback'
import { Field, Input } from '../../ui/Field'
import { TD, TH, THead, TR, Table } from '../../ui/Table'
import { inputBase, labelWeight, muted, numeric } from '../../ui/classes'
import { dashStore, dispatch, type AdminProduct } from '../state'
import { PageIntro, ProductThumb, StockBadge } from '../parts'

const TAGS: ProductTag[] = ['新品', '熱銷', '限量']
const CATEGORY_ITEMS = [{ value: 'all' as const, label: '全部分類' }, ...CATEGORIES.map((c) => ({ value: c.slug, label: c.name }))]

function Price({ p }: { p: AdminProduct }) {
  return (
    <span className={cn('inline-flex flex-wrap items-baseline justify-end gap-x-1.5', numeric)}>
      <span>{formatNT(p.price)}</span>
      {p.originalPrice && <s className={cn('text-xs', muted)}>{formatNT(p.originalPrice)}</s>}
    </span>
  )
}

function togglePublished(p: AdminProduct) {
  dispatch({ type: 'togglePublished', id: p.id })
  toast(p.published ? `已下架「${p.name}」` : `已上架「${p.name}」`)
}

function ProductTable({ rows, threshold }: { rows: AdminProduct[]; threshold: number }) {
  return (
    <Table>
      <caption className="sr-only">商品列表</caption>
      <THead>
        <tr>
          <TH>商品</TH>
          <TH>分類</TH>
          <TH align="right">售價</TH>
          <TH align="right">庫存</TH>
          <TH align="right">本月銷量</TH>
          <TH align="center">上架</TH>
        </tr>
      </THead>
      <tbody>
        {rows.map((p) => (
          <TR key={p.id}>
            <TD>
              <div className="flex items-center gap-3">
                <ProductThumb id={p.id} label={p.name} />
                <div className="min-w-0">
                  <p className="whitespace-nowrap">{p.name}</p>
                  {p.tags.length > 0 && (
                    <div className="mt-1 flex gap-1">
                      {p.tags.map((t) => (
                        <Badge key={t} tone="accent" className="h-5 px-2 text-[11px]">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </TD>
            <TD className={muted}>{categoryName(p.category)}</TD>
            <TD align="right" className="whitespace-nowrap">
              <Price p={p} />
            </TD>
            <TD align="right">
              <span className="inline-flex items-center justify-end gap-2 whitespace-nowrap">
                <StockBadge stock={p.stock} threshold={threshold} />
                <span className={numeric}>{p.stock}</span>
              </span>
            </TD>
            <TD align="right" num>
              {p.monthlySales}
            </TD>
            <TD align="center">
              <span className="inline-flex">
                <Switch ariaLabel={`${p.name} 上架`} checked={p.published} onCheckedChange={() => togglePublished(p)} />
              </span>
            </TD>
          </TR>
        ))}
      </tbody>
    </Table>
  )
}

function ProductCards({ rows, threshold }: { rows: AdminProduct[]; threshold: number }) {
  return (
    <ul className="grid grid-cols-1 gap-4 @md:grid-cols-2 @3xl:grid-cols-3 @4xl:grid-cols-4">
      {rows.map((p) => (
        <Card as="li" key={p.id} padded={false} className="overflow-hidden">
          <div className="relative">
            <ProductThumb id={p.id} label={p.name} size="lg" />
            <span className="absolute top-3 left-3 flex gap-1">
              {p.tags.map((t) => (
                <Badge key={t} tone="accent">
                  {t}
                </Badge>
              ))}
            </span>
          </div>
          <div className="flex flex-col gap-3 p-4">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className={cn('truncate', labelWeight)}>{p.name}</p>
                <p className={cn('text-xs', muted)}>{categoryName(p.category)}</p>
              </div>
              <Price p={p} />
            </div>
            <div className="flex items-center justify-between gap-2 text-sm">
              <span className={cn('inline-flex items-center gap-2', muted)}>
                庫存 <span className={cn('text-(--tpl-on-surface)', numeric)}>{p.stock}</span>
                <StockBadge stock={p.stock} threshold={threshold} />
              </span>
              <Switch ariaLabel={`${p.name} 上架`} checked={p.published} onCheckedChange={() => togglePublished(p)} />
            </div>
          </div>
        </Card>
      ))}
    </ul>
  )
}

type FormValues = { name: string; category: string; price: string; stock: string }
const EMPTY_FORM: FormValues = { name: '', category: '', price: '', stock: '' }
let newSeq = 0

function AddProductDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const [values, setValues] = useState<FormValues>(EMPTY_FORM)
  const [tags, setTags] = useState<ProductTag[]>([])
  const [publish, setPublish] = useState(true)
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({})
  const [saving, setSaving] = useState(false)
  const guard = useSubmitGuard()

  const set = (k: keyof FormValues) => (v: string) => {
    setValues((s) => ({ ...s, [k]: v }))
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }))
  }

  function close(o: boolean) {
    onOpenChange(o)
    if (!o) {
      // 送出中取消：讓等待中的送出失效
      guard.cancel()
      setSaving(false)
      setValues(EMPTY_FORM)
      setTags([])
      setPublish(true)
      setErrors({})
    }
  }

  async function submit() {
    if (saving) return
    const errs = validateForm(values, {
      name: [required('請輸入商品名稱'), maxLength(20)],
      category: [required('請選擇分類')],
      price: [intBetween(1, 99999, '售價')],
      stock: [intBetween(0, 9999, '庫存')],
    })
    setErrors(errs)
    if (Object.keys(errs).length) return
    setSaving(true)
    const id = guard.begin()
    await fakeSubmit()
    if (!guard.isCurrent(id)) return
    setSaving(false)
    dispatch({
      type: 'addProduct',
      product: {
        id: `NEW${++newSeq}`,
        name: values.name.trim(),
        category: values.category as CategorySlug,
        price: Number(values.price),
        stock: Number(values.stock),
        monthlySales: 0,
        tags,
        published: publish,
      },
    })
    toast('已新增商品')
    close(false)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={close}
      title="新增商品"
      description="新增的商品只存在本次瀏覽，重設後就會消失。"
      footer={
        <>
          <Button variant="secondary" onClick={() => close(false)}>
            取消
          </Button>
          <Button loading={saving} onClick={submit}>
            {saving ? '新增中' : '新增商品'}
          </Button>
        </>
      }
    >
      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault()
          submit()
        }}
        className="grid gap-4 @md:grid-cols-2"
      >
        <Field label="商品名稱" required error={errors.name} aside={`${values.name.length}/20`} className="@md:col-span-2">
          {({ id, describedBy, invalid }) => (
            <Input id={id} aria-describedby={describedBy} aria-invalid={invalid} value={values.name} onChange={(e) => set('name')(e.target.value)} placeholder="例如：橡木托盤" />
          )}
        </Field>
        <Field label="分類" required error={errors.category} className="@md:col-span-2">
          {({ id, describedBy, invalid }) => (
            <Select
              id={id}
              describedBy={describedBy}
              invalid={invalid}
              value={values.category || null}
              onValueChange={set('category')}
              placeholder="選擇分類"
              items={CATEGORIES.map((c) => ({ value: c.slug, label: c.name }))}
            />
          )}
        </Field>
        <Field label="售價" required error={errors.price}>
          {({ id, describedBy, invalid }) => (
            <Input id={id} prefixText="NT$" inputMode="numeric" aria-describedby={describedBy} aria-invalid={invalid} value={values.price} onChange={(e) => set('price')(e.target.value)} placeholder="1–99,999" />
          )}
        </Field>
        <Field label="庫存" required error={errors.stock}>
          {({ id, describedBy, invalid }) => (
            <Input id={id} inputMode="numeric" aria-describedby={describedBy} aria-invalid={invalid} value={values.stock} onChange={(e) => set('stock')(e.target.value)} placeholder="0–9,999" />
          )}
        </Field>
        <fieldset className="@md:col-span-2">
          <legend className={cn('mb-2 text-[13px]', labelWeight)}>標籤（選填）</legend>
          <div className="flex flex-wrap gap-5">
            {TAGS.map((t) => (
              <Checkbox key={t} label={t} checked={tags.includes(t)} onCheckedChange={(v) => setTags((l) => (v ? [...l, t] : l.filter((x) => x !== t)))} />
            ))}
          </div>
        </fieldset>
        <div className="@md:col-span-2">
          <Switch label="立即上架" description="關閉時商品會先存為下架狀態" checked={publish} onCheckedChange={setPublish} />
        </div>
        <button type="submit" hidden aria-hidden tabIndex={-1} />
      </form>
    </Dialog>
  )
}

export default function Products() {
  const { products, productCategory, productQuery, productView, settings } = useStore(dashStore)
  const [adding, setAdding] = useState(false)
  const q = productQuery.trim()
  const rows = products.filter((p) => (productCategory === 'all' || p.category === productCategory) && (!q || p.name.includes(q)))
  const publishedCount = products.filter((p) => p.published).length

  return (
    <div>
      <PageIntro
        description={
          <>
            共 <span className={numeric}>{products.length}</span> 件商品，上架中 <span className={numeric}>{publishedCount}</span> 件。
          </>
        }
        actions={
          <Button onClick={() => setAdding(true)}>
            <Plus size={17} />
            新增商品
          </Button>
        }
      />

      <div className="mb-4 flex flex-col gap-3 @2xl:flex-row @2xl:items-center">
        <div className="w-full @2xl:w-44">
          <Select
            ariaLabel="篩選分類"
            value={productCategory}
            onValueChange={(v) => dispatch({ type: 'productCategory', category: v })}
            items={CATEGORY_ITEMS}
          />
        </div>
        <div className="relative w-full @2xl:w-64">
          <Search size={16} aria-hidden className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-(--tpl-on-surface-subtle)" />
          <input
            type="search"
            value={productQuery}
            onChange={(e) => dispatch({ type: 'productQuery', query: e.target.value })}
            placeholder="搜尋商品名稱"
            aria-label="搜尋商品名稱"
            className={cn(inputBase, 'pl-9')}
          />
        </div>
        <Segmented
          className="@2xl:ml-auto"
          ariaLabel="檢視方式"
          value={productView}
          onValueChange={(view) => dispatch({ type: 'productView', view })}
          options={[
            { value: 'table', label: <><List size={15} aria-hidden />表格</> },
            { value: 'cards', label: <><LayoutGrid size={15} aria-hidden />卡片</> },
          ]}
        />
      </div>

      {rows.length === 0 ? (
        <Card>
          <EmptyState
            title={q ? `找不到符合「${q}」的商品` : '這個分類目前沒有商品'}
            description="換個關鍵字或分類試試。"
            action={
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  dispatch({ type: 'productQuery', query: '' })
                  dispatch({ type: 'productCategory', category: 'all' })
                }}
              >
                清除篩選
              </Button>
            }
          />
        </Card>
      ) : productView === 'table' ? (
        <Card padded={false} className="overflow-hidden">
          <ProductTable rows={rows} threshold={settings.lowStock} />
        </Card>
      ) : (
        <ProductCards rows={rows} threshold={settings.lowStock} />
      )}

      <AddProductDialog open={adding} onOpenChange={setAdding} />
    </div>
  )
}
