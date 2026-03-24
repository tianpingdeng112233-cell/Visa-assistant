import type { ScreenBox } from '@/components/annotated-screenshot'
import rawData from '@/data/ds160-guide.json'

export interface GuideStep {
  id: number
  title: string
  subtitle: string
  screenshots: string[]
  boxes?: ScreenBox[]
  tips?: string[]
  warning?: { title: string; body: string }
}

export const guideSteps: GuideStep[] = rawData as GuideStep[]
