import { Link } from 'react-router-dom'
import { ArrowRight, Clock, Mail, MapPin, Phone } from 'lucide-react'

const details = [
  { icon: MapPin, label: 'Visit us', value: 'Coastal Road, Sorsogon' },
  { icon: Phone, label: 'Call us', value: '0932 510 0123' },
  { icon: Mail, label: 'Email us', value: 'kristianocsoma@gmail.com' },
]

export function ContactBlock() {
  return (
    <section
      id="contact"
      className="mt-16 scroll-mt-24 overflow-hidden rounded-3xl bg-gradient-to-br from-coal via-coal to-teal px-6 py-10 sm:px-10"
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-ember">
            Contact
          </p>
          <h2 className="mt-1 font-display text-2xl font-extrabold tracking-tight text-cream sm:text-3xl">
            Every watery mouth, needs a burger!
          </h2>
          <p className="mt-3 flex items-center gap-2 text-sm text-cream/60">
            <Clock className="h-4 w-4" />
            Open daily from 1PM - 7PM.
          </p>
        </div>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 rounded-full border border-cream/25 px-5 py-2.5 text-sm font-semibold text-cream transition hover:bg-cream/10"
        >
          Message
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-3">
        {details.map((item) => (
          <div key={item.label} className="flex items-start gap-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-cream/10 text-cream">
              <item.icon className="h-4 w-4" />
            </span>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-cream/40">
                {item.label}
              </p>
              <p className="mt-1 text-sm font-semibold text-cream/85">
                {item.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
