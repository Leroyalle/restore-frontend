import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { CartItem } from './CartItem';
import { CartSummary } from './CartSummary';
import { EmptyCart } from './EmptyCart';
import {
  useAddToCart,
  useCart,
  useDecrementCartItem,
  useRemoveFromCart,
  type CartItem as CartItemType,
} from '@/entities/cart';
import { Container } from '@/shared/ui/container';
import { useCreateOrderMutation } from '@/entities/order/model/use-order';

const isValidPhone = (value: string) => {
  const normalized = value.replace(/\s+/g, '');
  const digits = normalized.replace(/\D/g, '');

  return /^\+?[0-9()-\s]{10,20}$/.test(value) && digits.length >= 10;
};

export const CartPage = () => {
  const navigate = useNavigate();
  const { data: cartData, isLoading, error } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState<string>();

  const createOrder = useCreateOrderMutation();
  const addToCart = useAddToCart();
  const removeFromCart = useRemoveFromCart();
  const decrementCartItem = useDecrementCartItem();

  const cartItems: CartItemType[] = cartData?.cartItems ?? [];
  const isEmpty = cartItems.length === 0;

  const canCheckout = useMemo(() => isValidPhone(phone), [phone]);

  const onIncrement = async (productId: string) => {
    await addToCart.mutateAsync(productId);
  };

  const onDecrement = async (cartItemId: string) => {
    await decrementCartItem.mutateAsync(cartItemId);
  };

  const handleRemoveItem = async (cartItemId: string) => {
    await removeFromCart.mutateAsync(cartItemId);
  };

  const validateCheckoutForm = () => {
    const nextPhoneError = isValidPhone(phone) ? undefined : 'Введите корректный номер телефона';
    setPhoneError(nextPhoneError);
    return !nextPhoneError;
  };

  const handleCheckout = async () => {
    if (!validateCheckoutForm()) {
      return;
    }

    setIsCheckingOut(true);
    const cleanPhone = phone.replace(/[^\d+]/g, '');
    await createOrder.mutateAsync(
      { phone: cleanPhone },
      {
        onSettled: () => {
          setIsCheckingOut(false);
          navigate('/order');
        },
      },
    );
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
      <div className="flex min-h-screen items-center justify-center bg-ink-950 text-text-primary">
        <div className="text-center">
          <p className="text-text-muted">Загружаем корзину...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink-950 text-text-primary">
        <div className="text-center">
          <p className="mb-4 text-red-400">Ошибка при загрузке корзины</p>
          <Link to="/" className="text-brand-400 hover:text-brand-300">
            ← Вернуться на главную
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ink-950 text-text-primary">
      <div className="border-b border-stroke-500">
        <Container className="py-4 sm:py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-semibold sm:text-3xl">🛒 Корзина</h1>
              {!isEmpty && (
                <span className="rounded-full bg-stroke-500/30 px-3 py-1 text-sm text-text-muted">
                  {itemsSummary.count} товар
                  {itemsSummary.count % 10 === 1 && itemsSummary.count % 100 !== 11 ? '' : 'ов'}
                </span>
              )}
            </div>
            <Link
              to="/"
              className="rounded-xl px-3 py-2 text-xs text-text-muted transition hover:bg-stroke-500/20 hover:text-text-primary sm:px-4 sm:text-sm">
              ← Назад
            </Link>
          </div>
        </Container>
      </div>

      {isEmpty ? (
        <Container className="py-12 sm:py-16">
          <EmptyCart />
        </Container>
      ) : (
        <Container className="py-8 sm:py-12">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {cartItems.map((item: CartItemType) => (
                  <CartItem
                    key={item.id}
                    id={item.id}
                    name={item.product.name}
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

            <div className="lg:col-span-1">
              <CartSummary
                itemsCount={itemsSummary.count}
                subtotal={itemsSummary.sum}
                shipping={0}
                onCheckout={handleCheckout}
                isLoading={isCheckingOut}
                canCheckout={canCheckout}
                phone={phone}
                onPhoneChange={value => {
                  setPhone(value);
                  const nextPhoneError = isValidPhone(phone)
                    ? undefined
                    : 'Введите корректный номер телефона';

                  setPhoneError(nextPhoneError);
                }}
                phoneError={phoneError}
              />
            </div>
          </div>
        </Container>
      )}
    </div>
  );
};
