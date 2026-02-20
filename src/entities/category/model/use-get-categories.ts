import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../api/get-categories';

export function useGetCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });
}
