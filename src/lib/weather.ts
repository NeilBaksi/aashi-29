/**
 * Open-Meteo forecast for the weekend (no API key). Never throws — any
 * failure (network, non-200, timeout, malformed JSON) resolves to `null` so
 * callers can fall back to the static `pack.weatherBlurb` copy with zero
 * loading-spinner flash. See docs/ARCHITECTURE.md "Weather".
 */
import { useEffect, useState } from 'react'

const WEATHER_URL =
  'https://api.open-meteo.com/v1/forecast?latitude=-37.15&longitude=146.25&daily=temperature_2m_max,temperature_2m_min&timezone=Australia%2FMelbourne&start_date=2026-10-02&end_date=2026-10-04'

export interface DayForecast {
  date: string
  max: number
  min: number
}

interface OpenMeteoResponse {
  daily?: {
    time?: string[]
    temperature_2m_max?: number[]
    temperature_2m_min?: number[]
  }
}

export async function fetchWeekendWeather(): Promise<DayForecast[] | null> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 5000)

  try {
    const res = await fetch(WEATHER_URL, { signal: controller.signal })
    if (!res.ok) return null

    const data = (await res.json()) as OpenMeteoResponse
    const { time, temperature_2m_max, temperature_2m_min } = data.daily ?? {}
    if (!time || !temperature_2m_max || !temperature_2m_min) return null

    const days: DayForecast[] = time.map((date, i) => ({
      date,
      max: temperature_2m_max[i],
      min: temperature_2m_min[i],
    }))

    if (days.some((d) => typeof d.max !== 'number' || typeof d.min !== 'number')) return null

    return days
  } catch {
    return null
  } finally {
    clearTimeout(timeout)
  }
}

/** React hook wrapping `fetchWeekendWeather`. `data` stays `null` on failure —
 * render the static blurb unconditionally and treat this as a bonus strip. */
export function useWeekendWeather(): { data: DayForecast[] | null; loading: boolean } {
  const [data, setData] = useState<DayForecast[] | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    fetchWeekendWeather().then((result) => {
      if (!cancelled) {
        setData(result)
        setLoading(false)
      }
    })
    return () => {
      cancelled = true
    }
  }, [])

  return { data, loading }
}
