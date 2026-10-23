import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  CheckCircle2,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from 'lucide-react'
import { useApp } from '../context/useApp'
import { notify, peso } from '../lib'

export function Cart() {
  const { cart, burgers, setQty, removeLine, cartTotal, clearCart } = useApp()
  const [placed, setPlaced] = useState(false)

  const lines = cart
    .map((line) => ({
      line,
      burger: burgers.find((item) => item.id === line.id),
    }))
    .filter((entry) => entry.burger)

  const delivery = lines.length > 0 ? 49 : 0

  if (placed) {
    return (
      <div className="mx-auto max-w-xl px-5 py-24 text-center">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-teal text-cream">
          <CheckCircle2 className="h-8 w-8" />
        </span>
        <h1 className="mt-6 font-display text-4xl font-extrabold tracking-tight">
          Order placed
        </h1>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-coal px-6 py-3.5 text-sm font-semibold text-cream transition hover:bg-cocoa"
        >
          Back to the menu
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-5 pt-6 sm:px-8">
      <Link
        to="/"
        className="mb-6 inline-flex items-center gap-2 rounded-full border border-coal/12 bg-white px-4 py-2 text-sm font-semibold text-coal/60 transition hover:text-coal"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to menu
      </Link>

      <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
        Your cart
      </h1>

      {lines.length === 0 ? (
        <div className="mt-6 flex flex-col items-center gap-3 rounded-3xl border border-dashed border-coal/15 bg-white/60 px-6 py-16 text-center">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-white text-coal/30">
            <ShoppingBag className="h-7 w-7" />
          </span>
          <p className="text-lg font-bold">Cart is empty</p>
          <p className="text-sm text-coal/55">
            Pick a burger and it will show up here.
          </p>
          <Link
            to="/"
            className="mt-2 rounded-full bg-ember px-6 py-3 text-sm font-bold text-cream transition hover:bg-cocoa"
          >
            Browse burgers
          </Link>
        </div>
      ) : (
        <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_0.6fr] lg:items-start">
          <div className="space-y-3">
            {lines.map(({ line, burger }) => (
              <div
                key={line.id}
                className="flex flex-wrap items-center gap-4 rounded-2xl border border-coal/8 bg-white p-4"
              >
                <img
                  src={burger!.image}
                  alt={burger!.name}
                  className="h-20 w-20 rounded-xl object-cover"
                />
                <div className="min-w-[120px] flex-1">
                  <p className="font-display text-base font-bold">
                    {burger!.name}
                  </p>
                  <p className="mt-0.5 text-sm text-coal/50">
                    {peso(burger!.price)} each
                  </p>
                </div>

                <div className="inline-flex items-center gap-1 rounded-full border border-coal/10 bg-cream p-1">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    onClick={() => setQty(line.id, line.qty - 1)}
                    className="grid h-7 w-7 place-items-center rounded-full transition hover:bg-white"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-6 text-center text-sm font-bold">
                    {line.qty}
                  </span>
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    onClick={() =>
                      setQty(line.id, Math.min(burger!.stock, line.qty + 1))
                    }
                    className="grid h-7 w-7 place-items-center rounded-full transition hover:bg-white"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>

                <span className="w-20 text-right font-display text-lg font-bold">
                  {peso(burger!.price * line.qty)}
                </span>

                <button
                  type="button"
                  aria-label={`Remove ${burger!.name}`}
                  onClick={() => removeLine(line.id)}
                  className="grid h-8 w-8 place-items-center rounded-full text-coal/35 transition hover:bg-ember/10 hover:text-ember"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          <aside className="rounded-3xl border border-coal/8 bg-white p-6">
            <h2 className="font-display text-xl font-bold">Summary</h2>
            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between text-coal/55">
                <dt>Subtotal</dt>
                <dd>{peso(cartTotal)}</dd>
              </div>
              <div className="flex justify-between text-coal/55">
                <dt>Delivery</dt>
                <dd>{peso(delivery)}</dd>
              </div>
              <div className="flex justify-between border-t border-coal/10 pt-3 text-base font-bold">
                <dt>Total</dt>
                <dd className="text-ember">{peso(cartTotal + delivery)}</dd>
              </div>
            </dl>

            <button
              type="button"
              onClick={() => {
                clearCart()
                setPlaced(true)
                notify('Order placed')
              }}
              className="mt-6 w-full rounded-xl bg-gradient-to-r from-ember to-cocoa px-5 py-3.5 text-sm font-bold text-cream transition hover:brightness-110"
            >
              Place order
            </button>
            <p className="mt-3 text-center text-[11px] text-coal/40">
              Cash on delivery
            </p>
          </aside>
        </div>
      )}
    </div>
  )
}
