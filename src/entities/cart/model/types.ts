export type CartItem = {
  id: string;
  productId: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image?: string;
};

export type Cart = {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  itemsCount: number;
};
