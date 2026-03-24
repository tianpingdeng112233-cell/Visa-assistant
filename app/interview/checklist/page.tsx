'use client'

import { useState, useEffect } from 'react'
import {
  CheckCircle2,
  Circle,
  MapPin,
  ShieldCheck,
  Camera,
  Fingerprint,
  MessageSquare,
  ChevronRight,
  AlertTriangle,
  Lightbulb,
  Navigation,
  Clock,
  Info,
} from 'lucide-react'
import { AppLayout } from '@/components/app-layout'
import { getCheckedItems, setCheckedItem } from '@/lib/storage'
import { cn } from '@/lib/utils'

const STORAGE_KEY = 'interview_checklist_v2'

// ── 必带材料 ───────────────────────────────────────────────────
const MATERIALS = [
  {
    id: 'passport',
    label: '护照原件',
    desc: '有效期需在 6 个月以上。如有旧护照建议一并带上。',
    tag: '必带',
  },
  {
    id: 'confirmation',
    label: 'Confirmation Letter',
    desc: '预约系统生成的确认信，有照片。工作人员会在上面写上你的时间段。',
    tag: '必带',
  },
  {
    id: 'instruction',
    label: 'Instruction 打印件',
    desc: '有两个条形码的那张，工作人员会收走这一页。',
    tag: '必带',
  },
  {
    id: 'ds160',
    label: 'DS-160 确认页',
    desc: '只需打印最后带条形码的确认页，建议激光打印确保条码清晰。',
    tag: '必带',
  },
  {
    id: 'photo',
    label: '签证照片（白底，2×2英寸）',
    desc: '必须是白色背景，不能经过修图，也不能与 DS-160 上传的那张一模一样。现场也可花约 £10 重拍。',
    tag: '必带',
  },
]

const SUPPORTING = [
  { id: 'enrollment', label: '在读证明 / 录取通知书', desc: '证明在英的合法学生身份' },
  { id: 'bank', label: '最近 3 个月银行流水', desc: '余额能覆盖旅行开支即可，无需冻结' },
  { id: 'brp', label: '英国签证 / BRP 复印件', desc: '确认在英合法长期居留身份' },
  { id: 'cv', label: '个人简历（CV）', desc: 'STEM 专业同学建议备一份' },
]

// ── 流程步骤 ───────────────────────────────────────────────────
const FLOW_STEPS = [
  {
    icon: Navigation,
    color: 'bg-slate-700',
    title: '提前到达 & 排队',
    time: '预约时间前 30 分钟',
    desc: '导航可先设到 SW11 7US，但注意到达的是工作人员入口，不是排队入口——看到哪里有人排队就往哪走。工作人员会在你的 DS-160 确认页（带头像那张）写上时间。',
    warn: null,
  },
  {
    icon: ShieldCheck,
    color: 'bg-slate-600',
    title: '安检入场',
    time: '',
    desc: '安检需脱外套和手表。可以背书包，不带电脑就不需要寄存。进入大楼后往右走，领取 Stage 1 牌子，坐电梯上一楼排队。',
    warn: null,
  },
  {
    icon: ShieldCheck,
    color: 'bg-blue-600',
    title: 'Stage 1 — 资料与照片审核',
    time: '',
    desc: '电梯上来后左转即是 Stage 1。工作人员检查护照，以及你带的签证照片是否合规（白底、2×2英寸，不能与 DS-160 上传的一模一样）。',
    warn: null,
    branches: [
      {
        label: '✓ 照片 & 资料均无问题',
        color: 'border-green-300 bg-green-50 text-green-800',
        next: '直接前往 Stage 3 面签',
      },
      {
        label: '✗ 照片不合规',
        color: 'border-amber-300 bg-amber-50 text-amber-800',
        next: '① 去走廊尽头右转自助拍照（约 £10）→ ② Window 扫描照片 → ③ Stage 2 按指纹 → Stage 3',
      },
      {
        label: '✗ 资料填错',
        color: 'border-red-200 bg-red-50 text-red-800',
        next: '工作人员给一张小条子，去指定区域修改后继续流程',
      },
    ],
  },
  {
    icon: Fingerprint,
    color: 'bg-violet-600',
    title: 'Stage 2 — 按指纹（如需要）',
    time: '',
    desc: '左手四指 → 右手四指 → 双手拇指。照片不合规时需要经过此步，照片合规可跳过。注意顺序：拍完照后必须先去 Window 扫描照片，再来 Stage 2 按指纹，不要搞反。',
    warn: '拍完照 → 先扫描照片 → 再按指纹，顺序不能反！',
  },
  {
    icon: MessageSquare,
    color: 'bg-blue-700',
    title: 'Stage 3 — 面签',
    time: '',
    desc: 'B1/B2 申请者在排队途中留意工作人员广播，会单独叫出来少排一点队。面签官会用英语提问，保持从容简洁回答即可。通过后收到一张小白条，一般 5 个工作日下签。',
    warn: null,
  },
]

// ── 面签常见问题 ──────────────────────────────────────────────
const INTERVIEW_QA = [
  { q: '你是学生吗？', hint: '是的，我目前在 [大学名] 就读 [专业]。' },
  { q: '你在哪里读书？', hint: '说出学校名称和城市即可。' },
  { q: '你毕业后准备干什么？', hint: '回国工作或继续深造，表达有明确计划回国意愿。' },
  { q: '谁资助你这次旅行？', hint: '父母 / 自费，如实回答。' },
  { q: '你父母是做什么工作的？', hint: '简单说明父母职业即可。' },
  { q: '你去哪些城市旅游？', hint: '列出 2-3 个常见目的地如 New York, LA 等。' },
  { q: '你自己去还是跟朋友去？', hint: '如实回答，说明同行人情况。' },
  { q: '谁支付你的行程费用？', hint: '同"谁资助"，父母或自费，保持一致。' },
]

// ── Component ─────────────────────────────────────────────────
export default function InterviewChecklistPage() {
  const [checked, setChecked] = useState<Record<string, boolean>>({})

  useEffect(() => {
    setChecked(getCheckedItems(STORAGE_KEY))
  }, [])

  const handleChange = (id: string, value: boolean) => {
    setChecked((prev) => ({ ...prev, [id]: value }))
    setCheckedItem(STORAGE_KEY, id, value)
  }

  const matDone = MATERIALS.filter((m) => checked[m.id]).length

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto space-y-8">

        {/* ── Header ──────────────────────────────────── */}
        <div>
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">
            Stage 3 · 线下面签
          </p>
          <h1 className="text-3xl font-black text-slate-900 mb-2">伦敦美签面签全流程</h1>
          <p className="text-sm text-slate-500 leading-relaxed max-w-2xl">
            基于真实经验整理的保姆级攻略，覆盖到达排队、安检、Stage 1-3 全流程及面签常见问题。
          </p>
        </div>

        {/* ── Two column: 材料 + 注意事项 ─────────────── */}
        <div className="grid grid-cols-3 gap-5">

          {/* 必带材料 */}
          <div className="col-span-2 bg-white rounded-2xl border border-slate-100 shadow-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-slate-800">必带材料清单</h2>
              <span className={cn(
                'text-[11px] font-bold px-2.5 py-0.5 rounded-full',
                matDone === MATERIALS.length
                  ? 'bg-green-100 text-green-700'
                  : 'bg-blue-100 text-blue-700'
              )}>
                {matDone} / {MATERIALS.length} 已确认
              </span>
            </div>
            <div className="space-y-2.5">
              {MATERIALS.map((m) => (
                <button
                  key={m.id}
                  onClick={() => handleChange(m.id, !checked[m.id])}
                  className={cn(
                    'w-full flex items-start gap-3 p-3 rounded-xl border text-left transition-all',
                    checked[m.id]
                      ? 'bg-green-50 border-green-200'
                      : 'bg-slate-50 border-slate-200 hover:border-blue-200 hover:bg-blue-50'
                  )}
                >
                  {checked[m.id]
                    ? <CheckCircle2 size={18} className="text-green-500 shrink-0 mt-0.5" />
                    : <Circle size={18} className="text-slate-300 shrink-0 mt-0.5" />}
                  <div className="min-w-0">
                    <p className={cn('text-sm font-semibold', checked[m.id] ? 'text-green-800 line-through' : 'text-slate-800')}>
                      {m.label}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{m.desc}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* 辅助材料 */}
            <div className="mt-5 pt-4 border-t border-slate-100">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">辅助支持材料（酌情携带）</p>
              <div className="grid grid-cols-2 gap-2">
                {SUPPORTING.map((s) => (
                  <div key={s.id} className="flex items-start gap-2 p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                    <input type="checkbox" className="mt-0.5 shrink-0 accent-blue-600" />
                    <div>
                      <p className="text-xs font-semibold text-slate-700">{s.label}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 右侧：注意事项 */}
          <div className="space-y-4">
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle size={14} className="text-amber-600" />
                <p className="text-xs font-bold text-amber-700">重要注意事项</p>
              </div>
              <ul className="space-y-2.5 text-[11px] text-slate-700 leading-relaxed">
                <li className="flex gap-2"><span className="text-amber-500 shrink-0 mt-0.5">•</span><span>照片必须是白色背景，且不能与 DS-160 上传的一模一样，建议重新拍一张</span></li>
                <li className="flex gap-2"><span className="text-amber-500 shrink-0 mt-0.5">•</span><span>安检需脱外套和手表</span></li>
                <li className="flex gap-2"><span className="text-amber-500 shrink-0 mt-0.5">•</span><span>可以背书包，不带电脑不需要寄存</span></li>
                <li className="flex gap-2"><span className="text-amber-500 shrink-0 mt-0.5">•</span><span>导航到 SW11 7US，但那是工作人员入口，看到排队的地方跟着走</span></li>
                <li className="flex gap-2"><span className="text-amber-500 shrink-0 mt-0.5">•</span><span>附近有 Waitrose、Sainsbury（Nine Elms 地铁站）可解决如厕问题</span></li>
              </ul>
            </div>

            <div className="bg-blue-700 rounded-2xl p-5 text-white">
              <div className="flex items-center gap-2 mb-3">
                <Clock size={14} className="text-blue-200" />
                <p className="text-xs font-bold">时间参考</p>
              </div>
              <ul className="space-y-2 text-[11px] text-blue-100 leading-relaxed">
                <li className="flex gap-2"><span className="text-yellow-300 shrink-0">•</span>预约时间前 <strong className="text-white">30 分钟</strong>开始排队</li>
                <li className="flex gap-2"><span className="text-yellow-300 shrink-0">•</span>全程约 <strong className="text-white">1.5 小时</strong>（照片无问题更快）</li>
                <li className="flex gap-2"><span className="text-yellow-300 shrink-0">•</span>面签通过后约 <strong className="text-white">5 个工作日</strong>下签</li>
                <li className="flex gap-2"><span className="text-yellow-300 shrink-0">•</span>B1/B2 申请者留意工作人员广播，可少排一点队</li>
              </ul>
            </div>

            <div className="bg-slate-800 rounded-2xl p-5 text-white">
              <div className="flex items-center gap-2 mb-3">
                <MapPin size={14} className="text-slate-300" />
                <p className="text-xs font-bold">地址</p>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                U.S. Embassy London<br />
                33 Nine Elms Lane<br />
                London SW11 7US<br /><br />
                <span className="text-slate-400">最近地铁站：Nine Elms（Northern Line）</span>
              </p>
            </div>
          </div>
        </div>

        {/* ── 面签流程 ────────────────────────────────── */}
        <div>
          <h2 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
            <ChevronRight size={16} className="text-blue-500" />
            面签全流程（Stage 1 → 3）
          </h2>
          <div className="space-y-3">
            {FLOW_STEPS.map((step, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-100 shadow-card overflow-hidden">
                <div className="flex items-start gap-4 p-5">
                  <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center shrink-0', step.color)}>
                    <step.icon size={16} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-bold text-slate-800">{step.title}</p>
                      {step.time && (
                        <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-medium">
                          {step.time}
                        </span>
                      )}
                    </div>
                    <p className="text-[12px] text-slate-600 leading-relaxed">{step.desc}</p>
                    {step.warn && (
                      <div className="mt-2 flex items-center gap-1.5 text-[11px] font-semibold text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-1.5">
                        <AlertTriangle size={11} />
                        {step.warn}
                      </div>
                    )}
                  </div>
                </div>
                {step.branches && (
                  <div className="border-t border-slate-100 px-5 py-4 bg-slate-50 grid grid-cols-3 gap-3">
                    {step.branches.map((b, j) => (
                      <div key={j} className={cn('rounded-xl border p-3', b.color)}>
                        <p className="text-[11px] font-bold mb-1">{b.label}</p>
                        <p className="text-[11px] leading-relaxed">{b.next}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── 面签常见问题 ──────────────────────────── */}
        <div>
          <h2 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
            <MessageSquare size={16} className="text-blue-500" />
            面签官常见问题 & 回答思路
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {INTERVIEW_QA.map((qa, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-100 shadow-card p-4">
                <p className="text-sm font-bold text-slate-800 mb-1.5">{qa.q}</p>
                <div className="flex items-start gap-1.5">
                  <Lightbulb size={12} className="text-amber-400 shrink-0 mt-0.5" />
                  <p className="text-[11px] text-slate-500 leading-relaxed">{qa.hint}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-start gap-2 p-4 bg-blue-50 border border-blue-100 rounded-2xl text-[11px] text-slate-600 leading-relaxed">
            <Info size={13} className="text-blue-500 shrink-0 mt-0.5" />
            <span>开场可以说 <strong>"Good morning"</strong>，结束说 <strong>"Have a nice day"</strong>。回答保持简洁自信，不要过度解释。</span>
          </div>
        </div>

        {/* ── Bottom banner ───────────────────────────── */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-800 to-blue-900 min-h-[140px] flex items-center px-10">
          <div className="absolute -right-10 -top-10 w-48 h-48 rounded-full bg-white/5" />
          <div className="absolute -right-4 -bottom-8 w-32 h-32 rounded-full bg-white/5" />
          <div className="relative z-10">
            <h2 className="text-2xl font-black text-white mb-1.5">祝您顺利获签 🎉</h2>
            <p className="text-sm text-blue-200 leading-relaxed max-w-md">
              所有的繁琐准备都是为了最终那一刻的从容。Good luck！
            </p>
          </div>
        </div>

      </div>
    </AppLayout>
  )
}
