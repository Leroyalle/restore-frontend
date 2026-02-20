import { ProductCard, usePopularProducts } from '@/entities/product';
import { Button } from '@/shared/ui/button';
import { Container } from '@/shared/ui/container';

export const Popular = () => {
  const { data, isLoading, isError } = usePopularProducts();

  if (isLoading) {
    return <div className="mt-10 text-sm text-text-muted">Загрузка популярных товаров...</div>;
  }

  if (!data) {
    return <div>товары не найдены</div>;
  }

  return (
    <section className="py-16">
      <Container>
        {data.pages.length > 0 && (
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-3xl font-semibold text-text-primary">
              Популярные <span className="text-brand-300">товары</span>
            </h2>
            <Button variant="ghost">Все товары</Button>
          </div>
        )}

        {isError && (
          <div className="mt-10 text-sm text-red-400">Не удалось загрузить популярные товары.</div>
        )}

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {data.pages.map(page =>
            page.items.map(product => <ProductCard key={product.id} product={product} />),
          )}
        </div>
      </Container>
    </section>
  );
};
