import { useMemo } from 'react'
import { ChevronUp, Plus } from 'lucide-react'
import type { Burger, SortKey } from '../types'
import { BurgerCard } from './BurgerCard'
import { SortBox } from './SortBox'

type Props = {
  burgers: Burger[]
  categories: string[]
  sort: SortKey
  onSort: (next: SortKey) => void
  category: string
  onCategory: (next: string) => void
  expanded: boolean
  onExpand: (next: boolean) => void
}

export function MenuSection({
  burgers,
  categories,
  sort,
  onSort,
  category,
  onCategory,
  expanded,
  onExpand,
}: Props) {
  const sorted = useMemo(() => {
    const filtered =
      category === 'All'
        ? burgers
        : burgers.filter((item) => item.category === category)
    const list = [...filtered]
    if (sort === 'name') list.sort((a, b) => a.name.localeCompare(b.name))
    if (sort === 'price') list.sort((a, b) => a.price - b.price)
    if (sort === 'stock') list.sort((a, b) => a.stock - b.stock)
    if (sort === 'rating') list.sort((a, b) => b.rating - a.rating)
    if (sort === 'best') list.sort((a, b) => b.sold - a.sold)
    if (sort === 'date')
      list.sort((a, b) => {
        if (a.createdAt && b.createdAt)
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
        if (a.createdAt) return -1
        if (b.createdAt) return 1
        return (
          new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
        )
      })
    return list
  }, [burgers, category, sort])

  const visible = expanded ? sorted : sorted.slice(0, 4)
  const remaining = sorted.length - visible.length

  return (
    <section id="menu" className="mt-16 scroll-mt-24">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-teal">
            Menu
          </span>
          <h2 className="mt-1 font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
            Our burgers
          </h2>
          <p className="mt-1.5 text-sm text-coal/55">
            {visible.length} of {sorted.length} burgers shown.
          </p>
        </div>
        <SortBox value={sort} onChange={onSort} />
      </div>

      <div className="no-bar mt-6 flex gap-2 overflow-x-auto pb-1">
        {['All', ...categories].map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => {
              onCategory(item)
              onExpand(false)
            }}
            className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition ${
              category === item
                ? 'border-teal bg-teal text-cream'
                : 'border-coal/10 bg-white text-coal/60 hover:border-teal/50 hover:text-teal'
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {sorted.length === 0 ? (
        <div className="mt-8 flex flex-col items-center gap-3 rounded-3xl border border-dashed border-coal/15 bg-white/60 px-6 py-16 text-center">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-sand text-2xl">
            🍔
          </span>
          <p className="text-lg font-bold">No burgers in this category yet</p>
          <p className="max-w-sm text-sm text-coal/55">
            Pick another category or add a new burger.
          </p>
        </div>
      ) : (
        <>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {visible.map((burger) => (
              <BurgerCard key={burger.id} burger={burger} />
            ))}
          </div>

          {(remaining > 0 || expanded) && (
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => onExpand(!expanded)}
                className="inline-flex items-center gap-2 rounded-full border border-coal/15 bg-white px-6 py-3 text-sm font-bold text-coal transition hover:border-teal hover:text-teal"
              >
                {expanded ? (
                  <>
                    Show less
                    <ChevronUp className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4" />
                    View more ({remaining})
                  </>
                )}
              </button>
            </div>
          )}
        </>
      )}
    </section>
  )
}
