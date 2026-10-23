import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Minus, Plus, Star, Truck } from 'lucide-react'
import { useApp } from '../context/useApp'
import { isLowStock, notify, peso, shortDate } from '../lib'
import { Stars } from '../components/Stars'

export function BurgerPage() {
  const { id } = useParams()
  const { burgers, getBurger, addToCart, openCart } = useApp()
  const burger = id ? getBurger(id) : undefined
  const [qty, setQty] = useState(1)
  const navigate = useNavigate()

  if (!burger) {
    return (
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-4 px-5 py-24 text-center">
        <span className="text-4xl">🍔</span>
        <p className="font-display text-3xl font-extrabold">Burger not found</p>
        <p className="max-w-sm text-sm text-coal/55">
          This burger may have been removed from the menu.
        </p>
        <Link
          to="/"
          className="mt-2 rounded-full bg-ember px-6 py-3 text-sm font-bold text-cream transition hover:bg-cocoa"
        >
          Back to the menu
        </Link>
      </div>
    )
  }

  const related = burgers
    .filter((item) => item.category === burger.category && item.id !== burger.id)
    .slice(0, 3)

  return (
    <div className="mx-auto w-full max-w-7xl px-5 pt-6 sm:px-8">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mb-6 inline-flex items-center gap-2 rounded-full border border-coal/12 bg-white px-4 py-2 text-sm font-semibold text-coal/60 transition hover:text-coal"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>

      <nav className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-coal/40">
        <Link to="/" className="transition hover:text-ember">
          Home
        </Link>
        <span>/</span>
        <span className="text-coal/60">{burger.category}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
        <div className="overflow-hidden rounded-[28px] border border-coal/8 bg-white">
          <img
            src={burger.image}
            alt={burger.name}
            className="aspect-[4/3] w-full object-cover"
          />
        </div>

        <div className="lg:py-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex rounded-full bg-ember/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-ember">
              {burger.category}
            </span>
            {burger.featured && (
              <span className="inline-flex items-center gap-1 rounded-full bg-teal/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-teal">
                <Star className="h-3 w-3 fill-teal" />
                Featured
              </span>
            )}
            <span
              className={`inline-flex rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] ${
                isLowStock(burger.stock)
                  ? 'bg-berry/10 text-berry'
                  : 'bg-coal/5 text-coal/50'
              }`}
            >
              {isLowStock(burger.stock) ? 'Low stock' : 'In stock'}
            </span>
          </div>

          <h1 className="mt-3 font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
            {burger.name}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-4">
            <Stars rating={burger.rating} />
            <span className="text-xs text-coal/40">
              {burger.sold} sold · Added {shortDate(burger.dateAdded)}
            </span>
          </div>

          <p className="mt-5 text-base leading-relaxed text-coal/65">
            {burger.description}
          </p>

          <div className="mt-7 flex flex-wrap items-end justify-between gap-4 rounded-2xl bg-white p-5">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-coal/40">
                Price
              </p>
              <p className="font-display text-3xl font-extrabold">
                {peso(burger.price)}
              </p>
              <p
                className={`mt-1 text-xs font-semibold ${
                  isLowStock(burger.stock) ? 'text-berry' : 'text-coal/45'
                }`}
              >
                {burger.stock} in stock
              </p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-coal/40">
                Quantity
              </span>
              <div className="flex items-center gap-3 rounded-full border border-coal/10 bg-cream px-2 py-1.5">
                <button
                  type="button"
                  onClick={() => setQty((value) => Math.max(1, value - 1))}
                  aria-label="Decrease quantity"
                  className="grid h-8 w-8 place-items-center rounded-full bg-white text-coal shadow-sm"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-5 text-center font-display text-base font-extrabold">
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setQty((value) => Math.min(burger.stock || 1, value + 1))
                  }
                  disabled={qty >= burger.stock}
                  aria-label="Increase quantity"
                  className="grid h-8 w-8 place-items-center rounded-full bg-coal text-cream disabled:opacity-30"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              disabled={burger.stock === 0}
              onClick={() => {
                addToCart(burger.id, qty)
                notify(`${qty} × ${burger.name} added to cart`)
                openCart()
              }}
              className="flex-1 rounded-xl bg-gradient-to-r from-ember to-cocoa px-6 py-4 text-sm font-bold text-cream transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Add to cart · {peso(burger.price * qty)}
            </button>
            <Link
              to="/"
              className="flex items-center justify-center gap-2 rounded-xl border border-coal/12 bg-white px-6 py-4 text-sm font-semibold text-coal/60 transition hover:text-coal"
            >
              Explore more
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <p className="mt-4 inline-flex items-center gap-2 text-xs text-coal/45">
            <Truck className="h-4 w-4" />
            Delivered in 25–35 minutes
          </p>

          <dl className="mt-7 grid grid-cols-2 gap-4 border-t border-coal/10 pt-6 text-sm">
            <div>
              <dt className="text-[11px] font-bold uppercase tracking-[0.14em] text-coal/35">
                Category
              </dt>
              <dd className="mt-1 font-semibold text-coal/75">
                {burger.category}
              </dd>
            </div>
            <div>
              <dt className="text-[11px] font-bold uppercase tracking-[0.14em] text-coal/35">
                Date added
              </dt>
              <dd className="mt-1 font-semibold text-coal/75">
                {shortDate(burger.dateAdded)}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display text-xl font-extrabold">
            More from {burger.category}
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <Link
                key={item.id}
                to={`/burger/${item.id}`}
                className="group flex items-center gap-4 rounded-2xl border border-coal/8 bg-white p-3 transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-20 w-20 rounded-xl object-cover"
                />
                <div className="min-w-0">
                  <p className="truncate font-display text-sm font-bold group-hover:text-ember">
                    {item.name}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-ember">
                    {peso(item.price)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
