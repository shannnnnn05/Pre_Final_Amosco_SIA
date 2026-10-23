export type Burger = {
  id: string
  name: string
  description: string
  category: string
  price: number
  stock: number
  rating: number
  sold: number
  dateAdded: string
  createdAt?: string
  image: string
  featured: boolean
}

export type SortKey = 'best' | 'name' | 'price' | 'stock' | 'date' | 'rating'

export type CartLine = {
  id: string
  qty: number
}

export type NewBurger = {
  name: string
  description: string
  category: string
  price: number
  stock: number
  image: string
  featured: boolean
}
