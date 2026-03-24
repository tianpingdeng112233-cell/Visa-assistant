import { cn } from '@/lib/utils'

interface InfoPanelCardProps {
  number: number
  title: string
  body: string
  highlight?: boolean
  className?: string
}

export function InfoPanelCard({
  number,
  title,
  body,
  highlight = false,
  className,
}: InfoPanelCardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-2xl p-5 border shadow-card flex gap-4',
        highlight ? 'border-blue-200 bg-blue-50/50' : 'border-slate-100',
        className
      )}
    >
      {/* Number badge */}
      <div className="shrink-0 mt-0.5">
        <div
          className={cn(
            'w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold',
            highlight
              ? 'bg-blue-600 text-white'
              : 'bg-slate-100 text-slate-600'
          )}
        >
          {number}
        </div>
      </div>

      {/* Content */}
      <div>
        <p className="text-sm font-semibold text-slate-800 mb-1 leading-snug">
          {title}
        </p>
        <p className="text-sm text-slate-500 leading-relaxed">{body}</p>
      </div>
    </div>
  )
}
