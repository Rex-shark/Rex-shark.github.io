import { useSyncExternalStore } from 'react'

/**
 * 範本狀態 store：模組層級、與 React 元件樹無關。
 * 放在風格之外，切換風格時狀態不會重置；重新整理頁面才回到初始資料。
 */
export interface TplStore<S, A> {
  getState: () => S
  dispatch: (action: A) => void
  subscribe: (listener: () => void) => () => void
  reset: () => void
}

export function createStore<S, A>(init: () => S, reducer: (state: S, action: A) => S): TplStore<S, A> {
  let state = init()
  const listeners = new Set<() => void>()
  const emit = () => listeners.forEach((l) => l())
  return {
    getState: () => state,
    dispatch: (action) => {
      const next = reducer(state, action)
      if (next !== state) {
        state = next
        emit()
      }
    },
    subscribe: (listener) => {
      listeners.add(listener)
      return () => {
        listeners.delete(listener)
      }
    },
    reset: () => {
      state = init()
      emit()
    },
  }
}

/** 讀取 store 狀態。selector 必須回傳既有參照（不要在 selector 內建立新物件）。 */
export function useStore<S, A>(store: TplStore<S, A>): S
export function useStore<S, A, T>(store: TplStore<S, A>, selector: (state: S) => T): T
export function useStore<S, A, T>(store: TplStore<S, A>, selector?: (state: S) => T): S | T {
  const get = () => (selector ? selector(store.getState()) : store.getState())
  return useSyncExternalStore(store.subscribe, get, get)
}
