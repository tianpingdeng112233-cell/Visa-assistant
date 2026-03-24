import { NextRequest, NextResponse } from 'next/server'
import localDB from '@/data/telecode.json'
import fs from 'fs'
import path from 'path'

const db = localDB as Record<string, string>
const DATA_PATH = path.join(process.cwd(), 'data', 'telecode.json')

async function fetchFromChaseDream(char: string): Promise<string | null> {
  try {
    // Get ViewState from form
    const pageRes = await fetch('https://apps.chasedream.com/chinese-commercial-code/', {
      headers: { 'User-Agent': 'Mozilla/5.0' },
    })
    const pageHtml = await pageRes.text()
    const fields: Record<string, string> = {}
    let fm: RegExpExecArray | null
    const fre = /<input[^>]+name="([^"]+)"[^>]*value="([^"]*)"/g
    while ((fm = fre.exec(pageHtml)) !== null) fields[fm[1]] = fm[2]

    // POST the query
    fields['txtInput'] = char
    fields['btnSearch'] = '查询'
    const body = new URLSearchParams(fields).toString()
    const res = await fetch('https://apps.chasedream.com/chinese-commercial-code/', {
      method: 'POST',
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Referer': 'https://apps.chasedream.com/chinese-commercial-code/',
      },
      body,
    })
    const html = await res.text()
    const m = html.match(/<td[^>]*>\s*(\d{4})\s*<\/td>/)
    return m ? m[1] : null
  } catch {
    return null
  }
}

export async function GET(req: NextRequest) {
  const chars = req.nextUrl.searchParams.get('chars') || ''
  const chineseChars = Array.from(chars).filter((c) => /[\u4e00-\u9fff]/.test(c))

  if (chineseChars.length === 0) {
    return NextResponse.json({ results: [] })
  }

  const results: { char: string; code: string | null }[] = []
  const newEntries: Record<string, string> = {}

  for (const char of chineseChars) {
    if (db[char]) {
      // Local hit — fast path
      results.push({ char, code: db[char] })
    } else {
      // Fetch from ChaseDream and cache locally
      const code = await fetchFromChaseDream(char)
      results.push({ char, code })
      if (code) {
        db[char] = code
        newEntries[char] = code
      }
    }
  }

  // Persist any newly fetched entries
  if (Object.keys(newEntries).length > 0) {
    try {
      const current = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'))
      fs.writeFileSync(DATA_PATH, JSON.stringify({ ...current, ...newEntries }, null, 2), 'utf8')
    } catch { /* ignore write errors */ }
  }

  return NextResponse.json({ results })
}
