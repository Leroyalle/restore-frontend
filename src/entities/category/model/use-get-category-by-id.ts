import { useQuery } from '@tanstack/react-query';
import { getCategoryById } from '../api/get-category-by-id';

export const useGetCategoryById = (id: string) => {
  return useQuery({
    queryKey: ['categories', id],
    queryFn: () => getCategoryById(id),
  });
};
