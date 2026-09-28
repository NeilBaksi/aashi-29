import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import clsx from 'clsx'
import { itinerary, links, type ItineraryDay } from '../content.ts'
import { getHappeningNow } from '../lib/time.ts'

/**
 * Hardcoded day-boundary instants (same reasoning as content.ts / lib/time.ts:
 * three known fixed dates, no timezone-library dependency needed). Used only
 * to decide (a) which day tab to default to and (b) whether "happening now"
 * chrome should render at all — it must stay silent outside the actual
 * weekend, not show stale UI in the months before the trip.
 */
const DAY_START: { id: ItineraryDay['id']; iso: string }[] = [
  { id: 'fri', iso: '2026-10-02T00:00:00+10:00' },
  { id: 'sat', iso: '2026-10-03T00:00:00+10:00' },
  { id: 'sun', iso: '2026-10-04T00:00:00+11:00' },
]
const EVENT_END_ISO = '2026-10-05T00:00:00+11:00'

const DAY_TAB_LABEL: Record<ItineraryDay['id'], string> = {
  fri: 'Fri 2 Oct',
  sat: 'Sat 3 Oct',
  sun: 'Sun 4 Oct',
}

/** The day id "now" falls inside, or null if outside the event weekend entirely. */
function liveDayId(now: Date): ItineraryDay['id'] | null {
  const t = now.getTime()
  if (t < new Date(DAY_START[0].iso).getTime() || t >= new Date(EVENT_END_ISO).getTime()) return null
  let current = DAY_START[0].id
  for (const bound of DAY_START) {
    if (t >= new Date(bound.iso).getTime()) current = bound.id
  }
  return current
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] as const },
  }),
}

export default function Itinerary() {
  const [now, setNow] = useState(() => new Date())
  const liveDay = liveDayId(now)
  const [selectedDay, setSelectedDay] = useState<ItineraryDay['id']>(liveDay ?? 'fri')

  // Keep the "happening now" highlight live while the page stays open over the weekend.
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000)
    return () => clearInterval(id)
  }, [])

  const happeningNow = liveDay ? getHappeningNow(now) : null
  const activeDay = itinerary.find((d) => d.id === selectedDay) ?? itinerary[0]

  return (
    <section id="itinerary" aria-label="Itinerary" className="grain bg-paper px-5 py-20 md:py-28">
      <div className="mx-auto max-w-3xl">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-sm font-medium uppercase tracking-[0.2em] text-ink-soft"
        >
          The Plan
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="mt-2 font-display text-3xl text-ink md:text-4xl"
        >
          Itinerary
        </motion.h2>

        {/* Day tabs — tap to switch, no swipe gesture handling needed */}
        <div role="tablist" aria-label="Select a day" className="mt-8 flex gap-2">
          {itinerary.map((day) => (
            <button
              key={day.id}
              type="button"
              role="tab"
              aria-selected={selectedDay === day.id}
              onClick={() => setSelectedDay(day.id)}
              className={clsx(
                'flex min-h-[44px] flex-1 flex-col items-center justify-center gap-0.5 rounded-xl px-3 py-2 text-center transition-colors',
                selectedDay === day.id ? 'bg-ink text-paper' : 'bg-paper-card text-ink-soft hover:text-ink',
              )}
            >
              <span className="font-display text-sm font-bold">{DAY_TAB_LABEL[day.id]}</span>
              {liveDay === day.id && (
                <span className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-apricot-deep">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-apricot-deep" aria-hidden />
                  Today
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Timeline for the selected day */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDay.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8"
          >
            <h3 className="font-display text-2xl text-ink">{activeDay.heading}</h3>
            <p className="mt-1 text-xs font-medium uppercase tracking-[0.15em] text-ink-soft">
              {activeDay.subheading}
            </p>

            <ol className="mt-6 border-l border-paper-deep pl-6">
              {activeDay.items.map((item, i) => {
                const isNow = happeningNow?.item === item
                const href = item.href ? links[item.href as keyof typeof links] : undefined
                return (
                  <motion.li
                    key={`${activeDay.id}-${i}`}
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className={clsx('relative', item.time ? 'py-3' : 'py-1.5')}
                  >
                    <span
                      className={clsx(
                        'absolute -left-[29px] top-4 h-2.5 w-2.5 rounded-full border-2 border-paper',
                        isNow ? 'animate-pulse bg-apricot-deep' : 'bg-paper-deep',
                      )}
                      aria-hidden
                    />
                    <div
                      className={clsx(
                        'rounded-xl px-4 py-3',
                        isNow && 'border border-apricot-deep bg-paper-card shadow-card',
                      )}
                    >
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        {item.time && (
                          <span className="font-display text-sm text-ink-soft [font-variant-numeric:tabular-nums]">
                            {item.time}
                          </span>
                        )}
                        <span className={clsx('text-ink', item.time ? 'font-medium' : 'text-sm text-ink-soft')}>
                          {item.text}
                        </span>
                        {isNow && (
                          <span className="rounded-full bg-apricot-deep px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-paper">
                            Happening now
                          </span>
                        )}
                      </div>
                      {href && (
                        <a
                          href={href}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-1.5 inline-flex min-h-[36px] items-center text-sm font-medium text-apricot-deep underline underline-offset-2 hover:text-ink"
                        >
                          Get directions →
                        </a>
                      )}
                    </div>
                  </motion.li>
                )
              })}
            </ol>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
