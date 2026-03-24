import { AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface WarningCardProps {
  title: string
  body: string
  className?: string
  actionLabel?: string
  onAction?: () => void
  examples?: { label: string; value: string; correct: boolean }[]
}

export function WarningCard({
  title,
  body,
  className,
  actionLabel,
  onAction,
  examples,
}: WarningCardProps) {
  return (
    <div
      className={cn(
        'bg-orange-50 border border-orange-100 rounded-2xl p-5 flex gap-4',
        className
      )}
    >
      {/* Icon */}
      <div className="shrink-0 mt-0.5">
        <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
          <AlertTriangle size={16} className="text-orange-500" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1">
        <p className="text-sm font-bold text-slate-800 mb-1.5">{title}</p>
        <p className="text-sm text-slate-600 leading-relaxed">{body}</p>

        {/* Examples */}
        {examples && examples.length > 0 && (
          <div className="flex items-center gap-3 mt-3 flex-wrap">
            {examples.map((ex) => (
              <span
                key={ex.label}
                className={cn(
                  'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold',
                  ex.correct
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border border-slate-200 text-slate-500 line-through'
                )}
              >
                <span className="opacity-70 font-normal">{ex.label}：</span>
                {ex.value}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Action */}
      {actionLabel && (
        <div className="shrink-0">
          <button
            onClick={onAction}
            className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
          >
            {actionLabel}
          </button>
        </div>
      )}
    </div>
  )
}
