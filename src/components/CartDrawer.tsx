import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react'
import { useApp } from '../context/useApp'
import { peso } from '../lib'

export function CartDrawer() {
  const {
    cart,
    cartOpen,
    closeCart,
    burgers,
    cartTotal,
    setQty,
    removeLine,
    cartCount,
  } = useApp()
  const navigate = useNavigate()

  useEffect(() => {
    if (!cartOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeCart()
    }
    document.addEventListener('keydown', escape)
    return () => {
      document.body.style.overflow = previous
      document.removeEventListener('keydown', escape)
    }
  }, [cartOpen, closeCart])

  const lines = cart
    .map((line) => ({
      line,
      burger: burgers.find((item) => item.id === line.id),
    }))
    .filter((entry) => entry.burger)

  return (
    <div
      className={`fixed inset-0 z-50 ${cartOpen ? '' : 'pointer-events-none'}`}
      aria-hidden={!cartOpen}
    >
      <div
        onClick={closeCart}
        className={`absolute inset-0 bg-coal/45 backdrop-blur-sm transition-opacity duration-300 ${
          cartOpen ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Your cart"
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-cream shadow-2xl transition-transform duration-300 ${
          cartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-coal/10 px-5 py-5">
          <div>
            <h2 className="font-display text-xl font-extrabold">Your cart</h2>
            <p className="text-xs text-coal/50">
              {cartCount === 0
                ? 'Nothing here yet'
                : `${cartCount} ${cartCount === 1 ? 'item' : 'items'} ready to go`}
            </p>
          </div>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="grid h-9 w-9 place-items-center rounded-full border border-coal/12 bg-white text-coal/70 transition hover:text-coal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <span className="grid h-16 w-16 place-items-center rounded-full bg-white text-coal/30">
              <ShoppingBag className="h-8 w-8" />
            </span>
            <p className="text-sm text-coal/55">Your cart is empty.</p>
            <button
              type="button"
              onClick={() => {
                closeCart()
                navigate('/')
                window.setTimeout(() => {
                  document
                    .getElementById('menu')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }, 100)
              }}
              className="rounded-full bg-gradient-to-r from-ember to-cocoa px-6 py-3 text-sm font-bold text-cream transition hover:brightness-110"
            >
              Browse burgers
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-3 overflow-y-auto px-5 py-5">
              {lines.map(({ line, burger }) => (
                <div
                  key={line.id}
                  className="flex gap-3 rounded-2xl border border-coal/8 bg-white p-3"
                >
                  <img
                    src={burger!.image}
                    alt={burger!.name}
                    className="h-20 w-20 shrink-0 rounded-xl object-cover"
                  />
                  <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold">
                          {burger!.name}
                        </p>
                        <p className="text-xs text-coal/45">
                          {peso(burger!.price)} each
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeLine(line.id)}
                        aria-label={`Remove ${burger!.name}`}
                        className="text-coal/35 transition hover:text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center gap-2 rounded-full border border-coal/10 px-1 py-1">
                        <button
                          type="button"
                          onClick={() => setQty(line.id, line.qty - 1)}
                          aria-label={`Decrease ${burger!.name} quantity`}
                          className="grid h-6 w-6 place-items-center rounded-full bg-cream text-coal"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-4 text-center text-sm font-bold">
                          {line.qty}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            setQty(line.id, Math.min(burger!.stock, line.qty + 1))
                          }
                          aria-label={`Increase ${burger!.name} quantity`}
                          className="grid h-6 w-6 place-items-center rounded-full bg-coal text-cream"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <span className="text-sm font-extrabold">
                        {peso(burger!.price * line.qty)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-coal/10 bg-white/70 px-5 py-5">
              <div className="mb-1 flex items-center justify-between text-sm text-coal/55">
                <span>Subtotal</span>
                <span>{peso(cartTotal)}</span>
              </div>
              <div className="mb-4 flex items-center justify-between">
                <span className="font-display text-lg font-extrabold">Total</span>
                <span className="font-display text-lg font-extrabold text-ember">
                  {peso(cartTotal)}
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  closeCart()
                  navigate('/cart')
                  window.scrollTo({ top: 0 })
                }}
                className="w-full rounded-xl bg-gradient-to-r from-ember to-cocoa py-3.5 text-sm font-bold text-cream transition hover:brightness-110"
              >
                Checkout · {peso(cartTotal)}
              </button>
              <div className="mt-2 flex gap-2">
                <button
                  type="button"
                  onClick={closeCart}
                  className="flex-1 rounded-xl border border-coal/12 py-3 text-sm font-semibold text-coal/60 transition hover:text-coal"
                >
                  Keep browsing
                </button>
                <Link
                  to="/cart"
                  onClick={closeCart}
                  className="flex-1 rounded-xl border border-coal/12 py-3 text-center text-sm font-semibold text-coal/60 transition hover:text-coal"
                >
                  View cart
                </Link>
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}
