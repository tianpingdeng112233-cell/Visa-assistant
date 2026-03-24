import type { ScreenBox } from '@/components/annotated-screenshot'
import rawData from '@/data/slot-guide.json'

export interface SlotStep {
  id: number
  title: string
  subtitle: string
  screenshots: string[]
  boxes?: ScreenBox[]
  tips?: string[]
  warning?: { title: string; body: string }
}

export const slotSteps: SlotStep[] = rawData as SlotStep[]
