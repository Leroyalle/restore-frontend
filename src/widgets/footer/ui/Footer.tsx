import type { ReactNode } from 'react';

import { Container } from '@/shared/ui/container';
import { useGetCategories } from '@/entities/category';
import { Link } from 'react-router-dom';

const customerLinks = [
  { name: 'Сравнение товаров', href: '/compare' },
  {
    name: 'Корзина',
    href: '/cart',
  },
  {
    name: 'Избранное',
    href: '/favorites',
  },
  {
    name: 'Каталог',
    href: '/catalog',
  },
];

const contacts = [
  { icon: PhoneIcon, label: '8-800-555-35-35' },
  { icon: MailIcon, label: 'info@restart-tech.ru' },
  { icon: PinIcon, label: 'Москва, ул. Тверская, 15' },
  { icon: ClockIcon, label: 'Круглосуточная поддержка' },
];

export const Footer = () => {
  const { data } = useGetCategories();

  return (
    <footer className="border-t border-stroke-500 bg-ink-950/90 py-16">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <p className="text-lg font-semibold">RESTART</p>
            <p className="mt-4 text-sm text-text-muted">
              Перезагрузите свои технологии. Откройте мир инноваций с нашими премиальными
              устройствами.
            </p>
            <div className="mt-6 flex items-center gap-3 text-text-secondary">
              <SocialButton ariaLabel="Telegram">
                <PlaneIcon className="h-4 w-4" />
              </SocialButton>
              <SocialButton ariaLabel="VK">
                <VkIcon className="h-4 w-4" />
              </SocialButton>
              <SocialButton ariaLabel="Instagram">
                <CameraIcon className="h-4 w-4" />
              </SocialButton>
            </div>
          </div>

          <FooterColumn
            title="Каталог"
            items={
              data
                ? data.map(({ name, id }) => ({ name, href: `/category/${id}` })).slice(0, 4)
                : []
            }
          />
          <FooterColumn title="Покупателям" items={customerLinks} />

          <div>
            <p className="text-lg font-semibold">Контакты</p>
            <div className="mt-4 space-y-3 text-sm text-text-muted">
              {contacts.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-3 text-text-secondary">
                  <Icon className="h-4 w-4 text-brand-300" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-stroke-500/60 pt-6 text-center text-xs text-text-muted">
          © 2024 RESTART. Перезагрузите свои технологии. Все права защищены.
        </div>
      </Container>
    </footer>
  );
};

const FooterColumn = ({
  title,
  items,
}: {
  title: string;
  items: { name: string; href: string }[];
}) => {
  return (
    <div>
      <p className="text-lg font-semibold">{title}</p>
      <ul className="mt-4 space-y-3 text-sm text-text-muted">
        {items.map(item => (
          <li key={item.name} className="transition hover:text-text-primary">
            <Link to={item.href}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const SocialButton = ({ children, ariaLabel }: { children: ReactNode; ariaLabel: string }) => {
  return (
    <button
      aria-label={ariaLabel}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-stroke-500 bg-white/5 transition hover:bg-white/10">
      {children}
    </button>
  );
};

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2">
      <path d="M4 4l4 1 2 5-3 2c1.5 3 4 5.5 7 7l2-3 5 2 1 4c-1 1-3 2-5 2-7 0-13-6-13-13 0-2 .7-4 2-5z" />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}

function PinIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2">
      <path d="M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function PlaneIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2">
      <path d="M2 12l20-7-7 20-2-8-8-2z" />
    </svg>
  );
}

function VkIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2">
      <path d="M3 8c1.5 4 4.5 8 9 8h2c2 0 4-.8 7-4" />
      <path d="M7 8c1 2 2 3 3 4" />
      <path d="M16 8c-1 2-2 3-3 4" />
    </svg>
  );
}

function CameraIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2">
      <rect x="3" y="6" width="18" height="14" rx="2" />
      <circle cx="12" cy="13" r="3.5" />
      <path d="M8 6l2-2h4l2 2" />
    </svg>
  );
}
