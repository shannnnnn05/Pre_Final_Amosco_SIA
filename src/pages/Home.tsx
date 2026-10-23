import { useState } from 'react'
import { Hero } from '../components/Hero'
import { FeaturedRow } from '../components/FeaturedRow'
import { MenuSection } from '../components/MenuSection'
import { ContactBlock } from '../components/ContactBlock'
import { AddBurgerFab } from '../components/AddBurgerFab'
import { AddBurgerModal } from '../components/AddBurgerModal'
import { useApp } from '../context/useApp'
import { notify } from '../lib'
import type { Burger, SortKey } from '../types'

export function Home() {
  const { burgers, categories } = useApp()
  const [sort, setSort] = useState<SortKey>('date')
  const [category, setCategory] = useState('All')
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState(false)

  const handleSaved = (burger: Burger) => {
    setSort('date')
    setCategory('All')
    setExpanded(true)
    notify(`${burger.name} is now on the menu`)
    window.setTimeout(() => {
      document
        .getElementById(`burger-${burger.id}`)
        ?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 200)
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-5 pt-6 sm:px-8">
      <Hero />

      <div className="mt-12">
        <FeaturedRow />
      </div>

      <MenuSection
        burgers={burgers}
        categories={categories}
        sort={sort}
        onSort={(next) => {
          setSort(next)
          setExpanded(false)
        }}
        category={category}
        onCategory={setCategory}
        expanded={expanded}
        onExpand={setExpanded}
      />

      <ContactBlock />

      <AddBurgerFab onClick={() => setOpen(true)} />
      <AddBurgerModal
        open={open}
        onClose={() => setOpen(false)}
        onSaved={handleSaved}
      />
    </div>
  )
}
