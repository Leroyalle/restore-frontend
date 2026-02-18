import { useMemo } from 'react';
import type { ReactNode } from 'react';

import { Link } from 'react-router-dom';

import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Container } from '@/shared/ui/container';

const navItems = [
  { label: 'Каталог', icon: GridIcon },
  { label: 'Сравнить', icon: ScaleIcon },
  { label: 'Избранное', icon: HeartIcon },
  { label: 'Корзина', icon: CartIcon },
];

export const Header = () => {
  const isAuthenticated = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem('auth_token');
  }, []);

  return (
    <header className="sticky top-0 left-0 right-0 z-50 w-full border-b border-stroke-500 bg-ink-900/70 backdrop-blur-md">
      <Container className="flex items-center gap-6 py-4 max-w-none">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-500/20 text-brand-300">
            <span className="text-lg font-semibold">R</span>
          </div>
          <span className="text-lg font-semibold tracking-wide">RESTART</span>
        </div>

        <div className="relative flex-1">
          <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            placeholder="Поиск товаров..."
            className="w-full rounded-2xl border border-stroke-500 bg-ink-850/80 py-2.5 pl-11 pr-4 text-sm text-text-primary placeholder:text-text-muted outline-none transition focus:border-brand-400"
          />
        </div>

        <nav className="hidden items-center gap-5 text-sm font-semibold text-text-secondary lg:flex">
          {navItems.map(({ label, icon: Icon }) => (
            <button
              key={label}
              className="flex items-center gap-2 rounded-xl px-2 py-1 transition hover:text-text-primary">
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <IconButton label="Сравнение" badge={0}>
            <ScaleIcon className="h-4 w-4" />
          </IconButton>
          <IconButton label="Избранное" badge={0}>
            <HeartIcon className="h-4 w-4" />
          </IconButton>
          {isAuthenticated && (
            <Link to="/cart">
              <IconButton label="Корзина" badge={2}>
                <CartIcon className="h-4 w-4" />
              </IconButton>
            </Link>
          )}
          <Link to="/auth">
            <Button className="min-w-[120px]">
              <UserIcon className="h-4 w-4" />
              Войти
            </Button>
          </Link>
        </div>
      </Container>
    </header>
  );
};

type IconButtonProps = {
  children: ReactNode;
  label: string;
  badge?: number;
};

const IconButton = ({ children, label, badge = 0 }: IconButtonProps) => {
  return (
    <button
      aria-label={label}
      className="relative flex h-10 w-10 items-center justify-center rounded-2xl border border-stroke-500 bg-white/5 text-text-secondary transition hover:bg-white/10 hover:text-text-primary">
      {children}
      <Badge value={badge} />
    </button>
  );
};

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2">
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20L16.65 16.65" />
    </svg>
  );
}

function GridIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2">
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
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

function UserIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c2-4 6-6 8-6s6 2 8 6" />
    </svg>
  );
}
