/** 人物名單（顧客、團隊、管理員）。對應 spec/templates/shared-data.md 第 6 節 */

export interface Person {
  id: string
  name: string
  role: string
  email?: string
}

export const PEOPLE: Person[] = [
  { id: 'U01', name: '林雨潔', role: '顧客', email: 'yujie.lin@example.com' },
  { id: 'U02', name: '陳柏翰', role: '顧客', email: 'bohan.chen@example.com' },
  { id: 'U03', name: '黃思妤', role: '顧客', email: 'siyu.huang@example.com' },
  { id: 'U04', name: '張家豪', role: '顧客', email: 'jiahao.chang@example.com' },
  { id: 'U05', name: '吳佩珊', role: '顧客', email: 'peishan.wu@example.com' },
  { id: 'U06', name: '劉冠廷', role: '顧客', email: 'guanting.liu@example.com' },
  { id: 'U07', name: '蔡宜蓁', role: '顧客', email: 'yizhen.tsai@example.com' },
  { id: 'U08', name: '鄭宇軒', role: '顧客', email: 'yuxuan.cheng@example.com' },
  { id: 'U09', name: '許雅雯', role: '顧客', email: 'yawen.hsu@example.com' },
  { id: 'U10', name: '楊承恩', role: '顧客', email: 'chengen.yang@example.com' },
  { id: 'T01', name: '周以安', role: '創辦人' },
  { id: 'T02', name: '王書亞', role: '選品總監' },
  { id: 'T03', name: '李木生', role: '首席木工匠' },
  { id: 'T04', name: '謝苡晴', role: '植物染講師' },
  { id: 'A01', name: '何雅琪', role: '後台管理員', email: 'admin@qingsen.example.com' },
]

export const personById = (id: string) => PEOPLE.find((p) => p.id === id)
export const personByName = (name: string) => PEOPLE.find((p) => p.name === name)

/** 文字頭像底色序號（0–5），依 id 固定；實際顏色由風格的 chart / container 色決定 */
export function avatarTone(id: string): number {
  let sum = 0
  for (const ch of id) sum += ch.charCodeAt(0)
  return sum % 6
}
