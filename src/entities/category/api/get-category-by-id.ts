import { baseFetch } from '@/shared/api/base';
import type { paths } from '@/shared/types/openapi';

type Category =
  paths['/api/category/:id']['get']['responses']['200']['content']['application/json'];

export const getCategoryById = async (id: string) => {
  return baseFetch<Category>(`/category/${id}`, { method: 'GET' });
};
