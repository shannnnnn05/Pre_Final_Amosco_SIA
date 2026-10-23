import { useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import { ImagePlus, Star, X } from 'lucide-react'
import { useApp } from '../context/useApp'
import type { Burger } from '../types'

type Props = {
  onSaved: (burger: Burger) => void
  submitLabel?: string
}

type Errors = {
  image?: string
  name?: string
  description?: string
  price?: string
  stock?: string
}

export function BurgerForm({ onSaved, submitLabel = 'Add burger' }: Props) {
  const { addBurger, categories } = useApp()
  const inputRef = useRef<HTMLInputElement>(null)
  const [image, setImage] = useState('')
  const [name, setName] = useState('')
  const [category, setCategory] = useState(categories[0] ?? 'Beef')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [stock, setStock] = useState('')
  const [featured, setFeatured] = useState(true)
  const [errors, setErrors] = useState<Errors>({})

  const pickImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setErrors((prev) => ({ ...prev, image: 'Please choose an image file.' }))
      return
    }
    if (file.size > 4 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, image: '' }))
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      setImage(String(reader.result))
      setErrors((prev) => ({ ...prev, image: undefined }))
    }
    reader.readAsDataURL(file)
  }

  const submit = (event: FormEvent) => {
    event.preventDefault()
    const next: Errors = {}
    alert('Palagay po ng mga kailangan lamanan');
    if (!image) next.image = 'Upload a photo of the burger.'
    if (name.trim().length < 2) next.name = 'Enter a burger name.'
    if (description.trim().length < 6)
      next.description = 'Add a short description.'
    const priceValue = Number(price)
    if (!price || Number.isNaN(priceValue) || priceValue <= 0)
      next.price = 'Enter a price in pesos.'
    const stockValue = Number(stock)
    if (stock === '' || Number.isNaN(stockValue) || stockValue < 0)
      next.stock = 'Enter the available stock.'

    setErrors(next)
    if (Object.keys(next).length > 0) return

    const created = addBurger({
      name,
      description,
      category: category.trim() || categories[0] || 'Beef',
      price: priceValue,
      stock: Math.floor(stockValue),
      image,
      featured,
    })
    onSaved(created)
  }

  return (
    <form onSubmit={submit} className="grid gap-5 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <span className="text-xs font-bold uppercase tracking-wider text-coal/50">
          Burger photo
        </span>
        <div
          className={`mt-2 overflow-hidden rounded-2xl border-2 border-dashed transition ${
            errors.image ? 'border-ember' : 'border-coal/20'
          }`}
        >
          {image ? (
            <div className="relative">
              <img
                src={image}
                alt="Selected burger"
                className="h-52 w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-coal/60 px-3 py-2 backdrop-blur">
                <span className="text-xs font-semibold text-cream/80">
                  Photo ready
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    className="rounded-full bg-cream/15 px-3 py-1.5 text-xs font-semibold text-cream transition hover:bg-cream/25"
                  >
                    Replace
                  </button>
                  <button
                    type="button"
                    onClick={() => setImage('')}
                    aria-label="Remove photo"
                    className="grid h-7 w-7 place-items-center rounded-full bg-ember text-cream"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="flex w-full flex-col items-center gap-2 px-6 py-10 text-center transition hover:bg-white/50"
            >
              <span className="grid h-12 w-12 place-items-center rounded-full bg-coal/5 text-coal/60">
                <ImagePlus className="h-5 w-5" />
              </span>
              <span className="text-sm font-semibold">Select a Burger's photo</span>
            </button>
          )}
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={pickImage}
          className="hidden"
        />
        {errors.image && (
          <p className="mt-1.5 text-xs font-medium text-ember">{errors.image}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="burger-name"
          className="text-xs font-bold uppercase tracking-wider text-coal/50"
        >
          Burger name
        </label>
        <input
          id="burger-name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Angel's Burger"
          className="field mt-2"
        />
        {errors.name && (
          <p className="mt-1.5 text-xs font-medium text-ember">{errors.name}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="burger-category"
          className="text-xs font-bold uppercase tracking-wider text-coal/50"
        >
          Category
        </label>
        <input
          id="burger-category"
          list="burger-categories"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          placeholder="Beef, Chicken, Veggie"
          className="field mt-2"
        />
        <datalist id="burger-categories">
          {categories.map((option) => (
            <option key={option} value={option} />
          ))}
        </datalist>
      </div>

      <div>
        <label
          htmlFor="burger-price"
          className="text-xs font-bold uppercase tracking-wider text-coal/50"
        >
          Price
        </label>
        <div className="relative mt-2">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-coal/40">
            ₱
          </span>
          <input
            id="burger-price"
            type="number"
            min="1"
            step="1"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            placeholder="0"
            className="field pl-8"
          />
        </div>
        {errors.price && (
          <p className="mt-1.5 text-xs font-medium text-ember">{errors.price}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="burger-stock"
          className="text-xs font-bold uppercase tracking-wider text-coal/50"
        >
          Stock
        </label>
        <input
          id="burger-stock"
          type="number"
          min="0"
          step="1"
          value={stock}
          onChange={(event) => setStock(event.target.value)}
          placeholder="0"
          className="field mt-2"
        />
        <p className="mt-1.5 text-xs text-coal/45">
          5 or fewer is marked as low stock.
        </p>
        {errors.stock && (
          <p className="mt-1.5 text-xs font-medium text-ember">{errors.stock}</p>
        )}
      </div>

      <div className="sm:col-span-2">
        <span className="text-xs font-bold uppercase tracking-wider text-coal/50">
          Featured
        </span>
        <button
          type="button"
          role="switch"
          aria-checked={featured}
          onClick={() => setFeatured((prev) => !prev)}
          className={`mt-2 flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
            featured
              ? 'border-teal bg-teal/10 text-teal'
              : 'border-coal/15 bg-white/60 text-coal/50'
          }`}
        >
          <span className="inline-flex items-center gap-2">
            <Star
              className="h-4 w-4"
              fill={featured ? 'currentColor' : 'none'}
            />
            {featured ? 'Show in feature products' : 'Not featured'}
          </span>
          <span
            className={`h-5 w-9 rounded-full p-0.5 transition ${
              featured ? 'bg-coal' : 'bg-coal/20'
            }`}
          >
            <span
              className={`block h-4 w-4 rounded-full bg-cream transition ${
                featured ? 'translate-x-4' : 'translate-x-0'
              }`}
            />
          </span>
        </button>
      </div>

      <div className="sm:col-span-2">
        <label
          htmlFor="burger-description"
          className="text-xs font-bold uppercase tracking-wider text-coal/50"
        >
          Description
        </label>
        <textarea
          id="burger-description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          rows={3}
          placeholder="Burger's specialty"
          className="field mt-2 resize-none"
        />
        {errors.description && (
          <p className="mt-1.5 text-xs font-medium text-ember">
            {errors.description}
          </p>
        )}
      </div>

      <div className="sm:col-span-2">
        <button
          type="submit"
          className="w-full rounded-2xl bg-ember px-6 py-4 text-sm font-bold text-cream shadow-card transition hover:bg-coal"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  )
}
