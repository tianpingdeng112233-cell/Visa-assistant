import { NextRequest, NextResponse } from 'next/server'

export interface AddressResult {
  displayName: string
  street: string
  city: string
  stateProvince: string
  postalCode: string
  country: string
}

function hasNonLatin(s: string) {
  return /[^\u0000-\u024F\u1E00-\u1EFF\s\d\-,.'/()]/.test(s)
}

// MyMemory free translation API — no key needed, 5000 chars/day
async function translateToEnglish(text: string): Promise<string> {
  if (!text || !hasNonLatin(text)) return text
  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=zh|en`
    const res = await fetch(url, { next: { revalidate: 86400 } })
    const data = await res.json()
    const translated: string = data?.responseData?.translatedText || text
    // MyMemory sometimes returns the original if it can't translate
    return translated.toUpperCase()
  } catch {
    return text.toUpperCase()
  }
}

async function toEnglish(s: string): Promise<string> {
  if (!s) return s
  if (!hasNonLatin(s)) return s.toUpperCase()
  return translateToEnglish(s)
}

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q') || ''
  if (!q) return NextResponse.json({ results: [] })

  // Request English results from Nominatim
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&addressdetails=1&limit=5&accept-language=en`

  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'visa-assistant/1.0 (educational tool)' },
      next: { revalidate: 3600 },
    })
    const data: Record<string, unknown>[] = await res.json()

    const results: AddressResult[] = await Promise.all(
      data.map(async (item) => {
        const addr = (item.address as Record<string, string>) || {}

        const houseNumber = addr.house_number || ''
        const road        = addr.road || addr.pedestrian || addr.footway || addr.path || ''
        const rawStreet   = houseNumber ? `${houseNumber} ${road}`.trim() : road

        // Fix: Nominatim often puts a district (e.g. "Jingkou District") in addr.city for Chinese cities.
        // When that happens, parse the display_name to find the real city
        // which appears right after the district and before the state.
        const displayName = item.display_name as string || ''
        const addrCity = addr.city || addr.town || addr.municipality || addr.village || ''
        const isDistrict = /district|county|borough|ward|区|县|郡/i.test(addrCity)
        let rawCity = addrCity
        if (isDistrict && addr.state) {
          const parts = displayName.split(', ')
          const stateIdx = parts.findIndex(p => p === addr.state || p === addr.province)
          const districtIdx = parts.findIndex(p => p === addrCity)
          // City is the part between district and state
          if (districtIdx >= 0 && stateIdx > districtIdx + 1) {
            rawCity = parts[stateIdx - 1]
          } else if (stateIdx > 1) {
            rawCity = parts[stateIdx - 1]
          }
        }

        const rawState    = addr.state || addr.region || addr.province || ''
        const rawCountry  = addr.country || ''

        // Translate any non-Latin fields to English in parallel
        const [street, city, stateProvince, country] = await Promise.all([
          toEnglish(rawStreet),
          toEnglish(rawCity),
          toEnglish(rawState),
          toEnglish(rawCountry),
        ])

        return {
          displayName:  item.display_name as string,
          street,
          city,
          stateProvince,
          postalCode:   addr.postcode || '',
          country,
        }
      })
    )

    return NextResponse.json({ results })
  } catch (err) {
    console.error('Address lookup error:', err)
    return NextResponse.json({ results: [], error: 'Lookup failed' })
  }
}
