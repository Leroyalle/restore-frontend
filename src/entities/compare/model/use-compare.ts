import { useSyncExternalStore } from 'react';

import { compareStore } from './compare-store';
import type { CompareProduct } from './types';

const toCompareProduct = (product: CompareProduct): CompareProduct => ({
  id: product.id,
  name: product.name,
  price: product.price,
  image: product.image,
  details: product.details,
});

export const useCompare = () => {
  const products = useSyncExternalStore(compareStore.subscribe, compareStore.get);

  return {
    products,
    count: products.length,
    max: compareStore.max,
    has: (productId: string) => compareStore.has(productId),
    add: (product: CompareProduct) => compareStore.add(toCompareProduct(product)),
    remove: (productId: string) => compareStore.remove(productId),
    clear: () => compareStore.clear(),
  };
};

