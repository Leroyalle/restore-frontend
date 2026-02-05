import { apiGet } from '@/shared/api'
import type { Product } from '../model/types'

export const getProducts = () => {
  return apiGet<Product[]>('/product')
}
