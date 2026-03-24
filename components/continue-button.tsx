'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const DEFAULT_HREF = '/ds160/1'

export function ContinueButton() {
  const [href, setHref] = useState(DEFAULT_HREF)

  useEffect(() => {
    const saved = localStorage.getItem('visa_last_path')
    if (saved) setHref(saved)
  }, [])

  return (
    <Link
      href={href}
      className="mt-2 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl text-sm font-semibold transition-colors shadow-lg shadow-blue-200"
    >
      继续上次进度
      <ArrowRight size={16} />
    </Link>
  )
}
