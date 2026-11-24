/**
 * 黏土擬態背景：幾顆漂浮的粉彩黏土球（同樣用內外陰影表現鼓起），放在畫布四角。
 * 純裝飾（不含文字、不可互動），固定在外框內；窄螢幕時整體降低（--tpl-decor-opacity）。
 */
const BALLS = [
  { className: '-top-[4cqw] right-[8cqw] size-[12cqw]', color: '#FFE3CF' },
  { className: 'top-[30%] -right-[3cqw] size-[7cqw]', color: '#D9F2EC' },
  { className: '-bottom-[5cqw] left-[6cqw] size-[14cqw]', color: '#E3D9FB' },
  { className: 'bottom-[18%] -left-[2cqw] size-[5cqw]', color: '#FFD9E6' },
]

export default function ClayDecor() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden opacity-[var(--tpl-decor-opacity,1)]">
      {BALLS.map((b) => (
        <div
          key={b.className}
          className={`absolute rounded-full opacity-80 ${b.className}`}
          style={{
            backgroundColor: b.color,
            boxShadow: 'inset -10px -10px 20px rgba(107,72,214,0.12), inset 10px 10px 20px rgba(255,255,255,0.85), 0 16px 32px rgba(107,72,214,0.14)',
          }}
        />
      ))}
    </div>
  )
}
