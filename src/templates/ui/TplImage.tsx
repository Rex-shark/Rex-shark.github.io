import { useId } from 'react'
import { cn } from '../lib/cn'
import { PRODUCTS, productById, type CategorySlug } from '../data/catalog'
import { STORES } from '../data/places'

/**
 * 範本圖片：所有風格同一張。
 * 真實圖片由 Codex image_gen 生成（2026-11-18，虛構品牌「青森選物」的商品照、情境照、門市照，畫面不含文字），
 * 轉成 WebP 放在 public/templates/img/；對照表裡沒有的鍵（例如後台新增的商品）退回 SVG 佔位圖：分類色塊＋名稱。
 */

const IMG = '/templates/img'
const VARIANTS = ['main', 'alt1', 'alt2'] as const

/** 真實圖片對照表（key 例：'P04:main'） */
const IMAGE_SOURCES: Record<string, string> = {
  // 商品：主圖（淺色背景單品）、細節（材質近拍）、情境（生活場景）
  ...Object.fromEntries(PRODUCTS.flatMap((p) => VARIANTS.map((v) => [`${p.id}:${v}`, `${IMG}/${p.id}-${v}.webp`]))),
  // 品牌主視覺（官網、購物網站共用）、森林盒子開箱（方案頁）
  'hero:main': `${IMG}/hero.webp`,
  'box:main': `${IMG}/box.webp`,
  // 門市外觀（官網門市據點）
  ...Object.fromEntries(STORES.map((s) => [`store-${s.id}:main`, `${IMG}/store-${s.id}.webp`])),
}

const CATEGORY_TONE: Record<CategorySlug | 'brand', [string, string, string]> = {
  furniture: ['#E9DFD3', '#C9B49C', '#8A6E52'],
  kitchen: ['#E3E6DD', '#B9C2AE', '#66735A'],
  fragrance: ['#EFE3D6', '#D8BC9C', '#8C6A48'],
  textile: ['#E2E3E8', '#B7BBC9', '#5F6478'],
  brand: ['#E4E8E2', '#AFC0AE', '#4F6150'],
}

export type ImageVariant = 'main' | 'alt1' | 'alt2'

interface TplImageProps {
  /** 商品 id（P01…）或其他圖片鍵（hero、store-S01、course-C01…） */
  id: string
  variant?: ImageVariant
  /** 無障礙替代文字；商品圖預設為商品名稱 */
  alt?: string
  /** 佔位圖上顯示的文字；預設為商品名稱 */
  label?: string
  className?: string
}

export default function TplImage({ id, variant = 'main', alt, label, className }: TplImageProps) {
  const gradId = useId()
  const product = productById(id)
  const text = label ?? product?.name ?? ''
  const altText = alt ?? text
  const src = IMAGE_SOURCES[`${id}:${variant}`]

  if (src) {
    return <img src={src} alt={altText} loading="lazy" className={cn('h-full w-full object-cover', className)} />
  }

  const [bg, mid, ink] = CATEGORY_TONE[product?.category ?? 'brand']
  const shift = variant === 'main' ? 0 : variant === 'alt1' ? 1 : 2

  return (
    // alt="" 代表裝飾圖（例如縮圖按鈕已有名稱）：不暴露給輔助科技
    <svg {...(altText ? { role: 'img', 'aria-label': altText } : { 'aria-hidden': true })} viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice" className={cn('block h-full w-full', className)}>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2={shift === 1 ? '0' : '1'} y2="1">
          <stop offset="0" stopColor={bg} />
          <stop offset="1" stopColor={mid} />
        </linearGradient>
      </defs>
      <rect width="400" height="400" fill={`url(#${gradId})`} />
      {shift === 0 && <circle cx="300" cy="110" r="70" fill={ink} opacity="0.12" />}
      {shift === 1 && <rect x="60" y="230" width="280" height="90" rx="45" fill={ink} opacity="0.12" />}
      {shift === 2 && <path d="M0 300 Q 200 220 400 300 L400 400 L0 400 Z" fill={ink} opacity="0.12" />}
      <text x="200" y="208" textAnchor="middle" fontSize="26" fontFamily="system-ui, sans-serif" fill={ink} opacity="0.75">
        {text}
      </text>
    </svg>
  )
}
