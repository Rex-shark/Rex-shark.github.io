/** 模擬送出：純前端延遲，不送出任何資料 */
export function fakeSubmit(ms = 800): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
