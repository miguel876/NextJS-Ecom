import { Suspense } from 'react';
import { ProductCard, ProductSkeleton } from '@/components/ui/product-card';
import Filters from '@/components/ui/filters';
import { getProducts } from '@/lib/db';
import { FilterParams } from '@/interfaces/product';

export default async function Products(props: {
  searchParams: Promise<FilterParams>;
}) {
  const searchParams = await props.searchParams;
  const filters = {
    ...searchParams,
    offset: searchParams.offset ?? 0,
  };

  return (
    <div className="container">
      <Suspense fallback={<ProductSkeleton />}>
        <ProductsList filters={filters} />
      </Suspense>
    </div>
  );
}

const ProductsList = async ({ filters }: { filters: FilterParams }) => {
  const { products } = await getProducts({
    filters,
    limit: 6,
    offset: filters.offset,
  });

  return (
    <>
      <Filters />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full gap-3">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </>
  );
};
