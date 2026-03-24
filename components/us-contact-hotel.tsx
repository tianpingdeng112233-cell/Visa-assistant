'use client'

import { useEffect, useState } from 'react'
import { Hotel } from 'lucide-react'
import { HOTEL_STORAGE_KEY } from './travel-plan-helper'
import type { HotelResult } from '@/app/api/hotels/route'

export function USContactHotel() {
  const [hotel, setHotel] = useState<HotelResult | null>(null)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(HOTEL_STORAGE_KEY)
      if (saved) setHotel(JSON.parse(saved))
    } catch { /* ignore */ }
  }, [])

  if (!hotel) {
    return (
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-slate-400 flex items-center gap-2">
        <Hotel size={13} className="shrink-0" />
        <span>未找到酒店信息 — 请先在第 7 步「旅行信息」查询并选择酒店</span>
      </div>
    )
  }

  const rows = [
    ['Contact Person / Org Name', hotel.name],
    ['Organization Name',         hotel.name],
    ['Relationship to You',       'OTHER'],
    ['Street Address (Line 1)',   hotel.street],
    ['City',                      hotel.city],
    ['State',                     hotel.state],
    ['ZIP Code',                  hotel.zip],
    ['Phone Number',              hotel.phone || '（在酒店官网查询）'],
  ]

  return (
    <div className="bg-sky-50 border border-sky-200 rounded-2xl overflow-hidden">
      <div className="flex items-center gap-2 px-5 py-3 border-b border-sky-200">
        <Hotel size={14} className="text-sky-600" />
        <p className="text-xs font-bold text-sky-700 uppercase tracking-wide">美国联系人（酒店信息）</p>
        <span className="text-[10px] text-sky-400 ml-auto">来自第 7 步选择的酒店</span>
      </div>
      <div className="bg-white divide-y divide-slate-100">
        {rows.map(([label, value]) => (
          <div key={label} className="flex items-center gap-2 px-4 py-2">
            <span className="text-[10px] text-slate-400 w-36 shrink-0">{label}</span>
            <span className="flex-1 text-xs font-mono font-semibold text-slate-800 text-right">{value || '—'}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
