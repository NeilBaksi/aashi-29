/**
 * Hand-built .ics (RFC5545) — no calendar library needed for a handful of
 * fixed events. Builds one VEVENT per itinerary item that has both `iso` and
 * `durationMin`, across all three days.
 *
 * Timezones: content.ts already encodes the correct UTC offset per item
 * (+10:00 Fri/Sat, +11:00 Sun — see docs/ARCHITECTURE.md). `new Date(iso)`
 * parses that offset correctly; we then emit UTC (`...Z`) timestamps, which
 * is valid RFC5545 and needs no VTIMEZONE/TZID.
 */
import { itinerary, address } from '../content.ts'

function pad(n: number): string {
  return String(n).padStart(2, '0')
}

function toIcsUtc(date: Date): string {
  return (
    `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}` +
    `T${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}${pad(date.getUTCSeconds())}Z`
  )
}

// Minimal RFC5545 text escaping — backslash, semicolon, comma, newline.
function escapeIcsText(text: string): string {
  return text.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n')
}

export function buildIcsString(): string {
  const lines: string[] = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//aashi29//birthday-weekend//EN',
    'CALSCALE:GREGORIAN',
  ]
  const stamp = toIcsUtc(new Date())

  itinerary.forEach((day) => {
    day.items.forEach((item, index) => {
      if (!item.iso || !item.durationMin) return
      const start = new Date(item.iso)
      const end = new Date(start.getTime() + item.durationMin * 60000)
      lines.push(
        'BEGIN:VEVENT',
        `UID:${day.id}-${index}@aashi29`,
        `DTSTAMP:${stamp}`,
        `DTSTART:${toIcsUtc(start)}`,
        `DTEND:${toIcsUtc(end)}`,
        `SUMMARY:${escapeIcsText(item.text)}`,
        `LOCATION:${escapeIcsText(address.line)}`,
        'END:VEVENT',
      )
    })
  })

  lines.push('END:VCALENDAR')
  return lines.join('\r\n')
}

export function downloadIcs(): void {
  const blob = new Blob([buildIcsString()], { type: 'text/calendar' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'aashi-29th-weekend.ics'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
