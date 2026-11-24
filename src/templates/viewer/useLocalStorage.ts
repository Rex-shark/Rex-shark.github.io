import { useCallback, useState } from 'react'

/** 展示器 UI 偏好（工具列收合等）。範本資料不可用 localStorage。 */
export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key)
      return raw === null ? initial : (JSON.parse(raw) as T)
    } catch {
      return initial
    }
  })
  const set = useCallback(
    (next: T) => {
      setValue(next)
      try {
        localStorage.setItem(key, JSON.stringify(next))
      } catch {
        // 無痕模式等情況寫不進去就算了
      }
    },
    [key],
  )
  return [value, set] as const
}
