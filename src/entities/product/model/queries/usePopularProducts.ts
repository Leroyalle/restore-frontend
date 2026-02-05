import { useQuery } from '@tanstack/react-query'

import { getProducts } from '@/entities/product/api'

export const usePopularProducts = () => {
  return useQuery({
    queryKey: ['products', 'popular'],
    queryFn: getProducts,
  })
}
