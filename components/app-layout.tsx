import { TopNav } from './top-nav'
import { Sidebar } from './sidebar'
import { PathTracker } from './path-tracker'

interface AppLayoutProps {
  children: React.ReactNode
  /** Optional sticky bar rendered below the scrollable content area */
  bottomBar?: React.ReactNode
}

/**
 * Main shell: TopNav + Sidebar + scrollable content + optional bottom bar.
 * The bottom bar is rendered outside the scroll container so it never overlaps
 * the page content.
 */
export function AppLayout({ children, bottomBar }: AppLayoutProps) {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <PathTracker />
      <TopNav />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 flex flex-col overflow-hidden bg-[#f0f4f9]">
          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto">
            <div className="px-8 py-8">{children}</div>
          </div>

          {/* Bottom action bar — always visible, never overlaps content */}
          {bottomBar && (
            <div className="shrink-0 border-t border-slate-200 bg-white">
              {bottomBar}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
