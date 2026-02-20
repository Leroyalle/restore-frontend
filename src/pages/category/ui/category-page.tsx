import { useGetCategoryById } from '@/entities/category';
import { ProductCard } from '@/entities/product';
import { useProducts } from '@/entities/product/model/queries/usePopularProducts';
import { Container } from '@/shared/ui/container';
import { Header } from '@/widgets/header';
import { useParams } from 'react-router-dom';

export const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { data: category } = useGetCategoryById(categoryId ?? '');
  const { data: products, isLoading: isProductsLoading } = useProducts({ categoryId });

  return (
    <div>
      <Header />
      <Container>
        {category && <h2 className="text-3xl font-semibold text-text-primary">{category.name}</h2>}
        {isProductsLoading ? (
          <div className="mt-10 text-sm text-text-muted">Загрузка товаров...</div>
        ) : products && products.items.length > 0 ? (
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {products.items.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="mt-10 text-sm text-text-muted">Товары не найдены</div>
        )}
      </Container>
    </div>
  );
};
