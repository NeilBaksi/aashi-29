import { thankYou } from '../content'

export default function Footer() {
  return (
    <footer className="bg-pine px-5 py-10 text-center text-paper">
      <p className="font-display text-sm tracking-[0.2em] text-paper/70">{thankYou.cta}</p>
      <a
        href="#home"
        className="mt-4 inline-block rounded-full border border-paper/30 px-5 py-2 text-sm font-medium text-paper/90 transition-colors hover:bg-paper/10"
      >
        Back to top ↑
      </a>
    </footer>
  )
}
