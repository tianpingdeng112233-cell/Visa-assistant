import Link from 'next/link'
import { ExternalLink, ArrowRight, Calendar, Clock, Shield } from 'lucide-react'
import { AppLayout } from '@/components/app-layout'
import { BottomActionBar } from '@/components/bottom-action-bar'

const AIS_URL = 'https://ais.usvisa-info.com/en-gb/niv'

export default function AppointmentLandingPage() {
  return (
    <AppLayout
      bottomBar={
        <BottomActionBar
          prevHref="/ds160/27"
          nextHref="/appointment/1"
          officialUrl={AIS_URL}
          nextLabel="进入教程 Step 1 →"
        />
      }
    >
      <div className="max-w-2xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-6">
          <Link href="/" className="hover:text-slate-600">首页</Link>
          <span>/</span>
          <span className="text-slate-600">预约 / 抢 Slot</span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Stage 2</p>
          <h1 className="text-3xl font-black text-slate-900 mb-2">预约 / 抢 Slot</h1>
          <p className="text-sm text-slate-500 leading-relaxed">
            在 AIS 官网完成预约缴费，锁定伦敦使馆面签席位。本教程共 15 步，全程截图指引。
          </p>
        </div>

        {/* Main CTA card */}
        <a
          href={AIS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group block bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-3xl p-8 mb-5 shadow-xl shadow-blue-200 transition-all"
        >
          <div className="flex items-start justify-between mb-6">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
              <ExternalLink size={22} className="text-white" />
            </div>
            <span className="text-xs font-bold text-blue-200 bg-white/10 px-3 py-1 rounded-full">
              ais.usvisa-info.com/en-gb/niv
            </span>
          </div>
          <h2 className="text-xl font-black text-white mb-2">打开 AIS 官方预约系统</h2>
          <p className="text-sm text-blue-100 leading-relaxed mb-4">
            美国驻英国使馆签证预约官网。首次申请点 Apply，已有账号（刷 Slot）点 Continue。
          </p>
          <div className="flex items-center gap-2 text-white text-sm font-semibold group-hover:gap-3 transition-all">
            立即打开 <ArrowRight size={16} />
          </div>
        </a>

        {/* Info cards */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-card">
            <Calendar size={16} className="text-blue-500 mb-2" />
            <p className="text-xs font-bold text-slate-800 mb-0.5">15 步图文教程</p>
            <p className="text-[11px] text-slate-500">从注册到预约确认，全程截图标注</p>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-card">
            <Clock size={16} className="text-violet-500 mb-2" />
            <p className="text-xs font-bold text-slate-800 mb-0.5">Slot 监控</p>
            <p className="text-[11px] text-slate-500">插件自动轮询，有空位第一时间 Telegram 通知</p>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-card">
            <Shield size={16} className="text-green-500 mb-2" />
            <p className="text-xs font-bold text-slate-800 mb-0.5">注意事项</p>
            <p className="text-[11px] text-slate-500">费用不可退，付款期间不要刷新页面</p>
          </div>
        </div>

        {/* Secondary: go to step 1 */}
        <Link
          href="/appointment/1"
          className="flex items-center justify-between w-full bg-white hover:bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 transition-colors group"
        >
          <div>
            <p className="text-sm font-bold text-slate-800">查看预约教程</p>
            <p className="text-xs text-slate-400 mt-0.5">Step 1 — 进入 AIS 官网</p>
          </div>
          <ArrowRight size={18} className="text-slate-400 group-hover:text-blue-500 transition-colors" />
        </Link>
      </div>
    </AppLayout>
  )
}
