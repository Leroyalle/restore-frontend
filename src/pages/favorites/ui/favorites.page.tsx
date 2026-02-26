import { useFindFavorites } from '@/entities/favorites/model/queries/use-favorites';
import { ProductCard } from '@/entities/product';
import { Container } from '@/shared/ui/container';
import { Header } from '@/widgets/header';

export function FavoritesPage() {
  const { data, isLoading } = useFindFavorites();

  return (
    <div>
      <Header />
      <Container>
        <h2 className="text-3xl font-semibold text-text-primary">❤️ Избранные товары</h2>
        {isLoading ? (
          <div className="mt-10 text-sm text-text-muted">Загрузка товаров...</div>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {data && data.map(product => <ProductCard key={product.id} product={product} />)}
          </div>
        )}
      </Container>
    </div>
  );
}
