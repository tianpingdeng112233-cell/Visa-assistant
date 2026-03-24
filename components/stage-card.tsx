import Link from 'next/link'
import { ArrowRight, Lock, PenLine } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StageCardProps {
  number: string
  title: string
  description: string
  status: '进行中' | '可开始' | '已完成'
  buttonLabel: string
  buttonIcon: 'pen' | 'lock' | 'arrow'
  href: string
}

const statusStyles = {
  '进行中': { pill: 'bg-blue-100 text-blue-600', dot: 'bg-blue-500' },
  '可开始': { pill: 'bg-slate-100 text-slate-500', dot: 'bg-slate-400' },
  '已完成': { pill: 'bg-green-100 text-green-600', dot: 'bg-green-500' },
}

const buttonStyles = {
  '进行中': 'bg-blue-50 text-blue-600 hover:bg-blue-100',
  '可开始': 'bg-slate-50 text-slate-400 hover:bg-slate-100',
  '已完成': 'bg-green-50 text-green-600 hover:bg-green-100',
}

export function StageCard({
  number,
  title,
  description,
  status,
  buttonLabel,
  buttonIcon,
  href,
}: StageCardProps) {
  const ss = statusStyles[status]
  const bs = buttonStyles[status]

  const ButtonIcon =
    buttonIcon === 'pen' ? PenLine : buttonIcon === 'lock' ? Lock : ArrowRight

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-card flex flex-col">
      {/* Top: number + status */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-4xl font-black text-slate-100 leading-none">{number}</span>
        <span className={cn('inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold', ss.pill)}>
          <span className={cn('w-1.5 h-1.5 rounded-full', ss.dot)} />
          {status}
        </span>
      </div>

      {/* Content */}
      <h3 className="text-base font-bold text-slate-800 mb-2">{title}</h3>
      <p className="text-sm text-slate-500 leading-relaxed flex-1 mb-5">{description}</p>

      {/* Button */}
      <Link
        href={href}
        className={cn(
          'flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold transition-colors',
          bs
        )}
      >
        {buttonLabel}
        <ButtonIcon size={14} />
      </Link>
    </div>
  )
}
