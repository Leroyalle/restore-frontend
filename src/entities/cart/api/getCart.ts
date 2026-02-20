import type { Cart } from '../model/types';
import { baseFetch } from '@/shared/api/base';

const CART_PATH = '/cart';

export const getCart = async (): Promise<Cart> => {
  return baseFetch<Cart>(CART_PATH, { method: 'GET' });
};

export const addItemToCart = async (productId: string): Promise<Cart> => {
  return baseFetch<Cart>('/cart/items', { method: 'POST', body: JSON.stringify({ productId }) });
};

export const removeItemFromCart = async (cartItemId: string): Promise<Cart> => {
  return baseFetch<Cart>(`${CART_PATH}/items/${cartItemId}`, { method: 'DELETE' });
};

export const decrementCartItem = async (cartItemId: string): Promise<Cart> => {
  return baseFetch<Cart>(`${CART_PATH}/items/${cartItemId}`, { method: 'PUT' });
};
