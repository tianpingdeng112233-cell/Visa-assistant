import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const STATE_FILE = path.join(process.cwd(), 'data', 'monitor-state.json')

export async function GET() {
  try {
    if (!fs.existsSync(STATE_FILE)) {
      return NextResponse.json({ connected: false })
    }
    const raw = fs.readFileSync(STATE_FILE, 'utf-8')
    const data = JSON.parse(raw)
    // Consider "connected" if extension pushed data within the last 10 minutes
    const connected = typeof data.updatedAt === 'number'
      && Date.now() - data.updatedAt < 10 * 60 * 1000
    return NextResponse.json({ ...data, connected })
  } catch {
    return NextResponse.json({ connected: false })
  }
}
