import { apiGet, apiDelete, apiPut } from '@/shared/api';
import type { Cart } from '../model/types';
import { baseFetch } from '@/shared/api/base';

const CART_PATH = '/cart';

export const getCart = async (): Promise<Cart> => {
  return apiGet<Cart>(CART_PATH);
};

export const addItemToCart = async (productId: string): Promise<Cart> => {
  return baseFetch<Cart>('/cart/items', { method: 'POST', body: JSON.stringify({ productId }) });
};

export const removeItemFromCart = async (cartItemId: string): Promise<Cart> => {
  return apiDelete<Cart>(`${CART_PATH}/items/${cartItemId}`);
};

export const decrementCartItem = async (cartItemId: string): Promise<Cart> => {
  return apiPut<Cart, Record<string, never>>(`${CART_PATH}/items/${cartItemId}`, {});
};
