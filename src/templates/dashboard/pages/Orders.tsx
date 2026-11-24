import { useEffect, useMemo, useState } from 'react'
import { Download, Search, Truck, X } from 'lucide-react'
import { cn } from '../../lib/cn'
import { useStore } from '../../lib/store'
import { formatNT } from '../../lib/format'
import { toast } from '../../lib/toast'
import Button from '../../ui/Button'
import Tabs from '../../ui/Tabs'
import { Card } from '../../ui/Card'
import { Checkbox } from '../../ui/Choice'
import { EmptyState, Skeleton } from '../../ui/Feedback'
import { Tooltip } from '../../ui/Overlay'
import { Pagination, SortTH, TD, TH, THead, TR, Table } from '../../ui/Table'
import { inputBase, labelWeight, muted, numeric } from '../../ui/classes'
import { STATUS_LABEL, STATUS_ORDER, orderTotal, type Order } from '../data'
import { dashStore, dispatch, type OrderTab } from '../state'
import { PageIntro, StatusBadge } from '../parts'

const PAGE_SIZE = 5

function useOrderList() {
  const { orders, orderQuery, orderTab, orderSort, orderPage } = useStore(dashStore)
  return useMemo(() => {
    const q = orderQuery.trim().toLowerCase()
    const byTab = orderTab === 'all' ? orders : orders.filter((o) => o.status === orderTab)
    const filtered = q ? byTab.filter((o) => o.id.toLowerCase().includes(q) || o.customer.includes(orderQuery.trim())) : byTab
    const dir = orderSort.dir === 'asc' ? 1 : -1
    const sorted = [...filtered].sort((a, b) =>
      orderSort.key === 'total' ? dir * (orderTotal(a) - orderTotal(b)) : dir * a.createdAt.localeCompare(b.createdAt),
    )
    const pageCount = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE))
    const page = Math.min(orderPage, pageCount)
    return { total: sorted.length, page, rows: sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE) }
  }, [orders, orderQuery, orderTab, orderSort, orderPage])
}

/** 搜尋框：輸入即篩選（debounce 200ms）；頂部列全域搜尋帶進來的關鍵字會同步顯示 */
function OrderSearch() {
  const storeQuery = useStore(dashStore, (s) => s.orderQuery)
  const [value, setValue] = useState(storeQuery)
  const [synced, setSynced] = useState(storeQuery)
  if (storeQuery !== synced) {
    setSynced(storeQuery)
    setValue(storeQuery)
  }
  useEffect(() => {
    if (value === storeQuery) return
    const t = setTimeout(() => dispatch({ type: 'orderQuery', query: value }), 200)
    return () => clearTimeout(t)
  }, [value, storeQuery])
  return (
    <div className="relative w-full @3xl:w-72">
      <Search size={16} aria-hidden className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-(--tpl-on-surface-subtle)" />
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="搜尋訂單編號或顧客姓名"
        aria-label="搜尋訂單編號或顧客姓名"
        className={cn(inputBase, 'pl-9')}
      />
    </div>
  )
}

function BatchBar({ selected }: { selected: string[] }) {
  const orders = useStore(dashStore, (s) => s.orders)
  if (selected.length === 0) return null
  function markShipping() {
    const chosen = orders.filter((o) => selected.includes(o.id))
    const updated = chosen.filter((o) => o.status === 'paid').length
    dispatch({ type: 'markShipping', ids: selected })
    toast(`已更新 ${updated} 筆，略過 ${chosen.length - updated} 筆`, { tone: updated ? 'success' : 'info' })
  }
  return (
    <div
      role="region"
      aria-label="批次操作"
      className="mb-4 flex flex-wrap items-center gap-3 rounded-(--tpl-radius-md) bg-(--tpl-selected-bg) px-4 py-2.5 text-sm text-(--tpl-selected-fg) animate-in fade-in duration-150 motion-reduce:animate-none"
    >
      <span className={cn('flex-1', labelWeight)}>
        已選取 <span className={numeric}>{selected.length}</span> 筆
      </span>
      <Button size="sm" onClick={markShipping}>
        <Truck size={15} />
        標記為出貨中
      </Button>
      <Button size="sm" variant="ghost" onClick={() => dispatch({ type: 'clearSelection' })}>
        <X size={15} />
        取消選取
      </Button>
    </div>
  )
}

function OrdersSkeleton() {
  return (
    <div className="flex flex-col gap-4 p-5" role="status" aria-label="訂單載入中">
      {Array.from({ length: PAGE_SIZE }, (_, i) => (
        <div key={i} className="flex items-center gap-4">
          <Skeleton className="size-[18px]" />
          <Skeleton className="h-4 flex-1" />
          <Skeleton className="hidden h-4 w-24 @2xl:block" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
      ))}
    </div>
  )
}

function OrderTable({ rows, selected }: { rows: Order[]; selected: string[] }) {
  const sort = useStore(dashStore, (s) => s.orderSort)
  const allSelected = rows.length > 0 && rows.every((r) => selected.includes(r.id))
  const someSelected = rows.some((r) => selected.includes(r.id))
  const ids = rows.map((r) => r.id)
  return (
    <Table>
      <caption className="sr-only">訂單列表</caption>
      <THead>
        <tr>
          <TH className="w-12">
            <Checkbox
              ariaLabel="全選本頁訂單"
              checked={allSelected}
              indeterminate={!allSelected && someSelected}
              onCheckedChange={(v) => dispatch({ type: 'selectOrders', ids, selected: v })}
            />
          </TH>
          <TH>訂單編號</TH>
          <TH>顧客</TH>
          <SortTH label="下單時間" active={sort.key === 'createdAt'} dir={sort.dir} onSort={() => dispatch({ type: 'orderSort', key: 'createdAt' })} />
          <SortTH label="金額" align="right" active={sort.key === 'total'} dir={sort.dir} onSort={() => dispatch({ type: 'orderSort', key: 'total' })} />
          <TH>付款方式</TH>
          <TH>狀態</TH>
        </tr>
      </THead>
      <tbody>
        {rows.map((o) => {
          const isSelected = selected.includes(o.id)
          return (
            <TR key={o.id} selected={isSelected} clickable onClick={() => dispatch({ type: 'openOrder', id: o.id })}>
              <TD onClick={(e) => e.stopPropagation()}>
                <Checkbox ariaLabel={`選取訂單 ${o.id}`} checked={isSelected} onCheckedChange={(v) => dispatch({ type: 'selectOrders', ids: [o.id], selected: v })} />
              </TD>
              <TD>
                <button
                  type="button"
                  className={cn('cursor-pointer rounded-(--tpl-radius-sm) whitespace-nowrap underline-offset-4 hover:underline', numeric)}
                  onClick={(e) => {
                    e.stopPropagation()
                    dispatch({ type: 'openOrder', id: o.id })
                  }}
                >
                  {o.id}
                </button>
              </TD>
              <TD className="whitespace-nowrap">{o.customer}</TD>
              <TD num className={cn('whitespace-nowrap', !isSelected && muted)}>
                {o.createdAt}
              </TD>
              <TD align="right" num className="whitespace-nowrap">
                {formatNT(orderTotal(o))}
              </TD>
              <TD className={cn('whitespace-nowrap', !isSelected && muted)}>{o.payment}</TD>
              <TD>
                <StatusBadge status={o.status} />
              </TD>
            </TR>
          )
        })}
      </tbody>
    </Table>
  )
}

/** 手機：卡片列表（勾選與批次操作保留） */
function OrderCards({ rows, selected }: { rows: Order[]; selected: string[] }) {
  return (
    <ul className="flex flex-col divide-y divide-(--tpl-outline)">
      {rows.map((o) => {
        const isSelected = selected.includes(o.id)
        return (
          <li key={o.id} className={cn('flex items-start gap-3 px-4 py-4', isSelected && 'bg-(--tpl-selected-bg)')}>
            <span className="pt-0.5">
              <Checkbox ariaLabel={`選取訂單 ${o.id}`} checked={isSelected} onCheckedChange={(v) => dispatch({ type: 'selectOrders', ids: [o.id], selected: v })} />
            </span>
            <button type="button" onClick={() => dispatch({ type: 'openOrder', id: o.id })} className="flex min-w-0 flex-1 cursor-pointer flex-col gap-1.5 text-left">
              <span className="flex items-center justify-between gap-2">
                <span className={cn('truncate text-sm', numeric, labelWeight)}>{o.id}</span>
                <StatusBadge status={o.status} />
              </span>
              <span className="flex items-center justify-between gap-2 text-sm">
                <span className={muted}>
                  {o.customer} ・ {o.createdAt.slice(5)}
                </span>
                <span className={numeric}>{formatNT(orderTotal(o))}</span>
              </span>
            </button>
          </li>
        )
      })}
    </ul>
  )
}

export default function Orders() {
  const { orders, orderTab, orderQuery, selectedOrders } = useStore(dashStore)
  const { total, page, rows } = useOrderList()
  const [loading, setLoading] = useState(true)

  // 每次進入訂單頁都顯示 0.6 秒骨架屏（展示載入狀態）
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(t)
  }, [])

  const counts = useMemo(() => {
    const c: Record<OrderTab, number> = { all: orders.length, unpaid: 0, paid: 0, shipping: 0, done: 0, cancelled: 0 }
    orders.forEach((o) => c[o.status]++)
    return c
  }, [orders])

  const hasQuery = orderQuery.trim().length > 0

  return (
    <div>
      <PageIntro
        description="管理所有訂單：依狀態篩選、搜尋、排序，勾選後可批次標記出貨。"
        actions={
          <Tooltip content="示範版未開放">
            <Button variant="secondary" aria-disabled className="cursor-not-allowed text-(--tpl-on-disabled) hover:bg-(--tpl-btn-secondary-bg)">
              <Download size={16} />
              匯出 CSV
            </Button>
          </Tooltip>
        }
      />

      <div className="mb-4 flex flex-col gap-3 @4xl:flex-row @4xl:items-center @4xl:justify-between">
        <Tabs
          ariaLabel="訂單狀態"
          value={orderTab}
          onValueChange={(tab) => dispatch({ type: 'orderTab', tab })}
          items={[{ value: 'all' as OrderTab, label: '全部', count: counts.all }, ...STATUS_ORDER.map((s) => ({ value: s as OrderTab, label: STATUS_LABEL[s], count: counts[s] }))]}
        />
        <OrderSearch />
      </div>

      <BatchBar selected={selectedOrders} />

      <Card padded={false} className="overflow-hidden">
        {loading ? (
          <OrdersSkeleton />
        ) : total === 0 ? (
          <EmptyState
            title={hasQuery ? `找不到符合「${orderQuery.trim()}」的訂單` : `目前沒有「${STATUS_LABEL[orderTab as keyof typeof STATUS_LABEL] ?? ''}」的訂單`}
            description={hasQuery ? '換個關鍵字試試，或清除搜尋看全部訂單。' : '切換到其他狀態看看。'}
            action={
              hasQuery ? (
                <Button variant="secondary" size="sm" onClick={() => dispatch({ type: 'orderQuery', query: '' })}>
                  清除搜尋
                </Button>
              ) : undefined
            }
          />
        ) : (
          <>
            <div className="hidden @2xl:block">
              <OrderTable rows={rows} selected={selectedOrders} />
            </div>
            <div className="@2xl:hidden">
              <OrderCards rows={rows} selected={selectedOrders} />
            </div>
            <div className="border-t border-(--tpl-outline) px-4 py-3 @3xl:px-5">
              <Pagination page={page} pageSize={PAGE_SIZE} total={total} onPageChange={(p) => dispatch({ type: 'orderPage', page: p })} />
            </div>
          </>
        )}
      </Card>
    </div>
  )
}
