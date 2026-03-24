import Link from 'next/link'

export function TopNav() {
  return (
    <header className="h-14 bg-white border-b border-slate-100 flex items-center px-6 shrink-0 z-50 shadow-sm">
      <Link
        href="/"
        className="text-blue-700 font-bold text-[15px] tracking-tight hover:text-blue-800 transition-colors"
      >
        英区留学生美签办理助手
      </Link>
    </header>
  )
}
