'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

const DS160_TOTAL = 27
const SLOT_TOTAL = 15
// 1 for /monitoring, 1 for /interview/checklist
const TOTAL_STEPS = DS160_TOTAL + SLOT_TOTAL + 1 + 1 // 44

interface Progress {
  currentStep: number
  ds160Done: number
  slotDone: number
  monitorDone: boolean
  interviewDone: boolean
}

function calcProgress(pathname: string): Progress {
  // DS-160: /ds160/N
  const ds160Match = pathname.match(/^\/ds160\/(\d+)/)
  if (ds160Match) {
    const n = parseInt(ds160Match[1])
    return { currentStep: n, ds160Done: n - 1, slotDone: 0, monitorDone: false, interviewDone: false }
  }
  // Appointment: /appointment/N
  const slotMatch = pathname.match(/^\/appointment\/(\d+)/)
  if (slotMatch) {
    const n = parseInt(slotMatch[1])
    return { currentStep: DS160_TOTAL + n, ds160Done: DS160_TOTAL, slotDone: n - 1, monitorDone: false, interviewDone: false }
  }
  // Monitoring
  if (pathname === '/monitoring') {
    return { currentStep: DS160_TOTAL + SLOT_TOTAL + 1, ds160Done: DS160_TOTAL, slotDone: SLOT_TOTAL, monitorDone: false, interviewDone: false }
  }
  // Interview
  if (pathname.startsWith('/interview')) {
    return { currentStep: TOTAL_STEPS, ds160Done: DS160_TOTAL, slotDone: SLOT_TOTAL, monitorDone: true, interviewDone: false }
  }
  return { currentStep: 0, ds160Done: 0, slotDone: 0, monitorDone: false, interviewDone: false }
}

const SEGMENTS = [
  { label: 'DS-160',   total: DS160_TOTAL, color: 'bg-blue-500',   key: 'ds160' },
  { label: '预约 Slot', total: SLOT_TOTAL,  color: 'bg-violet-500', key: 'slot' },
  { label: '监控',     total: 1,           color: 'bg-cyan-500',   key: 'monitor' },
  { label: '面签',     total: 1,           color: 'bg-emerald-500',key: 'interview' },
]

export function GlobalProgress() {
  const pathname = usePathname()
  const [prog, setProg] = useState<Progress>({ currentStep: 0, ds160Done: 0, slotDone: 0, monitorDone: false, interviewDone: false })

  useEffect(() => {
    // Use current path or last saved path (whichever is further)
    const saved = localStorage.getItem('visa_last_path') || ''
    const fromSaved = calcProgress(saved)
    const fromCurrent = calcProgress(pathname)
    // Pick whichever gives a higher step count
    setProg(fromCurrent.currentStep >= fromSaved.currentStep ? fromCurrent : fromSaved)
  }, [pathname])

  const overallPct = Math.round((prog.currentStep / TOTAL_STEPS) * 100)

  const doneByKey: Record<string, number> = {
    ds160: prog.ds160Done,
    slot: prog.slotDone,
    monitor: prog.monitorDone ? 1 : 0,
    interview: prog.interviewDone ? 1 : 0,
  }

  return (
    <div className="px-3 mb-3">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">整体进度</span>
        <span className="text-[11px] font-black text-blue-600">{overallPct}%</span>
      </div>

      {/* Segmented progress bar */}
      <div className="flex gap-0.5 h-2 rounded-full overflow-hidden mb-2.5">
        {SEGMENTS.map((seg) => {
          const done = doneByKey[seg.key]
          const pct = Math.min(done / seg.total, 1) * 100
          return (
            <div key={seg.key} className="flex-1 bg-slate-200 rounded-full overflow-hidden">
              <div
                className={`h-full ${seg.color} rounded-full transition-all duration-500`}
                style={{ width: `${pct}%` }}
              />
            </div>
          )
        })}
      </div>

      {/* Step labels */}
      <div className="flex gap-0.5">
        {SEGMENTS.map((seg) => {
          const done = doneByKey[seg.key]
          const active = done > 0 && done < seg.total
          const complete = done >= seg.total
          return (
            <div key={seg.key} className="flex-1 text-center">
              <p className={`text-[9px] font-semibold truncate ${complete ? 'text-green-600' : active ? 'text-blue-600' : 'text-slate-400'}`}>
                {seg.label}
              </p>
              <p className={`text-[9px] font-mono ${complete ? 'text-green-500' : 'text-slate-400'}`}>
                {done}/{seg.total}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
