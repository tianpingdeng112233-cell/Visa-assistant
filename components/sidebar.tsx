'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  ClipboardList,
  Calendar,
  Users,
  FileText,
} from 'lucide-react'
import { GlobalProgress } from './global-progress'

const navItems = [
  {
    label: '填写 DS-160',
    href: '/ds160/1',
    icon: ClipboardList,
    matchPaths: ['/ds160', '/'],
  },
  {
    label: '预约 / 抢 Slot',
    href: '/appointment',
    icon: Calendar,
    matchPaths: ['/appointment', '/monitoring'],
  },
  {
    label: '线下面签',
    href: '/interview/checklist',
    icon: Users,
    matchPaths: ['/interview'],
  },
]

export function Sidebar() {
  const pathname = usePathname()

  const isActive = (paths: string[]) =>
    paths.some((p) => pathname === p || pathname.startsWith(p + '/'))

  return (
    <aside className="w-56 shrink-0 bg-[#e8edf5] flex flex-col border-r border-slate-200/70">
      {/* Header block */}
      <div className="p-4 pb-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-sm">
            <FileText size={17} className="text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-800 leading-tight">签证进度</p>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">
              Editorial Guardian
            </p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-4 h-px bg-slate-200/60 mb-2" />

      {/* Global progress */}
      <GlobalProgress />

      {/* Nav items */}
      <nav className="flex-1 px-3 space-y-0.5">
        {navItems.map((item) => {
          const active = isActive(item.matchPaths)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                active
                  ? 'bg-white text-blue-600 shadow-card'
                  : 'text-slate-500 hover:bg-white/50 hover:text-slate-700'
              }`}
            >
              <item.icon
                size={16}
                className={active ? 'text-blue-500' : 'text-slate-400'}
              />
              {item.label}
            </Link>
          )
        })}
      </nav>

    </aside>
  )
}
