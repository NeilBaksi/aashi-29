import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, MapPin } from 'lucide-react'
import clsx from 'clsx'
import { nav, address } from '../content'

/**
 * Sticky header. Desktop: inline nav + a persistent "Directions" pill. Mobile:
 * compact bar that opens a full-screen sheet with big tap targets. Tracks the
 * section currently in view via IntersectionObserver and underlines it.
 */
export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState<string>('home')
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = nav
      .map((n) => document.getElementById(n.id))
      .filter((el): el is HTMLElement => el !== null)

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
    )
    sections.forEach((el) => observerRef.current?.observe(el))
    return () => observerRef.current?.disconnect()
  }, [])

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={clsx(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-out-expo',
        scrolled ? 'bg-paper/90 backdrop-blur-md shadow-card' : 'bg-transparent',
      )}
    >
      <div
        className={clsx(
          'mx-auto flex max-w-6xl items-center justify-between px-5 transition-all duration-300',
          scrolled ? 'py-3' : 'py-5',
        )}
      >
        <a
          href="#home"
          className="font-display text-lg font-semibold text-ink tracking-tight"
          onClick={() => setOpen(false)}
        >
          Twenty-Fine
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {nav.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className={clsx(
                'relative py-1 text-sm font-medium text-ink-soft transition-colors hover:text-ink',
                active === n.id && 'text-ink',
              )}
            >
              {n.label}
              {active === n.id && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-apricot-deep"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
            </a>
          ))}
          <a
            href={address.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-sm font-medium text-paper transition-transform hover:scale-[1.03] active:scale-95"
          >
            <MapPin size={15} aria-hidden />
            Directions
          </a>
        </nav>

        {/* Mobile trigger */}
        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-full text-ink md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile full-screen sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 top-0 z-40 flex flex-col bg-paper pt-24 md:hidden"
          >
            <nav className="flex flex-1 flex-col gap-1 px-6">
              {nav.map((n, i) => (
                <motion.a
                  key={n.id}
                  href={`#${n.id}`}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className={clsx(
                    'min-h-[56px] border-b border-paper-deep py-4 font-display text-2xl',
                    active === n.id ? 'text-ink' : 'text-ink-soft',
                  )}
                >
                  {n.label}
                </motion.a>
              ))}
            </nav>
            <a
              href={address.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="m-6 flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-ink text-paper font-medium"
              onClick={() => setOpen(false)}
            >
              <MapPin size={18} aria-hidden />
              Get directions
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
