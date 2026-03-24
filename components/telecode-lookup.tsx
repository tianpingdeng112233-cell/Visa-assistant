'use client'

import { useState, useCallback } from 'react'
import { Search, ExternalLink, Loader2 } from 'lucide-react'

interface Result {
  char: string
  code: string | null
}

export function TelecodeLookup() {
  const [input, setInput] = useState('')
  const [results, setResults] = useState<Result[]>([])
  const [loading, setLoading] = useState(false)
  const [queried, setQueried] = useState('')

  const lookup = useCallback(async (value: string) => {
    const chars = Array.from(value).filter((c) => /[\u4e00-\u9fff]/.test(c))
    if (chars.length === 0) { setResults([]); setQueried(''); return }

    setLoading(true)
    try {
      const res = await fetch(`/api/telecode?chars=${encodeURIComponent(chars.join(''))}`)
      const data = await res.json()
      setResults(data.results)
      setQueried(chars.join(''))
    } catch {
      setResults(chars.map((char) => ({ char, code: null })))
    } finally {
      setLoading(false)
    }
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') lookup(input)
  }

  const hasMissing = results.some((r) => r.code === null)

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-3">
        <Search size={14} className="text-amber-600" />
        <p className="text-xs font-bold text-amber-700 uppercase tracking-wide">电码查询</p>
        <span className="text-[10px] text-amber-500 ml-auto">数据来源：ChaseDream</span>
      </div>

      <div className="flex gap-2 mb-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="输入中文姓名，如：张小明"
          className="flex-1 text-sm border border-amber-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-300 bg-white"
        />
        <button
          onClick={() => lookup(input)}
          disabled={loading || !input.trim()}
          className="flex items-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white text-sm font-medium rounded-xl transition-colors shrink-0"
        >
          {loading ? <Loader2 size={14} className="animate-spin" /> : <Search size={14} />}
          查询
        </button>
      </div>

      {results.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {results.map((r, i) => (
            <div
              key={i}
              className={`flex flex-col items-center rounded-xl px-3 py-2 min-w-[56px] border ${
                r.code ? 'bg-white border-amber-200' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <span className="text-xl font-bold text-slate-800 leading-tight">{r.char}</span>
              <span className={`text-sm font-mono font-bold mt-0.5 ${r.code ? 'text-amber-700' : 'text-slate-400'}`}>
                {r.code ?? '—'}
              </span>
            </div>
          ))}
        </div>
      )}

      {hasMissing && queried && (
        <a
          href={`https://apps.chasedream.com/chinese-commercial-code/?q=${encodeURIComponent(queried)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs text-blue-500 hover:text-blue-700 font-medium"
        >
          <ExternalLink size={12} />
          有未找到的字符 → 点击在 ChaseDream 查询
        </a>
      )}

      {results.length === 0 && !loading && (
        <p className="text-xs text-amber-600/70">
          输入姓名后按回车或点击查询。DS-160 的 Telecode 栏需填写每个汉字对应的4位数字。
        </p>
      )}
    </div>
  )
}
