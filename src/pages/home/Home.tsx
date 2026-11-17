import { useCallback, useEffect, useMemo, useRef, useState, type PointerEvent } from 'react'
import { AnimatePresence, MotionConfig } from 'framer-motion'
import { Link } from 'react-router'
import { profile } from '@/data/profile'
import CardSprite, { type CardMode } from './components/CardSprite'
import DuelField from './components/DuelField'
import ThemeToggle from './components/ThemeToggle'
import { readDeckTheme, saveDeckTheme, type DeckTheme } from './content/theme'
import BriefView, { type ExitTarget } from './components/BriefView'
import { cards, type CardData } from './content/cards'
import { PLAY_SLOTS, computeLayout, computeMat, handPose, nearestOpenSlot, type Pose } from './layout'
import './deck.css'

/** 拖曳中的卡：px/py 是游標位置，grab 是游標相對卡片中心的偏移 */
interface Drag {
  id: string
  /** 哪一根手指／哪支滑鼠在拖：多指觸控時只認這一個 */
  pointerId: number
  startX: number
  startY: number
  grabDX: number
  grabDY: number
  px: number
  py: number
  /** 移動超過幾像素才算拖曳，否則當作點擊 */
  moved: boolean
}

const DRAG_THRESHOLD = 6
const DRAG_SCALE = 1.12
/** 滑鼠停在場上卡片時放大一點 */
const FIELD_HOVER = 1.12

/** 牌組編號：自介卡為 0（顯示 ★），專案依序 1、2、3… */
const cardNo = (card: CardData) => cards.indexOf(card)

/**
 * 牌桌狀態存在 sessionStorage：從簡易介紹進完整介紹頁，再按上一頁回來時，
 * 場上的牌與剛才打開的卡原樣還原，也不重新發牌。關掉分頁就清掉。
 */
const STATE_KEY = 'home-deck'
interface Saved {
  placed: Record<string, number>
  open: string | null
}
function readSaved(): Saved | null {
  try {
    const raw = JSON.parse(sessionStorage.getItem(STATE_KEY) ?? 'null') as Partial<Saved> | null
    if (!raw || typeof raw.placed !== 'object' || raw.placed === null) return null
    const ids = new Set(cards.map((c) => c.id))
    const used = new Set<number>()
    const placed: Record<string, number> = {}
    // 卡片清單或格子數改過時，舊紀錄裡對不上的就丟掉
    for (const [id, slot] of Object.entries(raw.placed)) {
      if (ids.has(id) && PLAY_SLOTS.includes(slot) && !used.has(slot)) {
        placed[id] = slot
        used.add(slot)
      }
    }
    const open = typeof raw.open === 'string' && raw.open in placed ? raw.open : null
    return { placed, open }
  } catch {
    return null
  }
}

/** 畫面尺寸：用 ResizeObserver 而非 resize 事件，頁面在背景分頁載入（初始尺寸為 0）時也能補上正確值 */
function useViewport() {
  const read = () => ({ vw: document.documentElement.clientWidth, vh: document.documentElement.clientHeight })
  const [size, setSize] = useState(read)
  useEffect(() => {
    const ro = new ResizeObserver(() => setSize(read()))
    ro.observe(document.documentElement)
    return () => ro.disconnect()
  }, [])
  return size
}

export default function Home() {
  // 只在第一次渲染讀一次
  const [saved] = useState(readSaved)
  const { vw, vh } = useViewport()
  const layout = useMemo(() => computeLayout(vw, vh), [vw, vh])
  const mat = useMemo(() => computeMat(layout, vw), [layout, vw])
  // 場上的卡：卡片 id → 格子編號。開場先把自介卡放在怪獸區正中間，訪客一進來就看到是誰
  const [placed, setPlaced] = useState<Record<string, number>>(() => saved?.placed ?? { intro: PLAY_SLOTS[0] })
  const [hoverId, setHoverId] = useState<string | null>(null)
  const [drag, setDragState] = useState<Drag | null>(null)
  const dragRef = useRef<Drag | null>(null)
  // 從別頁回來（有紀錄）就不重新發牌
  const [dealing, setDealing] = useState(!saved)
  // 正在看簡易介紹的場上卡片
  const [inspectId, setInspectId] = useState<string | null>(() => saved?.open ?? null)
  const [theme, setTheme] = useState<DeckTheme>(readDeckTheme)

  useEffect(() => {
    try {
      sessionStorage.setItem(STATE_KEY, JSON.stringify({ placed, open: inspectId } satisfies Saved))
    } catch {
      // 存不了就只是回來時重新開始
    }
  }, [placed, inspectId])

  const setDrag = useCallback((d: Drag | null) => {
    dragRef.current = d
    setDragState(d)
  }, [])

  // 開場發牌：每張錯開一點，發完後移動不再延遲
  useEffect(() => {
    if (!dealing) return
    const t = setTimeout(() => setDealing(false), 1400)
    return () => clearTimeout(t)
  }, [dealing])

  /** 已經有卡的格子；except 是拖曳中那張自己的格子，算空 */
  const takenSlots = useCallback(
    (except?: string) => new Set(Object.entries(placed).flatMap(([id, slot]) => (id === except ? [] : [slot]))),
    [placed],
  )

  const placeAt = useCallback((id: string, slot: number) => {
    if (slot < 0) return
    setPlaced((p) => ({ ...p, [id]: slot }))
    setHoverId(null)
  }, [])

  /** 點一下打出：放進第一個空格；窄螢幕（手機）不用再點第二次，直接打開簡易介紹 */
  const narrow = layout.narrow
  const placeAuto = useCallback(
    (id: string) => {
      const taken = takenSlots()
      const slot = PLAY_SLOTS.find((s) => !taken.has(s))
      if (slot === undefined) return
      placeAt(id, slot)
      if (narrow) setInspectId(id)
    },
    [narrow, placeAt, takenSlots],
  )

  const returnToHand = useCallback((id: string) => {
    setPlaced((p) => {
      const next = { ...p }
      delete next[id]
      return next
    })
    setInspectId((cur) => (cur === id ? null : cur))
  }, [])

  // 關掉放大查看後，焦點還給那張卡（還在場上或已收回手牌都是同一個元素），鍵盤使用者不會被丟回頁首
  const lastInspect = useRef<string | null>(null)
  useEffect(() => {
    if (inspectId) {
      lastInspect.current = inspectId
      return
    }
    const id = lastInspect.current
    if (!id) return
    lastInspect.current = null
    document.querySelector<HTMLElement>(`[data-card-id="${id}"]`)?.focus({ preventScroll: true })
  }, [inspectId])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setInspectId(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // 拖曳進行中才掛全域監聽：游標離開卡片範圍也追得到
  const dragId = drag?.id
  useEffect(() => {
    if (!dragId) return
    const movedFrom = (d: Drag, e: globalThis.PointerEvent) =>
      d.moved || Math.hypot(e.clientX - d.startX, e.clientY - d.startY) > DRAG_THRESHOLD
    // pointermove 一秒可能上百次，合併成每個畫面幀最多重繪一次
    let raf = 0
    let last: globalThis.PointerEvent | null = null
    const onMove = (e: globalThis.PointerEvent) => {
      if (e.pointerId !== dragRef.current?.pointerId) return
      last = e
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const d = dragRef.current
        if (!d || !last) return
        setDrag({ ...d, px: last.clientX, py: last.clientY, moved: movedFrom(d, last) })
      })
    }
    const onUp = (e: globalThis.PointerEvent) => {
      const d = dragRef.current
      if (!d || e.pointerId !== d.pointerId) return
      setDrag(null)
      // 拖曳期間的 pointerleave 都被忽略了，放開時把停留狀態清掉，不然卡片會一直維持放大
      setHoverId(null)
      const cx = e.clientX - d.grabDX
      const cy = e.clientY - d.grabDY
      const onField = d.id in placed
      // 最後一次移動可能還在等下一幀，這裡用放開的位置再判斷一次
      if (!movedFrom(d, e)) {
        // 點一下：場上的卡放大查看，手牌直接放上場
        if (onField) setInspectId(d.id)
        else placeAuto(d.id)
        return
      }
      if (cy > layout.playLineY) {
        // 拖回手牌區
        if (onField) returnToHand(d.id)
        return
      }
      placeAt(d.id, nearestOpenSlot(mat, takenSlots(d.id), cx, cy))
    }
    const onCancel = (e: globalThis.PointerEvent) => {
      if (e.pointerId !== dragRef.current?.pointerId) return
      setDrag(null)
      setHoverId(null)
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    window.addEventListener('pointercancel', onCancel)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onCancel)
    }
  }, [dragId, layout, mat, placed, placeAt, placeAuto, returnToHand, setDrag, takenSlots])

  const hand = cards.filter((c) => !(c.id in placed))
  const dragging = drag?.moved ? drag : null
  const hoverIdx = !dragging && hoverId ? hand.findIndex((c) => c.id === hoverId) : -1

  // 拖曳中：放開會落進哪一格，或是拖回手牌
  const dragCy = dragging ? dragging.py - dragging.grabDY : 0
  const dragTaken = dragging ? takenSlots(dragging.id) : null
  const dragOpen = dragTaken ? new Set(PLAY_SLOTS.filter((s) => !dragTaken.has(s))) : undefined
  const dragTarget =
    dragging && dragTaken && dragCy < layout.playLineY ? nearestOpenSlot(mat, dragTaken, dragging.px - dragging.grabDX, dragCy) : -1
  const returning = dragging && dragging.id in placed && dragCy > layout.playLineY

  const poseOf = (card: CardData): { pose: Pose; z: number; mode: CardMode } => {
    if (dragging?.id === card.id) {
      return {
        pose: { cx: dragging.px - dragging.grabDX, cy: dragging.py - dragging.grabDY, rotate: 0, scale: DRAG_SCALE },
        z: 300,
        mode: 'dragging',
      }
    }
    const slot = placed[card.id]
    if (slot !== undefined) {
      const hovered = !dragging && hoverId === card.id
      const c = mat.centers[slot]
      return { pose: { ...c, rotate: 0, scale: mat.cardScale * (hovered ? FIELD_HOVER : 1) }, z: hovered ? 60 : 40, mode: 'field' }
    }
    const i = hand.indexOf(card)
    const hovered = i === hoverIdx
    return {
      pose: handPose(i, hand.length, hoverIdx >= 0 ? hoverIdx : null, layout, vw, vh),
      z: hovered ? 200 : 10 + i,
      mode: hovered ? 'hovered' : 'hand',
    }
  }

  const startDrag = (card: CardData, pose: Pose) => (e: PointerEvent<HTMLDivElement>) => {
    // 已經有一根手指在拖，第二根手指按到別張卡不能搶走
    if (e.button !== 0 || dragRef.current) return
    setDrag({
      id: card.id,
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      grabDX: e.clientX - pose.cx,
      grabDY: e.clientY - pose.cy,
      px: e.clientX,
      py: e.clientY,
      moved: false,
    })
  }

  const inspectCard = cards.find((c) => c.id === inspectId)
  const inspectSlot = inspectId ? placed[inspectId] : undefined

  // 在放大畫面按「收回手牌」：退場動畫要縮回手牌裡的位置，而不是原本的場地格
  const [exitTo, setExitTo] = useState<ExitTarget | null>(null)
  const returnFromInspect = (id: string) => {
    const nextHand = cards.filter((c) => !(c.id in placed) || c.id === id)
    const p = handPose(nextHand.findIndex((c) => c.id === id), nextHand.length, null, layout, vw, vh)
    setExitTo({ cx: p.cx, cy: p.cy, w: layout.cardW * p.scale, rotate: p.rotate })
    returnToHand(id)
  }

  return (
    <MotionConfig reducedMotion="user">
      <main className="deck-root scene-duel relative w-full" data-theme={theme}>
        {/* 放大查看時，牌桌整片設為 inert：Tab 不會跑到後面的卡片 */}
        <div className="contents" inert={!!inspectCard}>
          <div className="pointer-events-none absolute inset-0">
            {/* 兩側的扭蛋小龍先拿掉（DuelFigures 元件與素材保留，之後要放回只要加回這裡） */}
            <DuelField mat={mat} open={dragOpen} target={dragTarget} />
          </div>
          <div className="scene-frame pointer-events-none absolute inset-0" />

          {/* 頂端列 */}
          <header className="absolute top-0 right-0 left-0 z-50 flex h-16 items-center justify-between gap-4 px-7 text-deck-fg">
            <div className="min-w-0">
              <h1 className="truncate text-xl font-bold tracking-[-0.02em] text-(color:--title)">{profile.name} 的手牌</h1>
              <p className="truncate text-xs text-(color:--sub)">
                {layout.narrow ? '點一張牌看介紹' : '把手牌拖到場地格子上（或點一下），點場上的卡看介紹；拖回下方即收回'}
              </p>
            </div>
            <nav className="flex shrink-0 items-center gap-2 sm:gap-3" aria-label="其他頁面">
              <Link
                to="/gallery"
                className="soft-pill hidden rounded-full px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-shadow hover:shadow-[var(--raise-sm)] focus-visible:outline-2 focus-visible:outline-deck-accent active:shadow-[var(--press-sm)] sm:inline-block"
              >
                設計實驗室
              </Link>
              <ThemeToggle
                theme={theme}
                onChange={(t) => {
                  setTheme(t)
                  saveDeckTheme(t)
                }}
              />
            </nav>
          </header>

          {/* 拖場上的卡回手牌區：手牌區亮起 */}
          {dragging && dragging.id in placed && (
            <div
              className={`hand-return pointer-events-none absolute right-0 bottom-0 left-0 z-[5] grid place-items-center transition-opacity ${returning ? 'opacity-100' : 'opacity-40'}`}
              style={{ top: layout.playLineY }}
            >
              <p className="text-sm font-semibold tracking-[0.2em]">{returning ? '放開收回手牌' : '拖到這裡收回手牌'}</p>
            </div>
          )}

          {cards.map((card, i) => {
            const { pose, z, mode } = poseOf(card)
            return (
              <CardSprite
                key={card.id}
                card={card}
                no={cardNo(card)}
                pose={pose}
                z={z}
                mode={mode}
                cardW={layout.cardW}
                cardH={layout.cardH}
                // 從別頁回來時直接從目前位置出現，不再從右下角飛進來
                dealFrom={saved ? { x: pose.cx - layout.cardW / 2, y: pose.cy - layout.cardH / 2 } : { x: vw + 40, y: vh - layout.cardH }}
                delay={dealing ? 0.25 + i * 0.09 : 0}
                onPointerDown={startDrag(card, pose)}
                onHover={(on) => {
                  if (dragRef.current) return
                  setHoverId((cur) => (on ? card.id : cur === card.id ? null : cur))
                }}
                onPlay={() => (card.id in placed ? setInspectId(card.id) : placeAuto(card.id))}
                onReturn={() => returnToHand(card.id)}
                hidden={inspectId === card.id}
              />
            )
          })}
        </div>

        {/* custom：已經在退場的元件改不了 props，退場目標要從這裡傳進去 */}
        <AnimatePresence custom={exitTo} onExitComplete={() => setExitTo(null)}>
          {inspectCard && inspectSlot !== undefined && (
            <BriefView
              key={inspectCard.id}
              card={inspectCard}
              no={cardNo(inspectCard)}
              vw={vw}
              vh={vh}
              narrow={layout.narrow}
              from={{ ...mat.centers[inspectSlot], w: layout.cardW * mat.cardScale }}
              onClose={() => setInspectId(null)}
              onReturn={() => returnFromInspect(inspectCard.id)}
            />
          )}
        </AnimatePresence>
      </main>
    </MotionConfig>
  )
}
