// export type CartItem = {
//   id: string;
//   productId: string;
//   name: string;
//   description: string;
//   price: number;
//   quantity: number;
//   image?: string;
// };

import type { paths } from '@/shared/types/openapi';

// export type Cart = {
//   id: string;
//   userId: string;
//   items: CartItem[];
//   total: number;
//   itemsCount: number;
// };

export type Cart = paths['/api/cart']['get']['responses']['200']['content']['application/json'];

export type CartItem = Cart['cartItems'][0];
