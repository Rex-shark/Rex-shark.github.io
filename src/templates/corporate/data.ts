/** 公司官網專屬假資料。權威來源：spec/templates/corporate.md */

export const SECTIONS = [
  { id: 'corp-about', label: '關於我們' },
  { id: 'corp-services', label: '服務項目' },
  { id: 'corp-stores', label: '門市據點' },
  { id: 'corp-news', label: '最新消息' },
  { id: 'corp-careers', label: '加入我們' },
  { id: 'corp-contact', label: '聯絡我們' },
] as const

export type SectionId = (typeof SECTIONS)[number]['id']

export const VALUES = [
  { key: 'craft', title: '在地工匠', text: '與全台 42 位工匠長期合作，每件作品都標示製作者。' },
  { key: 'lasting', title: '用得長久', text: '選實木、天然纖維與耐用工法，壞了也能修。' },
  { key: 'quiet', title: '安靜生活', text: '不追趕潮流，只挑放在家裡十年也不會膩的東西。' },
] as const

export type ServiceKey = 'retail' | 'gift' | 'space' | 'course'

export const SERVICES: { key: ServiceKey; name: string; summary: string; points: string[] }[] = [
  { key: 'retail', name: '零售門市', summary: '6 間門市，每間都有不同的選品主題。', points: ['門市限定商品', '每月更換主題陳列', '可預約一對一選物諮詢'] },
  { key: 'gift', name: '企業採購與禮贈', summary: '年節禮盒、員工禮品與客製刻字。', points: ['30 份起訂', '可加印企業 Logo 與手寫卡片', '提供報價單與發票'] },
  { key: 'space', name: '空間選物佈置', summary: '為民宿、辦公室與餐廳挑選家具與擺件。', points: ['現場丈量與提案', '家具與織品整體搭配', '可租可買'] },
  // 手作課程的對話框內容由 shared-data 的 COURSES 產生
  { key: 'course', name: '手作課程', summary: '4 種課程，從湯匙到小木凳。', points: [] },
]

export const TIMELINE = [
  { year: '2016', text: '在台北大安區開出第一間店' },
  { year: '2018', text: '台中草悟店開幕，開始與中部木工坊合作' },
  { year: '2020', text: '線上商店上線' },
  { year: '2022', text: '開辦手作課程，台南老宅店開幕' },
  { year: '2024', text: '合作工匠突破 40 位，松山店、竹北店開幕' },
  { year: '2026', text: '高雄駁二店開幕，門市達 6 間' },
]

export type NewsCategory = '品牌' | '活動' | '媒體'

export const NEWS: { id: string; date: string; category: NewsCategory; title: string; body: string }[] = [
  { id: 'n1', date: '2026/11/01', category: '品牌', title: '高雄駁二店正式開幕', body: '青森第六間門市在駁二倉庫群落腳，開幕首月推出港都限定木作杯墊，歡迎來坐坐。' },
  { id: 'n2', date: '2026/10/20', category: '活動', title: '冬季手作課程開放報名', body: '12 月起新增週末晚間場次，木湯匙雕刻與植物染方巾都有名額，報名從線上預約系統進行。' },
  { id: 'n3', date: '2026/10/05', category: '媒體', title: '《生活選物誌》專訪：做能用十年的東西', body: '創辦人周以安分享青森如何挑選合作工匠，以及「壞了也能修」的售後理念。' },
  { id: 'n4', date: '2026/09/18', category: '品牌', title: '檜木精油系列上市', body: '與宜蘭蒸餾所合作的檜木精油正式上市，同步推出擴香石組合。' },
  { id: 'n5', date: '2026/08/30', category: '活動', title: '工匠市集：秋日木作週末', body: '9 月兩個週末在大安旗艦店舉辦工匠市集，12 位合作工匠現場示範。' },
  { id: 'n6', date: '2026/07/12', category: '媒體', title: '入選年度台灣生活品牌 50 選', body: '感謝評審與一路支持的顧客，我們會繼續把安靜的好東西帶給大家。' },
]

export const TEAM = [
  { id: 'T01', name: '周以安', title: '創辦人', intro: '前室內設計師，想做一間自己也會一直逛的店。' },
  { id: 'T02', name: '王書亞', title: '選品總監', intro: '每年走訪超過 30 間工坊，負責每一件商品的最後把關。' },
  { id: 'T03', name: '李木生', title: '首席木工匠', intro: '做木工 25 年，木湯匙與小木凳課程的主講師。' },
  { id: 'T04', name: '謝苡晴', title: '植物染講師', intro: '研究台灣原生染料植物，帶領植物染方巾課程。' },
]

export const TESTIMONIALS = [
  { company: '青嶼設計事務所', role: '設計總監', text: '青森幫我們的辦公室挑了整套家具，來開會的客戶都會問桌子在哪裡買的。' },
  { company: '北緯旅宿', role: '營運經理', text: '民宿 12 間房的選物佈置都交給青森，住客評論常常提到房間的質感。' },
  { company: '初禾餐飲集團', role: '採購主任', text: '年節禮盒連續三年都找青森，刻字和手寫卡片讓收到的人很有感。' },
]

export const CAREERS = [
  { id: 'job1', title: '門市選物顧問', location: '台北', type: '全職', duties: ['門市接待與選物建議', '商品陳列維護', '協助課程現場'], requirements: ['喜歡與人交流', '對生活選物有熱情'] },
  { id: 'job2', title: '木工學徒', location: '台中', type: '全職', duties: ['跟隨工匠學習木作', '協助生產與修繕', '課程助教'], requirements: ['不需經驗', '願意長期學習'] },
  { id: 'job3', title: '社群內容企劃', location: '台北（可遠端）', type: '全職', duties: ['經營 Instagram 與電子報', '拍攝商品與門市', '企劃線上活動'], requirements: ['有內容企劃作品', '基本攝影能力'] },
]

export const FAQ = [
  { q: '門市和網路商店的商品一樣嗎？', a: '大部分相同，部分門市有限定商品，會在門市主題陳列中標示。' },
  { q: '可以修理在青森買的家具嗎？', a: '可以，實木家具提供終身修繕服務，僅收材料費。' },
  { q: '企業採購最少要訂幾份？', a: '30 份起訂，可加印 Logo 與附手寫卡片。' },
  { q: '手作課程需要自備工具嗎？', a: '不需要，所有工具與材料都由現場提供。' },
  { q: '有提供國外配送嗎？', a: '目前僅配送台灣本島與離島。' },
]

export const CONTACT_CATEGORIES = ['一般詢問', '企業採購', '空間佈置', '媒體合作', '應徵職缺'] as const
export type ContactCategory = (typeof CONTACT_CATEGORIES)[number]
