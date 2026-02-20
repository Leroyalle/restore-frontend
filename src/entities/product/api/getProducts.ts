import type { QueryParams } from '../model/queries/usePopularProducts';
import type { TGetAllProducts } from '../model/types';
import { baseFetch } from '@/shared/api/base';

export const getProducts = (query?: QueryParams) => {
  const cleanQuery = query
    ? Object.fromEntries(
        Object.entries(query)
          .filter(([, v]) => v !== undefined)
          .map(([k, v]) => [k, String(v)]),
      )
    : {};

  const queryParams = query ? `?${new URLSearchParams(cleanQuery).toString()}` : '';
  return baseFetch<TGetAllProducts>(`/product${queryParams}`, { method: 'GET' });
};
