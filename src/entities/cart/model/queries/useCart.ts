import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import * as cartApi from '../../api/getCart';
import type { Cart } from '../types';

const CART_QUERY_KEY = ['cart'];

export const useCart = () => {
  return useQuery({
    queryKey: CART_QUERY_KEY,
    queryFn: cartApi.getCart,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: string) => cartApi.addItemToCart(productId),
    onSuccess: (data: Cart) => {
      queryClient.setQueryData(CART_QUERY_KEY, data);
    },
  });
};

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (cartItemId: string) => cartApi.removeItemFromCart(cartItemId),
    onSuccess: (data: Cart) => {
      queryClient.setQueryData(CART_QUERY_KEY, data);
    },
  });
};

export const useDecrementCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (cartItemId: string) => cartApi.decrementCartItem(cartItemId),
    onSuccess: (data: Cart) => {
      queryClient.setQueryData(CART_QUERY_KEY, data);
    },
  });
};
