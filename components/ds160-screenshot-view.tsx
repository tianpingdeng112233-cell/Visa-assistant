'use client'

interface Hotspot {
  id: number
  x: string
  y: string
}

interface DS160ScreenshotViewProps {
  screenshots: string[]
  hotspots: Hotspot[]
  stepId: number
}

export function DS160ScreenshotView({ screenshots, hotspots, stepId }: DS160ScreenshotViewProps) {
  // Only show hotspot overlays for single-screenshot steps where positioning is reliable
  const showHotspots = screenshots.length === 1

  return (
    <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-card flex flex-col bg-white">
      {/* Browser chrome */}
      <div className="bg-white px-4 py-2.5 border-b border-slate-100 flex items-center gap-2 shrink-0">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
        <div className="flex-1 mx-3 bg-slate-50 rounded-md px-3 py-1 text-[10px] text-slate-500 border border-slate-100 truncate">
          🔒 ceac.state.gov/GenNIV/Default.aspx
        </div>
        <div className="shrink-0 bg-slate-100 text-slate-400 text-[9px] font-bold px-2 py-0.5 rounded">
          DS-160
        </div>
      </div>

      {/* Screenshot area */}
      <div className="relative overflow-y-auto" style={{ maxHeight: 530 }}>
        <div className="relative">
          {screenshots.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i}
              src={src}
              alt={`DS-160 Step ${stepId} screenshot ${i + 1}`}
              className="w-full block border-b border-slate-100 last:border-0"
              draggable={false}
            />
          ))}

          {/* Hotspot markers — only for single-screenshot steps */}
          {showHotspots &&
            hotspots.map((h) => (
              <div
                key={h.id}
                className="absolute pointer-events-none z-10"
                style={{ left: h.x, top: h.y, transform: 'translate(-50%, -50%)' }}
              >
                <div className="w-7 h-7 rounded-full bg-blue-600 border-2 border-white text-white text-xs font-black flex items-center justify-center shadow-lg">
                  {h.id}
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Footer hint for multi-screenshot steps */}
      {screenshots.length > 1 && (
        <div className="bg-slate-50 border-t border-slate-100 px-4 py-2 flex items-center gap-2 shrink-0">
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
