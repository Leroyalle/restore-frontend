import { useState } from 'react';
import { Link } from 'react-router-dom';

import { CartItem } from './CartItem';
import { CartSummary } from './CartSummary';
import { EmptyCart } from './EmptyCart';
import { Container } from '@/shared/ui/container';
import {
  useAddToCart,
  useCart,
  useDecrementCartItem,
  useRemoveFromCart,
  type CartItem as CartItemType,
} from '@/entities/cart';

export const CartPage = () => {
  const { data: cartData, isLoading, error } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const addToCart = useAddToCart();
  const removeFromCart = useRemoveFromCart();
  const decrementCartItem = useDecrementCartItem();

  const cartItems: CartItemType[] = cartData?.cartItems ?? [];
  const isEmpty = cartItems.length === 0;

  const onIncrement = async (productId: string) => {
    await addToCart.mutateAsync(productId);
  };

  const onDecrement = async (cartItemId: string) => {
    await decrementCartItem.mutateAsync(cartItemId);
  };

  const handleRemoveItem = async (cartItemId: string) => {
    await removeFromCart.mutateAsync(cartItemId);
  };

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsCheckingOut(false);
  };

  const itemsSummary = cartItems.reduce<{ sum: number; count: number }>(
    (sum, item) => {
      sum.count += item.quantity;
      sum.sum += item.product.price * item.quantity;

      return sum;
    },
    {
      sum: 0,
      count: 0,
    },
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-ink-950 text-text-primary flex items-center justify-center">
        <div className="text-center">
          <p className="text-text-muted">Загружаем корзину...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-ink-950 text-text-primary flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">Ошибка при загрузке корзины</p>
          <Link to="/" className="text-brand-400 hover:text-brand-300">
            ← Вернуться на главную
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ink-950 text-text-primary">
      {/* Header */}
      <div className="border-b border-stroke-500">
        <Container className="py-4 sm:py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-semibold">🛒 Корзина</h1>
              {!isEmpty && (
                <span className="text-sm text-text-muted bg-stroke-500/30 px-3 py-1 rounded-full">
                  {itemsSummary.count} товар
                  {itemsSummary.count % 10 === 1 && itemsSummary.count % 100 !== 11 ? '' : 'ов'}
                </span>
              )}
            </div>
            <Link
              to="/"
              className="text-xs sm:text-sm px-3 sm:px-4 py-2 rounded-xl text-text-muted hover:text-text-primary hover:bg-stroke-500/20 transition">
              ← Назад
            </Link>
          </div>
        </Container>
      </div>

      {/* Content */}
      {isEmpty ? (
        <Container className="py-12 sm:py-16">
          <EmptyCart />
        </Container>
      ) : (
        <Container className="py-8 sm:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {cartItems.map((item: CartItemType) => (
                  <CartItem
                    key={item.id}
                    id={item.id}
                    name={item.product.name}
                    // description={item.description}
                    price={item.product.price}
                    quantity={item.quantity}
                    image={item.product.image}
                    onDecrement={() => onDecrement(item.id)}
                    onIncrement={() => onIncrement(item.productId)}
                    onRemove={() => handleRemoveItem(item.id)}
                  />
                ))}
              </div>
            </div>

            {/* Summary Sidebar */}
            <div className="lg:col-span-1">
              <CartSummary
                itemsCount={itemsSummary.count}
                subtotal={itemsSummary.sum}
                shipping={0}
                onCheckout={handleCheckout}
                isLoading={isCheckingOut}
              />
            </div>
          </div>
        </Container>
      )}
    </div>
  );
};
