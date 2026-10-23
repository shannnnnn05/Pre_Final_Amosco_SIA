import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="mt-16 border-t border-coal/10 bg-coal text-cream/70">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 px-5 py-6 pb-24 sm:flex-row sm:px-8 sm:pb-6 sm:pr-48">
        <div className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-ember to-cocoa text-sm">
            🍔
          </span>
          <span className="text-sm font-bold text-cream">
            Pre_Final Burger ni Kris
          </span>
        </div>
        <div className="flex items-center gap-5 text-xs text-cream/45">
          <Link to="/about" className="transition hover:text-cream">
            About
          </Link>
          <Link to="/contact" className="transition hover:text-cream">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  )
}
