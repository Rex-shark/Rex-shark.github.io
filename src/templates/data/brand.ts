/** 虛構品牌「青森選物」。對應 spec/templates/shared-data.md 第 1 節 */
export const BRAND = {
  name: '青森選物',
  shortName: '青森',
  nameEn: 'Qingsen',
  slogan: '把森林的安靜，帶回日常。',
  intro: '來自台灣的木作與生活選物品牌，與在地工匠合作，做能用很久的東西。',
  founded: 2016,
  address: '台北市大安區青森路 12 號 3 樓',
  phone: '02-2700-0000',
  email: 'hello@qingsen.example.com',
  hours: '週一至週五 09:30–18:00',
  socials: ['Instagram', 'Facebook', 'LINE 官方帳號'] as const,
  copyright: '© 2026 青森選物 Qingsen（虛構品牌示範）',
} as const

/** 品牌數字（官網、方案頁共用） */
export const BRAND_STATS = [
  { label: '創立', value: 2016, suffix: ' 年', prefix: '' },
  { label: '門市', value: 6, suffix: ' 間', prefix: '' },
  { label: '合作工匠', value: 42, suffix: ' 位', prefix: '' },
  { label: '累積顧客', value: 8, suffix: ' 萬+', prefix: '' },
] as const

export const BRAND_RATING = 4.8
