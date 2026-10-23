import { Star } from 'lucide-react'

type Props = {
  rating: number
  showValue?: boolean
}

export function Stars({ rating, showValue = true }: Props) {
  const rounded = Math.round(rating)

  return (
    <span className="inline-flex items-center gap-1">
      <span className="flex items-center gap-0.5" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-3.5 w-3.5 ${
              star <= rounded
                ? 'fill-ember text-ember'
                : 'fill-none text-coal/20'
            }`}
          />
        ))}
      </span>
      {showValue && (
        <span className="text-xs font-semibold text-coal/50">
          {rating.toFixed(1)}
        </span>
      )}
    </span>
  )
}
