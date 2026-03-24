import Link from 'next/link'
import { ArrowRight, FileText, Calendar, Users, CheckCircle2, Circle, Send } from 'lucide-react'
import { AppLayout } from '@/components/app-layout'
import { ContinueButton } from '@/components/continue-button'
import { mockMaterials } from '@/lib/mock-data'

const STAGES = [
  {
    id: 'ds160',
    num: '01',
    title: '填写 DS-160',
    desc: '美签申请的核心表格，需要准确填写个人及旅行背景信息。填错会导致拒签。',
    icon: FileText,
    color: 'bg-blue-600',
    light: 'bg-blue-50 border-blue-100',
    btn: 'bg-blue-600 hover:bg-blue-700 text-white',
    btnLabel: '开始填写',
    href: '/ds160/1',
  },
  {
    id: 'appointment',
    num: '02',
    title: '预约 / 抢 Slot',
    desc: '在 AIS 官网完成缴费并锁定面签席位。Slot 竞争激烈，建议开启自动监控。',
    icon: Calendar,
    color: 'bg-violet-600',
    light: 'bg-violet-50 border-violet-100',
    btn: 'bg-violet-600 hover:bg-violet-700 text-white',
    btnLabel: '进入预约',
    href: '/appointment',
  },
  {
    id: 'interview',
    num: '03',
    title: '线下面签',
    desc: '携带完整材料前往伦敦大使馆，完成 Stage 1–3 流程，当天约 1.5 小时。',
    icon: Users,
    color: 'bg-emerald-600',
    light: 'bg-emerald-50 border-emerald-100',
    btn: 'bg-emerald-600 hover:bg-emerald-700 text-white',
    btnLabel: '查看攻略',
    href: '/interview/checklist',
  },
]

export default function HomePage() {
  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto space-y-10">

        {/* ── Hero ──────────────────────────────────── */}
        <div className="flex items-center justify-between pt-2">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
              英区留学生美签办理助手
            </p>
            <h1 className="text-4xl font-black text-slate-900 leading-tight mb-3">
              一步一步搞定<br />
              <span className="text-blue-600">伦敦美签</span>
            </h1>
            <p className="text-sm text-slate-500 leading-relaxed max-w-md">
              DS-160 填表 → AIS 预约 → 面签全程图文指引，附 Slot 自动监控推送。
            </p>
          </div>
          <ContinueButton />
        </div>

        {/* ── Stage cards ────────────────────────────── */}
        <div className="grid grid-cols-3 gap-5">
          {STAGES.map((s) => (
            <div key={s.id} className={`rounded-2xl border p-6 flex flex-col ${s.light}`}>
              <div className="flex items-center justify-between mb-5">
                <div className={`w-10 h-10 ${s.color} rounded-xl flex items-center justify-center`}>
                  <s.icon size={18} className="text-white" />
                </div>
                <span className="text-3xl font-black text-slate-100 leading-none">{s.num}</span>
              </div>
              <h3 className="text-base font-bold text-slate-800 mb-2">{s.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed flex-1 mb-5">{s.desc}</p>
              <Link
                href={s.href}
                className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-colors ${s.btn}`}
              >
                {s.btnLabel}
                <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>

        {/* ── Bottom row: 材料 + Telegram ────────────── */}
        <div className="grid grid-cols-3 gap-5">
          {/* 材料清单 */}
          <div className="col-span-2">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-slate-700">材料准备清单</h2>
              <Link href="/interview/checklist" className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                查看全部说明 →
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {mockMaterials.map((m) => (
                <div key={m.id} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-card flex items-center gap-3">
                  {m.done
                    ? <CheckCircle2 size={18} className="text-green-500 shrink-0" />
                    : <Circle size={18} className="text-orange-400 shrink-0" />}
                  <div className="min-w-0">
                    <p className="text-[10px] text-slate-400 uppercase tracking-wide font-semibold truncate">{m.sublabel}</p>
                    <p className="text-sm font-semibold text-slate-700 truncate">{m.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Telegram 频道 */}
          <a
            href="https://t.me/slotmonitorfromdavid"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-gradient-to-br from-[#2AABEE] to-[#229ED9] rounded-2xl p-5 flex flex-col justify-between hover:from-[#229ED9] hover:to-[#1a8bbf] transition-all"
          >
            <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center mb-3">
              <Send size={16} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-white mb-1">Slot 监控频道</p>
              <p className="text-[11px] text-blue-100 leading-relaxed mb-3">
                有可用 Slot 时自动推送 Telegram 通知，第一时间抢占席位。
              </p>
              <div className="flex items-center gap-1.5 text-white text-xs font-semibold group-hover:gap-2 transition-all">
                加入频道 <ArrowRight size={12} />
              </div>
            </div>
          </a>
        </div>

      </div>
    </AppLayout>
  )
}
