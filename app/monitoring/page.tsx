'use client'

import Link from 'next/link'
import {
  RefreshCw,
  Calendar,
  Bell,
  Zap,
  ArrowRight,
  Send,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react'
import { AppLayout } from '@/components/app-layout'
import { BottomActionBar } from '@/components/bottom-action-bar'

const TG_CHANNEL = 'https://t.me/slotmonitorfromdavid'

const HOW_IT_WORKS = [
  {
    icon: RefreshCw,
    color: 'bg-blue-600',
    bg: 'bg-blue-50 border-blue-100',
    title: '定时轮询',
    desc: '每隔 10–30 分钟自动访问 AIS 预约 API，获取 London Embassy（facility_id=17）的可用日期列表。',
  },
  {
    icon: Calendar,
    color: 'bg-green-600',
    bg: 'bg-green-50 border-green-100',
    title: '日期匹配',
    desc: '按照设定的规则（不晚于某日期 / 日期范围 / 白名单）比对返回结果。命中即触发通知，已通知过的日期自动去重。',
  },
  {
    icon: Bell,
    color: 'bg-amber-500',
    bg: 'bg-amber-50 border-amber-100',
    title: 'Telegram 推送',
    desc: '通过 Telegram 频道第一时间推送通知，消息包含可用日期、时间段和 AIS 快捷跳转链接。',
  },
]

const STEPS = [
  '加入下方 Telegram 频道，开启通知',
  '收到推送后，立即打开 AIS 官网登录账号',
  '点击 Reschedule Appointment，选择推送里的日期和时间',
  '确认改期，截图保存新的预约确认页',
]

export default function MonitoringPage() {
  return (
    <AppLayout
      bottomBar={
        <BottomActionBar
          prevHref="/appointment/15"
          nextHref="/interview/checklist"
          officialUrl="https://ais.usvisa-info.com/en-gb/niv"
          nextLabel="前往面签准备 →"
        />
      }
    >
      <div className="max-w-3xl mx-auto space-y-8">

        {/* ── Header ──────────────────────────────────── */}
        <div>
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">
            Stage 2 · Slot 监控
          </p>
          <h1 className="text-3xl font-black text-slate-900 mb-2">Slot 监控 & 抢位攻略</h1>
          <p className="text-sm text-slate-500 leading-relaxed max-w-xl">
            伦敦美签 Slot 竞争激烈，靠手动刷新几乎不可能抢到。我们通过自动化监控 + Telegram 频道，第一时间推送可用 Slot。
          </p>
        </div>

        {/* ── Join CTA ────────────────────────────────── */}
        <a
          href={TG_CHANNEL}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-between bg-gradient-to-br from-[#2AABEE] to-[#229ED9] hover:from-[#229ED9] hover:to-[#1a8bbf] rounded-3xl p-7 shadow-xl shadow-blue-200 transition-all"
        >
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center shrink-0">
              <Send size={26} className="text-white" />
            </div>
            <div>
              <p className="text-lg font-black text-white mb-1">加入 Telegram 监控频道</p>
              <p className="text-sm text-blue-100 leading-relaxed">
                有新 Slot 释放时频道会第一时间推送通知，无需自己盯着屏幕刷新。
              </p>
              <p className="text-xs text-blue-200 mt-1 font-mono">t.me/slotmonitorfromdavid</p>
            </div>
          </div>
          <ArrowRight size={22} className="text-white shrink-0 group-hover:translate-x-1 transition-transform" />
        </a>

        {/* ── How it works ────────────────────────────── */}
        <div>
          <h2 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Zap size={16} className="text-amber-500" />
            监控原理
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {HOW_IT_WORKS.map((item) => (
              <div key={item.title} className={`rounded-2xl p-5 border ${item.bg}`}>
                <div className={`w-9 h-9 ${item.color} rounded-xl flex items-center justify-center mb-3`}>
                  <item.icon size={16} className="text-white" />
                </div>
                <p className="text-sm font-bold text-slate-800 mb-1.5">{item.title}</p>
                <p className="text-[11px] text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── 收到通知后怎么做 ─────────────────────────── */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-6">
          <h2 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
            <ChevronRight size={16} className="text-blue-500" />
            收到推送后，如何抢 Slot？
          </h2>
          <div className="space-y-3">
            {STEPS.map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <p className="text-sm text-slate-700 leading-relaxed pt-0.5">{step}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 flex items-start gap-2 p-3 bg-amber-50 border border-amber-100 rounded-xl text-[11px] text-slate-600 leading-relaxed">
            <CheckCircle2 size={13} className="text-amber-500 shrink-0 mt-0.5" />
            <span>改期不等于取消，Reschedule 不会退费。确认新时间无误后再提交，截图保存确认页。</span>
          </div>
        </div>

        {/* ── Secondary CTA ───────────────────────────── */}
        <div className="grid grid-cols-2 gap-4">
          <a
            href={TG_CHANNEL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-white border border-slate-200 hover:border-blue-300 rounded-2xl p-4 transition-colors group"
          >
            <div className="w-9 h-9 bg-[#2AABEE]/10 rounded-xl flex items-center justify-center shrink-0">
              <Send size={15} className="text-[#2AABEE]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-slate-800">加入频道</p>
              <p className="text-[11px] text-slate-400 truncate">t.me/slotmonitorfromdavid</p>
            </div>
            <ArrowRight size={15} className="text-slate-300 group-hover:text-blue-400 transition-colors shrink-0" />
          </a>

          <Link
            href="/appointment/1"
            className="flex items-center gap-3 bg-white border border-slate-200 hover:border-blue-300 rounded-2xl p-4 transition-colors group"
          >
            <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
              <Calendar size={15} className="text-blue-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-slate-800">预约教程</p>
              <p className="text-[11px] text-slate-400">回顾 15 步图文指引</p>
            </div>
            <ArrowRight size={15} className="text-slate-300 group-hover:text-blue-400 transition-colors shrink-0" />
          </Link>
        </div>

      </div>
    </AppLayout>
  )
}
