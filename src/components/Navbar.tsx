import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useApp } from '../context/useApp'

const links = [
  { label: 'Home', id: 'top' },
  { label: 'Featured', id: 'featured' },
  { label: 'Menu', id: 'menu' },
  { label: 'About', path: '/about' },
  { label: 'Contact', id: 'contact' },
  { label: 'Add Burger', path: '/add' },
]

export function Navbar() {
  const { cartCount, openCart } = useApp()
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const goTo = (item: { id?: string; path?: string }) => {
    setMenuOpen(false)
    if (item.path) {
      navigate(item.path)
      window.scrollTo({ top: 0 })
      return
    }
    if (!item.id) return
    if (location.pathname !== '/') {
      navigate('/')
      window.setTimeout(() => {
        document.getElementById(item.id!)?.scrollIntoView({ behavior: 'smooth' })
      }, 120)
      return
    }
    document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className="sticky top-0 z-40 border-b border-coal/10 bg-cream/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[70px] w-full max-w-7xl items-center justify-between gap-3 px-5 sm:px-8">
        <Link to="/" className="flex shrink-0 items-center gap-2.5">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-ember to-cocoa text-lg">
            🍔
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-lg font-extrabold tracking-tight">
              Pre_Final
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-coal/45">
              Burger ni Kris
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex">
          {links.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => goTo(item)}
              className={`rounded-full px-3 py-2 text-[13px] font-semibold transition ${
                item.path && location.pathname === item.path
                  ? 'bg-coal text-cream'
                  : 'text-coal/65 hover:bg-coal/5 hover:text-coal'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openCart}
            className="relative flex items-center gap-2 rounded-full bg-gradient-to-r from-ember to-cocoa px-4 py-2.5 text-sm font-semibold text-cream transition hover:brightness-110"
          >
            <span className="text-[20px] leading-none" aria-hidden="true">
              🛒
            </span>
            <span className="hidden sm:inline">Cart</span>
            <span className="grid h-5 min-w-5 place-items-center rounded-full bg-cream px-1 text-[11px] font-bold text-ember">
              {cartCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className="grid h-10 w-10 place-items-center rounded-full border border-coal/12 bg-white text-coal lg:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-coal/10 bg-cream px-5 pb-4 pt-2 lg:hidden">
          <nav className="flex flex-col">
            {links.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => goTo(item)}
                className={`rounded-xl px-3 py-3 text-left text-sm font-semibold transition hover:bg-white ${
                  item.path && location.pathname === item.path
                    ? 'text-ember'
                    : 'text-coal/70'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
