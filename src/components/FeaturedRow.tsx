import { Link } from 'react-router-dom'
import { useApp } from '../context/useApp'
import { peso } from '../lib'
import { Stars } from './Stars'

export function FeaturedRow() {
  const { burgers } = useApp()
  const featured = burgers.filter((item) => item.featured)

  return (
    <section id="featured" className="scroll-mt-24">
      <div className="mb-6">
        <h2 className="mt-1 font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
          Featured Burgers
        </h2>
      </div>

      {featured.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-coal/15 bg-white/60 px-6 py-16 text-center text-sm text-coal/50">
          No featured burgers yet.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {featured.map((burger) => (
            <Link
              key={burger.id}
              to={`/burger/${burger.id}`}
              className="group overflow-hidden rounded-2xl border border-coal/10 bg-white transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative aspect-[5/4] bg-sand">
                <img
                  src={burger.image}
                  alt={burger.name}
                          className="block h-full w-full rounded-t-2xl object-cover"
                />
                <span className="absolute left-3 top-3 rounded-full bg-coal/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-cream">
                  {burger.category}
                </span>
              </div>
              <div className="flex flex-col gap-1.5 p-3 sm:p-4">
                <h3 className="text-sm font-bold leading-snug group-hover:text-ember">
                  {burger.name}
                </h3>
                <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
                  <Stars rating={burger.rating} showValue={false} />
                  <span className="text-sm font-extrabold text-ember">
                    {peso(burger.price)}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      <div className="mt-4 flex justify-end pr-16 sm:pr-44">
        <button
          type="button"
          onClick={() =>
            document
              .getElementById('menu')
              ?.scrollIntoView({ behavior: 'smooth' })
          }
          className="text-sm font-semibold text-coal/60 transition hover:text-teal"
        >
          View the full menu
        </button>
      </div>
    </section>
  )
}
