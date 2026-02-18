import { apiGet } from '@/shared/api';
import type { TGetAllProducts } from '../model/types';

export const getProducts = () => {
  return apiGet<TGetAllProducts>('/product');
};
