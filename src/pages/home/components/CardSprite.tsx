import { useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useVelocity } from 'framer-motion'
import CardFace from './CardFace'
import { FACE_W, type Pose } from '../layout'
import { cardTitle, type CardData } from '../content/cards'

export type CardMode = 'hand' | 'hovered' | 'dragging' | 'field'

interface Props {
  card: CardData
  no: number
  pose: Pose
  z: number
  mode: CardMode
  cardW: number
  cardH: number
  /** 開場發牌的起點（畫面右下角外） */
  dealFrom: { x: number; y: number }
  /** 開場發牌的延遲；發完後為 0 */
  delay: number
  onPointerDown: (e: PointerEvent<HTMLDivElement>) => void
  onHover: (on: boolean) => void
  /** 手牌：放上場；場上的卡：放大查看 */
  onPlay: () => void
  /** 場上的卡按 Delete / Backspace 收回手牌 */
  onReturn: () => void
  /** 放大查看中：場上的這張先藏起來，看起來像是它本身翻過去 */
  hidden?: boolean
}

/** 一張卡片的「位置層」：同一張卡在手牌、拖曳、牌桌之間移動時都是同一個元素，直接飛過去 */
export default function CardSprite({ card, no, pose, z, mode, cardW, cardH, dealFrom, delay, onPointerDown, onHover, onPlay, onReturn, hidden = false }: Props) {
  const x = useMotionValue(dealFrom.x)
  const y = useMotionValue(dealFrom.y)
  // 依水平速度擺動：拖著卡甩動時卡片會跟著傾斜，停下來回正
  const vx = useVelocity(x)
  const swing = useSpring(useTransform(vx, [-2400, 0, 2400], [-16, 0, 16]), { stiffness: 320, damping: 22 })
  // 滑鼠停在卡上時，卡面跟著游標做 3D 傾斜
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 })

  const dragging = mode === 'dragging'

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (mode !== 'hovered' || e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    setTilt({ rx: -py * 16, ry: px * 18 })
  }

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onPlay()
    } else if (mode === 'field' && (e.key === 'Delete' || e.key === 'Backspace')) {
      e.preventDefault()
      onReturn()
    }
  }

  const follow = { type: 'spring' as const, stiffness: 1400, damping: 70, mass: 0.35 }
  const settle = { type: 'spring' as const, stiffness: 240, damping: 24, delay }

  return (
    <motion.div
      role="button"
      data-card-id={card.id}
      tabIndex={hidden ? -1 : 0}
      aria-label={mode === 'field' ? `查看：${cardTitle(card)}` : `打出卡片：${cardTitle(card)}`}
      className={`absolute top-0 left-0 touch-none outline-none select-none ${dragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      style={{ x, y, width: cardW, height: cardH, zIndex: z }}
      animate={{ x: pose.cx - cardW / 2, y: pose.cy - cardH / 2, rotate: pose.rotate, scale: pose.scale, opacity: hidden ? 0 : 1 }}
      transition={
        dragging ? { x: follow, y: follow, rotate: settle, scale: settle } : { ...settle, opacity: { duration: hidden ? 0.08 : 0.2, delay: hidden ? 0 : 0.25 } }
      }
      onPointerDown={onPointerDown}
      onPointerEnter={(e) => e.pointerType === 'mouse' && onHover(true)}
      onPointerLeave={(e) => {
        if (e.pointerType !== 'mouse') return
        onHover(false)
        setTilt({ rx: 0, ry: 0 })
      }}
      onPointerMove={onMove}
      // 只有鍵盤 Tab 過來才當作停留；手機點一下也會觸發 focus，不能讓卡片因此放大
      onFocus={(e) => e.currentTarget.matches(':focus-visible') && onHover(true)}
      onBlur={() => onHover(false)}
      onKeyDown={onKeyDown}
    >
      <motion.div className="h-full w-full" style={{ rotate: swing }}>
        <div className={mode === 'hand' ? 'card-bob' : ''} style={{ animationDelay: `${-no * 0.53}s` }}>
          <div
            className="transition-transform duration-150 ease-out"
            style={
              {
                transform: `perspective(700px) rotateX(${mode === 'hovered' ? tilt.rx : 0}deg) rotateY(${mode === 'hovered' ? tilt.ry : 0}deg)`,
                // 給英雄卡卡圖做景深錯位用（-0.5～0.5）
                '--tilt-x': mode === 'hovered' ? tilt.ry / 18 : 0,
                '--tilt-y': mode === 'hovered' ? -tilt.rx / 16 : 0,
              } as CSSProperties
            }
          >
            <div style={{ transform: `scale(${cardW / FACE_W})`, transformOrigin: '0 0' }}>
              <CardFace card={card} no={no} glow={mode === 'field' ? 'played' : 'playable'} />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
