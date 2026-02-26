import { useAddToCart } from '@/entities/cart';
import { useCompare } from '@/entities/compare';
import { useProduct } from '@/entities/product';
import { tokenStore } from '@/shared/lib/auth/token-store';
import { Button } from '@/shared/ui/button';
import { Container } from '@/shared/ui/container';
import { Header } from '@/widgets/header';
import { useState } from 'react';
import type { ReactNode } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

type DetailValue = string | number | boolean | null;

type DetailItem = {
  key: string;
  value: DetailValue;
};

export const ProductPage = () => {
  const navigate = useNavigate();
  const { productId = '' } = useParams<{ productId: string }>();
  const { data: product, isLoading } = useProduct(productId);
  const { mutate: addToCart, isPending } = useAddToCart();
  const { add, has } = useCompare();
  const [isAdded, setIsAdded] = useState(false);

  const detailItems = toDetailItems(product?.details);

  const handleAddToCart = () => {
    const token = tokenStore.get();

    if (!token) {
      navigate('/auth');
      return;
    }

    if (!product) {
      return;
    }

    addToCart(product.id, {
      onSuccess: () => {
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
        // toast.success('Product added to cart');
      },
      onError: () => {
        toast.error('Something went wrong');
      },
    });
  };

  const handleAddToCompare = () => {
    if (!product) {
      return;
    }

    const result = add({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      details: product.details,
    });

    if (!result.ok) {
      if (result.reason === 'limit') {
        toast.error('Можно сравнить не более 3 товаров');
      } else {
        toast('Товар уже в сравнении');
      }

      return;
    }

    toast.success('Товар добавлен в сравнение');
  };

  return (
    <div className="min-h-screen bg-ink-950 text-text-primary">
      <Header />

      <Container className="py-8 md:py-10">
        {isLoading ? (
          <div className="text-sm text-text-muted">Loading product...</div>
        ) : !product ? (
          <div className="text-sm text-text-muted">Product not found</div>
        ) : (
          <>
            {' '}
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
              <div className="rounded-3xl border border-stroke-500 bg-gradient-to-br from-ink-800 to-ink-850 p-10 md:p-16">
                <img
                  src={product.image}
                  alt={product.name}
                  className="mx-auto aspect-square w-full max-w-[360px] object-contain"
                />
              </div>

              <div className="max-w-[760px]">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-400">
                  {(product.aliases?.[0] ?? 'Product').toUpperCase()}
                </p>
                <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
                  {product.name}
                </h1>

                <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-text-secondary">
                  <span className="font-semibold text-amber-300">*****</span>
                  <span>(4.9)</span>
                  <span>In stock</span>
                </div>

                <p className="mt-6 text-4xl font-semibold text-brand-400 md:text-5xl">
                  {product.price.toLocaleString('ru-RU')} ₽
                </p>

                <p className="mt-8 max-w-[640px] text-base leading-relaxed text-text-secondary">
                  {product.description}
                </p>

                <div className="mt-8 rounded-xl bg-brand-500/15 p-4">
                  <p className="text-sm font-semibold text-brand-300">
                    Официальная гарантия 12 месяцев
                  </p>
                  <p className="mt-1 text-xs text-text-secondary">
                    Бесплатный ремонт или замена в авторизованных сервисных центрах Apple
                  </p>
                </div>

                <div className="mt-10 flex items-center gap-3">
                  <Button className="h-11 flex-1" disabled={isPending} onClick={handleAddToCart}>
                    <CartIcon className="h-4 w-4" />
                    {isAdded ? 'Added' : isPending ? 'Adding...' : 'Add to cart'}
                  </Button>
                  <IconSquare
                    onClick={handleAddToCompare}
                    icon={
                      <ScaleIcon
                        className={[
                          'h-4 w-4',
                          has(product.id) ? 'text-brand-300' : 'text-text-secondary',
                        ].join(' ')}
                      />
                    }
                  />
                  <IconSquare icon={<HeartIcon className="h-4 w-4 text-pink-400" />} />
                </div>
              </div>
            </div>
            <div>
              {detailItems.length > 0 && (
                <div className="mt-8 divide-y divide-stroke-500 border-y border-stroke-500">
                  {detailItems.map(item => (
                    <div
                      key={item.key}
                      className="flex items-center justify-between gap-6 py-4 text-sm">
                      <span className="text-text-secondary">{item.key}</span>
                      <span className="text-right font-semibold text-text-primary">
                        {formatDetailValue(item.value)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </Container>
    </div>
  );
};

const toDetailItems = (details: unknown): DetailItem[] => {
  if (!details || typeof details !== 'object' || Array.isArray(details)) {
    return [];
  }

  return Object.entries(details as Record<string, unknown>)
    .filter((entry): entry is [string, DetailValue] => isDetailValue(entry[1]))
    .map(([key, value]) => ({ key, value }));
};

const isDetailValue = (value: unknown): value is DetailValue => {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean' ||
    value === null
  );
};

const formatDetailValue = (value: DetailValue) => {
  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No';
  }

  return String(value);
};

const IconSquare = ({ icon, onClick }: { icon: ReactNode; onClick?: () => void }) => {
  return (
    <button
      onClick={onClick}
      className="flex h-11 w-11 items-center justify-center rounded-xl border border-stroke-500 bg-white/5 text-text-secondary hover:bg-white/10 hover:text-text-primary">
      {icon}
    </button>
  );
};

function CartIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2">
      <circle cx="9" cy="20" r="1.5" />
      <circle cx="17" cy="20" r="1.5" />
      <path d="M3 4h2l2.4 10.4a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.6L21 7H7" />
    </svg>
  );
}

function ScaleIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2">
      <path d="M12 3v18" />
      <path d="M5 7h14" />
      <path d="M6 7l-3 6h6l-3-6z" />
      <path d="M18 7l-3 6h6l-3-6z" />
    </svg>
  );
}

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2">
      <path d="M12 21s-7-4.5-9-8.5C1 8 3.5 5 7 5c2.2 0 3.7 1.2 5 3 1.3-1.8 2.8-3 5-3 3.5 0 6 3 4 7.5-2 4-9 8.5-9 8.5z" />
    </svg>
  );
}
