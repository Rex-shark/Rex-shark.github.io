/** 商品分類與 12 件商品。對應 spec/templates/shared-data.md 第 2、3 節 */

export type CategorySlug = 'furniture' | 'kitchen' | 'fragrance' | 'textile'

export interface Category {
  slug: CategorySlug
  name: string
  /** 儀表板營收占比（%） */
  revenueShare: number
}

export const CATEGORIES: Category[] = [
  { slug: 'furniture', name: '家具', revenueShare: 41 },
  { slug: 'kitchen', name: '餐廚', revenueShare: 27 },
  { slug: 'fragrance', name: '香氛', revenueShare: 20 },
  { slug: 'textile', name: '織品', revenueShare: 12 },
]

export const categoryName = (slug: CategorySlug) => CATEGORIES.find((c) => c.slug === slug)?.name ?? ''

export type ProductTag = '新品' | '熱銷' | '限量'

export interface VariantOption {
  name: string
  /** 加價（NT$），0 表示不加價 */
  priceDelta: number
}

export interface ProductVariant {
  label: string
  options: VariantOption[]
}

export interface Product {
  id: string
  name: string
  category: CategorySlug
  price: number
  originalPrice?: number
  stock: number
  tag?: ProductTag
  rating: number
  reviewCount: number
  monthlySales: number
  variant?: ProductVariant
  description: string
}

export const LOW_STOCK_DEFAULT = 10

export const PRODUCTS: Product[] = [
  {
    id: 'P01', name: '胡桃木邊几', category: 'furniture', price: 4680, stock: 18, tag: '熱銷', rating: 4.9, reviewCount: 128, monthlySales: 128,
    variant: { label: '尺寸', options: [{ name: '小', priceDelta: 0 }, { name: '大', priceDelta: 800 }] },
    description: '北美黑胡桃木實木，邊角手工倒圓，放在沙發旁剛好一杯咖啡加一本書的大小。',
  },
  {
    id: 'P02', name: '橡木三層架', category: 'furniture', price: 6200, stock: 7, rating: 4.7, reviewCount: 64, monthlySales: 52,
    description: '白橡木框架搭配可調層板，三層各可承重 15 公斤，適合書、植物與收藏。',
  },
  {
    id: 'P03', name: '藤編休閒椅', category: 'furniture', price: 8900, originalPrice: 9800, stock: 3, tag: '限量', rating: 4.8, reviewCount: 41, monthlySales: 37,
    description: '印尼藤條手工編織，椅背微微後傾，坐久也不累。每批數量有限。',
  },
  {
    id: 'P04', name: '粗陶馬克杯', category: 'kitchen', price: 580, stock: 126, tag: '熱銷', rating: 4.8, reviewCount: 412, monthlySales: 412,
    variant: { label: '顏色', options: [{ name: '霧白', priceDelta: 0 }, { name: '炭黑', priceDelta: 0 }, { name: '苔綠', priceDelta: 0 }] },
    description: '台灣窯燒粗陶，杯身保留手作紋理，容量 350ml，可微波與洗碗機。',
  },
  {
    id: 'P05', name: '柚木砧板', category: 'kitchen', price: 1280, stock: 44, rating: 4.6, reviewCount: 97, monthlySales: 86,
    variant: { label: '尺寸', options: [{ name: '中', priceDelta: 0 }, { name: '大', priceDelta: 300 }] },
    description: '整塊柚木裁切，耐刀痕、不易吸水，背面可當上菜盤使用。',
  },
  {
    id: 'P06', name: '手沖咖啡壺', category: 'kitchen', price: 1650, stock: 0, rating: 4.7, reviewCount: 153, monthlySales: 0,
    description: '細口不鏽鋼壺身，注水穩定好控制，容量 600ml，適用瓦斯爐與電磁爐。',
  },
  {
    id: 'P07', name: '檜木精油 30ml', category: 'fragrance', price: 890, stock: 62, tag: '新品', rating: 4.9, reviewCount: 58, monthlySales: 241,
    description: '台灣檜木蒸餾萃取，氣味溫潤帶點木質甜感，滴兩三滴在擴香石即可。',
  },
  {
    id: 'P08', name: '雪松大豆蠟燭', category: 'fragrance', price: 760, stock: 85, tag: '熱銷', rating: 4.8, reviewCount: 356, monthlySales: 356,
    variant: { label: '香味', options: [{ name: '雪松', priceDelta: 0 }, { name: '白茶', priceDelta: 0 }, { name: '無花果', priceDelta: 0 }] },
    description: '天然大豆蠟手工倒製，木製燭芯燃燒時有細微劈啪聲，燃燒約 40 小時。',
  },
  {
    id: 'P09', name: '擴香石組', category: 'fragrance', price: 1080, originalPrice: 1280, stock: 21, rating: 4.5, reviewCount: 73, monthlySales: 104,
    description: '石膏擴香石三入，附一瓶 10ml 檜木精油，放在玄關、衣櫃或桌面皆可。',
  },
  {
    id: 'P10', name: '亞麻抱枕套', category: 'textile', price: 720, stock: 53, rating: 4.6, reviewCount: 198, monthlySales: 198,
    variant: { label: '顏色', options: [{ name: '燕麥', priceDelta: 0 }, { name: '霧藍', priceDelta: 0 }, { name: '赭紅', priceDelta: 0 }] },
    description: '比利時亞麻，水洗後更柔軟，45×45 公分，隱藏式拉鍊，不含枕心。',
  },
  {
    id: 'P11', name: '棉麻桌巾', category: 'textile', price: 1380, stock: 9, tag: '新品', rating: 4.7, reviewCount: 22, monthlySales: 31,
    variant: { label: '尺寸', options: [{ name: '四人', priceDelta: 0 }, { name: '六人', priceDelta: 400 }] },
    description: '棉麻混紡，經防潑水處理，日常灑出的醬汁擦一下就好。',
  },
  {
    id: 'P12', name: '植物染手帕', category: 'textile', price: 450, stock: 140, rating: 4.4, reviewCount: 86, monthlySales: 163,
    variant: { label: '顏色', options: [{ name: '藍染', priceDelta: 0 }, { name: '茜草', priceDelta: 0 }, { name: '薑黃', priceDelta: 0 }] },
    description: '以植物染料手工染製，每條顏色深淺略有不同，50×50 公分。',
  },
]

export const productById = (id: string) => PRODUCTS.find((p) => p.id === id)
