import { OrderByDirection } from 'firebase/firestore'
import { createContext } from 'react'

interface Sort {
  sortKey: string
  order: OrderByDirection
}

export const checkSortContext = createContext<Sort>({
  sortKey: '',
  order: 'asc'
})