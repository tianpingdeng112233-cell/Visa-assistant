'use client'

import { HotspotMarker } from '@/components/hotspot-marker'
import { AptFormField } from '@/lib/appointment-steps'

interface AisFormMockProps {
  fields: AptFormField[]
  hotspots: { id: number; x: string; y: string }[]
  url?: string
}

export function AisFormMock({ fields, hotspots, url = 'ais.usvisa-info.com/en-gb' }: AisFormMockProps) {
  return (
    <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-card">
      {/* Browser bar */}
      <div className="bg-white px-4 py-2.5 border-b border-slate-100 flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
        <div className="flex-1 mx-3 bg-slate-50 rounded-md px-3 py-1 text-[10px] text-slate-500 truncate border border-slate-100 flex items-center gap-1">
          <span className="text-green-600">🔒</span>
          {url}
        </div>
      </div>

      {/* AIS Site header */}
      <div className="bg-[#003366] px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-white/20 rounded flex items-center justify-center">
            <span className="text-white text-[9px] font-bold">US</span>
          </div>
          <div>
            <p className="text-white text-[9px] font-bold leading-tight">U.S. VISA APPOINTMENT SERVICE</p>
            <p className="text-white/60 text-[8px]">American Immigration Solutions</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-white/10 rounded px-2 py-0.5 text-white text-[9px]">English (UK)</div>
        </div>
      </div>

      {/* AIS content area */}
      <div className="relative bg-[#f5f5f5]" style={{ minHeight: 340 }}>
        {/* Inner content */}
        <div className="p-4 space-y-3">
          {/* AIS breadcrumb */}
          <div className="flex items-center gap-1 text-[9px] text-slate-400">
            <span>Home</span>
            <span className="mx-0.5">›</span>
            <span>Schedule Appointment</span>
            <span className="mx-0.5">›</span>
            <span className="text-[#003366]">Applicant Information</span>
          </div>

          {/* Form card */}
          <div className="bg-white rounded border border-slate-200 overflow-hidden">
            {/* Card header */}
            <div className="bg-[#003366] px-4 py-2">
              <p className="text-white text-[10px] font-bold">Appointment Scheduling System</p>
            </div>

            {/* Form fields */}
            <div className="p-3 space-y-2.5">
              {fields.map((field) => (
                <div key={field.id} className="relative">
                  <label className="block text-[9px] text-slate-500 mb-0.5 font-medium">
                    {field.label}
                    {field.subLabel && (
                      <span className="text-slate-400 font-normal ml-1">({field.subLabel})</span>
                    )}
                  </label>

                  {field.type === 'dropdown' ? (
                    <div
                      className={`h-6 rounded border text-[9px] flex items-center justify-between px-2 ${
                        field.highlighted
                          ? 'border-[#003366] bg-blue-50 text-[#003366] font-semibold ring-1 ring-[#003366]/30'
                          : 'border-slate-200 bg-white text-slate-600'
                      }`}
                    >
                      <span>{field.value || 'Select...'}</span>
                      <span className="text-slate-400">▾</span>
                    </div>
                  ) : field.type === 'radio' ? (
                    <div className="flex items-center gap-2 mt-1">
                      <div
                        className={`w-3 h-3 rounded-full border-2 flex items-center justify-center ${
                          field.highlighted ? 'border-[#003366]' : 'border-slate-300'
                        }`}
                      >
                        {field.highlighted && (
                          <div className="w-1.5 h-1.5 rounded-full bg-[#003366]" />
                        )}
                      </div>
                      <span
                        className={`text-[9px] ${
                          field.highlighted ? 'text-[#003366] font-semibold' : 'text-slate-600'
                        }`}
                      >
                        {field.value}
                      </span>
                    </div>
                  ) : field.type === 'checkbox' ? (
                    <div className="flex items-start gap-2 mt-1">
                      <div
                        className={`w-3 h-3 rounded border-2 flex items-center justify-center mt-0.5 shrink-0 ${
                          field.highlighted ? 'border-[#003366] bg-[#003366]' : 'border-slate-300 bg-white'
                        }`}
                      >
                        {field.highlighted && (
                          <span className="text-white text-[6px] font-bold">✓</span>
                        )}
                      </div>
                      <span className={`text-[9px] leading-tight ${field.highlighted ? 'text-[#003366] font-medium' : 'text-slate-500'}`}>
                        {field.value}
                      </span>
                    </div>
                  ) : field.type === 'password' ? (
                    <div
                      className={`h-6 rounded border text-[9px] flex items-center px-2 ${
                        field.highlighted
                          ? 'border-[#003366] bg-blue-50 ring-1 ring-[#003366]/30'
                          : 'border-slate-200 bg-white'
                      }`}
                    >
                      <span className="text-slate-400 tracking-widest">••••••••</span>
                    </div>
                  ) : (
                    <div
                      className={`h-6 rounded border text-[9px] flex items-center px-2 ${
                        field.highlighted
                          ? 'border-[#003366] bg-blue-50 text-[#003366] font-semibold ring-1 ring-[#003366]/30'
                          : 'border-slate-200 bg-white text-slate-600'
                      }`}
                    >
                      {field.value || ''}
                    </div>
                  )}

                  {/* Hotspot */}
                  {field.hotspotId && (
                    <div
                      className="absolute -right-2 top-1/2 -translate-y-1/2"
                      style={{ zIndex: 10 }}
                    >
                      <div className="w-5 h-5 rounded-full bg-blue-600 text-white text-[9px] font-bold flex items-center justify-center shadow-md">
                        {field.hotspotId}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Submit button */}
              <button className="w-full mt-1 bg-[#003366] text-white text-[9px] py-1.5 rounded font-semibold">
                Continue →
              </button>
            </div>
          </div>
        </div>

        {/* Floating hotspot markers */}
        {hotspots.map((h) => (
          <HotspotMarker
            key={h.id}
            label={String(h.id)}
            style={{ left: h.x, top: h.y, transform: 'translate(-50%, -50%)', zIndex: 20 }}
          />
        ))}
      </div>
    </div>
  )
}
