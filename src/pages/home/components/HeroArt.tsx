import bgImg from '../assets/cards/hero/bg.webp'
import bodyImg from '../assets/cards/hero/body.webp'
import blinkLImg from '../assets/cards/hero/blink-l.jpg'
import blinkRImg from '../assets/cards/hero/blink-r.jpg'

/**
 * 英雄卡會動的卡圖（拆層 2.5D）：
 * - 背景板：Codex 把人物移除後補完的背景
 * - 人物：用 macOS Vision 從原卡圖摳出來，和原圖逐像素對齊
 * - 眨眼：Codex 改成閉眼的版本，兩隻眼睛各裁一小塊疊上去
 * 所有圖層都放在同一個 3:2 舞台裡，座標一律用原圖的比例（%），確保對齊。
 * 滑鼠停在卡上時，CardSprite 會給 --tilt-x / --tilt-y（-0.5～0.5），前後景錯開移動做出景深。
 */

/** 兩隻閉眼小塊在原圖中的位置（比例；原圖 1536×1024 上量的） */
const EYES = [
  { src: blinkLImg, left: 41.67, top: 27.34, width: 7.49, height: 8.3 },
  { src: blinkRImg, left: 50.13, top: 26.86, width: 7.81, height: 8.3 },
]
/** 手上那把卡牌的位置（比例），用來放閃光 */
const CARDS = { left: 74, top: 23 }
/** 人物腳底（比例）：呼吸與擺動以此為支點，腳才不會離開岩石 */
const FEET = '50% 88%'

const BUBBLES = [
  { left: 12, size: 5, dur: 7, delay: 0 },
  { left: 24, size: 3.5, dur: 5.5, delay: -2.5 },
  { left: 66, size: 4, dur: 6.5, delay: -4 },
  { left: 84, size: 6, dur: 8, delay: -1.2 },
  { left: 93, size: 3, dur: 5, delay: -3.3 },
]

export default function HeroArt() {
  return (
    <div className="hero-stage" aria-hidden="true">
      <img src={bgImg} alt="" draggable={false} className="hero-layer hero-bg" />

      {/* 背景泡泡往上飄（在人物後面） */}
      <div className="hero-layer hero-mid">
        {BUBBLES.map((b) => (
          <span
            key={b.left}
            className="hero-bubble"
            style={{ left: `${b.left}%`, width: `${b.size}%`, animationDuration: `${b.dur}s`, animationDelay: `${b.delay}s` }}
          />
        ))}
      </div>

      <div className="hero-layer hero-front">
        <div className="hero-layer hero-body" style={{ transformOrigin: FEET }}>
          <img src={bodyImg} alt="" draggable={false} className="hero-layer" />
          {EYES.map((e) => (
            <img
              key={e.src}
              src={e.src}
              alt=""
              draggable={false}
              className="hero-blink"
              style={{ left: `${e.left}%`, top: `${e.top}%`, width: `${e.width}%`, height: `${e.height}%` }}
            />
          ))}
          <span className="hero-sparkle" style={{ left: `${CARDS.left}%`, top: `${CARDS.top}%` }} />
        </div>
      </div>
    </div>
  )
}
