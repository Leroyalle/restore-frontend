import { useGetCategoryById } from '@/entities/category';
import { ProductCard } from '@/entities/product';
import { useProducts } from '@/entities/product/model/queries/usePopularProducts';
import { tokenStore } from '@/shared/lib/auth/token-store';
import { Button } from '@/shared/ui/button';
import { Container } from '@/shared/ui/container';
import { Header } from '@/widgets/header';
import { useSyncExternalStore } from 'react';
import { useParams } from 'react-router-dom';

export const CategoryPage = () => {
  const token = useSyncExternalStore(tokenStore.subscribe, tokenStore.get);
  const { categoryId } = useParams<{ categoryId: string }>();
  const { data: category } = useGetCategoryById(categoryId ?? '');
  const limit = 12;
  const {
    data: products,
    isFetchingNextPage,
    isLoading: isProductsLoading,
    fetchNextPage,
    hasNextPage,
  } = useProducts({ categoryId, limit }, { enabled: !!token });

  return (
    <div>
      <Header />
      <Container>
        {category && <h2 className="text-3xl font-semibold text-text-primary">{category.name}</h2>}
        {isProductsLoading ? (
          <div className="mt-10 text-sm text-text-muted">Загрузка товаров...</div>
        ) : (
          products &&
          products.pages.map(page => (
            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {page.items.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ))
        )}
        {hasNextPage && (
          <Button
            className=" text-center my-12"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}>
            Загрузить ещё
          </Button>
        )}
      </Container>
    </div>
  );
};
