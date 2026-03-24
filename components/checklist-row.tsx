'use client'

import { FileText, Printer, Calendar, Receipt } from 'lucide-react'
import { cn } from '@/lib/utils'

const iconMap: Record<string, React.ElementType> = {
  file: FileText,
  printer: Printer,
  calendar: Calendar,
  receipt: Receipt,
}

interface ChecklistRowProps {
  id: string
  label: string
  desc?: string
  icon?: string
  checked: boolean
  onChange: (id: string, checked: boolean) => void
}

export function ChecklistRow({
  id,
  label,
  desc,
  icon = 'file',
  checked,
  onChange,
}: ChecklistRowProps) {
  const Icon = iconMap[icon] ?? FileText

  return (
    <div
      className={cn(
        'bg-white rounded-2xl px-5 py-4 flex items-center gap-4 border transition-all cursor-pointer group',
        checked
          ? 'border-blue-200 bg-blue-50/30'
          : 'border-slate-100 hover:border-slate-200 hover:shadow-card'
      )}
      onClick={() => onChange(id, !checked)}
    >
      {/* Checkbox */}
      <div className="shrink-0">
        <div
          className={cn(
            'w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all',
            checked
              ? 'bg-blue-600 border-blue-600'
              : 'border-slate-300 group-hover:border-blue-400'
          )}
        >
          {checked && (
            <svg
              width="11"
              height="9"
              viewBox="0 0 11 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 4L4 7L10 1"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p
          className={cn(
            'text-sm font-semibold leading-snug',
            checked ? 'text-slate-400 line-through' : 'text-slate-800'
          )}
        >
          {label}
        </p>
        {desc && (
          <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{desc}</p>
        )}
      </div>

      {/* Icon */}
      <div className="shrink-0">
        <Icon size={18} className={checked ? 'text-blue-300' : 'text-slate-300'} />
      </div>
    </div>
  )
}
