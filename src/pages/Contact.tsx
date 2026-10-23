import { useState, type FormEvent } from 'react'
import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import { notify } from '../lib'

const details = [
  { icon: MapPin, label: 'Address', value: 'Balogo, Sorsogon City' },
  { icon: Phone, label: 'Phone', value: '0932 510 0123' },
  { icon: Mail, label: 'Email', value: 'kristianocsoma@gmail.com' },
  { icon: Clock, label: 'Hours', value: 'Daily, 1PM - 7PM' },
]

export function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const submit = (event: FormEvent) => {
    event.preventDefault()
    if (!name.trim() || !email.trim() || !message.trim()) {
      alert('Palagyan na lang po ng laman');
      return;
    }
    setError('')
    setName('')
    setEmail('')
    setMessage('')
    notify('Message sent')
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-5 pt-6 sm:px-8">
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-teal">
        Contact
      </p>
      <h1 className="mt-2 font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
        Talk to us.
      </h1>
      <p className="mt-3 max-w-md text-base text-coal/60">
        Questions? Message us.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="rounded-3xl bg-gradient-to-br from-coal via-coal to-cocoa p-7 text-cream">
          <h2 className="font-display text-xl font-bold">Find us</h2>
          <ul className="mt-6 space-y-5">
            {details.map((item) => (
              <li key={item.label} className="flex items-start gap-3">
                <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-cream/10">
                  <item.icon className="h-4 w-4" />
                </span>
                <span>
                  <span className="block text-[10px] font-bold uppercase tracking-widest text-cream/45">
                    {item.label}
                  </span>
                  <span className="mt-0.5 block text-sm text-cream/90">
                    {item.value}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <form
          onSubmit={submit}
          className="rounded-3xl border border-coal/8 bg-white p-7"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="contact-name"
                className="text-xs font-bold uppercase tracking-wider text-coal/50"
              >
                Name
              </label>
              <input
                id="contact-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="field mt-2"
                placeholder="Kristian Amosco"
              />
            </div>
            <div>
              <label
                htmlFor="contact-email"
                className="text-xs font-bold uppercase tracking-wider text-coal/50"
              >
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="field mt-2"
                placeholder=""
              />
            </div>
          </div>

          <div className="mt-4">
            <label
              htmlFor="contact-message"
              className="text-xs font-bold uppercase tracking-wider text-coal/50"
            >
              Message
            </label>
            <textarea
              id="contact-message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              rows={5}
              className="field mt-2 resize-none"
              placeholder=""
            />
          </div>

          {error && (
            <p className="mt-3 text-xs font-medium text-ember">{error}</p>
          )}

          <button
            type="submit"
            className="mt-5 w-full rounded-xl bg-gradient-to-r from-ember to-cocoa px-6 py-3.5 text-sm font-bold text-cream transition hover:brightness-110"
          >
            Send message
          </button>
        </form>
      </div>
    </div>
  )
}
