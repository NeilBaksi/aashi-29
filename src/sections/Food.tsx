import { motion } from 'framer-motion'
import { Utensils } from 'lucide-react'
import { food } from '../content'

const fadeUp = (i: number) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const, delay: i * 0.05 },
})

export default function Food() {
  const dayArt = ['04-bbq-night.jpg', '08-cake.jpg', '03-breakfast.jpg']

  return (
    <section
      id="food"
      aria-label={food.heading}
      className="bg-paper px-5 py-20 md:py-28"
      style={{
        backgroundImage: `linear-gradient(rgba(252, 248, 241, 0.88), rgba(252, 248, 241, 0.88)), url(${import.meta.env.BASE_URL}img/11-texture-tile.jpg)`,
        backgroundSize: 'auto, 480px 480px',
        backgroundRepeat: 'no-repeat, repeat',
      }}
    >
      <div className="relative mx-auto max-w-6xl">
        <motion.h2
          {...fadeUp(0)}
          className="font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl"
        >
          {food.heading}
        </motion.h2>
        <motion.p
          {...fadeUp(1)}
          className="mt-2 text-sm font-semibold tracking-[0.15em] text-ink-soft"
        >
          {food.menuHeading}
        </motion.p>

        <div className="mt-8 grid gap-6 rounded-2xl bg-paper-card p-6 shadow-card md:grid-cols-3 md:gap-0 md:p-0">
          {food.days.map((d, i) => (
            <motion.div
              key={d.day}
              {...fadeUp(2 + i)}
              className="border-paper-deep py-2 md:border-dashed md:px-8 md:py-8 md:first:pl-8 md:last:pr-8 md:[&:not(:last-child)]:border-r"
            >
              <img
                src={`${import.meta.env.BASE_URL}img/${dayArt[i]}`}
                alt=""
                className="mb-5 h-44 w-full rounded-xl object-cover shadow-card"
                loading="lazy"
              />
              <h3 className="font-display text-xl font-semibold text-ink">{d.day}</h3>
              <ul className="mt-3 space-y-1.5 text-ink-soft">
                {d.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.p
          {...fadeUp(5)}
          className="mt-6 flex items-center gap-2 text-sm text-ink-soft"
        >
          <Utensils size={16} className="shrink-0 text-ink-soft" aria-hidden />
          {food.dietaryLine}
        </motion.p>
      </div>
    </section>
  )
}
