import { profile } from '@/data/profile'
import { FACE_H, FACE_W } from '../layout'
import HeroArt from './HeroArt'
import { cardBadge, cardBrief, cardTitle, type CardData } from '../content/cards'

interface Props {
  card: CardData
  /** 牌組編號（1 起算），顯示在左上角圓鈕 */
  no: number
  glow: 'playable' | 'played' | 'none'
}

/**
 * 卡面（柔和 UI）：固定以 FACE_W × FACE_H 繪製，外層再依實際卡寬等比縮放。
 * 由上而下：卡圖 → 置中的卡名條（壓在卡圖下緣）→ 凹進去的一句話說明 → 左右兩個標籤；
 * 左上角是龍珠橘的圓鈕（羅馬數字編號／★）。英雄卡是粉彩光暈框、粉彩卡名條，人物會動。
 */
export default function CardFace({ card, no, glow }: Props) {
  const hero = card.kind === 'intro'
  const tags = (hero ? profile.roles : card.project.tags).slice(0, 2)

  return (
    <div
      className={`card-frame relative ${hero ? 'is-hero' : ''} ${glow === 'played' ? 'card-played' : ''}`}
      style={{ width: FACE_W, height: FACE_H }}
    >
      {/* 英雄卡背後的粉彩柔光 */}
      {hero && <span className="hero-glow" aria-hidden="true" />}

      {/* 卡圖：英雄卡的人物會動（分層動畫）；其他卡是單張圖 */}
      <div className="card-art absolute top-[5.5px] right-[5.5px] left-[5.5px] h-[106px] overflow-hidden rounded-[10px] bg-deck-shade">
        {card.kind === 'intro' ? (
          <HeroArt />
        ) : (
          <img
            src={card.image}
            alt=""
            draggable={false}
            // 卡圖是 3:2 橫圖，圖窗略方，左右會裁掉一點
            className="h-full w-full object-cover"
          />
        )}
        {/* 英雄卡：卡圖上定時掃過一道亮光，像閃卡 */}
        {hero && <span className="hero-shine" aria-hidden="true" />}
      </div>

      {/* 卡名條：置中，壓在卡圖下緣 */}
      <div
        className={`card-namebar absolute top-[103px] right-[1px] left-[1px] z-[4] grid h-[25px] place-items-center rounded-full px-3 ${hero ? 'is-hero' : ''}`}
      >
        <span className="w-full truncate text-center text-[13.5px] leading-none font-bold tracking-[-0.02em]">{cardTitle(card)}</span>
      </div>

      {/* 說明區：一句話，凹進去的框 */}
      <div className="card-desc absolute top-[135px] right-[8px] bottom-[31px] left-[8px] grid place-items-center rounded-[10px] px-[7px]">
        <p className="line-clamp-3 text-center text-[9.6px] leading-[1.45] text-deck-fg">{cardBrief(card)}</p>
      </div>

      {/* 標籤：一個靠左、一個靠右 */}
      <div className="absolute right-[7px] bottom-[8px] left-[7px] flex items-center justify-between gap-[4px]">
        {tags.map((t) => (
          <span
            key={t}
            className="card-tag max-w-[49%] truncate rounded-full px-[6px] py-[2px] text-[7.4px] leading-[10px] font-semibold whitespace-nowrap text-deck-fg"
          >
            {t}
          </span>
        ))}
      </div>

      {/* 左上角圓鈕：龍珠橘，專案卡顯示羅馬數字編號，英雄卡是★ */}
      <div
        className="card-badge absolute -top-[12px] -left-[12px] z-10 grid h-[29px] w-[29px] place-items-center rounded-full text-[14px] font-extrabold tracking-[-0.02em]"
        aria-hidden="true"
      >
        {cardBadge(no)}
      </div>
    </div>
  )
}
