import { sortOptions } from '../data'
import type { SortKey } from '../types'

type Props = {
  value: SortKey
  onChange: (next: SortKey) => void
}

export function SortBox({ value, onChange }: Props) {
  return (
    <label className="flex items-center gap-2 rounded-full border border-coal/12 bg-white px-4 py-2 shadow-sm">
      <span className="text-xs font-semibold uppercase tracking-[0.12em] text-teal/70">
        Sort
      </span>
      <span className="h-4 w-px bg-coal/10" aria-hidden="true" />
      <select
        value={value}
        onChange={(event) => onChange(event.target.value as SortKey)}
        aria-label="Sort burgers by"
        className="cursor-pointer bg-transparent pr-1 text-sm font-semibold text-coal outline-none"
      >
        {sortOptions.map((option) => (
          <option key={option.key} value={option.key}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  )
}
