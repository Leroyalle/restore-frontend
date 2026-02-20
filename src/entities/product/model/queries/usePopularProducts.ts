import { useQuery } from '@tanstack/react-query';

import { getProducts } from '@/entities/product/api';
import type { paths } from '@/shared/types/openapi';

export type QueryParams = paths['/api/product']['get']['parameters']['query'];

export const useProducts = (params?: QueryParams) => {
  return useQuery({
    queryKey: ['products', 'popular', params],
    queryFn: () => getProducts(params),
    enabled: params ? !!params?.query || !!params?.categoryId : true,
  });
};
