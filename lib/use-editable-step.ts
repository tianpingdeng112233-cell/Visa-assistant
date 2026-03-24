'use client'

import { useState, useCallback } from 'react'
import type { GuideStep } from './ds160-guide'

export function useEditableStep(originalStep: GuideStep) {
  const [step, setStep] = useState<GuideStep>(() => structuredClone(originalStep))

  // ── Box CRUD ───────────────────────────────────────────────────────
  const addBox = useCallback((imgIndex: number, x: number, y: number, w: number, h: number) => {
    setStep((prev) => ({
      ...prev,
      boxes: [...(prev.boxes || []), { imgIndex, x, y, w, h, label: '新框选区域' }],
    }))
  }, [])

  const deleteBox = useCallback((index: number) => {
    setStep((prev) => ({
      ...prev,
      boxes: (prev.boxes || []).filter((_, i) => i !== index),
    }))
  }, [])

  const updateBoxGeometry = useCallback((index: number, x: number, y: number, w: number, h: number) => {
    setStep((prev) => {
      const boxes = [...(prev.boxes || [])]
      boxes[index] = { ...boxes[index], x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10, w: Math.round(w * 10) / 10, h: Math.round(h * 10) / 10 }
      return { ...prev, boxes }
    })
  }, [])

  const updateBoxLabel = useCallback((index: number, label: string) => {
    setStep((prev) => {
      const boxes = [...(prev.boxes || [])]
      boxes[index] = { ...boxes[index], label }
      return { ...prev, boxes }
    })
  }, [])

  const reorderBoxes = useCallback((fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex) return
    setStep((prev) => {
      const boxes = [...(prev.boxes || [])]
      const [moved] = boxes.splice(fromIndex, 1)
      boxes.splice(toIndex, 0, moved)
      return { ...prev, boxes }
    })
  }, [])

  // ── Tips CRUD ──────────────────────────────────────────────────────
  const updateTip = useCallback((index: number, text: string) => {
    setStep((prev) => {
      const tips = [...(prev.tips || [])]
      tips[index] = text
      return { ...prev, tips }
    })
  }, [])

  const addTip = useCallback(() => {
    setStep((prev) => ({
      ...prev,
      tips: [...(prev.tips || []), '新提示'],
    }))
  }, [])

  const deleteTip = useCallback((index: number) => {
    setStep((prev) => ({
      ...prev,
      tips: (prev.tips || []).filter((_, i) => i !== index),
    }))
  }, [])

  // ── Warning CRUD ───────────────────────────────────────────────────
  const updateWarning = useCallback((field: 'title' | 'body', value: string) => {
    setStep((prev) => ({
      ...prev,
      warning: {
        title: prev.warning?.title || '',
        body: prev.warning?.body || '',
        [field]: value,
      },
    }))
  }, [])

  const addWarning = useCallback(() => {
    setStep((prev) => ({
      ...prev,
      warning: { title: '警告标题', body: '警告内容' },
    }))
  }, [])

  const removeWarning = useCallback(() => {
    setStep((prev) => {
      const { warning: _, ...rest } = prev
      return rest as GuideStep
    })
  }, [])

  // ── Persistence ────────────────────────────────────────────────────
  const reset = useCallback(() => {
    setStep(structuredClone(originalStep))
  }, [originalStep])

  const getStepData = useCallback(() => {
    const { id, title, subtitle, screenshots, boxes, tips, warning } = step
    const obj: Record<string, unknown> = { id, title, subtitle, screenshots }
    if (boxes && boxes.length > 0) obj.boxes = boxes
    if (tips && tips.length > 0) obj.tips = tips
    if (warning) obj.warning = warning
    return obj
  }, [step])

  const exportJSON = useCallback(() => {
    return JSON.stringify(getStepData(), null, 2)
  }, [getStepData])

  const [saving, setSaving] = useState(false)
  const [saveResult, setSaveResult] = useState<'success' | 'error' | null>(null)

  const save = useCallback(async () => {
    setSaving(true)
    setSaveResult(null)
    try {
      const res = await fetch('/api/save-step', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(getStepData()),
      })
      setSaveResult(res.ok ? 'success' : 'error')
    } catch {
      setSaveResult('error')
    } finally {
      setSaving(false)
      setTimeout(() => setSaveResult(null), 2000)
    }
  }, [getStepData])

  return {
    step,
    addBox,
    deleteBox,
    updateBoxGeometry,
    updateBoxLabel,
    reorderBoxes,
    updateTip,
    addTip,
    deleteTip,
    updateWarning,
    addWarning,
    removeWarning,
    reset,
    exportJSON,
    save,
    saving,
    saveResult,
  }
}
