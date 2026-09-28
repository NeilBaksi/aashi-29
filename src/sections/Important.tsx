import { motion } from 'framer-motion'
import { houseRules, people, thankYou } from '../content'

const easeOutExpo = [0.16, 1, 0.3, 1] as const

export default function Important() {
  return (
    <section id="important" aria-label="The Important Stuff">
      {/* House rules — numbered, big-type, staggered reveal */}
      <div className="mx-auto max-w-2xl px-5 py-16 sm:py-20">
        <h2 className="font-display text-2xl text-ink sm:text-3xl">{houseRules.heading}</h2>
        <ol className="mt-8 list-none divide-y divide-paper-deep">
          {houseRules.rules.map((rule, i) => (
            <motion.li
              key={rule}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: easeOutExpo, delay: i * 0.06 }}
              className="py-4 font-display text-xl text-ink sm:text-2xl"
            >
              {rule}
            </motion.li>
          ))}
        </ol>
      </div>

      {/* The people — flowing, dot-separated, gentle stagger + hover-scale */}
      <div className="grain bg-paper-card">
        <div className="relative z-10 mx-auto max-w-3xl px-5 py-16 text-center sm:py-20">
          <h2 className="font-display text-2xl text-ink sm:text-3xl">{people.heading}</h2>
          <p className="mt-2 text-sm font-medium uppercase tracking-[0.2em] text-ink-soft">
            {people.subheading}
          </p>
          <div className="mt-8 flex flex-wrap items-baseline justify-center gap-x-1.5 gap-y-3">
            {people.names.map((name, i) => (
              <span key={name} className="flex items-baseline gap-1.5">
                <motion.span
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, ease: easeOutExpo, delay: i * 0.05 }}
                  className="inline-block font-display text-lg text-ink transition-transform duration-200 hover:scale-110 sm:text-xl"
                >
                  {name}
                </motion.span>
                {i < people.names.length - 1 && (
                  <span aria-hidden="true" className="text-ink-soft/50">
                    ·
                  </span>
                )}
              </span>
            ))}
          </div>
          <p className="mt-8 text-ink-soft">{people.closing}</p>
        </div>
      </div>

      {/* Thank you — emotional close before Memories, pine after-dark band */}
      <div className="grain bg-pine text-paper">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: easeOutExpo }}
          className="relative z-10 mx-auto max-w-xl px-5 py-16 text-center sm:py-24"
        >
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-paper/70">
            {thankYou.heading}
          </p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl">{thankYou.subheading}</h2>
          <p className="mt-6 text-paper/85">{thankYou.body}</p>
          <p className="mt-2 text-paper/70">{thankYou.body2}</p>
          <p className="mt-8 font-display text-base tracking-[0.15em] text-apricot">
            {thankYou.cta}
          </p>
          {/* Bookends the hero's brush-script moment — same voice, last word. */}
          <p className="mt-4 font-script text-5xl text-paper">{thankYou.signature}</p>
        </motion.div>
      </div>
    </section>
  )
}
