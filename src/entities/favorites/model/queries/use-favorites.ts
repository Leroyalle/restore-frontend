import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addFavorite, findFavorites, removeFavorite } from '../../api/favorites.api';

export function useAddToFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: string) => addFavorite({ productId }),

    async onMutate(productId) {
      await queryClient.cancelQueries({
        queryKey: ['products', 'popular'],
      });

      const previous = queryClient.getQueriesData({
        queryKey: ['products', 'popular'],
      });

      queryClient.setQueriesData({ queryKey: ['products', 'popular'] }, (old: any) => {
        if (!old) return old;

        return {
          ...old,
          pages: old.pages.map((page: any) => ({
            ...page,
            items: page.items.map((item: any) =>
              item.id === productId ? { ...item, isFavorite: true } : item,
            ),
          })),
        };
      });

      return { previous };
    },

    onSettled() {
      queryClient.invalidateQueries({
        queryKey: ['favorites'],
      });
    },
  });
}
export function useRemoveFromFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: string) => removeFavorite({ productId }),
    async onMutate(productId) {
      await queryClient.cancelQueries({
        queryKey: ['products', 'popular'],
      });

      const previous = queryClient.getQueriesData({
        queryKey: ['products', 'popular'],
      });

      queryClient.setQueriesData({ queryKey: ['products', 'popular'] }, (old: any) => {
        if (!old) return old;

        return {
          ...old,
          pages: old.pages.map((page: any) => ({
            ...page,
            items: page.items.map((item: any) =>
              item.id === productId ? { ...item, isFavorite: false } : item,
            ),
          })),
        };
      });

      return { previous };
    },

    onSettled() {
      queryClient.invalidateQueries({
        queryKey: ['favorites'],
      });
    },
  });
}

export function useFindFavorites() {
  return useQuery({
    queryKey: ['favorites'],
    queryFn: () => findFavorites(),
  });
}
