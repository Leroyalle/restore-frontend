import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';
import { TextField } from '@/shared/ui/input';

type CartSummaryProps = {
  itemsCount: number;
  subtotal: number;
  shipping?: number;
  onCheckout: () => void;
  isLoading?: boolean;
  canCheckout?: boolean;
  phone: string;
  onPhoneChange: (value: string) => void;
  phoneError?: string;
};

export const CartSummary = ({
  itemsCount,
  subtotal,
  shipping = 0,
  onCheckout,
  isLoading = false,
  canCheckout = true,
  phone,
  onPhoneChange,
  phoneError,
}: CartSummaryProps) => {
  const total = subtotal + shipping;

  return (
    <Card className="h-fit sticky top-4 p-6 sm:p-8">
      <h2 className="mb-6 text-xl font-semibold text-text-primary sm:text-2xl">Итого</h2>

      <div className="mb-6 space-y-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-muted">Товары ({itemsCount})</span>
          <span className="font-medium text-text-primary">
            {subtotal.toLocaleString('ru-RU')} ₽
          </span>
        </div>

        <div className="h-px bg-stroke-500" />

        <div className="flex items-center justify-between text-sm">
          <span className="text-text-muted">Доставка</span>
          <span className="font-medium text-text-primary">
            {shipping === 0 ? 'Бесплатно' : `${shipping.toLocaleString('ru-RU')} ₽`}
          </span>
        </div>

        <div className="h-px bg-stroke-500" />

        <div className="flex items-center justify-between">
          <span className="font-medium text-text-secondary">К оплате</span>
          <span className="text-2xl font-bold text-brand-400 sm:text-3xl">
            {total.toLocaleString('ru-RU')} ₽
          </span>
        </div>
      </div>

      <div className="mb-6 space-y-3">
        <TextField
          label="Номер телефона"
          name="phone"
          value={phone}
          placeholder="+7 (999) 123-45-67"
          autoComplete="tel"
          error={phoneError}
          onChange={onPhoneChange}
        />
      </div>

      <Button
        type="submit"
        onClick={onCheckout}
        disabled={isLoading || !canCheckout}
        className="w-full py-3 text-base font-semibold sm:py-4 sm:text-lg">
        {isLoading ? 'Оформляем...' : 'Оформить заказ'}
      </Button>

      <p className="mt-4 text-center text-xs text-text-muted">✓ Защищено безопасным подключением</p>
    </Card>
  );
};
