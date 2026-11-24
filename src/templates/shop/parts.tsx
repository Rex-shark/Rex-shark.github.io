import { Bell, Heart, ShoppingBag } from 'lucide-react'
import { cn } from '../lib/cn'
import { useStore } from '../lib/store'
import { formatNT } from '../lib/format'
import { LOW_STOCK_DEFAULT, type Product } from '../data/catalog'
import Button from '../ui/Button'
import Badge from '../ui/Badge'
import { Rating } from '../ui/Display'
import TplImage from '../ui/TplImage'
import { focusRing, labelWeight, muted, numeric, panel } from '../ui/classes'
import { useTplScroll } from '../viewer/context'
import { discountPercent, dispatch, shopStore } from './state'
import { notifyRestock, toggleFavorite } from './actions'

/** 售價（特價時原價刪除線並列） */
export function PriceTag({ product, price, size = 'md' }: { product: Product; price?: number; size?: 'md' | 'lg' }) {
  return (
    <span className={cn('inline-flex flex-wrap items-baseline gap-x-2', numeric)}>
      <span className={cn(labelWeight, size === 'lg' ? 'text-2xl' : 'text-[15px]')}>{formatNT(price ?? product.price)}</span>
      {product.originalPrice && (
        <s className={cn(size === 'lg' ? 'text-base' : 'text-xs', muted)}>
          <span className="sr-only">原價</span>
          {formatNT(product.originalPrice + ((price ?? product.price) - product.price))}
        </s>
      )}
    </span>
  )
}

/** 商品標籤徽章（新品／熱銷／限量＋特價折扣） */
export function ProductBadges({ product }: { product: Product }) {
  const off = discountPercent(product)
  if (!product.tag && !off) return null
  return (
    <span className="flex flex-wrap gap-1.5">
      {product.tag && <Badge tone="accent">{product.tag}</Badge>}
      {off > 0 && <Badge tone="error">−{off}%</Badge>}
    </span>
  )
}

/** 商品卡：列表與相關商品共用 */
export function ProductCard({ product }: { product: Product }) {
  const favorites = useStore(shopStore, (s) => s.favorites)
  const page = useStore(shopStore, (s) => s.page)
  const scrollEl = useTplScroll()
  const isFav = favorites.includes(product.id)
  const soldOut = product.stock === 0
  const low = !soldOut && product.stock <= LOW_STOCK_DEFAULT

  // 只有從列表進入詳情時才記住列表捲動位置（相關商品互點時不覆蓋）
  const open = () => dispatch({ type: 'openDetail', id: product.id, listScroll: page === 'list' ? (scrollEl?.scrollTop ?? 0) : undefined })

  return (
    <li className={cn('group relative flex min-w-0 flex-col overflow-hidden rounded-(--tpl-card-radius)', panel)}>
      <div className="relative aspect-square overflow-hidden">
        <button type="button" tabIndex={-1} aria-hidden onClick={open} className="block h-full w-full cursor-pointer">
          <TplImage id={product.id} className="transition-opacity duration-300" />
          {/* hover 換成第一張副圖（Tailwind 的 hover 只在支援游標的裝置生效，觸控裝置不換） */}
          <span className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:transition-none">
            <TplImage id={product.id} variant="alt1" />
          </span>
          {soldOut && (
            <span className="absolute inset-0 flex items-center justify-center bg-(--tpl-scrim)">
              <span className={cn('rounded-full bg-(--tpl-surface) px-3 py-1 text-sm text-(--tpl-on-surface)', labelWeight)}>已售完</span>
            </span>
          )}
        </button>
        <span className="pointer-events-none absolute top-3 left-3">
          <ProductBadges product={product} />
        </span>
        <button
          type="button"
          onClick={() => toggleFavorite(product, isFav)}
          aria-pressed={isFav}
          aria-label={isFav ? `從收藏移除 ${product.name}` : `收藏 ${product.name}`}
          className={cn(
            'absolute top-2.5 right-2.5 inline-flex size-9 cursor-pointer items-center justify-center rounded-full bg-(--tpl-overlay-bg) text-(--tpl-on-surface) shadow-(--tpl-control-shadow) [backdrop-filter:var(--tpl-overlay-backdrop)] transition-transform hover:scale-105',
            focusRing,
          )}
        >
          <Heart size={17} className={isFav ? 'fill-(--tpl-error) text-(--tpl-error)' : undefined} aria-hidden />
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-3.5 @3xl:p-4">
        <h3 className="text-[15px] leading-snug">
          <button type="button" onClick={open} className={cn('cursor-pointer rounded-(--tpl-radius-sm) text-left hover:underline hover:underline-offset-4', labelWeight, focusRing)}>
            {product.name}
          </button>
        </h3>
        <Rating value={product.rating} count={product.reviewCount} size={12} />
        <div className="mt-auto flex flex-col gap-1">
          <PriceTag product={product} />
          {low && <p className="text-xs text-(--tpl-warning)">僅剩 {product.stock} 件</p>}
        </div>
        {soldOut ? (
          <Button size="sm" variant="secondary" onClick={notifyRestock} className="mt-1 w-full">
            <Bell size={15} />
            到貨通知
          </Button>
        ) : (
          <Button
            size="sm"
            className="mt-1 w-full"
            onClick={() => dispatch({ type: 'addToCart', productId: product.id, variant: product.variant?.options[0].name, qty: 1 })}
            aria-label={`將 ${product.name} 加入購物車`}
          >
            <ShoppingBag size={15} />
            加入購物車
          </Button>
        )}
      </div>
    </li>
  )
}
