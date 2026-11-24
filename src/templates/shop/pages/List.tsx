import { useEffect, useRef, useState } from 'react'
import { ArrowDown, Heart, SlidersHorizontal } from 'lucide-react'
import { cn } from '../../lib/cn'
import { useStore } from '../../lib/store'
import { BRAND } from '../../data/brand'
import { CATEGORIES, categoryName } from '../../data/catalog'
import Button from '../../ui/Button'
import Select from '../../ui/Select'
import { Chip, RemovableChip } from '../../ui/Chip'
import { Switch } from '../../ui/Choice'
import { Drawer } from '../../ui/Overlay'
import { EmptyState, Skeleton } from '../../ui/Feedback'
import TplImage from '../../ui/TplImage'
import { heading, labelWeight, muted, numeric, panel } from '../../ui/classes'
import { PRICE_LABEL, SORT_LABEL, dispatch, filterProducts, shopStore, type Filters, type PriceRange, type SortKey } from '../state'
import { ProductCard } from '../parts'

const PRICE_ITEMS = (Object.keys(PRICE_LABEL) as PriceRange[]).map((value) => ({ value, label: PRICE_LABEL[value] }))
const SORT_ITEMS = (Object.keys(SORT_LABEL) as SortKey[]).map((value) => ({ value, label: SORT_LABEL[value] }))
const CATEGORY_CHIPS = [{ value: 'all' as const, label: '全部' }, ...CATEGORIES.map((c) => ({ value: c.slug, label: c.name }))]

const setFilter = (patch: Partial<Filters>) => dispatch({ type: 'setFilter', patch })

function Hero({ onShop }: { onShop: () => void }) {
  return (
    <section aria-labelledby="shop-hero-title" className={cn('grid overflow-hidden rounded-(--tpl-card-radius-xl) @3xl:grid-cols-2', panel)}>
      <div className="flex flex-col justify-center gap-4 p-6 @3xl:p-10 @5xl:p-14">
        <p className={cn('text-sm', muted)}>{BRAND.name} ・ 2026 秋季</p>
        <h1 id="shop-hero-title" className={cn('text-4xl @5xl:text-5xl', heading)}>
          秋日選物
        </h1>
        <p className={cn('max-w-md text-base leading-relaxed', muted)}>{BRAND.slogan}全館滿 NT$1,500 免運。</p>
        <div>
          <Button onClick={onShop}>
            開始選購
            <ArrowDown size={16} />
          </Button>
        </div>
      </div>
      <div className="aspect-[4/3] @3xl:aspect-auto @3xl:h-[400px]">
        <TplImage id="hero" label="秋日選物" alt="青森選物秋季選品情境照" />
      </div>
    </section>
  )
}

/** 篩選控制項：桌機橫排、手機在底部抽屜內直排 */
function FilterControls({ stacked }: { stacked?: boolean }) {
  const f = useStore(shopStore, (s) => s.filters)
  return (
    <div className={cn('flex gap-4', stacked ? 'flex-col' : 'flex-wrap items-center')}>
      <div className={cn('flex flex-wrap gap-2', stacked && 'mb-1')} role="group" aria-label="分類">
        {CATEGORY_CHIPS.map((c) => (
          <Chip key={c.value} selected={f.category === c.value} onClick={() => setFilter({ category: c.value })}>
            {c.label}
          </Chip>
        ))}
      </div>
      <div className={cn(stacked ? 'w-full' : 'w-44')}>
        <Select ariaLabel="價格區間" value={f.price} onValueChange={(price) => setFilter({ price })} items={PRICE_ITEMS} />
      </div>
      <Switch label="只看有庫存" checked={f.inStock} onCheckedChange={(inStock) => setFilter({ inStock })} className={stacked ? undefined : 'gap-2.5'} />
      <Switch label="只看收藏" checked={f.favOnly} onCheckedChange={(favOnly) => setFilter({ favOnly })} className={stacked ? undefined : 'gap-2.5'} />
    </div>
  )
}

function AppliedFilters({ total }: { total: number }) {
  const f = useStore(shopStore, (s) => s.filters)
  const chips: { key: string; label: string; clear: Partial<Filters> }[] = []
  if (f.category !== 'all') chips.push({ key: 'category', label: categoryName(f.category), clear: { category: 'all' } })
  if (f.price !== 'all') chips.push({ key: 'price', label: PRICE_LABEL[f.price], clear: { price: 'all' } })
  if (f.inStock) chips.push({ key: 'inStock', label: '只看有庫存', clear: { inStock: false } })
  if (f.favOnly) chips.push({ key: 'favOnly', label: '只看收藏', clear: { favOnly: false } })
  if (f.keyword.trim()) chips.push({ key: 'keyword', label: `「${f.keyword.trim()}」`, clear: { keyword: '' } })

  return (
    <div className="flex flex-wrap items-center gap-2">
      <p className="mr-1 text-sm" role="status">
        共 <span className={cn(numeric, labelWeight)}>{total}</span> 件商品
      </p>
      {chips.map((c) => (
        <RemovableChip key={c.key} removeLabel={`移除條件：${c.label}`} onRemove={() => setFilter(c.clear)}>
          {c.label}
        </RemovableChip>
      ))}
      {chips.length > 0 && (
        <Button size="sm" variant="ghost" onClick={() => dispatch({ type: 'clearFilters' })}>
          清除全部篩選
        </Button>
      )}
    </div>
  )
}

function SkeletonGrid() {
  return (
    <ul className="grid grid-cols-2 gap-3 @3xl:grid-cols-3 @3xl:gap-5 @5xl:grid-cols-4" role="status" aria-label="商品載入中">
      {Array.from({ length: 8 }, (_, i) => (
        <li key={i} className={cn('overflow-hidden rounded-(--tpl-card-radius)', panel)}>
          <Skeleton className="aspect-square w-full rounded-none" />
          <div className="flex flex-col gap-2 p-4">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="mt-1 h-8 w-full" />
          </div>
        </li>
      ))}
    </ul>
  )
}

export default function List() {
  const { filters, favorites, listLoaded } = useStore(shopStore)
  const [filterOpen, setFilterOpen] = useState(false)
  const listRef = useRef<HTMLElement>(null)
  const products = filterProducts(filters, favorites)
  const activeCount = [filters.category !== 'all', filters.price !== 'all', filters.inStock, filters.favOnly].filter(Boolean).length

  // 列表骨架屏只在第一次進入顯示 0.6 秒
  useEffect(() => {
    if (listLoaded) return
    const t = setTimeout(() => dispatch({ type: 'listLoaded' }), 600)
    return () => clearTimeout(t)
  }, [listLoaded])

  function scrollToList() {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    listRef.current?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
  }

  const favEmpty = filters.favOnly && favorites.length === 0

  return (
    <div className="flex flex-col gap-10">
      <Hero onShop={scrollToList} />

      <section ref={listRef} aria-labelledby="shop-list-title" className="scroll-mt-28">
        <h2 id="shop-list-title" className={cn('mb-5 text-2xl', heading)}>
          全部商品
        </h2>

        <div className="mb-5 flex flex-col gap-4">
          <div className="flex items-start gap-3">
            <div className="hidden min-w-0 flex-1 @3xl:block">
              <FilterControls />
            </div>
            <Button variant="secondary" className="@3xl:hidden" onClick={() => setFilterOpen(true)}>
              <SlidersHorizontal size={16} />
              篩選
              {activeCount > 0 && <span className={cn('text-xs', numeric)}>（{activeCount}）</span>}
            </Button>
            <div className="ml-auto w-40 shrink-0 @3xl:w-44">
              <Select ariaLabel="排序" value={filters.sort} onValueChange={(sort) => setFilter({ sort })} items={SORT_ITEMS} />
            </div>
          </div>
          <AppliedFilters total={products.length} />
        </div>

        {!listLoaded ? (
          <SkeletonGrid />
        ) : favEmpty ? (
          <EmptyState
            icon={<Heart size={24} />}
            title="還沒有收藏的商品"
            description="點商品上的愛心加入收藏。"
            action={
              <Button variant="secondary" size="sm" onClick={() => setFilter({ favOnly: false })}>
                看全部商品
              </Button>
            }
          />
        ) : products.length === 0 ? (
          <EmptyState
            title="沒有符合條件的商品"
            description="調整篩選條件或換個關鍵字試試。"
            action={
              <Button variant="secondary" size="sm" onClick={() => dispatch({ type: 'clearFilters' })}>
                清除全部篩選
              </Button>
            }
          />
        ) : (
          <ul className="grid grid-cols-2 gap-3 @3xl:grid-cols-3 @3xl:gap-5 @5xl:grid-cols-4">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </ul>
        )}
      </section>

      <Drawer
        open={filterOpen}
        onOpenChange={setFilterOpen}
        side="bottom"
        title="篩選商品"
        footer={
          <div className="flex gap-2">
            <Button variant="secondary" className="flex-1" onClick={() => dispatch({ type: 'clearFilters' })}>
              清除
            </Button>
            <Button className="flex-1" onClick={() => setFilterOpen(false)}>
              看 {products.length} 件商品
            </Button>
          </div>
        }
      >
        <FilterControls stacked />
      </Drawer>
    </div>
  )
}
