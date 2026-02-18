import { Link } from 'react-router-dom';

export const EmptyCart = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] py-16">
      <div className="mb-8">
        <CartEmptyIcon className="w-24 h-24 text-text-muted opacity-30" />
      </div>
      <h2 className="text-2xl sm:text-3xl font-semibold text-text-primary mb-2">Корзина пустая</h2>
      <p className="text-text-muted text-center mb-8 max-w-sm">
        Выберите товары из каталога и добавьте их в корзину
      </p>
      <Link
        to="/"
        className="px-6 py-3 rounded-xl bg-brand-500 hover:bg-brand-400 text-white font-medium transition">
        ← Вернуться в каталог
      </Link>
    </div>
  );
};

function CartEmptyIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5">
      <circle cx="9" cy="21" r="1" fill="currentColor" />
      <circle cx="20" cy="21" r="1" fill="currentColor" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );
}
