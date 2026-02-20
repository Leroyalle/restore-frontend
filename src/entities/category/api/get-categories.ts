import { baseFetch } from '@/shared/api/base';
import type { paths } from '@/shared/types/openapi';

type Categories = paths['/api/category']['get']['responses']['200']['content']['application/json'];

export const getCategories = () => {
  return baseFetch<Categories>('/category', { method: 'GET' });
};
