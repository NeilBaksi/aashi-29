import { motion } from 'framer-motion'
import { CalendarPlus } from 'lucide-react'
import { hero } from '../content'
import Countdown from '../components/Countdown'
import { downloadIcs } from '../lib/ics'

const easeOutExpo = [0.16, 1, 0.3, 1] as const

const fadeUp = (i: number) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: easeOutExpo, delay: i * 0.05 },
})

export default function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="grain relative overflow-hidden bg-paper px-5 pb-20 pt-28 md:pb-28 md:pt-36"
    >
      <div className="relative mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:items-center md:gap-16">
        {/* Photo — mobile: stacked above text, full width. Desktop: right side, tilted/framed. */}
        <motion.div {...fadeUp(0)} className="order-1 md:order-2">
          <div className="mx-auto max-w-sm -rotate-3 rounded-2xl border-8 border-paper-card bg-paper-card p-2 shadow-card md:mx-0 md:max-w-md">
            <img
              src="/img/hero-aashi.jpg"
              alt="Aashi celebrating with a birthday cake"
              className="aspect-[4/5] w-full rounded-lg object-cover"
            />
          </div>
        </motion.div>

        {/* Kinetic type + copy */}
        <div className="order-2 md:order-1">
          <motion.p {...fadeUp(1)} className="font-medium text-ink-soft">
            {hero.eyebrow}
          </motion.p>

          <h1 id="hero-heading" className="mt-4 font-display leading-[0.95] text-ink">
            <motion.span {...fadeUp(2)} className="block text-4xl font-medium sm:text-5xl">
              {hero.titleLine1}
            </motion.span>
            <motion.span {...fadeUp(3)} className="block text-4xl font-medium sm:text-5xl">
              {hero.titleLine2}
            </motion.span>
            <motion.span
              {...fadeUp(4)}
              className="block text-6xl font-bold text-apricot-deep sm:text-7xl md:text-8xl"
            >
              {hero.titleLine3}
            </motion.span>
          </h1>

          <motion.p {...fadeUp(5)} className="mt-6 max-w-md text-lg text-ink-soft">
            {hero.dateRange}
          </motion.p>
          <motion.p {...fadeUp(6)} className="mt-4 max-w-md text-ink">
            {hero.blurb}
          </motion.p>
          <motion.p {...fadeUp(7)} className="mt-2 max-w-md text-ink">
            {hero.blurb2}
          </motion.p>

          <motion.div {...fadeUp(8)} className="mt-8">
            <Countdown />
          </motion.div>

          <motion.button
            {...fadeUp(9)}
            type="button"
            onClick={downloadIcs}
            className="mt-8 inline-flex min-h-[44px] items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-transform hover:scale-[1.03] active:scale-95"
          >
            <CalendarPlus size={18} aria-hidden />
            Add to calendar
          </motion.button>
        </div>
      </div>
    </section>
  )
}
