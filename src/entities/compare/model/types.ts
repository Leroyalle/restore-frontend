import type { TProduct } from '@/entities/product';

export type CompareProduct = Pick<TProduct, 'id' | 'name' | 'price' | 'image' | 'details'>;

