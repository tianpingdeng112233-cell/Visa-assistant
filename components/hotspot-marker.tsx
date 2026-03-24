import { cn } from '@/lib/utils'

interface HotspotMarkerProps {
  label: string | number
  className?: string
  style?: React.CSSProperties
}

export function HotspotMarker({ label, className, style }: HotspotMarkerProps) {
  return (
    <div
      className={cn(
        'absolute w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center shadow-lg border-2 border-white cursor-default select-none',
        className
      )}
      style={style}
    >
      {label}
    </div>
  )
}
