import { NextRequest, NextResponse } from 'next/server'

export interface HotelResult {
  id: string
  name: string
  street: string
  city: string
  state: string
  zip: string
  phone?: string
}

// Tight downtown bounding boxes [south, west, north, east] — focused on tourist/hotel districts
const CITY_BBOX: Record<string, [number, number, number, number]> = {
  'NEW YORK':      [40.700, -74.020, 40.780, -73.950],  // Manhattan
  'LOS ANGELES':   [33.980, -118.430, 34.070, -118.250], // Downtown/Beverly Hills
  'LAS VEGAS':     [36.090, -115.200, 36.190, -115.110], // The Strip
  'SAN FRANCISCO': [37.760, -122.450, 37.810, -122.380], // Downtown/Union Square
  'CHICAGO':       [41.860, -87.680, 41.920, -87.610],  // Downtown/Magnificent Mile
  'MIAMI':         [25.750, -80.220, 25.820, -80.120],  // Miami Beach/Downtown
  'SEATTLE':       [47.590, -122.360, 47.640, -122.310], // Downtown
  'WASHINGTON':    [38.880, -77.060, 38.920, -77.010],  // Downtown/National Mall
  'BOSTON':        [42.340, -71.090, 42.370, -71.050],  // Downtown/Back Bay
  'HONOLULU':      [21.270, -157.870, 21.310, -157.810], // Waikiki
  'ORLANDO':       [28.360, -81.510, 28.450, -81.400],  // International Drive
  'HOUSTON':       [29.730, -95.400, 29.780, -95.340],  // Downtown
  'DALLAS':        [32.770, -96.830, 32.820, -96.780],  // Downtown
  'PHOENIX':       [33.430, -112.100, 33.480, -112.040], // Downtown
  'SAN DIEGO':     [32.700, -117.180, 32.740, -117.140], // Gaslamp/Downtown
  'ATLANTA':       [33.740, -84.410, 33.790, -84.360],  // Downtown/Midtown
  'DENVER':        [39.720, -104.990, 39.760, -104.960], // Downtown/LoDo
  'PHILADELPHIA':  [39.930, -75.180, 39.970, -75.140],  // Center City
}

const CITY_STATE: Record<string, string> = {
  'NEW YORK': 'NY', 'LOS ANGELES': 'CA', 'LAS VEGAS': 'NV', 'SAN FRANCISCO': 'CA',
  'CHICAGO': 'IL', 'MIAMI': 'FL', 'SEATTLE': 'WA', 'WASHINGTON': 'DC',
  'BOSTON': 'MA', 'HONOLULU': 'HI', 'ORLANDO': 'FL', 'HOUSTON': 'TX',
  'DALLAS': 'TX', 'PHOENIX': 'AZ', 'SAN DIEGO': 'CA', 'ATLANTA': 'GA',
  'DENVER': 'CO', 'PHILADELPHIA': 'PA',
}

export async function GET(req: NextRequest) {
  const city = (req.nextUrl.searchParams.get('city') || '').toUpperCase()
  const keyword = (req.nextUrl.searchParams.get('q') || '').toUpperCase()

  if (!city) return NextResponse.json({ hotels: [] })

  const bbox = CITY_BBOX[city]
  if (!bbox) return NextResponse.json({ hotels: [], error: 'City not supported' })

  const [s, w, n, e] = bbox
  const box = `${s},${w},${n},${e}`

  // Query both nodes and ways (ways cover larger hotels)
  const query = `[out:json][timeout:20];(node["tourism"~"hotel|motel"]["name"](${box});way["tourism"~"hotel|motel"]["name"](${box}););out center 40;`

  // Try two Overpass endpoints in case one is overloaded
  const ENDPOINTS = [
    'https://overpass-api.de/api/interpreter',
    'https://overpass.kumi.systems/api/interpreter',
  ]

  let res: Response | null = null
  for (const endpoint of ENDPOINTS) {
    try {
      res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'User-Agent': 'visa-assistant/1.0' },
        body: `data=${encodeURIComponent(query)}`,
        signal: AbortSignal.timeout(20000),
        next: { revalidate: 3600 },
      } as RequestInit)
      if (res.ok) break
    } catch {
      res = null
    }
  }

  try {
    if (!res?.ok) return NextResponse.json({ hotels: [], error: `Overpass unavailable` })

    if (!res.ok) return NextResponse.json({ hotels: [], error: `Overpass error ${res.status}` })

    const data = await res.json()
    const stateCode = CITY_STATE[city] || ''

    let hotels: HotelResult[] = (data.elements || [])
      .map((el: Record<string, unknown>) => {
        const tags = el.tags as Record<string, string> | undefined
        if (!tags?.name) return null
        const num    = tags['addr:housenumber'] || ''
        const street = tags['addr:street'] || ''
        const streetFull = `${num} ${street}`.trim().toUpperCase()

        const phone = tags['phone'] || tags['contact:phone'] || tags['telephone'] || ''
        return {
          id:     String(el.id),
          name:   tags.name.toUpperCase(),
          street: streetFull,
          city:   (tags['addr:city'] || city).toUpperCase(),
          state:  (tags['addr:state']?.length === 2 ? tags['addr:state'] : stateCode).toUpperCase(),
          zip:    tags['addr:postcode'] || '',
          phone:  phone || undefined,
        } as HotelResult
      })
      .filter(Boolean)
      // Only include hotels that have an address
      .filter((h: HotelResult) => h.street.length > 0)

    // Filter by keyword if provided
    if (keyword) {
      hotels = hotels.filter(h => h.name.includes(keyword) || h.street.includes(keyword))
    }

    // Sort: hotels with zip first
    hotels.sort((a: HotelResult, b: HotelResult) => (b.zip ? 1 : 0) - (a.zip ? 1 : 0))

    return NextResponse.json({ hotels: hotels.slice(0, 30) })
  } catch (err) {
    console.error('Hotel search error:', err)
    return NextResponse.json({ hotels: [], error: 'Search failed' })
  }
}
