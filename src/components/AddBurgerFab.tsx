import { Plus } from 'lucide-react'

export function AddBurgerFab({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group fixed bottom-6 right-5 z-30 inline-flex h-14 w-14 items-center justify-center gap-2 rounded-full bg-gradient-to-br from-ember to-cocoa text-sm font-bold text-cream shadow-[0_18px_35px_-12px_rgba(232,89,12,0.85)] transition hover:-translate-y-0.5 hover:brightness-110 sm:bottom-7 sm:right-7 sm:h-auto sm:w-auto sm:justify-start sm:px-5 sm:py-3.5"
    >
      <span className="grid h-7 w-7 place-items-center rounded-full bg-cream/20 transition group-hover:rotate-90 sm:h-6 sm:w-6">
        <Plus className="h-4 w-4" />
      </span>
      <span className="hidden sm:inline">Add new Burger</span>
    </button>
  )
}
