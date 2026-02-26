import { baseFetch } from '@/shared/api/base';
import type { paths } from '@/shared/types/openapi';

type AddFavoriteRequest =
  paths['/api/favorites']['post']['requestBody']['content']['application/json'];
export type Favorite =
  paths['/api/favorites']['post']['responses']['201']['content']['application/json'];

type FindFavoritesResponse =
  paths['/api/favorites']['get']['responses']['200']['content']['application/json'];

export const addFavorite = (data: AddFavoriteRequest) => {
  return baseFetch<Favorite>('/favorites', { method: 'POST', body: JSON.stringify(data) });
};
export const removeFavorite = (data: AddFavoriteRequest) => {
  return baseFetch<Favorite>(`/favorites/${data.productId}`, { method: 'DELETE' });
};
export const findFavorites = () => {
  return baseFetch<FindFavoritesResponse>('/favorites', { method: 'GET' });
};
