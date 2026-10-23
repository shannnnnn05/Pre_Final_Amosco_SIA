import { Link } from 'react-router-dom'
import { ArrowRight, Flame, Leaf, Timer } from 'lucide-react'
import ultimateBacon from '../assets/ultimate-bacon.jpg'
import crispyChicken from '../assets/crispy-chicken.jpg'
import blackSheep from '../assets/black-sheep.jpg'

const values = [
  {
    icon: Flame,
    title: 'Well Grilled',
    text: 'Mapapa Giling ka sa sarap.',
  },
  {
    icon: Leaf,
    title: 'Fresh ingredients',
    text: 'Healthy and fresh ingredients.  ',
  },
  {
    icon: Timer,
    title: 'Fast service',
    text: 'At your door in 15 to 20 minutes.',
  },
]

export function About() {
  return (
    <div className="mx-auto w-full max-w-7xl px-5 pt-6 sm:px-8">
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-teal">
        About us
      </p>
      <h1 className="mt-2 max-w-2xl font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
        Burger Web App ni Kris
      </h1>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        <div className="overflow-hidden rounded-3xl sm:col-span-2">
          <img
            src={ultimateBacon}
            alt="Burger on the grill"
            className="h-full min-h-64 w-full object-cover"
          />
        </div>
        <div className="grid gap-4 sm:grid-rows-2">
          <img
            src={crispyChicken}
            alt="Chicken burger"
            className="h-40 w-full rounded-3xl object-cover sm:h-full"
          />
          <img
            src={blackSheep}
            alt="Truffle burger"
            className="h-40 w-full rounded-3xl object-cover sm:h-full"
          />
        </div>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-3">
        {values.map((value) => (
          <div
            key={value.title}
            className="rounded-2xl border border-coal/8 bg-white p-6"
          >
            <span className="grid h-10 w-10 place-items-center rounded-full bg-ember/10 text-ember">
              <value.icon className="h-5 w-5" />
            </span>
            <h2 className="mt-4 font-display text-lg font-bold">
              {value.title}
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-coal/55">
              {value.text}
            </p>
          </div>
        ))}
      </div>

      <Link
        to="/"
        className="mt-10 inline-flex items-center gap-2 rounded-full bg-coal px-6 py-3.5 text-sm font-semibold text-cream transition hover:bg-cocoa"
      >
        See the menu
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  )
}
