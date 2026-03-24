'use client'

import { useState, useCallback } from 'react'
import { Hotel, Search, Loader2, Check, ChevronDown, Phone } from 'lucide-react'
import type { HotelResult } from '@/app/api/hotels/route'

export const HOTEL_STORAGE_KEY = 'visa_last_hotel'

const CITIES = [
  { label: 'New York, NY',      city: 'NEW YORK',      state: 'NY', zip: '10001' },
  { label: 'Los Angeles, CA',   city: 'LOS ANGELES',   state: 'CA', zip: '90001' },
  { label: 'Las Vegas, NV',     city: 'LAS VEGAS',     state: 'NV', zip: '89101' },
  { label: 'San Francisco, CA', city: 'SAN FRANCISCO', state: 'CA', zip: '94102' },
  { label: 'Chicago, IL',       city: 'CHICAGO',       state: 'IL', zip: '60601' },
  { label: 'Miami, FL',         city: 'MIAMI',         state: 'FL', zip: '33101' },
  { label: 'Seattle, WA',       city: 'SEATTLE',       state: 'WA', zip: '98101' },
  { label: 'Washington, DC',    city: 'WASHINGTON',    state: 'DC', zip: '20001' },
  { label: 'Boston, MA',        city: 'BOSTON',        state: 'MA', zip: '02101' },
  { label: 'Honolulu, HI',      city: 'HONOLULU',      state: 'HI', zip: '96801' },
  { label: 'Orlando, FL',       city: 'ORLANDO',       state: 'FL', zip: '32801' },
  { label: 'Houston, TX',       city: 'HOUSTON',       state: 'TX', zip: '77001' },
  { label: 'Dallas, TX',        city: 'DALLAS',        state: 'TX', zip: '75201' },
  { label: 'Phoenix, AZ',       city: 'PHOENIX',       state: 'AZ', zip: '85001' },
  { label: 'San Diego, CA',     city: 'SAN DIEGO',     state: 'CA', zip: '92101' },
  { label: 'Atlanta, GA',       city: 'ATLANTA',       state: 'GA', zip: '30301' },
  { label: 'Denver, CO',        city: 'DENVER',        state: 'CO', zip: '80201' },
]

export function TravelPlanHelper() {
  const [cityIdx,       setCityIdx]       = useState(0)
  const [checkin,       setCheckin]       = useState('')
  const [checkout,      setCheckout]      = useState('')
  const [keyword,       setKeyword]       = useState('')
  const [hotels,        setHotels]        = useState<HotelResult[]>([])
  const [loading,       setLoading]       = useState(false)
  const [error,         setError]         = useState<string | null>(null)
  const [searched,      setSearched]      = useState(false)
  const [selectedHotel, setSelectedHotel] = useState<HotelResult | null>(null)

  const city = CITIES[cityIdx]

  const handleSelect = (h: HotelResult) => {
    setSelectedHotel(h)
    try { localStorage.setItem(HOTEL_STORAGE_KEY, JSON.stringify(h)) } catch { /* ignore */ }
  }

  const search = useCallback(async () => {
    setLoading(true); setError(null); setHotels([]); setSearched(false)
    try {
      const p = new URLSearchParams({ city: city.city })
      if (checkin)        p.set('checkin',  checkin)
      if (checkout)       p.set('checkout', checkout)
      if (keyword.trim()) p.set('q', keyword.trim())
      const res  = await fetch(`/api/hotels?${p}`)
      const data = await res.json()
      setHotels(data.hotels || [])
      if ((data.hotels || []).length === 0) setError('未找到酒店，换个城市或关键词再试')
    } catch {
      setError('网络错误，请重试')
    } finally {
      setLoading(false); setSearched(true)
    }
  }, [city.city, checkin, checkout, keyword])

  return (
    <div className="bg-sky-50 border border-sky-200 rounded-2xl p-5 space-y-3">
      <div className="flex items-center gap-2">
        <Hotel size={14} className="text-sky-600" />
        <p className="text-xs font-bold text-sky-700 uppercase tracking-wide">酒店地址查询</p>
        <span className="text-[10px] text-sky-400 ml-auto">OpenStreetMap</span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-[11px] font-medium text-sky-700 mb-1 block">到达日期</label>
          <input type="date" value={checkin} onChange={e => setCheckin(e.target.value)}
            className="w-full text-xs border border-sky-200 rounded-lg px-2.5 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-sky-300" />
        </div>
        <div>
          <label className="text-[11px] font-medium text-sky-700 mb-1 block">离开日期</label>
          <input type="date" value={checkout} onChange={e => setCheckout(e.target.value)}
            className="w-full text-xs border border-sky-200 rounded-lg px-2.5 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-sky-300" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-[11px] font-medium text-sky-700 mb-1 block">目的地城市</label>
          <div className="relative">
            <select value={cityIdx}
              onChange={e => { setCityIdx(Number(e.target.value)); setHotels([]); setSearched(false) }}
              className="w-full text-xs border border-sky-200 rounded-lg px-2.5 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-sky-300 appearance-none pr-6">
              {CITIES.map((c, i) => <option key={i} value={i}>{c.label}</option>)}
            </select>
            <ChevronDown size={12} className="absolute right-2 top-2.5 text-slate-400 pointer-events-none" />
          </div>
        </div>
        <div>
          <label className="text-[11px] font-medium text-sky-700 mb-1 block">酒店名称（可选）</label>
          <input type="text" value={keyword}
            onChange={e => setKeyword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && search()}
            placeholder="如 Hilton、Marriott"
            className="w-full text-xs border border-sky-200 rounded-lg px-2.5 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-sky-300" />
        </div>
      </div>

      <button onClick={search} disabled={loading}
        className="w-full flex items-center justify-center gap-2 py-2 bg-sky-500 hover:bg-sky-600 disabled:opacity-50 text-white text-xs font-medium rounded-xl transition-colors">
        {loading ? <Loader2 size={13} className="animate-spin" /> : <Search size={13} />}
        {loading ? '查询中...' : '查询酒店'}
      </button>

      {error && searched && <p className="text-xs text-slate-400 text-center py-1">{error}</p>}

      {hotels.length > 0 && (
        <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
          {hotels.map(h => (
            <button key={h.id} onClick={() => handleSelect(h)}
              className={`w-full text-left px-3 py-2.5 rounded-xl border text-xs transition-colors ${
                selectedHotel?.id === h.id ? 'bg-sky-50 border-sky-400' : 'bg-white border-slate-200 hover:border-sky-300 hover:bg-sky-50'
              }`}>
              <div className="flex items-center justify-between gap-2">
                <span className="font-semibold text-slate-800 truncate">{h.name}</span>
                {selectedHotel?.id === h.id && <Check size={12} className="text-sky-600 shrink-0" />}
              </div>
              <span className="text-[10px] text-slate-400 mt-0.5 block">{h.street}</span>
              {h.phone && (
                <span className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                  <Phone size={9} /> {h.phone}
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      {selectedHotel && (
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide px-3 py-2 bg-slate-50">DS-160 填写值</p>
          {[
            ['Contact Person / Org Name', selectedHotel.name],
            ['Street Address (Line 1)',   selectedHotel.street],
            ['City',                      selectedHotel.city  || city.city],
            ['State',                     selectedHotel.state || city.state],
            ['ZIP Code',                  selectedHotel.zip   || city.zip],
            ['Phone Number',              selectedHotel.phone || '（官网查询）'],
          ].map(([label, value]) => (
            <div key={label} className="flex items-center gap-2 px-3 py-1.5 border-t border-slate-100">
              <span className="text-[10px] text-slate-400 w-36 shrink-0">{label}</span>
              <span className="flex-1 text-xs font-mono font-semibold text-slate-800 text-right">{value || '—'}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
