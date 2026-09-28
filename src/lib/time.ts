/**
 * "Happening now" / "up next" / countdown math against the itinerary.
 *
 * Timezone note (see docs/ARCHITECTURE.md "Timezone handling"): every
 * `iso` in content.ts already carries the correct UTC offset per item
 * (+10:00 Fri/Sat, +11:00 from 2am Sun 4 Oct when Victoria's DST starts).
 * `new Date(iso)` parses that offset-aware string into the right absolute
 * instant on its own — comparing the resulting timestamps is the whole
 * trick. Never re-derive the offset from a timezone name/library here.
 */
import { itinerary, type ItineraryDay, type ItineraryItem } from '../content.ts'

/** First Friday item's iso — the countdown target. */
const COUNTDOWN_TARGET_ISO = '2026-10-02T09:30:00+10:00'

interface Entry {
  day: ItineraryDay
  item: ItineraryItem
}

/** Every item that carries a fixed clock time (`iso` set). */
function isoItems(): Entry[] {
  const out: Entry[] = []
  for (const day of itinerary) {
    for (const item of day.items) {
      if (item.iso) out.push({ day, item })
    }
  }
  return out
}

export function getHappeningNow(now: Date): { day: ItineraryDay; item: ItineraryItem } | null {
  const nowMs = now.getTime()
  for (const { day, item } of isoItems()) {
    if (!item.iso || !item.durationMin) continue
    const startMs = new Date(item.iso).getTime()
    const endMs = startMs + item.durationMin * 60_000
    if (startMs <= nowMs && nowMs < endMs) return { day, item }
  }
  return null
}

export function getUpNext(now: Date): { day: ItineraryDay; item: ItineraryItem } | null {
  const nowMs = now.getTime()
  let best: Entry | null = null
  let bestStartMs = Infinity
  for (const entry of isoItems()) {
    const startMs = new Date(entry.item.iso as string).getTime()
    if (startMs > nowMs && startMs < bestStartMs) {
      best = entry
      bestStartMs = startMs
    }
  }
  return best
}

export function getCountdown(now: Date): {
  days: number
  hours: number
  minutes: number
  seconds: number
  isPast: boolean
} {
  const diffMs = new Date(COUNTDOWN_TARGET_ISO).getTime() - now.getTime()
  const isPast = diffMs <= 0
  const abs = Math.abs(diffMs)
  const days = Math.floor(abs / 86_400_000)
  const hours = Math.floor((abs % 86_400_000) / 3_600_000)
  const minutes = Math.floor((abs % 3_600_000) / 60_000)
  const seconds = Math.floor((abs % 60_000) / 1_000)
  return { days, hours, minutes, seconds, isPast }
}
