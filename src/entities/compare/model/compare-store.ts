import type { CompareProduct } from './types';

type Listener = () => void;

const STORAGE_KEY = 'compare_products';
const MAX_COMPARE_PRODUCTS = 3;
const listeners = new Set<Listener>();
let productsState: CompareProduct[] = [];

const notify = () => {
  listeners.forEach(listener => listener());
};

const readFromStorage = (): CompareProduct[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw) as unknown;

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(isCompareProduct).slice(0, MAX_COMPARE_PRODUCTS);
  } catch {
    return [];
  }
};

const write = (products: CompareProduct[]) => {
  productsState = products.slice(0, MAX_COMPARE_PRODUCTS);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(productsState));
  notify();
};

const isCompareProduct = (value: unknown): value is CompareProduct => {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    typeof candidate.id === 'string' &&
    typeof candidate.name === 'string' &&
    typeof candidate.price === 'number' &&
    typeof candidate.image === 'string' &&
    'details' in candidate
  );
};

export const compareStore = {
  max: MAX_COMPARE_PRODUCTS,

  get: () => productsState,

  add: (product: CompareProduct) => {
    const current = productsState;

    if (current.some(item => item.id === product.id)) {
      return { ok: false as const, reason: 'exists' as const };
    }

    if (current.length >= MAX_COMPARE_PRODUCTS) {
      return { ok: false as const, reason: 'limit' as const };
    }

    write([...current, product]);
    return { ok: true as const };
  },

  remove: (productId: string) => {
    const current = productsState;
    write(current.filter(product => product.id !== productId));
  },

  clear: () => {
    write([]);
  },

  has: (productId: string) => {
    return productsState.some(product => product.id === productId);
  },

  subscribe: (listener: Listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
};

productsState = readFromStorage();
