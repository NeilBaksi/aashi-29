import { motion } from 'framer-motion'
import { Smartphone, Upload } from 'lucide-react'
import { memories, links } from '../content'
import QrCode from '../components/QrCode'

const easeOutExpo = [0.16, 1, 0.3, 1] as const

export default function Memories() {
  return (
    <section id="memories" className="grain bg-paper-card" aria-label="Memories">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: easeOutExpo }}
        className="relative z-10 mx-auto max-w-2xl px-5 py-16 text-center sm:py-20"
      >
        <h2 className="font-display text-2xl text-ink sm:text-3xl">{memories.heading}</h2>
        <p className="mt-3 text-ink-soft">{memories.blurb}</p>

        <div className="mt-8 flex flex-col items-center gap-6">
          <a
            href={links.memoriesDrive}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-[52px] items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-transform hover:scale-[1.03] active:scale-95"
          >
            <Upload size={16} aria-hidden />
            {memories.cta}
          </a>
          <QrCode />
        </div>

        <div className="mx-auto mt-10 flex max-w-md flex-col gap-3 text-left">
          <p className="flex items-start gap-3 text-sm text-ink-soft">
            <Smartphone size={18} className="mt-0.5 shrink-0 text-ink-soft" aria-hidden />
            {memories.howToIphone}
          </p>
          <p className="flex items-start gap-3 text-sm text-ink-soft">
            <Smartphone size={18} className="mt-0.5 shrink-0 text-ink-soft" aria-hidden />
            {memories.howToAndroid}
          </p>
        </div>
      </motion.div>
    </section>
  )
}
