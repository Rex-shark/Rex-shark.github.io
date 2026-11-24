/** 表單驗證：回傳錯誤訊息，通過時回傳 undefined */
export type Validator = (value: string) => string | undefined

export const required =
  (message = '此欄位為必填'): Validator =>
  (v) =>
    v.trim() ? undefined : message

export const email: Validator = (v) =>
  !v.trim() ? '請輸入 Email' : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? undefined : 'Email 格式不正確'

export const mobileTW: Validator = (v) =>
  !v.trim() ? '請輸入手機號碼' : /^09\d{8}$/.test(v.trim()) ? undefined : '手機號碼需為 09 開頭的 10 碼數字'

export const maxLength =
  (max: number): Validator =>
  (v) =>
    v.length > max ? `最多 ${max} 字` : undefined

export const lengthBetween =
  (min: number, max: number): Validator =>
  (v) =>
    v.trim().length < min ? `至少 ${min} 字` : v.length > max ? `最多 ${max} 字` : undefined

export const intBetween =
  (min: number, max: number, label = '數值'): Validator =>
  (v) => {
    if (!v.trim()) return `請輸入${label}`
    const n = Number(v)
    if (!Number.isInteger(n)) return `${label}需為整數`
    if (n < min || n > max) return `${label}需介於 ${min.toLocaleString('en-US')}–${max.toLocaleString('en-US')}`
    return undefined
  }

/** 依序執行多個驗證，回傳第一個錯誤 */
export function runValidators(value: string, ...validators: Validator[]): string | undefined {
  for (const v of validators) {
    const err = v(value)
    if (err) return err
  }
  return undefined
}

/** 驗證整份表單：rules 為 { 欄位: 驗證器[] }，回傳 { 欄位: 錯誤 } */
export function validateForm<K extends string>(
  values: Record<K, string>,
  rules: Partial<Record<K, Validator[]>>,
): Partial<Record<K, string>> {
  const errors: Partial<Record<K, string>> = {}
  for (const key of Object.keys(rules) as K[]) {
    const err = runValidators(values[key] ?? '', ...(rules[key] ?? []))
    if (err) errors[key] = err
  }
  return errors
}
