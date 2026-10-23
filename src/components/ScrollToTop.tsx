import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const timer = window.setTimeout(() => {
        document
          .getElementById(hash.replace('#', ''))
          ?.scrollIntoView({ behavior: 'smooth' })
      }, 80)
      return () => window.clearTimeout(timer)
    }
    window.scrollTo({ top: 0 })
  }, [pathname, hash])

  return null
}
