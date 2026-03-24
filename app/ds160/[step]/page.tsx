'use client'

import { useState } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, Lightbulb, ExternalLink, Pencil, X, Plus, Trash2, Download, RotateCcw, Save, Check, AlertCircle, GripVertical, Square } from 'lucide-react'
import { AppLayout } from '@/components/app-layout'
import { BottomActionBar } from '@/components/bottom-action-bar'
import { WarningCard } from '@/components/warning-card'
import { AnnotatedScreenshot } from '@/components/annotated-screenshot'
import { TelecodeLookup } from '@/components/telecode-lookup'
import { TravelPlanHelper } from '@/components/travel-plan-helper'
import { USContactHotel } from '@/components/us-contact-hotel'
import { AddressLookup } from '@/components/address-lookup'
import { ExportModal } from '@/components/export-modal'
import { guideSteps } from '@/lib/ds160-guide'
import { useEditableStep } from '@/lib/use-editable-step'

interface Props {
  params: { step: string }
}

export default function DS160StepPage({ params }: Props) {
  const stepId = parseInt(params.step, 10)
  const originalStep = guideSteps.find((s) => s.id === stepId)

  if (!originalStep || isNaN(stepId)) {
    notFound()
  }

  const [isEditing, setIsEditing] = useState(false)
  const [showExport, setShowExport] = useState(false)
  const [dragFrom, setDragFrom] = useState<number | null>(null)
  const [dragOver, setDragOver] = useState<number | null>(null)
  const editor = useEditableStep(originalStep)
  const step = isEditing ? editor.step : originalStep

  const prevStep = guideSteps.find((s) => s.id === stepId - 1)
  const nextStep = guideSteps.find((s) => s.id === stepId + 1)

  const prevHref = prevStep ? `/ds160/${prevStep.id}` : '/'
  const nextHref = nextStep ? `/ds160/${nextStep.id}` : '/appointment/1'

  const isLanding = step.screenshots.length === 0

  return (
    <AppLayout
      bottomBar={
        <BottomActionBar
          prevHref={prevHref}
          nextHref={nextHref}
          officialUrl="https://ceac.state.gov/genniv/"
          nextLabel={nextStep ? '下一步' : '前往预约 →'}
        />
      }
    >
      <div className="w-full px-2">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-3">
          <Link href="/" className="hover:text-slate-600">首页</Link>
          <ChevronRight size={12} />
          <Link href="/ds160/1" className="hover:text-slate-600">填写 DS-160</Link>
          <ChevronRight size={12} />
          <span className="text-slate-600">{step.title}</span>
        </div>

        {/* Compact header */}
        <div className="mb-4">
          <div className="flex items-end gap-3 mb-1">
            <span className="text-4xl font-black text-slate-100 leading-none select-none">
              {String(stepId).padStart(2, '0')}
            </span>
            <h1 className="text-lg font-black text-slate-800 pb-0.5">
              {step.title}
            </h1>
            {/* Edit mode toggle */}
            <button
              onClick={async () => {
                if (isEditing) {
                  await editor.save()
                  setIsEditing(false)
                } else {
                  editor.reset()
                  setIsEditing(true)
                }
              }}
              className={`ml-auto mb-0.5 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                isEditing
                  ? 'bg-red-100 text-red-600 hover:bg-red-200'
                  : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
              }`}
            >
              {isEditing ? <X size={14} /> : <Pencil size={14} />}
              {isEditing ? '退出编辑' : '编辑'}
            </button>
          </div>
          <p className="text-sm text-slate-500 leading-relaxed">
            {step.subtitle}
          </p>

          {/* Edit toolbar */}
          {isEditing && (
            <div className="mt-2 flex items-center gap-2 flex-wrap">
              <button
                onClick={editor.save}
                disabled={editor.saving}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  editor.saveResult === 'success'
                    ? 'bg-green-600 text-white'
                    : editor.saveResult === 'error'
                    ? 'bg-red-600 text-white'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                } ${editor.saving ? 'opacity-60' : ''}`}
              >
                {editor.saveResult === 'success' ? (
                  <Check size={14} />
                ) : editor.saveResult === 'error' ? (
                  <AlertCircle size={14} />
                ) : (
                  <Save size={14} />
                )}
                {editor.saving
                  ? '保存中...'
                  : editor.saveResult === 'success'
                  ? '已保存'
                  : editor.saveResult === 'error'
                  ? '保存失败'
                  : '保存'}
              </button>
              <button
                onClick={() => setShowExport(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
              >
                <Download size={14} />
                导出 JSON
              </button>
              <button
                onClick={editor.reset}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
              >
                <RotateCcw size={14} />
                重置
              </button>
            </div>
          )}

          {/* Progress bar */}
          <div className="mt-3 flex items-center gap-3">
            <div className="flex gap-0.5 flex-1">
              {guideSteps.map((s) => (
                <Link key={s.id} href={`/ds160/${s.id}`} className="flex-1">
                  <div
                    className={`h-1 rounded-full transition-all ${
                      s.id < stepId
                        ? 'bg-green-400'
                        : s.id === stepId
                        ? 'bg-blue-500'
                        : 'bg-slate-200'
                    }`}
                  />
                </Link>
              ))}
            </div>
            <span className="text-[11px] text-slate-400 shrink-0 font-medium">
              {stepId} / {guideSteps.length}
            </span>
          </div>
        </div>

        {/* ── Main content ── */}
        {isLanding ? (
          <div className="rounded-2xl border border-slate-200 bg-white shadow-card p-8 mb-4">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <ExternalLink size={28} className="text-blue-600" />
              </div>
              <h2 className="text-lg font-bold text-slate-800 mb-2">开始填写 DS-160 签证申请表</h2>
              <p className="text-sm text-slate-500 max-w-md mx-auto">
                DS-160 是所有非移民签证的在线申请表，请在美国国务院官方网站上填写。
              </p>
            </div>
            <a
              href="https://ceac.state.gov/genniv/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-sm font-semibold transition-colors mx-auto w-fit"
            >
              <ExternalLink size={16} />
              打开 ceac.state.gov/genniv/
            </a>
          </div>
        ) : (
          /* ── Left / Right layout ── */
          <div className="flex gap-6 items-start mb-4">
            {/* Left: screenshot */}
            <div className="flex-1 min-w-0">
              <AnnotatedScreenshot
                screenshots={step.screenshots}
                boxes={step.boxes}
                isEditing={isEditing}
                onAddBox={editor.addBox}
                onUpdateBox={editor.updateBoxGeometry}
                onDeleteBox={editor.deleteBox}
                maxHeight={1400}
              />
            </div>

            {/* Right: legend + tips + warning */}
            <div className="w-96 shrink-0 flex flex-col gap-4">
              {/* Box legend */}
              {((step.boxes && step.boxes.length > 0) || isEditing) && (
                <div className="bg-white border border-slate-200 rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Square size={14} className="text-blue-500" />
                    <p className="text-xs font-bold text-blue-600 uppercase tracking-wide">标注说明</p>
                  </div>
                  <div className="grid gap-3">
                    {(step.boxes || []).map((box, i) => (
                      <div
                        key={i}
                        draggable={isEditing}
                        onDragStart={() => { setDragFrom(i); setDragOver(i) }}
                        onDragEnter={() => setDragOver(i)}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => {
                          if (dragFrom !== null && dragFrom !== i) editor.reorderBoxes(dragFrom, i)
                          setDragFrom(null); setDragOver(null)
                        }}
                        onDragEnd={() => { setDragFrom(null); setDragOver(null) }}
                        className={`flex items-start gap-3 rounded-xl p-1 transition-colors ${
                          isEditing ? 'cursor-grab active:cursor-grabbing' : ''
                        } ${dragOver === i && dragFrom !== i ? 'bg-blue-50 ring-2 ring-blue-300' : ''}`}
                      >
                        {isEditing && (
                          <div className="pt-2 text-slate-300 shrink-0">
                            <GripVertical size={16} />
                          </div>
                        )}
                        <div className="w-8 h-8 rounded-full bg-blue-500 text-white text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                          {i + 1}
                        </div>
                        {isEditing ? (
                          <div className="flex-1 flex items-start gap-2">
                            <input
                              type="text"
                              value={box.label}
                              onChange={(e) => editor.updateBoxLabel(i, e.target.value)}
                              className="flex-1 text-sm text-slate-700 border border-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-300 min-w-0"
                            />
                            <button
                              onClick={() => editor.deleteBox(i)}
                              className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors shrink-0"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        ) : (
                          <p className="text-sm text-slate-700 leading-relaxed pt-1">{box.label}</p>
                        )}
                      </div>
                    ))}
                  </div>
                  {isEditing && (!step.boxes || step.boxes.length === 0) && (
                    <p className="text-sm text-slate-400 text-center py-3">
                      在截图上拖拽绘制矩形框来添加标注
                    </p>
                  )}
                </div>
              )}

              {/* Telecode lookup — only on step 4 */}
              {stepId === 4 && <TelecodeLookup />}

              {/* Travel plan helper — only step 7 (US address) */}
              {stepId === 7 && <TravelPlanHelper />}

              {/* US Contact hotel info — step 12 */}
              {stepId === 12 && <USContactHotel />}

              {/* School/institution address lookup — steps 14 and 15 */}
              {stepId === 14 && <AddressLookup label="学校" />}
              {stepId === 15 && <AddressLookup label="学校" />}

              {/* Tips */}
              {((step.tips && step.tips.length > 0) || isEditing) && (
                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb size={14} className="text-blue-500" />
                    <p className="text-xs font-bold text-blue-600 uppercase tracking-wide">小贴士</p>
                  </div>
                  <ul className="space-y-2">
                    {(step.tips || []).map((tip, i) => (
                      <li key={i} className="text-sm text-slate-600 leading-relaxed flex gap-2">
                        <span className="text-blue-400 shrink-0 mt-1">•</span>
                        {isEditing ? (
                          <div className="flex-1 flex items-center gap-2">
                            <input
                              type="text"
                              value={tip}
                              onChange={(e) => editor.updateTip(i, e.target.value)}
                              className="flex-1 text-sm border border-blue-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white min-w-0"
                            />
                            <button
                              onClick={() => editor.deleteTip(i)}
                              className="p-1.5 rounded hover:bg-red-50 text-slate-400 hover:text-red-500 shrink-0"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        ) : (
                          <span>{tip}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                  {isEditing && (
                    <button
                      onClick={editor.addTip}
                      className="mt-3 flex items-center gap-1.5 text-sm text-blue-500 hover:text-blue-700 font-medium"
                    >
                      <Plus size={14} />
                      添加提示
                    </button>
                  )}
                </div>
              )}

              {/* Warning */}
              {step.warning && !isEditing && (
                <WarningCard title={step.warning.title} body={step.warning.body} />
              )}
              {isEditing && (
                <div>
                  {step.warning ? (
                    <div className="bg-orange-50 border border-orange-200 rounded-2xl p-5">
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-xs font-bold text-orange-600 uppercase tracking-wide">警告卡片</p>
                        <button
                          onClick={editor.removeWarning}
                          className="text-xs text-red-500 hover:text-red-700 font-medium flex items-center gap-1"
                        >
                          <Trash2 size={12} />
                          删除
                        </button>
                      </div>
                      <input
                        type="text"
                        value={step.warning.title}
                        onChange={(e) => editor.updateWarning('title', e.target.value)}
                        placeholder="警告标题"
                        className="w-full text-sm font-bold border border-orange-200 rounded-lg px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-orange-300 bg-white"
                      />
                      <textarea
                        value={step.warning.body}
                        onChange={(e) => editor.updateWarning('body', e.target.value)}
                        placeholder="警告内容"
                        rows={3}
                        className="w-full text-sm border border-orange-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300 bg-white resize-none"
                      />
                    </div>
                  ) : (
                    <button
                      onClick={editor.addWarning}
                      className="flex items-center gap-1.5 text-sm text-orange-500 hover:text-orange-700 font-medium"
                    >
                      <Plus size={14} />
                      添加警告卡片
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Export modal */}
      {showExport && (
        <ExportModal json={editor.exportJSON()} onClose={() => setShowExport(false)} />
      )}
    </AppLayout>
  )
}
