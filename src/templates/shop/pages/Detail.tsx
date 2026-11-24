import { useState, type KeyboardEvent } from 'react'
import { ArrowLeft, Bell, ChevronRight, Heart, ShoppingBag, Truck } from 'lucide-react'
import { cn } from '../../lib/cn'
import { useStore } from '../../lib/store'
import { formatNT } from '../../lib/format'
import { PRODUCTS, categoryName, productById, type Product } from '../../data/catalog'
import { avatarTone, personByName } from '../../data/people'
import Button from '../../ui/Button'
import Accordion from '../../ui/Accordion'
import { Chip } from '../../ui/Chip'
import { QuantityInput } from '../../ui/Field'
import { Avatar, Rating } from '../../ui/Display'
import TplImage, { type ImageVariant } from '../../ui/TplImage'
import { focusRing, heading, labelWeight, muted, numeric, panel } from '../../ui/classes'
import { dispatch, maxQty, qtyInCart, shopStore, unitPrice } from '../state'
import { PriceTag, ProductBadges, ProductCard } from '../parts'
import { notifyRestock, toggleFavorite } from '../actions'

const GALLERY: { variant: ImageVariant; label: string }[] = [
  { variant: 'main', label: '主圖' },
  { variant: 'alt1', label: '細節' },
  { variant: 'alt2', label: '情境' },
]

/** 評分分布（所有商品共用比例） */
const DISTRIBUTION = [
  { stars: 5, pct: 78 },
  { stars: 4, pct: 15 },
  { stars: 3, pct: 5 },
  { stars: 2, pct: 1 },
  { stars: 1, pct: 1 },
]

/** 評論（所有商品共用同一組 3 則） */
const REVIEWS = [
  { name: '林雨潔', stars: 5, date: '2026/10/28', text: '包裝很用心，拆箱的時候還有一張手寫卡片。實品比照片更有質感。' },
  { name: '張家豪', stars: 5, date: '2026/10/15', text: '第二次回購了，家裡越來越多青森的東西。出貨速度也很快。' },
  { name: '吳佩珊', stars: 4, date: '2026/09/30', text: '整體很喜歡，顏色跟網站上看到的稍微有點差異，但不影響使用。' },
]

const SHIPPING_TEXT = '宅配 2–3 個工作天送達；超商取貨 3–5 個工作天。訂單滿 NT$1,500 免運，未滿宅配運費 NT$100、超商取貨 NT$60。'
const RETURN_TEXT = '到貨 7 天內可申請退換貨，商品需保持完整包裝。手作商品因工序關係，紋理與顏色略有差異，不屬瑕疵。'

function Gallery({ product }: { product: Product }) {
  const [index, setIndex] = useState(0)
  function onKeyDown(e: KeyboardEvent) {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return
    e.preventDefault()
    setIndex((i) => (i + (e.key === 'ArrowRight' ? 1 : GALLERY.length - 1)) % GALLERY.length)
  }
  return (
    <div className="flex flex-col gap-3">
      <div
        tabIndex={0}
        role="group"
        aria-roledescription="圖庫"
        aria-label={`${product.name} 圖片 ${index + 1} / ${GALLERY.length}，左右方向鍵切換`}
        onKeyDown={onKeyDown}
        className={cn('aspect-square overflow-hidden rounded-(--tpl-card-radius-xl)', panel, focusRing)}
      >
        <TplImage id={product.id} variant={GALLERY[index].variant} alt={`${product.name}（${GALLERY[index].label}）`} />
      </div>
      <div className="grid grid-cols-3 gap-3">
        {GALLERY.map((g, i) => (
          <button
            key={g.variant}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`顯示第 ${i + 1} 張圖（${g.label}）`}
            aria-pressed={i === index}
            className={cn(
              'aspect-square cursor-pointer overflow-hidden rounded-(--tpl-radius-md) border-2 transition-[border-color,opacity]',
              i === index ? 'border-(--tpl-accent)' : 'border-transparent opacity-70 hover:opacity-100',
              focusRing,
            )}
          >
            <TplImage id={product.id} variant={g.variant} alt="" />
          </button>
        ))}
      </div>
    </div>
  )
}

function Reviews({ product }: { product: Product }) {
  return (
    <section id="shop-reviews" aria-labelledby="shop-reviews-title" className="scroll-mt-28">
      <h2 id="shop-reviews-title" className={cn('mb-5 text-2xl', heading)}>
        顧客評論
      </h2>
      <div className="grid gap-6 @3xl:grid-cols-[minmax(0,280px)_1fr]">
        <div className={cn('flex flex-col gap-4 rounded-(--tpl-card-radius) p-5', panel)}>
          <div>
            <p className={cn('text-4xl', heading, numeric)}>{product.rating.toFixed(1)}</p>
            <Rating value={product.rating} />
            <p className={cn('mt-1 text-sm', muted)}>共 {product.reviewCount} 則評論</p>
          </div>
          <ul className="flex flex-col gap-2" aria-label="評分分布">
            {DISTRIBUTION.map((d) => (
              <li key={d.stars} className="flex items-center gap-2 text-xs">
                <span className={cn('w-8 shrink-0', numeric)}>{d.stars} 星</span>
                <span className="h-2 flex-1 overflow-hidden rounded-full bg-(--tpl-skeleton)" aria-hidden>
                  <span className="block h-full rounded-full bg-(--tpl-tertiary)" style={{ width: `${d.pct}%` }} />
                </span>
                <span className={cn('w-9 shrink-0 text-right', muted, numeric)}>{d.pct}%</span>
              </li>
            ))}
          </ul>
        </div>
        <ul className="flex flex-col divide-y divide-(--tpl-outline)">
          {REVIEWS.map((r) => (
            <li key={r.name} className="flex gap-3 py-5 first:pt-0">
              <Avatar name={r.name} tone={avatarTone(personByName(r.name)?.id ?? r.name)} />
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className={cn('text-sm', labelWeight)}>{r.name}</span>
                  <Rating value={r.stars} size={12} />
                  <span className={cn('text-xs', muted, numeric)}>{r.date}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed">{r.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default function Detail() {
  const detailId = useStore(shopStore, (s) => s.detailId)
  const favorites = useStore(shopStore, (s) => s.favorites)
  const cart = useStore(shopStore, (s) => s.cart)
  const product = productById(detailId ?? '') ?? PRODUCTS[0]
  const [variant, setVariant] = useState(product.variant?.options[0].name)
  const [qty, setQty] = useState(1)

  const isFav = favorites.includes(product.id)
  const soldOut = product.stock === 0
  const max = maxQty(product)
  // 上限以整個商品計算：扣掉購物車裡同商品（任何規格）已有的件數
  const inCart = qtyInCart(cart, product.id)
  const remaining = Math.max(0, max - inCart)
  const atLimit = !soldOut && remaining === 0
  const stepMax = Math.max(1, remaining)
  const q = Math.min(qty, stepMax)
  const price = unitPrice(product.id, variant)
  const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3)

  const stockHint = soldOut ? '已售完' : product.stock <= 10 ? `庫存僅剩 ${product.stock} 件` : '現貨，1–3 個工作天出貨'

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-3">
        <div>
          <Button variant="ghost" size="sm" onClick={() => dispatch({ type: 'goList' })} className="-ml-2">
            <ArrowLeft size={16} />
            回商品列表
          </Button>
        </div>
        <nav aria-label="麵包屑">
          <ol className={cn('flex flex-wrap items-center gap-1 text-[13px]', muted)}>
            <li>
              <button type="button" onClick={() => dispatch({ type: 'goList', resetFilters: true })} className={cn('cursor-pointer rounded-(--tpl-radius-sm) hover:text-(--tpl-on-surface) hover:underline', focusRing)}>
                首頁
              </button>
            </li>
            <ChevronRight size={13} aria-hidden />
            <li>
              <button
                type="button"
                onClick={() => dispatch({ type: 'goList', resetFilters: true, filters: { category: product.category } })}
                className={cn('cursor-pointer rounded-(--tpl-radius-sm) hover:text-(--tpl-on-surface) hover:underline', focusRing)}
              >
                {categoryName(product.category)}
              </button>
            </li>
            <ChevronRight size={13} aria-hidden />
            <li aria-current="page" className="text-(--tpl-on-surface)">
              {product.name}
            </li>
          </ol>
        </nav>
      </div>

      <div className="grid gap-8 @3xl:grid-cols-2 @5xl:gap-14">
        <Gallery product={product} />

        <div className="flex flex-col gap-5">
          <ProductBadges product={product} />
          <div>
            <h1 className={cn('text-3xl @5xl:text-4xl', heading)}>{product.name}</h1>
            <button
              type="button"
              onClick={() => document.getElementById('shop-reviews')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              className={cn('mt-2 cursor-pointer rounded-(--tpl-radius-sm) hover:underline hover:underline-offset-4', focusRing)}
              aria-label={`${product.rating} 顆星，${product.reviewCount} 則評論，前往評論區`}
            >
              <Rating value={product.rating} count={product.reviewCount} />
            </button>
          </div>

          <PriceTag product={product} price={price} size="lg" />

          {product.variant && (
            <fieldset>
              <legend className={cn('mb-2 text-sm', labelWeight)}>
                {product.variant.label}：<span className={muted}>{variant}</span>
              </legend>
              <div className="flex flex-wrap gap-2">
                {product.variant.options.map((o) => (
                  <Chip key={o.name} selected={variant === o.name} onClick={() => setVariant(o.name)} disabled={soldOut}>
                    {o.name}
                    {o.priceDelta > 0 && <span className={cn('text-xs opacity-80', numeric)}>+{formatNT(o.priceDelta)}</span>}
                  </Chip>
                ))}
              </div>
            </fieldset>
          )}

          <div className="flex flex-col gap-2">
            <span className={cn('text-sm', labelWeight)}>數量</span>
            <div className="flex flex-wrap items-center gap-4">
              {soldOut ? (
                <QuantityInput value={0} min={0} max={0} onChange={() => {}} />
              ) : (
                <QuantityInput value={q} max={stepMax} onChange={setQty} />
              )}
              <p
                className={cn(
                  'flex items-center gap-1.5 text-sm',
                  soldOut ? 'text-(--tpl-error)' : product.stock <= 10 ? 'text-(--tpl-warning)' : muted,
                )}
              >
                <Truck size={15} aria-hidden />
                {stockHint}
              </p>
            </div>
            {!soldOut && (q >= stepMax || inCart > 0) && (
              <p className={cn('text-xs', muted)}>
                每筆訂單最多 {max} 件{inCart > 0 && `（購物車已有 ${inCart} 件）`}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-3 @md:flex-row">
            {soldOut ? (
              <>
                <Button disabled className="flex-1">
                  <ShoppingBag size={17} />
                  加入購物車
                </Button>
                <Button variant="secondary" className="flex-1" onClick={notifyRestock}>
                  <Bell size={17} />
                  到貨通知
                </Button>
              </>
            ) : (
              <Button className="flex-1" disabled={atLimit} onClick={() => dispatch({ type: 'addToCart', productId: product.id, variant, qty: q })}>
                <ShoppingBag size={17} />
                加入購物車
              </Button>
            )}
          </div>
          <div>
            <Button variant="ghost" size="sm" onClick={() => toggleFavorite(product, isFav)} aria-pressed={isFav} className="-ml-2">
              <Heart size={16} className={isFav ? 'fill-(--tpl-error) text-(--tpl-error)' : undefined} aria-hidden />
              {isFav ? '已收藏' : '加入收藏'}
            </Button>
          </div>

          <h2 className="sr-only">商品資訊</h2>
          <Accordion
            defaultOpen={['desc']}
            items={[
              { value: 'desc', title: '商品說明', content: product.description },
              { value: 'ship', title: '運送方式', content: SHIPPING_TEXT },
              { value: 'return', title: '退換貨說明', content: RETURN_TEXT },
            ]}
          />
        </div>
      </div>

      <Reviews product={product} />

      {related.length > 0 && (
        <section aria-labelledby="shop-related-title">
          <h2 id="shop-related-title" className={cn('mb-5 text-2xl', heading)}>
            相關商品
          </h2>
          <ul className="grid grid-cols-2 gap-3 @3xl:grid-cols-3 @3xl:gap-5">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
