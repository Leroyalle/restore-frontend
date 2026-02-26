import { useQuery } from '@tanstack/react-query';

import { getProduct } from '@/entities/product/api';

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => getProduct(id),
    enabled: Boolean(id),
  });
};

