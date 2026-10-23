import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { burgersSeed } from '../data'
import { todayStamp } from '../lib'
import type { Burger, CartLine, NewBurger } from '../types'
import { AppContext } from './AppContext'

const storageKey = 'pre-final-amosco-data-v2'
const legacyKey = 'pre-final-amosco-data-v1'

type Stored = {
  added: Burger[]
  cart: CartLine[]
  featured: Record<string, boolean>
}

const isUserBurger = (item: Burger) => item.id.startsWith('burger-')

const readLegacy = (): Stored => {
  try {
    const raw = localStorage.getItem(legacyKey)
    localStorage.removeItem(legacyKey)
    if (!raw) return { added: [], cart: [], featured: {} }
    const parsed = JSON.parse(raw) as {
      burgers?: Burger[]
      cart?: CartLine[]
    }
    const added = Array.isArray(parsed.burgers)
      ? parsed.burgers.filter(
          (item) =>
            isUserBurger(item) &&
            typeof item.image === 'string' &&
            item.image.startsWith('data:'),
        )
      : []
    return {
      added,
      cart: Array.isArray(parsed.cart) ? parsed.cart : [],
      featured: {},
    }
  } catch {
    return { added: [], cart: [], featured: {} }
  }
}

const readStored = (): Stored => {
  try {
    const raw = localStorage.getItem(storageKey)
    if (!raw) return readLegacy()
    const parsed = JSON.parse(raw) as Partial<Stored>
    return {
      added: Array.isArray(parsed.added)
        ? parsed.added.filter(isUserBurger)
        : [],
      cart: Array.isArray(parsed.cart) ? parsed.cart : [],
      featured:
        parsed.featured && typeof parsed.featured === 'object'
          ? parsed.featured
          : {},
    }
  } catch {
    return { added: [], cart: [], featured: {} }
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [stored, setStored] = useState<Stored>(readStored)
  const [cartOpen, setCartOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(stored))
  }, [stored])

  const burgers = useMemo(
    () =>
      [...stored.added, ...burgersSeed].map((item) => ({
        ...item,
        featured: stored.featured[item.id] ?? item.featured,
      })),
    [stored.added, stored.featured],
  )

  const addBurger = (next: NewBurger) => {
    const fresh: Burger = {
      id: `burger-${Date.now()}`,
      name: next.name.trim(),
      description: next.description.trim(),
      category: next.category.trim() || 'Beef',
      price: next.price,
      stock: next.stock,
      image: next.image,
      featured: next.featured,
      rating: 4.5,
      sold: 0,
      dateAdded: todayStamp(),
      createdAt: new Date().toISOString(),
    }
    setStored((prev) => ({ ...prev, added: [fresh, ...prev.added] }))
    return fresh
  }

  const toggleFeatured = (id: string) => {
    const current = burgers.find((item) => item.id === id)
    if (!current) return
    setStored((prev) => ({
      ...prev,
      featured: { ...prev.featured, [id]: !current.featured },
    }))
  }

  const addToCart = (id: string, qty: number) => {
    setStored((prev) => {
      const found = prev.cart.find((line) => line.id === id)
      const cart = found
        ? prev.cart.map((line) =>
            line.id === id ? { ...line, qty: line.qty + qty } : line,
          )
        : [...prev.cart, { id, qty }]
      return { ...prev, cart }
    })
  }

  const setQty = (id: string, qty: number) => {
    setStored((prev) => ({
      ...prev,
      cart: prev.cart
        .map((line) => (line.id === id ? { ...line, qty } : line))
        .filter((line) => line.qty > 0),
    }))
  }

  const removeLine = (id: string) => {
    setStored((prev) => ({
      ...prev,
      cart: prev.cart.filter((line) => line.id !== id),
    }))
  }

  const clearCart = () => {
    setStored((prev) => ({ ...prev, cart: [] }))
  }

  const cartCount = stored.cart.reduce((sum, line) => sum + line.qty, 0)

  const cartTotal = useMemo(
    () =>
      stored.cart.reduce((sum, line) => {
        const burger = burgers.find((item) => item.id === line.id)
        return sum + (burger ? burger.price * line.qty : 0)
      }, 0),
    [stored.cart, burgers],
  )

  const categories = useMemo(() => {
    const found = Array.from(
      new Set(burgers.map((item) => item.category).filter(Boolean)),
    )
    return found.length > 0 ? found : ['Beef']
  }, [burgers])

  const getBurger = (id: string) =>
    burgers.find((item) => item.id === id)

  return (
    <AppContext.Provider
      value={{
        burgers,
        cart: stored.cart,
        categories,
        cartOpen,
        openCart: () => setCartOpen(true),
        closeCart: () => setCartOpen(false),
        addBurger,
        toggleFeatured,
        addToCart,
        setQty,
        removeLine,
        clearCart,
        cartCount,
        cartTotal,
        getBurger,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
