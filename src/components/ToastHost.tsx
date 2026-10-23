import { useEffect, useState } from 'react'
import { Check } from 'lucide-react'

export function ToastHost() {
  const [message, setMessage] = useState('')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let timer = 0
    const handler = (event: Event) => {
      const detail = (event as CustomEvent<string>).detail
      setMessage(detail)
      setVisible(true)
      window.clearTimeout(timer)
      timer = window.setTimeout(() => setVisible(false), 2600)
    }
    window.addEventListener('prefinal:toast', handler)
    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('prefinal:toast', handler)
    }
  }, [])

  return (
    <div
      className={`pointer-events-none fixed bottom-6 left-1/2 z-[60] -translate-x-1/2 transition duration-300 ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}
    >
      <div className="inline-flex items-center gap-2 rounded-full bg-coal px-5 py-3 text-sm font-semibold text-cream shadow-lift">
        <span className="grid h-5 w-5 place-items-center rounded-full bg-teal text-cream">
          <Check className="h-3.5 w-3.5" />
        </span>
        {message}
      </div>
    </div>
  )
}
