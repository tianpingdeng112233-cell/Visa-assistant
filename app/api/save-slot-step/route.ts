import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const DATA_PATH = path.join(process.cwd(), 'data', 'slot-guide.json')

export async function POST(req: NextRequest) {
  try {
    const updatedStep = await req.json()
    if (!updatedStep || typeof updatedStep.id !== 'number') {
      return NextResponse.json({ error: 'Invalid step data' }, { status: 400 })
    }
    const steps = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'))
    const index = steps.findIndex((s: { id: number }) => s.id === updatedStep.id)
    if (index === -1) return NextResponse.json({ error: 'Step not found' }, { status: 404 })
    steps[index] = updatedStep
    fs.writeFileSync(DATA_PATH, JSON.stringify(steps, null, 2), 'utf8')
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Save slot step error:', err)
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 })
  }
}
