import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { BurgerForm } from '../components/BurgerForm'
import { notify } from '../lib'

export function AddProduct() {
  const navigate = useNavigate()

  return (
    <div className="mx-auto w-full max-w-5xl px-5 pt-6 sm:px-8">
      <Link
        to="/"
        className="mb-6 inline-flex items-center gap-2 rounded-full border border-coal/12 bg-white px-4 py-2 text-sm font-semibold text-coal/60 transition hover:text-coal"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to menu
      </Link>

      <div className="mb-8">
        <h1 className="mt-1 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
          Add a new burger
        </h1>
      </div>

      <div className="rounded-[28px] border border-coal/8 bg-white p-5 sm:p-7">
        <BurgerForm
          submitLabel="Save product"
          onSaved={(burger) => {
            notify(`${burger.name} is now on the menu`)
            navigate('/')
          }}
        />
      </div>
    </div>
  )
}
