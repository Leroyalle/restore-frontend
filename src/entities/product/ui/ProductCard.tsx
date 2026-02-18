import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ReactNode } from 'react';

import { useAddToCart } from '@/entities/cart';
import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';
import type { TGetAllProducts } from '../model/types';

type ProductCardProps = {
  product: TGetAllProducts['items'][number];
};

export const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();
  const { mutate: addToCart, isPending } = useAddToCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      navigate('/auth');
      return;
    }

    addToCart(product.id, {
      onSuccess: () => {
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
      },
    });
  };

  return (
    <Card
      className={[
        'group flex min-h-[320px] flex-col justify-between bg-ink-850/70',
        'hover:border-brand-500/40',
      ]
        .filter(Boolean)
        .join(' ')}>
      <div>
        <div className="flex h-36 items-center justify-center rounded-2xl bg-ink-800/70 text-brand-300">
          <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
        </div>
        <h3 className="mt-5 text-lg font-semibold text-text-primary">{product.name}</h3>
        {/* <p className="mt-2 text-sm text-text-muted">{product.specs}</p> */}
        <p className="mt-4 text-2xl font-semibold text-brand-300">{product.price}</p>
        {/* <p className="mt-2 text-xs text-text-muted">{product.stock}</p> */}
      </div>

      <div className="mt-6 flex items-center gap-3">
        <Button className="flex-1" disabled={isPending} onClick={handleAddToCart}>
          <CartIcon className="h-4 w-4" />
          {isAdded ? '✓ Добавлено' : isPending ? 'Добавляю...' : 'В корзину'}
        </Button>
        <IconSquare icon={<ScaleIcon className="h-4 w-4" />} />
        <IconSquare icon={<HeartIcon className="h-4 w-4" />} />
      </div>
    </Card>
  );
};

const IconSquare = ({ icon }: { icon: ReactNode }) => {
  return (
    <button className="flex h-11 w-11 items-center justify-center rounded-xl border border-stroke-500 bg-white/5 text-text-secondary transition hover:bg-white/10 hover:text-text-primary">
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
