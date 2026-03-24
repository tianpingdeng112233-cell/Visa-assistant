import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const STATE_FILE = path.join(process.cwd(), 'data', 'monitor-state.json')

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const data = {
      updatedAt: Date.now(),
      state: body.state || {},
      config: body.config || {},
      logs: (body.logs || []).slice(0, 50), // keep latest 50 entries
    }
    fs.writeFileSync(STATE_FILE, JSON.stringify(data, null, 2))
    return NextResponse.json({ ok: true }, {
      headers: { 'Access-Control-Allow-Origin': '*' },
    })
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 })
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
