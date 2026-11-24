import { useEffect, useMemo, useRef } from 'react'

/**
 * 假送出（fakeSubmit 等待 0.8 秒）期間的防護。
 * 等待中若元件卸載（工具列「重設」會讓範本以新 version 重新掛載）或呼叫 cancel()（例如關閉對話框），
 * 等待結束後 isCurrent() 回傳 false，呼叫端就不要再寫入 store、跳 toast。
 *
 * 用法：
 *   const id = guard.begin()
 *   await fakeSubmit()
 *   if (!guard.isCurrent(id)) return
 */
export function useSubmitGuard() {
  const token = useRef(0)

  useEffect(() => {
    const ref = token
    return () => {
      ref.current++
    }
  }, [])

  return useMemo(
    () => ({
      begin: () => ++token.current,
      isCurrent: (id: number) => id === token.current,
      cancel: () => {
        token.current++
      },
    }),
    [],
  )
}
