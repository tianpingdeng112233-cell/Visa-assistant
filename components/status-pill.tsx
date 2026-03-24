import { cn } from '@/lib/utils'

type StatusType = '进行中' | '可开始' | '已完成' | 'live' | 'offline' | 'connected'

interface StatusPillProps {
  status: StatusType
  className?: string
}

const statusStyles: Record<StatusType, string> = {
  '进行中': 'bg-blue-100 text-blue-600',
  '可开始': 'bg-slate-100 text-slate-500',
  '已完成': 'bg-green-100 text-green-600',
  live: 'bg-blue-600 text-white',
  offline: 'bg-slate-100 text-slate-400',
  connected: 'bg-green-100 text-green-600',
}

const dotStyles: Record<StatusType, string> = {
  '进行中': 'bg-blue-500',
  '可开始': 'bg-slate-400',
  '已完成': 'bg-green-500',
  live: 'bg-white',
  offline: 'bg-slate-400',
  connected: 'bg-green-500',
}

export function StatusPill({ status, className }: StatusPillProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold',
        statusStyles[status],
        className
      )}
    >
      <span className={cn('w-1.5 h-1.5 rounded-full', dotStyles[status])} />
      {status}
    </span>
  )
}
