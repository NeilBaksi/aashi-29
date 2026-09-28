import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Check, Copy, MapPin, Navigation } from 'lucide-react'
import { stay, address } from '../content'

const easeOutExpo = [0.16, 1, 0.3, 1] as const

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: easeOutExpo, delay },
})

export default function Stay() {
  const parallaxRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: parallaxRef, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  const [copied, setCopied] = useState(false)
  // Simple, one-shot device check — no need for anything fancier for a show/hide link.
  const [isApple] = useState(() => /iPhone|iPad|Macintosh/.test(navigator.userAgent))

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(address.line)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard unavailable (permissions/unsupported) — Directions link still works.
    }
  }

  return (
    <section id="stay" aria-labelledby="stay-heading" className="grain relative bg-paper-card px-5 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          id="stay-heading"
          {...fadeUp()}
          className="text-3xl font-medium text-ink sm:text-4xl"
        >
          {stay.heading}
        </motion.h2>

        <div className="mt-10 grid gap-10 md:grid-cols-2 md:items-center md:gap-16">
          <div ref={parallaxRef} className="overflow-hidden rounded-2xl shadow-card">
            <motion.img
              style={{ y }}
              src="/img/stay-sunset.jpg"
              alt="Sunset picnic on the deck at the house"
              className="h-[420px] w-full scale-110 object-cover"
            />
          </div>

          <div>
            <motion.p
              {...fadeUp(0.05)}
              className="border-l-2 border-apricot-deep pl-4 font-display text-xl italic text-ink"
            >
              {stay.blurb}
            </motion.p>

            <motion.div {...fadeUp(0.1)} className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-full bg-paper px-4 py-2 text-sm font-medium text-ink-soft shadow-card">
                {stay.checkIn}
              </span>
              <span className="rounded-full bg-paper px-4 py-2 text-sm font-medium text-ink-soft shadow-card">
                {stay.checkOut}
              </span>
            </motion.div>

            <motion.div {...fadeUp(0.15)} className="mt-6 rounded-2xl bg-paper p-6 shadow-card">
              <p className="flex items-start gap-2 font-medium text-ink">
                <MapPin size={18} className="mt-0.5 shrink-0" aria-hidden />
                {address.line}
              </p>

              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={copyAddress}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-medium text-paper transition-transform hover:scale-[1.03] active:scale-95"
                >
                  {copied ? <Check size={16} aria-hidden /> : <Copy size={16} aria-hidden />}
                  {copied ? 'Copied!' : 'Copy address'}
                </button>

                <a
                  href={address.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-ink px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-paper"
                >
                  <Navigation size={16} aria-hidden />
                  Directions
                </a>

                {isApple && (
                  <a
                    href={address.appleMapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-paper-deep px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:border-ink hover:text-ink"
                  >
                    Open in Apple Maps
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
