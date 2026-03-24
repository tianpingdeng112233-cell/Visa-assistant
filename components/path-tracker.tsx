'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/** Silently saves the current pathname to localStorage on every page visit. */
export function PathTracker() {
  const pathname = usePathname()
  useEffect(() => {
    // Don't overwrite with the homepage itself
    if (pathname !== '/') {
      localStorage.setItem('visa_last_path', pathname)
    }
  }, [pathname])
  return null
}
