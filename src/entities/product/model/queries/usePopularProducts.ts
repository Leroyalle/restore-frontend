import { useInfiniteQuery } from '@tanstack/react-query';

import { getProducts } from '@/entities/product/api';
import type { paths } from '@/shared/types/openapi';

export type QueryParams = paths['/api/product']['get']['parameters']['query'];

export const useProducts = (params?: QueryParams) => {
  return useInfiniteQuery({
    queryKey: ['products', 'popular', params ?? ''],
    queryFn: ({ pageParam }) => getProducts({ ...params, page: pageParam }),
    enabled: params ? !!params?.query || !!params?.categoryId : true,
    getNextPageParam: (lastPage, allPages) => {
      const loadedItemsCount = allPages.length * (params?.limit ?? 10);

      if (loadedItemsCount < lastPage.total) {
        return allPages.length + 1;
      }

      return undefined;
    },
    initialPageParam: 1,
  });
};
