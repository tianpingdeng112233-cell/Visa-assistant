'use client'

import { useRef, useState, useCallback } from 'react'

export interface ScreenBox {
  imgIndex?: number
  x: number   // left %
  y: number   // top %
  w: number   // width %
  h: number   // height %
  label: string
}

type Handle = 'nw' | 'n' | 'ne' | 'e' | 'se' | 's' | 'sw' | 'w'

type Interaction =
  | { type: 'draw';   imgIndex: number; startX: number; startY: number; currentX: number; currentY: number }
  | { type: 'move';   globalIndex: number; imgIndex: number; startMouseX: number; startMouseY: number; origBox: { x: number; y: number; w: number; h: number } }
  | { type: 'resize'; globalIndex: number; imgIndex: number; handle: Handle; startMouseX: number; startMouseY: number; origBox: { x: number; y: number; w: number; h: number } }
  | null

interface Props {
  screenshots: string[]
  boxes?: ScreenBox[]
  url?: string
  isEditing?: boolean
  onAddBox?:    (imgIndex: number, x: number, y: number, w: number, h: number) => void
  onUpdateBox?: (globalIndex: number, x: number, y: number, w: number, h: number) => void
  onDeleteBox?: (globalIndex: number) => void
  maxHeight?: number
}

function clamp(v: number, lo: number, hi: number) { return Math.max(lo, Math.min(hi, v)) }

function pct(el: HTMLDivElement | null, clientX: number, clientY: number) {
  if (!el) return { x: 0, y: 0 }
  const r = el.getBoundingClientRect()
  return {
    x: clamp(((clientX - r.left) / r.width)  * 100, 0, 100),
    y: clamp(((clientY - r.top)  / r.height) * 100, 0, 100),
  }
}

function pctDelta(el: HTMLDivElement | null, dx: number, dy: number) {
  if (!el) return { dx: 0, dy: 0 }
  const r = el.getBoundingClientRect()
  return { dx: (dx / r.width) * 100, dy: (dy / r.height) * 100 }
}

function applyResize(origBox: { x: number; y: number; w: number; h: number }, handle: Handle, dx: number, dy: number) {
  let { x, y, w, h } = origBox
  if (handle.includes('e')) w  = Math.max(2, w + dx)
  if (handle.includes('w')) { x += dx; w = Math.max(2, w - dx) }
  if (handle.includes('s')) h  = Math.max(2, h + dy)
  if (handle.includes('n')) { y += dy; h = Math.max(2, h - dy) }
  return { x: clamp(x, 0, 99), y: clamp(y, 0, 99), w, h }
}

// 8-handle resize cursor map
const HANDLE_CURSOR: Record<Handle, string> = {
  nw: 'nw-resize', n: 'n-resize', ne: 'ne-resize',
  e:  'e-resize',  se: 'se-resize', s: 's-resize',
  sw: 'sw-resize', w: 'w-resize',
}

// Handle positions (top%, left%) as percent of box size
const HANDLE_POS: Record<Handle, { top: string; left: string }> = {
  nw: { top: '0',   left: '0' },
  n:  { top: '0',   left: '50%' },
  ne: { top: '0',   left: '100%' },
  e:  { top: '50%', left: '100%' },
  se: { top: '100%',left: '100%' },
  s:  { top: '100%',left: '50%' },
  sw: { top: '100%',left: '0' },
  w:  { top: '50%', left: '0' },
}

const HANDLES: Handle[] = ['nw', 'n', 'ne', 'e', 'se', 's', 'sw', 'w']

export function AnnotatedScreenshot({
  screenshots,
  boxes = [],
  url,
  isEditing,
  onAddBox,
  onUpdateBox,
  onDeleteBox,
  maxHeight = 800,
}: Props) {
  const containerRefs = useRef<(HTMLDivElement | null)[]>([])
  const [interaction, setInteraction] = useState<Interaction>(null)

  // ── Container: start draw ──────────────────────────────────────────
  const handleContainerPointerDown = useCallback((e: React.PointerEvent, imgIdx: number) => {
    if (!isEditing) return
    e.preventDefault()
    const { x, y } = pct(containerRefs.current[imgIdx], e.clientX, e.clientY)
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    setInteraction({ type: 'draw', imgIndex: imgIdx, startX: x, startY: y, currentX: x, currentY: y })
  }, [isEditing])

  // ── Box body: start move ───────────────────────────────────────────
  const handleBoxPointerDown = useCallback((e: React.PointerEvent, globalIndex: number, imgIdx: number, origBox: { x: number; y: number; w: number; h: number }) => {
    if (!isEditing) return
    e.stopPropagation()
    e.preventDefault()
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    setInteraction({ type: 'move', globalIndex, imgIndex: imgIdx, startMouseX: e.clientX, startMouseY: e.clientY, origBox })
  }, [isEditing])

  // ── Handle: start resize ───────────────────────────────────────────
  const handleResizePointerDown = useCallback((e: React.PointerEvent, globalIndex: number, imgIdx: number, handle: Handle, origBox: { x: number; y: number; w: number; h: number }) => {
    if (!isEditing) return
    e.stopPropagation()
    e.preventDefault()
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    setInteraction({ type: 'resize', globalIndex, imgIndex: imgIdx, handle, startMouseX: e.clientX, startMouseY: e.clientY, origBox })
  }, [isEditing])

  // ── Pointer move (all modes) ───────────────────────────────────────
  const handlePointerMove = useCallback((e: React.PointerEvent, imgIdx: number) => {
    if (!interaction || interaction.imgIndex !== imgIdx) return

    if (interaction.type === 'draw') {
      const { x, y } = pct(containerRefs.current[imgIdx], e.clientX, e.clientY)
      setInteraction(prev => prev?.type === 'draw' ? { ...prev, currentX: x, currentY: y } : prev)
    } else if (interaction.type === 'move') {
      const { dx, dy } = pctDelta(containerRefs.current[imgIdx], e.clientX - interaction.startMouseX, e.clientY - interaction.startMouseY)
      const newX = clamp(interaction.origBox.x + dx, 0, 99)
      const newY = clamp(interaction.origBox.y + dy, 0, 99)
      onUpdateBox?.(interaction.globalIndex, newX, newY, interaction.origBox.w, interaction.origBox.h)
    } else if (interaction.type === 'resize') {
      const { dx, dy } = pctDelta(containerRefs.current[imgIdx], e.clientX - interaction.startMouseX, e.clientY - interaction.startMouseY)
      const r = applyResize(interaction.origBox, interaction.handle, dx, dy)
      onUpdateBox?.(interaction.globalIndex, r.x, r.y, r.w, r.h)
    }
  }, [interaction, onUpdateBox])

  // ── Pointer up ────────────────────────────────────────────────────
  const handlePointerUp = useCallback((imgIdx: number) => {
    if (!interaction || interaction.imgIndex !== imgIdx) { setInteraction(null); return }

    if (interaction.type === 'draw') {
      const x = Math.min(interaction.startX, interaction.currentX)
      const y = Math.min(interaction.startY, interaction.currentY)
      const w = Math.abs(interaction.currentX - interaction.startX)
      const h = Math.abs(interaction.currentY - interaction.startY)
      if (w > 1 && h > 1) {
        onAddBox?.(imgIdx, Math.round(x * 10) / 10, Math.round(y * 10) / 10, Math.round(w * 10) / 10, Math.round(h * 10) / 10)
      }
    }
    setInteraction(null)
  }, [interaction, onAddBox])

  const activeBox = interaction?.type === 'draw' ? (() => {
    const x = Math.min(interaction.startX, interaction.currentX)
    const y = Math.min(interaction.startY, interaction.currentY)
    const w = Math.abs(interaction.currentX - interaction.startX)
    const h = Math.abs(interaction.currentY - interaction.startY)
    return { x, y, w, h, imgIndex: interaction.imgIndex }
  })() : null

  return (
    <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-card bg-white">
      {/* Browser chrome */}
      <div className="bg-white px-4 py-2 border-b border-slate-100 flex items-center gap-2 shrink-0">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
        <div className="flex-1 mx-3 bg-slate-50 rounded-md px-3 py-1 text-[10px] text-slate-500 border border-slate-100 truncate">
          🔒 {url || 'ceac.state.gov/GenNIV/Default.aspx'}
        </div>
        {isEditing && (
          <div className="shrink-0 bg-blue-100 text-blue-600 text-[9px] font-bold px-2 py-0.5 rounded">
            拖拽绘制 · 拖框移动 · 拉角缩放
          </div>
        )}
      </div>

      {/* Scrollable screenshot area */}
      <div className="overflow-y-auto" style={{ maxHeight }}>
        {screenshots.map((src, imgIdx) => {
          const imgBoxes = boxes.filter((b) => (b.imgIndex ?? 0) === imgIdx)
          let boxGlobalOffset = 0
          for (let i = 0; i < imgIdx; i++) {
            boxGlobalOffset += boxes.filter((b) => (b.imgIndex ?? 0) === i).length
          }

          return (
            <div
              key={imgIdx}
              ref={(el) => { containerRefs.current[imgIdx] = el }}
              className={`relative select-none ${isEditing ? 'cursor-crosshair' : ''}`}
              onPointerDown={(e) => handleContainerPointerDown(e, imgIdx)}
              onPointerMove={(e) => handlePointerMove(e, imgIdx)}
              onPointerUp={() => handlePointerUp(imgIdx)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="w-full block" draggable={false} />

              {/* Existing boxes */}
              {imgBoxes.map((box, i) => {
                const globalIndex = boxGlobalOffset + i
                const isActive = interaction?.type === 'move' && interaction.globalIndex === globalIndex
                  || interaction?.type === 'resize' && interaction.globalIndex === globalIndex
                return (
                  <div
                    key={`box-${imgIdx}-${i}`}
                    className={`absolute z-10 group border-2 border-blue-500 ${isActive ? 'bg-blue-400/20' : 'bg-blue-400/10'} ${isEditing ? 'cursor-move' : 'pointer-events-none'}`}
                    style={{ left: `${box.x}%`, top: `${box.y}%`, width: `${box.w}%`, height: `${box.h}%` }}
                    onPointerDown={(e) => handleBoxPointerDown(e, globalIndex, imgIdx, { x: box.x, y: box.y, w: box.w, h: box.h })}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Number badge */}
                    <div className="absolute -top-3 -left-2 w-7 h-7 rounded-full bg-blue-500 border-2 border-white text-white text-[11px] font-black flex items-center justify-center shadow-lg pointer-events-none">
                      {globalIndex + 1}
                    </div>

                    {/* Resize handles — only in edit mode */}
                    {isEditing && HANDLES.map((handle) => (
                      <div
                        key={handle}
                        className="absolute w-3 h-3 bg-white border-2 border-blue-500 rounded-sm z-20 opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{
                          top: HANDLE_POS[handle].top,
                          left: HANDLE_POS[handle].left,
                          transform: 'translate(-50%, -50%)',
                          cursor: HANDLE_CURSOR[handle],
                        }}
                        onPointerDown={(e) => handleResizePointerDown(e, globalIndex, imgIdx, handle, { x: box.x, y: box.y, w: box.w, h: box.h })}
                      />
                    ))}

                    {/* Delete button */}
                    {isEditing && (
                      <button
                        className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-black text-white text-[9px] font-bold flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20"
                        onPointerDown={(e) => e.stopPropagation()}
                        onClick={(e) => { e.stopPropagation(); onDeleteBox?.(globalIndex) }}
                      >✕</button>
                    )}

                    {/* Coordinate tooltip */}
                    {isEditing && (
                      <div className="absolute top-full left-0 mt-1 bg-black/80 text-white text-[9px] px-1.5 py-0.5 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30">
                        {box.x.toFixed(1)},{box.y.toFixed(1)} · {box.w.toFixed(1)}×{box.h.toFixed(1)}
                      </div>
                    )}
                  </div>
                )
              })}

              {/* In-progress draw preview */}
              {activeBox && activeBox.imgIndex === imgIdx && activeBox.w > 0 && activeBox.h > 0 && (
                <div
                  className="absolute z-20 border-2 border-blue-500 border-dashed bg-blue-400/10 pointer-events-none"
                  style={{ left: `${activeBox.x}%`, top: `${activeBox.y}%`, width: `${activeBox.w}%`, height: `${activeBox.h}%` }}
                />
              )}
            </div>
          )
        })}
      </div>

      {/* Scroll hint */}
      {screenshots.length > 1 && (
        <div className="bg-slate-50 border-t border-slate-100 px-4 py-1.5 flex items-center gap-2 shrink-0">
          <div className="flex gap-1">
            {screenshots.map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-slate-300" />
            ))}
          </div>
          <span className="text-[10px] text-slate-400">
            向下滚动查看完整页面（共 {screenshots.length} 屏）
          </span>
        </div>
      )}
    </div>
  )
}
