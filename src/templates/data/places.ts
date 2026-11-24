/** 門市與手作課程。對應 spec/templates/shared-data.md 第 4、5 節 */

export type Region = '北部' | '中部' | '南部'

export interface Store {
  id: string
  name: string
  region: Region
  address: string
  phone: string
  hours: string
  /** 公休日（0=日 … 6=六） */
  closedWeekday: number
  closedLabel: string
  bookable: boolean
}

export const STORES: Store[] = [
  { id: 'S01', name: '大安旗艦店', region: '北部', address: '台北市大安區青森路 12 號 1 樓', phone: '02-2700-0001', hours: '11:00–21:00', closedWeekday: 1, closedLabel: '每週一', bookable: true },
  { id: 'S02', name: '松山店', region: '北部', address: '台北市松山區杉林街 88 號', phone: '02-2700-0002', hours: '11:00–21:00', closedWeekday: 1, closedLabel: '每週一', bookable: false },
  { id: 'S03', name: '竹北店', region: '北部', address: '新竹縣竹北市楓香路 25 號', phone: '03-5500-0003', hours: '11:00–20:00', closedWeekday: 1, closedLabel: '每週一', bookable: false },
  { id: 'S04', name: '台中草悟店', region: '中部', address: '台中市西區樟樹巷 6 號', phone: '04-2300-0004', hours: '11:00–21:00', closedWeekday: 1, closedLabel: '每週一', bookable: true },
  { id: 'S05', name: '台南老宅店', region: '南部', address: '台南市中西區檜木街 41 號', phone: '06-2200-0005', hours: '12:00–20:00', closedWeekday: 2, closedLabel: '每週二', bookable: true },
  { id: 'S06', name: '高雄駁二店', region: '南部', address: '高雄市鹽埕區櫸木路 3 號', phone: '07-5500-0006', hours: '11:00–21:00', closedWeekday: 1, closedLabel: '每週一', bookable: false },
]

export interface Course {
  id: string
  name: string
  duration: string
  price: number
  capacity: number
  level: '初學者' | '有基礎者'
  description: string
}

export const COURSES: Course[] = [
  { id: 'C01', name: '木湯匙雕刻', duration: '2.5 小時', price: 1200, capacity: 8, level: '初學者', description: '從一塊櫻桃木開始，用雕刻刀削出屬於自己的湯匙。' },
  { id: 'C02', name: '大豆蠟燭調香', duration: '2 小時', price: 980, capacity: 10, level: '初學者', description: '認識精油調香，倒製兩個不同香味的蠟燭帶回家。' },
  { id: 'C03', name: '植物染方巾', duration: '3 小時', price: 1500, capacity: 8, level: '初學者', description: '用藍染與茜草染出兩條方巾，學習綁紮紋樣技法。' },
  { id: 'C04', name: '小木凳木作', duration: '4 小時', price: 2800, capacity: 6, level: '有基礎者', description: '榫接結構、砂磨到上油，完成一張可以真的坐的小木凳。' },
]

export const COURSE_SLOTS = ['10:00', '14:00', '19:00'] as const
