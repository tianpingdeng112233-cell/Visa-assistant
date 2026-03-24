'use client'

import Link from 'next/link'
import { ArrowLeft, Globe, ArrowRight } from 'lucide-react'

interface BottomActionBarProps {
  prevHref?: string
  nextHref?: string
  officialUrl?: string
  prevLabel?: string
  nextLabel?: string
}

export function BottomActionBar({
  prevHref,
  nextHref,
  officialUrl = '#',
  prevLabel = '上一步',
  nextLabel = '下一步',
}: BottomActionBarProps) {
  return (
    <div className="flex items-center justify-between px-8 py-4">
      {/* Back */}
      <div>
        {prevHref ? (
          <Link
            href={prevHref}
            className="flex flex-col items-center gap-1 text-slate-500 hover:text-slate-700 transition-colors group"
          >
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 group-hover:bg-slate-200 transition-colors">
              <ArrowLeft size={18} />
            </div>
            <span className="text-[11px] font-medium">{prevLabel}</span>
          </Link>
        ) : (
          <div className="w-10" />
        )}
      </div>

      {/* Center: official site */}
      <div className="flex items-center">
        <a
          href={officialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 text-slate-500 hover:text-slate-700 transition-colors group"
        >
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 group-hover:bg-slate-200 transition-colors">
            <Globe size={18} />
          </div>
          <span className="text-[11px] font-medium">官方网站</span>
        </a>
      </div>

      {/* Next */}
      <div>
        {nextHref ? (
          <Link
            href={nextHref}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl text-sm font-semibold transition-colors shadow-md shadow-blue-200"
          >
            {nextLabel}
            <ArrowRight size={16} />
          </Link>
        ) : (
          <div className="w-24" />
        )}
      </div>
    </div>
  )
}
