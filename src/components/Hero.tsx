import heroImage from '../assets/hero.webp'

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden rounded-3xl bg-coal">
      <img
        src={heroImage}
        alt="Flame-grilled burgers"
        className="h-[300px] w-full object-cover object-center sm:h-[420px] lg:h-[520px]"
      />
    </section>
  )
}
