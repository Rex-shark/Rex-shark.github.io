import { ArrowDownRight, ArrowRight, ArrowUpRight, Ban, MessageSquareText, PackagePlus, PackageX, ShoppingBag, Truck } from 'lucide-react'
import { cn } from '../../lib/cn'
import { useStore } from '../../lib/store'
import { formatNT } from '../../lib/format'
import { toast } from '../../lib/toast'
import { CATEGORIES } from '../../data/catalog'
import Button from '../../ui/Button'
import Segmented from '../../ui/Segmented'
import { Card, CardHeader } from '../../ui/Card'
import LineChart from '../../ui/charts/LineChart'
import DonutChart from '../../ui/charts/DonutChart'
import BarList from '../../ui/charts/BarList'
import { focusRing, heading, muted, numeric } from '../../ui/classes'
import { ACTIVITY, KPIS, REVENUE_12M, REVENUE_7D, orderTotal, type ActivityKind } from '../data'
import { dashStore, dispatch } from '../state'
import { ProductThumb, StatusBadge, StockBadge } from '../parts'

const ACTIVITY_ICON: Record<ActivityKind, typeof ShoppingBag> = {
  order: ShoppingBag,
  review: MessageSquareText,
  stock: PackageX,
  status: Truck,
  soldout: Ban,
  product: PackagePlus,
}

function KpiCards() {
  return (
    <ul className="grid grid-cols-2 gap-4 @4xl:grid-cols-4 @4xl:gap-6">
      {KPIS.map((k) => {
        const Icon = k.direction === 'up' ? ArrowUpRight : ArrowDownRight
        return (
          <Card as="li" key={k.key}>
            <p className={cn('text-[13px]', muted)}>{k.label}</p>
            <p className={cn('mt-2 text-2xl @4xl:text-[26px]', heading, numeric)}>{k.value}</p>
            <p className="mt-2 flex flex-wrap items-center gap-x-1.5 text-xs">
              <span className={cn('inline-flex items-center gap-0.5', k.good ? 'text-(--tpl-success)' : 'text-(--tpl-error)', numeric)}>
                <Icon size={14} aria-hidden />
                {k.delta}
              </span>
              <span className={muted}>與上月比較</span>
            </p>
          </Card>
        )
      })}
    </ul>
  )
}

function RevenueCard() {
  const range = useStore(dashStore, (s) => s.revenueRange)
  const data = range === '12m' ? REVENUE_12M : REVENUE_7D
  return (
    <Card className="@4xl:col-span-2">
      <CardHeader
        title="營收趨勢"
        description={range === '12m' ? '近 12 個月，單位：千元' : '近 7 天，單位：千元'}
        action={
          <Segmented
            ariaLabel="營收期間"
            value={range}
            onValueChange={(v) => dispatch({ type: 'revenueRange', range: v })}
            options={[
              { value: '7d', label: '近 7 天' },
              { value: '12m', label: '近 12 個月' },
            ]}
          />
        }
      />
      <LineChart
        data={data}
        ariaLabel={range === '12m' ? '近 12 個月營收折線圖' : '近 7 天營收折線圖'}
        format={(v) => formatNT(v * 1000)}
        axisFormat={(v) => `${Math.round(v).toLocaleString('en-US')}k`}
      />
    </Card>
  )
}

function LatestOrders() {
  const orders = useStore(dashStore, (s) => s.orders)
  const latest = orders.slice(0, 5)
  return (
    <Card className="@4xl:col-span-2">
      <CardHeader
        title="最新訂單"
        action={
          <Button size="sm" variant="ghost" onClick={() => dispatch({ type: 'page', page: 'orders' })}>
            查看全部
            <ArrowRight size={15} />
          </Button>
        }
      />
      <ul className="-mx-2 flex flex-col">
        {latest.map((o) => (
          <li key={o.id}>
            <button
              type="button"
              onClick={() => dispatch({ type: 'openOrder', id: o.id })}
              aria-label={`查看訂單 ${o.id}`}
              className={cn(
                'grid w-full cursor-pointer grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1 rounded-(--tpl-radius-sm) px-2 py-3 text-left text-sm transition-colors hover:bg-(--tpl-row-hover-bg) @3xl:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_auto_auto]',
                focusRing,
              )}
            >
              <span className={cn('truncate', numeric)}>{o.id}</span>
              <span className={cn('truncate @max-3xl:order-3', muted)}>{o.customer}</span>
              <span className={cn('text-right @max-3xl:order-2', numeric)}>{formatNT(orderTotal(o))}</span>
              <span className="justify-self-end @max-3xl:order-4">
                <StatusBadge status={o.status} />
              </span>
            </button>
          </li>
        ))}
      </ul>
    </Card>
  )
}

function TopProducts() {
  const products = useStore(dashStore, (s) => s.products)
  const top = [...products].sort((a, b) => b.monthlySales - a.monthlySales).slice(0, 5)
  return (
    <Card>
      <CardHeader title="熱銷商品 Top 5" description="依本月銷量" />
      <BarList
        ariaLabel="熱銷商品 Top 5"
        rows={top.map((p) => ({
          key: p.id,
          label: p.name,
          value: p.monthlySales,
          valueLabel: `${p.monthlySales} 件`,
          leading: <ProductThumb id={p.id} label={p.name} size="sm" />,
        }))}
      />
    </Card>
  )
}

function StockAlerts() {
  const products = useStore(dashStore, (s) => s.products)
  const threshold = useStore(dashStore, (s) => s.settings.lowStock)
  const low = products
    .filter((p) => p.stock <= threshold)
    .sort((a, b) => (a.stock === 0 ? 1 : b.stock === 0 ? -1 : a.stock - b.stock))
  return (
    <Card>
      <CardHeader title="庫存提醒" description={`庫存 ≤ ${threshold} 件的商品`} />
      {low.length === 0 ? (
        <p className={cn('py-6 text-center text-sm', muted)}>目前沒有低庫存商品</p>
      ) : (
        <ul className="flex flex-col divide-y divide-(--tpl-outline)">
          {low.map((p) => (
            <li key={p.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
              <ProductThumb id={p.id} label={p.name} size="sm" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm">{p.name}</p>
                <p className={cn('text-xs', p.stock === 0 ? 'text-(--tpl-error)' : 'text-(--tpl-warning)', numeric)}>
                  {p.stock === 0 ? '已售完' : `剩 ${p.stock} 件`}
                </p>
              </div>
              <StockBadge stock={p.stock} threshold={threshold} />
              <Button size="sm" variant="secondary" onClick={() => toast('已建立補貨單（示範）')} aria-label={`為 ${p.name} 建立補貨單`}>
                補貨
              </Button>
            </li>
          ))}
        </ul>
      )}
    </Card>
  )
}

function RecentActivity() {
  return (
    <Card>
      <CardHeader title="近期活動" />
      <ol className="flex flex-col gap-4">
        {ACTIVITY.map((a) => {
          const Icon = ACTIVITY_ICON[a.kind]
          return (
            <li key={a.text} className="flex items-start gap-3">
              <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-(--tpl-badge-neutral-bg) text-(--tpl-on-surface-variant) shadow-(--tpl-control-shadow)" aria-hidden>
                <Icon size={15} />
              </span>
              <div className="min-w-0 flex-1 pt-1">
                <p className="text-sm">{a.text}</p>
                <p className={cn('mt-0.5 text-xs', muted)}>{a.time}</p>
              </div>
            </li>
          )
        })}
      </ol>
    </Card>
  )
}

export default function Overview() {
  return (
    <div className="flex flex-col gap-4 @4xl:gap-6">
      <h2 className="sr-only">營運總覽</h2>
      <KpiCards />
      <div className="grid gap-4 @4xl:grid-cols-3 @4xl:gap-6">
        <RevenueCard />
        <Card>
          <CardHeader title="分類營收占比" description="點圖例可隱藏分類" />
          <DonutChart ariaLabel="分類營收占比" centerLabel="顯示中" segments={CATEGORIES.map((c) => ({ key: c.slug, label: c.name, value: c.revenueShare }))} />
        </Card>
      </div>
      <div className="grid gap-4 @4xl:grid-cols-3 @4xl:gap-6">
        <LatestOrders />
        <TopProducts />
      </div>
      <div className="grid gap-4 @4xl:grid-cols-2 @4xl:gap-6">
        <StockAlerts />
        <RecentActivity />
      </div>
    </div>
  )
}

