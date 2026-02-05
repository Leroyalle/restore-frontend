import { categories } from '@/shared/mock/categories';
import { Card } from '@/shared/ui/card';
import { Container } from '@/shared/ui/container';

export const Categories = () => {
  return (
    <section className="py-16">
      <Container>
        <h2 className="text-center text-3xl font-semibold text-brand-300">Категории товаров</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {categories.map(category => (
            <Card
              key={category.id}
              className={[
                'min-h-[230px] border-stroke-500 bg-ink-850/70 p-6 transition',
                'hover:border-brand-500/40',
              ]
                .filter(Boolean)
                .join(' ')}>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-500/20 text-brand-300">
                {renderCategoryIcon(category.icon)}
              </div>
              <h3 className="mt-6 text-lg font-semibold text-text-primary">{category.title}</h3>
              <p className="mt-3 text-sm text-text-muted">{category.description}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
};

function renderCategoryIcon(type: string) {
  switch (type) {
    case 'apple':
      return (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
          <path d="M16.7 13.1c0-2.2 1.8-3.2 1.9-3.3-1-1.5-2.6-1.7-3.1-1.7-1.3-.1-2.5.8-3.1.8-.6 0-1.6-.8-2.7-.8-1.4 0-2.7.8-3.4 2.1-1.5 2.5-.4 6.2 1 8.2.7 1 1.5 2.1 2.6 2.1 1 0 1.4-.6 2.6-.6 1.2 0 1.5.6 2.7.6 1.1 0 1.8-1 2.4-2 .8-1.1 1.1-2.2 1.1-2.2s-2-1-2-3.2z" />
          <path d="M14.9 5.3c.6-.7 1-1.7.9-2.7-.9 0-1.9.6-2.6 1.3-.6.7-1.1 1.7-.9 2.7 1 .1 2-.6 2.6-1.3z" />
        </svg>
      );
    case 'ipad':
      return (
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2">
          <rect x="6" y="3" width="12" height="18" rx="2" />
          <circle cx="12" cy="17" r="1" />
        </svg>
      );
    case 'macbook':
      return (
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2">
          <rect x="4" y="5" width="16" height="10" rx="2" />
          <path d="M2 19h20" />
        </svg>
      );
    case 'airpods':
      return (
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2">
          <path d="M7 5a4 4 0 0 1 4 4v7a3 3 0 0 1-6 0v-1" />
          <path d="M17 5a4 4 0 0 0-4 4v7a3 3 0 0 0 6 0v-1" />
        </svg>
      );
    case 'playstation':
      return (
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2">
          <path d="M7 8l6 4-6 4V8z" />
          <path d="M13 12l4 2v4l-4-2" />
        </svg>
      );
    case 'dyson':
      return (
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2">
          <circle cx="12" cy="12" r="7" />
          <path d="M12 5v4l3 3" />
        </svg>
      );
    default:
      return null;
  }
}
