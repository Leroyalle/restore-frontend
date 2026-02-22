import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../../api/get-current';

export const useGetMe = () => {
  return useQuery({
    queryFn: getCurrentUser,
    queryKey: ['user'],
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });
};
