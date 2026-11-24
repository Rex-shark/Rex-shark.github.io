import { createStore } from './store'

export type ToastTone = 'success' | 'info' | 'error'

export interface ToastItem {
  id: number
  title: string
  tone: ToastTone
  action?: { label: string; onClick: () => void }
  /** 自動消失時間（ms），預設 3000 */
  duration: number
}

type Action = { type: 'add'; toast: ToastItem } | { type: 'remove'; id: number } | { type: 'clear' }

export const toastStore = createStore<ToastItem[], Action>(
  () => [],
  (state, action) => {
    switch (action.type) {
      case 'add':
        return [...state.slice(-2), action.toast]
      case 'remove':
        return state.filter((t) => t.id !== action.id)
      case 'clear':
        return []
    }
  },
)

let seq = 0

/** 顯示 toast（3 秒自動消失，可手動關閉；可帶一個動作按鈕，例如「復原」） */
export function toast(title: string, options: { tone?: ToastTone; action?: ToastItem['action']; duration?: number } = {}) {
  const item: ToastItem = { id: ++seq, title, tone: options.tone ?? 'success', action: options.action, duration: options.duration ?? 3000 }
  toastStore.dispatch({ type: 'add', toast: item })
  return item.id
}

/** 清掉所有 toast（重設範本、切換版型時呼叫，避免舊的「復原」動作作用到新狀態） */
export function clearToasts() {
  toastStore.dispatch({ type: 'clear' })
}

export function dismissToast(id: number) {
  toastStore.dispatch({ type: 'remove', id })
}
