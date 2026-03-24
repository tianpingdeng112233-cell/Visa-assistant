import { Shield, CheckCircle2, Circle } from 'lucide-react'
import Link from 'next/link'
import { AppLayout } from '@/components/app-layout'
import { StageCard } from '@/components/stage-card'
import { ContinueButton } from '@/components/continue-button'
import { mockUser, mockStages, mockMaterials } from '@/lib/mock-data'

export default function HomePage() {
  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto">
        {/* ── Welcome header ─────────────────────────── */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">
              Welcome Back, Alex
            </p>
            <h1 className="text-4xl font-black text-slate-900 leading-tight">
              准备好开始你的
              <br />
              <span className="text-blue-600">美签申请</span>之旅了吗？
            </h1>
          </div>
          <ContinueButton />
        </div>

        {/* ── Progress card ──────────────────────────── */}
        <div className="bg-gradient-to-br from-[#eef4ff] to-[#f5f7fb] rounded-3xl p-8 mb-6 flex gap-8 border border-blue-100/60">
          <div className="flex-1">
            <div className="text-6xl font-black text-blue-600 mb-1 leading-none">
              {mockUser.progressPercent}%
            </div>
            <p className="text-sm font-bold text-slate-600 mb-3">
              {mockUser.progressLabel}
            </p>

            {/* Progress bar */}
            <div className="h-2 bg-slate-200 rounded-full mb-4 overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full transition-all"
                style={{ width: `${mockUser.progressPercent}%` }}
              />
            </div>

            <p className="text-sm text-slate-500 leading-relaxed max-w-md">
              {mockUser.progressNote}
            </p>
          </div>

        </div>

        {/* ── Stage cards ────────────────────────────── */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {mockStages.map((stage) => (
            <StageCard
              key={stage.id}
              number={stage.number}
              title={stage.title}
              description={stage.description}
              status={stage.status}
              buttonLabel={stage.buttonLabel}
              buttonIcon={stage.buttonIcon as 'pen' | 'lock' | 'arrow'}
              href={stage.href}
            />
          ))}
        </div>

        {/* ── Materials checklist ────────────────────── */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wide">
              材料准备清单
            </h2>
            <Link
              href="/interview/checklist"
              className="text-xs text-blue-600 hover:text-blue-700 font-medium"
            >
              查看全部材料说明 →
            </Link>
          </div>

          <div className="grid grid-cols-4 gap-3">
            {mockMaterials.map((m) => (
              <div
                key={m.id}
                className="bg-white rounded-2xl p-4 border border-slate-100 shadow-card flex items-center gap-3"
              >
                {m.done ? (
                  <CheckCircle2 size={20} className="text-green-500 shrink-0" />
                ) : (
                  <Circle size={20} className="text-orange-400 shrink-0" />
                )}
                <div className="min-w-0">
                  <p className="text-[10px] text-slate-400 uppercase tracking-wide font-semibold truncate">
                    {m.sublabel}
                  </p>
                  <p className="text-sm font-semibold text-slate-700 truncate">
                    {m.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
