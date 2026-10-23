import { useEffect } from 'react'
import { X } from 'lucide-react'
import { BurgerForm } from './BurgerForm'
import type { Burger } from '../types'

type Props = {
  open: boolean
  onClose: () => void
  onSaved: (burger: Burger) => void
}

export function AddBurgerModal({ open, onClose, onSaved }: Props) {
  useEffect(() => {
    if (!open) return
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', escape)
    return () => {
      document.body.style.overflow = previous
      document.removeEventListener('keydown', escape)
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-coal/45 p-0 backdrop-blur-md sm:items-center sm:p-6"
      onClick={onClose}
      role="presentation"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Add a burger"
        className="max-h-[94vh] w-full max-w-2xl animate-pop overflow-y-auto rounded-t-[32px] border border-coal/10 bg-cream p-6 shadow-lift sm:rounded-[32px] sm:p-8"
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2 className="mt-1 font-display text-3xl font-extrabold tracking-tight">
              Add a burger
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close form"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-coal/15 bg-white/70 text-coal/60 transition hover:border-coal/40 hover:text-coal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <BurgerForm
          onSaved={(burger) => {
            onSaved(burger)
            onClose()
          }}
        />
      </div>
    </div>
  )
}
