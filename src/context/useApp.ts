import { useContext } from 'react'
import { AppContext } from './AppContext'

export const useApp = () => {
  const value = useContext(AppContext)
  if (!value) throw new Error('App context is missing')
  return value
}
