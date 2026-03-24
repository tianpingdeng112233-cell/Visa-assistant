import { HotspotMarker } from './hotspot-marker'
import { DS160FormField, DS160Hotspot } from '@/lib/ds160-steps'
import { ChevronDown } from 'lucide-react'

interface DS160FormMockProps {
  fields: DS160FormField[]
  hotspots: DS160Hotspot[]
}

export function DS160FormMock({ fields, hotspots }: DS160FormMockProps) {
  return (
    <div className="bg-white rounded-2xl shadow-card border border-slate-100 overflow-hidden">
      {/* DS-160 style header bar */}
      <div className="bg-[#4a6fa5] px-4 py-2 flex items-center justify-between">
        <span className="text-white text-xs font-semibold tracking-wide">
          DS-160 Online Nonimmigrant Visa Application
        </span>
        <span className="text-blue-200 text-[10px]">ceac.state.gov</span>
      </div>

      {/* Two-column layout like real DS-160 */}
      <div className="flex" style={{ minHeight: 360 }}>
        {/* Left nav sidebar (DS-160 style) */}
        <div className="w-28 shrink-0 bg-[#2d4a7a] py-3">
          {[
            'Getting Started',
            'Personal',
            'Travel',
            'Travel Companions',
            'Passport',
            'U.S. Contact',
            'Family',
            'Work / Education',
            'Security and Background',
          ].map((item, i) => (
            <div
              key={item}
              className={`px-2 py-1 text-[9px] leading-tight cursor-default select-none ${
                i === 1
                  ? 'bg-[#1a2e4a] text-white font-bold'
                  : 'text-blue-200 hover:text-white'
              }`}
            >
              {i < 2 && (
                <span className="text-green-400 mr-1 text-[8px]">✓</span>
              )}
              {item}
            </div>
          ))}
        </div>

        {/* Main form area */}
        <div className="flex-1 relative bg-[#f8fafc] px-4 py-3 overflow-hidden">
          {/* Note bar */}
          <div className="bg-[#fffbe6] border border-[#e6c800] rounded px-2 py-1 mb-3 text-[9px] text-[#7a6000]">
            NOTE: Data on this page must match the information as it is written in your passport.
          </div>

          {/* Form fields */}
          <div className="space-y-2">
            {fields.slice(0, 7).map((field) => (
              <FormField key={field.id} field={field} />
            ))}
          </div>

          {/* Hotspot markers — placed over the form */}
          {hotspots.map((h) => (
            <HotspotMarker
              key={h.id}
              label={String(h.id)}
              style={{
                left: h.x,
                top: h.y,
                transform: 'translate(-50%, -50%)',
                position: 'absolute',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function FormField({ field }: { field: DS160FormField }) {
  return (
    <div>
      <div className="text-[9px] text-[#2d4a7a] font-semibold mb-0.5 leading-tight">
        {field.label}
      </div>
      {field.type === 'radio' ? (
        <div className="flex items-center gap-3 text-[9px] text-slate-600">
          <label className="flex items-center gap-1">
            <input type="radio" readOnly className="w-2.5 h-2.5" />
            Yes
          </label>
          <label className="flex items-center gap-1">
            <input type="radio" readOnly defaultChecked className="w-2.5 h-2.5" />
            No
          </label>
          {field.value && (
            <span className="text-[#b84a00] font-semibold ml-1">{field.value}</span>
          )}
        </div>
      ) : field.type === 'dropdown' ? (
        <div
          className={`h-5 flex items-center justify-between rounded px-1.5 text-[9px] border ${
            field.highlighted
              ? 'bg-[#ffd0d0] border-[#cc0000] text-[#b84a00] font-semibold'
              : 'bg-white border-slate-300 text-slate-500'
          }`}
        >
          <span className="truncate">{field.value ?? ' '}</span>
          <ChevronDown size={8} className="shrink-0 ml-1 opacity-50" />
        </div>
      ) : (
        <div
          className={`h-5 flex items-center rounded px-1.5 text-[9px] border ${
            field.highlighted
              ? 'bg-[#ffd0d0] border-[#cc0000] text-[#b84a00] font-semibold'
              : 'bg-white border-slate-300 text-slate-400'
          }`}
        >
          <span className="truncate">{field.value ?? ' '}</span>
        </div>
      )}
      {field.subLabel && (
        <div className="text-[8px] text-slate-400 mt-0.5">{field.subLabel}</div>
      )}
    </div>
  )
}
