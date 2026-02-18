import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';

type CartSummaryProps = {
  itemsCount: number;
  subtotal: number;
  shipping?: number;
  onCheckout: () => void;
  isLoading?: boolean;
};

export const CartSummary = ({
  itemsCount,
  subtotal,
  shipping = 0,
  onCheckout,
  isLoading = false,
}: CartSummaryProps) => {
  const total = subtotal + shipping;

  return (
    <Card className="p-6 sm:p-8 h-fit sticky top-4">
      <h2 className="text-xl sm:text-2xl font-semibold text-text-primary mb-6">Итого</h2>

      <div className="space-y-4 mb-6">
        {/* Items Count */}
        <div className="flex justify-between items-center text-sm">
          <span className="text-text-muted">Товары ({itemsCount})</span>
          <span className="text-text-primary font-medium">
            {subtotal.toLocaleString('ru-RU')} ₽
          </span>
        </div>

        {/* Divider */}
        <div className="h-px bg-stroke-500" />

        {/* Shipping */}
        <div className="flex justify-between items-center text-sm">
          <span className="text-text-muted">Доставка</span>
          <span className="text-text-primary font-medium">
            {shipping === 0 ? 'Бесплатно' : `${shipping.toLocaleString('ru-RU')} ₽`}
          </span>
        </div>

        {/* Divider */}
        <div className="h-px bg-stroke-500" />

        {/* Total */}
        <div className="flex justify-between items-center">
          <span className="text-text-secondary font-medium">К оплате</span>
          <span className="text-2xl sm:text-3xl font-bold text-brand-400">
            {total.toLocaleString('ru-RU')} ₽
          </span>
        </div>
      </div>

      {/* Checkout Button */}
      <Button
        onClick={onCheckout}
        disabled={isLoading}
        className="w-full py-3 sm:py-4 text-base sm:text-lg font-semibold">
        {isLoading ? 'Оформляем...' : 'Оформить заказ'}
      </Button>

      {/* Trust Badge */}
      <p className="text-xs text-text-muted text-center mt-4">✓ Защищено безопасным подключением</p>
    </Card>
  );
};
