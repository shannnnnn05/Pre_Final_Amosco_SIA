import { useNavigate } from 'react-router-dom'
import { Plus, Star } from 'lucide-react'
import type { Burger } from '../types'
import { isLowStock, peso } from '../lib'
import { useApp } from '../context/useApp'
import { Stars } from './Stars'

type Props = {
  burger: Burger
}

export function BurgerCard({ burger }: Props) {
  const navigate = useNavigate()
  const { addToCart, toggleFeatured } = useApp()

  return (
    <article
      id={`burger-${burger.id}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-coal/10 bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-lift">
      <button
        type="button"
        onClick={() => navigate(`/burger/${burger.id}`)}
        aria-label={`View ${burger.name}`}
        className="relative block aspect-[4/3] w-full bg-sand text-left"
      >
        <img
          src={burger.image}
          alt={burger.name}
          className="block h-full w-full rounded-t-2xl object-cover"
        />
        <span className="absolute left-3 top-3 rounded-full bg-coal/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-cream">
          {burger.category}
        </span>
        {isLowStock(burger.stock) && (
          <span className="absolute bottom-3 left-3 rounded-full bg-berry px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-cream">
            Low stock
          </span>
        )}
      </button>

      <button
        type="button"
        onClick={() => toggleFeatured(burger.id)}
        aria-label={burger.featured ? 'Remove from featured' : 'Add to featured'}
        className={`absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full border shadow-sm backdrop-blur transition ${
          burger.featured
            ? 'border-teal bg-teal text-cream'
            : 'border-white/60 bg-white/80 text-coal/40 hover:text-coal'
        }`}
      >
        <Star
          className="h-3.5 w-3.5"
          fill={burger.featured ? 'currentColor' : 'none'}
        />
      </button>

      <div className="flex flex-1 flex-col gap-1.5 p-3 sm:gap-2 sm:p-4">
        <div className="flex flex-col gap-0.5 sm:flex-row sm:items-start sm:justify-between sm:gap-2">
          <button
            type="button"
            onClick={() => navigate(`/burger/${burger.id}`)}
            className="text-left font-display text-sm font-bold leading-snug hover:text-ember sm:text-base"
          >
            {burger.name}
          </button>
          <span className="shrink-0 font-display text-sm font-extrabold text-ember sm:text-base">
            {peso(burger.price)}
          </span>
        </div>

        <p className="hidden line-clamp-2 text-xs leading-relaxed text-coal/55 sm:block sm:text-sm">
          {burger.description}
        </p>

        <div className="mt-auto flex items-center justify-between gap-1.5 pt-2 sm:gap-2 sm:pt-3">
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-1">
              <Stars rating={burger.rating} showValue={false} />
              <span className="hidden text-xs font-semibold text-coal/50 sm:inline">
                {burger.rating.toFixed(1)}
              </span>
            </div>
            <span
              className={`text-[10px] font-semibold sm:text-[11px] ${
                isLowStock(burger.stock) ? 'text-berry' : 'text-coal/40'
              }`}
            >
              {burger.stock} in stock
            </span>
          </div>
          <button
            type="button"
            onClick={() => addToCart(burger.id, 1)}
            disabled={burger.stock === 0}
            aria-label={`Add ${burger.name} to cart`}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-ember text-cream transition hover:bg-cocoa disabled:cursor-not-allowed disabled:opacity-40 sm:h-9 sm:w-9"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
    </article>
  )
}
