import { HotspotMarker } from './hotspot-marker'

interface Hotspot {
  id: number
  x: string
  y: string
  label: string
}

interface ScreenshotPreviewCardProps {
  label?: string
  browserUrl?: string
  hotspots?: Hotspot[]
  /** bg color of the screenshot area */
  bgColor?: string
  children?: React.ReactNode
}

export function ScreenshotPreviewCard({
  label = 'FORM PREVIEW',
  hotspots = [],
  bgColor = '#f0f4f9',
  children,
}: ScreenshotPreviewCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-card overflow-hidden border border-slate-100">
      {/* Card header label */}
      <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
          {label}
        </span>
        {/* Fake browser dots */}
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
        </div>
      </div>

      {/* Screenshot area */}
      <div
        className="relative"
        style={{ backgroundColor: bgColor, minHeight: 340 }}
      >
        {/* Mock form content */}
        {children ? (
          children
        ) : (
          <MockFormContent />
        )}

        {/* Hotspot markers */}
        {hotspots.map((h) => (
          <HotspotMarker
            key={h.id}
            label={h.label}
            style={{ left: h.x, top: h.y, transform: 'translate(-50%, -50%)' }}
          />
        ))}
      </div>
    </div>
  )
}

function MockFormContent() {
  return (
    <div className="p-6 opacity-60 select-none">
      {/* Mock DS-160 form */}
      <div className="bg-white rounded-lg shadow-sm p-4 text-[10px] text-slate-400">
        <div className="text-xs font-bold text-slate-600 mb-3">DS-160 Form</div>

        {/* Row 1 */}
        <div className="mb-3">
          <div className="text-[9px] text-slate-400 mb-1">Surnames</div>
          <div className="h-7 bg-blue-50 border border-blue-200 rounded px-2 flex items-center text-[10px] text-blue-700">
            ZHANG
          </div>
        </div>

        {/* Row 2 */}
        <div className="mb-3">
          <div className="text-[9px] text-slate-400 mb-1">Given Names</div>
          <div className="h-7 bg-slate-50 border border-slate-200 rounded px-2 flex items-center text-[10px]">
            &nbsp;
          </div>
        </div>

        {/* Row 3 */}
        <div className="mb-3">
          <div className="text-[9px] text-slate-400 mb-1">Full Name in Native Alphabet</div>
          <div className="h-7 bg-slate-50 border border-slate-200 rounded px-2 flex items-center text-[10px]">
            &nbsp;
          </div>
        </div>

        {/* Blurred rows */}
        {[...Array(6)].map((_, i) => (
          <div key={i} className="mb-2">
            <div className="h-2 bg-slate-100 rounded mb-1 w-1/3" />
            <div className="h-5 bg-slate-50 border border-slate-100 rounded" />
          </div>
        ))}
      </div>
    </div>
  )
}
