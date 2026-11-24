import { toast } from '../lib/toast'
import type { Product } from '../data/catalog'
import { dispatch } from './state'

/** 切換收藏並提示 */
export function toggleFavorite(product: Product, isFav: boolean) {
  dispatch({ type: 'toggleFavorite', id: product.id })
  toast(isFav ? '已移除收藏' : '已加入收藏', { tone: 'info' })
}

/** 售完商品的到貨通知（示範） */
export function notifyRestock() {
  toast('到貨時會通知你（示範）', { tone: 'info' })
}
