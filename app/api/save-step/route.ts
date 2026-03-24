import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const DATA_PATH = path.join(process.cwd(), 'data', 'ds160-guide.json')

export async function POST(req: NextRequest) {
  try {
    const updatedStep = await req.json()

    if (!updatedStep || typeof updatedStep.id !== 'number') {
      return NextResponse.json({ error: 'Invalid step data' }, { status: 400 })
    }

    // Read current data
    const raw = fs.readFileSync(DATA_PATH, 'utf8')
    const steps = JSON.parse(raw)

    // Find and replace the step
    const index = steps.findIndex((s: { id: number }) => s.id === updatedStep.id)
    if (index === -1) {
      return NextResponse.json({ error: `Step ${updatedStep.id} not found` }, { status: 404 })
    }

    steps[index] = updatedStep

    // Write back
    fs.writeFileSync(DATA_PATH, JSON.stringify(steps, null, 2), 'utf8')

    return NextResponse.json({ success: true, message: `Step ${updatedStep.id} saved` })
  } catch (err) {
    console.error('Save step error:', err)
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 })
  }
}
