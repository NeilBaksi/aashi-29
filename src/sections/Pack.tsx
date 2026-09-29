import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { pack, packingChecklist } from '../content'
import { useWeekendWeather } from '../lib/weather'

const STORAGE_KEY = 'aashi29:packing'

const fadeUp = (i: number) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const, delay: i * 0.05 },
})

function dayLabel(dateStr: string): string {
  return new Date(`${dateStr}T12:00:00`).toLocaleDateString('en-AU', { weekday: 'short' })
}

export default function Pack() {
  const { data: forecast } = useWeekendWeather()
  const [checked, setChecked] = useState<Set<string>>(new Set())

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (raw) setChecked(new Set(JSON.parse(raw) as string[]))
    } catch {
      // localStorage disabled/private browsing — checklist just won't persist.
    }
  }, [])

  const toggle = (item: string) => {
    setChecked((prev) => {
      const next = new Set(prev)
      if (next.has(item)) next.delete(item)
      else next.add(item)
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]))
      } catch {
        // ignore — nothing we can do if storage is unavailable
      }
      return next
    })
  }

  return (
    <section id="pack" aria-label={pack.heading} className="grain px-5 py-20 md:py-28">
      <div className="relative mx-auto max-w-6xl">
        <motion.h2
          {...fadeUp(0)}
          className="font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl"
        >
          {pack.heading}
        </motion.h2>

        <motion.div {...fadeUp(1)} className="mt-8 overflow-hidden rounded-2xl shadow-card">
          <img
            src={`${import.meta.env.BASE_URL}img/09-packing-flat-lay.jpg`}
            alt="A warm-weather and cold-weather mountain weekend packing flat-lay"
            className="h-48 w-full object-cover sm:h-64"
            loading="lazy"
          />
        </motion.div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <motion.div
            {...fadeUp(2)}
            className="rounded-2xl bg-paper-card p-6 shadow-card md:p-8"
          >
            <h3 className="font-display text-xl font-semibold text-ink">{pack.weatherHeading}</h3>

            {forecast && forecast.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-3" aria-live="polite">
                {forecast.map((d) => (
                  <div
                    key={d.date}
                    className="rounded-xl bg-paper px-3 py-2 text-sm text-ink-soft"
                  >
                    <span className="font-medium text-ink">{dayLabel(d.date)}</span>{' '}
                    <span className="tabular-nums">
                      {Math.round(d.max)}° / {Math.round(d.min)}°
                    </span>
                  </div>
                ))}
              </div>
            )}

            <p className="mt-4 text-ink-soft">{pack.weatherBlurb}</p>
          </motion.div>

          <motion.div
            {...fadeUp(3)}
            className="rounded-2xl bg-paper-card p-6 shadow-card md:p-8"
          >
            <h3 className="font-display text-xl font-semibold text-ink">{pack.adventureHeading}</h3>
            <p className="mt-2 text-ink-soft">{pack.adventureIntro}</p>
            <p className="mt-1 font-medium text-ink">{pack.adventureList}</p>
          </motion.div>
        </div>

        <motion.h3
          {...fadeUp(4)}
          className="mt-14 font-display text-2xl font-semibold tracking-tight text-ink"
        >
          {pack.dressCodeHeading}
        </motion.h3>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pack.dressCode.map((d, i) => (
            <motion.div
              key={d.day}
              {...fadeUp(5 + i)}
              className="rounded-2xl bg-paper-card p-5 shadow-card"
            >
              <p className="text-xs font-semibold tracking-[0.15em] text-ink-soft">{d.day}</p>
              {d.title && <p className="mt-2 font-display text-lg text-ink">{d.title}</p>}
              <p className="mt-2 text-sm text-ink-soft">{d.detail}</p>
            </motion.div>
          ))}
        </div>

        <motion.div {...fadeUp(9)} className="mt-10">
          <h3 className="font-display text-xl font-semibold text-ink">{pack.dinnerDressCodeHeading}</h3>
          <div className="mt-4 flex flex-wrap gap-6">
            {pack.dinnerSwatches.map((s) => (
              <div key={s.name} className="flex flex-col items-center gap-2">
                <span
                  className="h-10 w-10 rounded-full border border-paper-deep shadow-card"
                  style={{ background: s.hex }}
                  aria-hidden
                />
                <span className="text-sm text-ink-soft">{s.name}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div {...fadeUp(10)} className="mt-14 rounded-2xl bg-paper-card p-6 shadow-card md:p-8">
          <h3 className="font-display text-xl font-semibold text-ink">Packing checklist</h3>
          <ul className="mt-4 divide-y divide-paper-deep">
            {packingChecklist.map((item) => {
              const isChecked = checked.has(item)
              return (
                <li key={item}>
                  <label className="flex min-h-[44px] cursor-pointer items-center gap-3 py-2">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggle(item)}
                      className="sr-only"
                    />
                    <span
                      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-ink-soft/40 bg-paper transition-colors"
                      aria-hidden
                    >
                      {isChecked && <Check size={16} className="text-apricot-deep" strokeWidth={3} />}
                    </span>
                    <span className={isChecked ? 'text-ink-soft line-through' : 'text-ink'}>{item}</span>
                  </label>
                </li>
              )
            })}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
