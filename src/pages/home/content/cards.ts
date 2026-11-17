import { featuredProjects, profile, type PrivateProject, type Project } from '@/data/profile'
import { BRIEFS } from './briefs'
import siteArt from '../assets/cards/personal-site.webp'
import threadsArt from '../assets/cards/threads-bot.webp'
import chatroomArt from '../assets/cards/ai-chatroom.webp'
import forgeArt from '../assets/cards/rpgmaker-character-forge.webp'
import dramaArt from '../assets/cards/drama-3.webp'
import fishingArt from '../assets/cards/fishing-work.webp'
import petsArt from '../assets/cards/pokemon-agent-pets.webp'
import codexForgeArt from '../assets/cards/codex-forge.webp'

export interface CardArt {
  image: string
}

export type CardData =
  // 英雄卡的卡圖是會動的分層插畫（components/HeroArt.tsx），不用單張圖
  | { kind: 'intro'; id: 'intro' }
  // 私人專案（PrivateProject）沒有 repo 連結，放大查看改標「私人專案」
  | ({ kind: 'project'; id: string; project: Project | PrivateProject } & CardArt)

/**
 * 卡圖：依各卡內容畫的原創插畫（Codex image_gen 生成，原圖 1536×1024，縮成 768 寬再轉 WebP）。
 * 專案截圖不放卡面，留在簡易介紹與 showcase 頁。
 * 卡圖是裝飾（卡片本身的 aria-label 就是標題），所以不另寫 alt，畫面內容記在各行註解。
 */
const ART: Record<string, CardArt> = {
  // 設計工作室裡漂浮著二十多個不同風格的網頁畫框，畫筆小精靈把中央的金框推到正中間
  'personal-site': { image: siteArt },
  // 深夜書桌旁的小機器人用網子撈起飛舞的報紙，經紡紗輪紡成發光絲線，變成社群貼文泡泡飄出窗外
  'threads-bot': { image: threadsArt },
  // AI 夥伴 Lumi 和兩位朋友圍坐聊天，身後的布景從房間翻轉成海邊夏日祭典的夜晚
  'ai-chatroom': { image: chatroomArt },
  // 魔法鍛造坊的鐵砧上，一個像素行走角色被敲出立繪、表情頭像與敵人戰鬥圖，小工匠拿放大鏡驗收
  'rpgmaker-character-forge': { image: forgeArt },
  // 劇場舞台中央的復古麥克風發出彩色聲波，四張不同情緒的面具與劇本紙頁在空中飛舞，旁邊是離線的筆電
  'drama-3': { image: dramaArt },
  // 辦公室裡上班族對著偽裝成編輯器、簡報、試算表的螢幕偷偷畫畫比賽，小惡魔評審舉著評分牌飄在上方
  'fishing-work': { image: fishingArt },
  // 辦公桌上浮著一座等角小島牧場，原創的圓滾滾小寵物頭上頂著不同顏色的狀態泡泡，光線連到後方的終端機視窗
  'pokemon-agent-pets': { image: petsArt },
  // 紙板劇場箱裡大家把便條與草圖貼成一條時間軸，AI 小助手從影印紙裡探出身子展開流程圖，角落的小黑貓遞紙條給主持人
  'codex-forge': { image: codexForgeArt },
}

/** 手牌：自介卡在最左，其餘依 profile.ts 的精選專案順序（公開專案＋私人專案）；文字資料一律讀 profile.ts */
export const cards: CardData[] = [
  { kind: 'intro', id: 'intro' },
  ...featuredProjects.map((project): CardData => {
    const art = ART[project.slug]
    if (!art) throw new Error(`cards.ts 缺少專案卡圖：${project.slug}`)
    // 漏了簡易介紹就直接報錯，不要讓點開的卡靜默變成只剩標頭
    if (!BRIEFS[project.slug]) throw new Error(`briefs.ts 缺少簡易介紹：${project.slug}`)
    return { kind: 'project', id: project.slug, project, ...art }
  }),
]

export function cardTitle(card: CardData) {
  return card.kind === 'intro' ? profile.name : card.project.title
}

/**
 * 卡面上的一句話說明：取 profile.ts 原文（自介第一句／專案 desc）的第一個子句，
 * 切在第一個「。」「，」「：」之前。不另寫文案，原文改了這裡就跟著變。
 */
export function cardBrief(card: CardData) {
  const text = card.kind === 'intro' ? profile.intro[0] : card.project.desc
  return text.split(/[。，：]/)[0].trim()
}
