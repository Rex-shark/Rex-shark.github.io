import { ZONE_ROWS, type Mat } from '../layout'

interface Props {
  mat: Mat
  /** 拖曳中：可以放卡的空格（亮綠框） */
  open?: Set<number>
  /** 拖曳中：放開會落進的那一格（最亮） */
  target?: number
}

/** 決鬥場地：我方 2 × 5 格，上排怪獸區、下排魔陷區 */
export default function DuelField({ mat, open, target }: Props) {
  return (
    <div
      className="duel-mat absolute flex flex-col rounded-2xl"
      style={{ left: mat.left, top: mat.top, width: mat.width, height: mat.height, padding: mat.pad, gap: mat.gap }}
    >
      {ZONE_ROWS.map((row, r) => (
        <div key={r} className="flex" style={{ gap: mat.gap }}>
          {row.map((z, c) => {
            const i = r * row.length + c
            const state = i === target ? 'is-target' : open?.has(i) ? 'is-open' : ''
            return <div key={c} className={`duel-zone is-${z} ${state}`} style={{ width: mat.zoneW, height: mat.zoneH }} />
          })}
        </div>
      ))}
    </div>
  )
}
