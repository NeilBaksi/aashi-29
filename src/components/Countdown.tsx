import { useEffect, useState } from 'react'
import { itinerary } from '../content'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function getTimeLeft(targetMs: number): TimeLeft | null {
  const diff = targetMs - Date.now()
  if (diff <= 0) return null
  const totalSeconds = Math.floor(diff / 1000)
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  }
}

// Friday check-in moment — itinerary[0] is Friday, items[0] is the 9:30am meet.
// Computed once at module load since content.ts is static.
const targetIso = itinerary[0]?.items[0]?.iso
const targetMs = targetIso ? new Date(targetIso).getTime() : NaN

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(() =>
    Number.isNaN(targetMs) ? null : getTimeLeft(targetMs),
  )

  useEffect(() => {
    if (Number.isNaN(targetMs)) return
    const id = setInterval(() => setTimeLeft(getTimeLeft(targetMs)), 1000)
    return () => clearInterval(id)
  }, [])

  // Guard against iso parsing failure — render nothing rather than "NaN:NaN".
  if (Number.isNaN(targetMs)) return null

  if (!timeLeft) {
    return (
      <p aria-live="polite" className="font-display text-2xl font-medium text-ink">
        It's happening! 🎉
      </p>
    )
  }

  const units: Array<{ label: string; value: number }> = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Mins', value: timeLeft.minutes },
    { label: 'Secs', value: timeLeft.seconds },
  ]

  return (
    <div aria-live="polite" className="flex gap-4 sm:gap-6">
      {units.map((u) => (
        <div key={u.label} className="flex flex-col items-center">
          <span className="font-display text-3xl font-semibold tabular-nums text-ink sm:text-4xl">
            {String(u.value).padStart(2, '0')}
          </span>
          <span className="mt-1 text-xs font-medium uppercase tracking-wide text-ink-soft">
            {u.label}
          </span>
        </div>
      ))}
    </div>
  )
}
