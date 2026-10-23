import { createContext } from 'react'
import type { Burger, CartLine, NewBurger } from '../types'

export type AppValue = {
  burgers: Burger[]
  cart: CartLine[]
  categories: string[]
  cartOpen: boolean
  openCart: () => void
  closeCart: () => void
  addBurger: (next: NewBurger) => Burger
  toggleFeatured: (id: string) => void
  addToCart: (id: string, qty: number) => void
  setQty: (id: string, qty: number) => void
  removeLine: (id: string) => void
  clearCart: () => void
  cartCount: number
  cartTotal: number
  getBurger: (id: string) => Burger | undefined
}

export const AppContext = createContext<AppValue | null>(null)
