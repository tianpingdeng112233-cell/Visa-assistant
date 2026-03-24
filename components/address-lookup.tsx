'use client'

import { useState } from 'react'
import { MapPin, Search, Loader2, Check } from 'lucide-react'
import type { AddressResult } from '@/app/api/address-lookup/route'

interface Props {
  label?: string  // e.g. "学校" or "机构"
}

export function AddressLookup({ label = '地址' }: Props) {
  const [query,    setQuery]    = useState('')
  const [results,  setResults]  = useState<AddressResult[]>([])
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState<string | null>(null)
  const [selected, setSelected] = useState<AddressResult | null>(null)

  const search = async () => {
    if (!query.trim()) return
    setLoading(true); setError(null); setResults([])
    try {
      const res  = await fetch(`/api/address-lookup?q=${encodeURIComponent(query.trim())}`)
      const data = await res.json()
      setResults(data.results || [])
      if ((data.results || []).length === 0) setError('未找到，换个关键词或加上城市名再试')
    } catch {
      setError('网络错误，请重试')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 space-y-3">
      <div className="flex items-center gap-2">
        <MapPin size={14} className="text-emerald-600" />
        <p className="text-xs font-bold text-emerald-700 uppercase tracking-wide">{label}地址查询</p>
        <span className="text-[10px] text-emerald-400 ml-auto">OpenStreetMap</span>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && search()}
          placeholder="输入机构名称，如 University of Manchester"
          className="flex-1 text-xs border border-emerald-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-300"
        />
        <button onClick={search} disabled={loading || !query.trim()}
          className="flex items-center gap-1.5 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white text-xs font-medium rounded-xl transition-colors shrink-0">
          {loading ? <Loader2 size={13} className="animate-spin" /> : <Search size={13} />}
          查询
        </button>
      </div>

      {error && <p className="text-xs text-slate-400 text-center">{error}</p>}

      {results.length > 0 && (
        <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
          {results.map((r, i) => (
            <button key={i} onClick={() => setSelected(r)}
              className={`w-full text-left px-3 py-2.5 rounded-xl border text-xs transition-colors ${
                selected === r ? 'bg-emerald-50 border-emerald-400' : 'bg-white border-slate-200 hover:border-emerald-300 hover:bg-emerald-50'
              }`}>
              <div className="flex items-start justify-between gap-2">
                <span className="text-slate-600 leading-relaxed">{r.displayName}</span>
                {selected === r && <Check size={12} className="text-emerald-600 shrink-0 mt-0.5" />}
              </div>
            </button>
          ))}
        </div>
      )}

      {selected && (
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide px-3 py-2 bg-slate-50">DS-160 填写值</p>
          {[
            ['Street Address (Line 1)', selected.street],
            ['City',                    selected.city],
            ['State / Province',        selected.stateProvince],
            ['Postal Zone / ZIP Code',  selected.postalCode],
            ['Country / Region',        selected.country],
          ].map(([lbl, val]) => (
            <div key={lbl} className="flex items-center gap-2 px-3 py-2 border-t border-slate-100">
              <span className="text-[10px] text-slate-400 w-36 shrink-0">{lbl}</span>
              <span className="flex-1 text-xs font-mono font-semibold text-slate-800 text-right">{val || '—'}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
