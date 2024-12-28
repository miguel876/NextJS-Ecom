import { Suspense } from 'react';
import { ProductCard, ProductSkeleton } from '@/components/ui/product-card';
import Filters from '@/components/ui/filters';
import { getProducts } from '@/lib/db';
import { FilterParams } from '@/interfaces/product';
import ProductPagination from '@/components/ui/product-pagination';

export default async function Products(props: { searchParams: FilterParams }) {
  const searchParams = props.searchParams;
  const filters = {
    ...searchParams,
  };

  return (
    <div className="container">
      <Suspense fallback={<ProductSkeleton />}>
        <ProductsList filters={filters} />
      </Suspense>
    </div>
  );
}

async function ProductsList({ filters }: { filters: FilterParams }) {
  const page = Number(filters.page) || 1;
  const pageSize = filters.pageSize || 6;

  const { products, totalPages } = await getProducts({
    filters,
    page,
    pageSize,
  });

  return (
    <>
      <Filters />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full gap-3">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
      {totalPages > 1 && (
        <div className="my-5">
          <ProductPagination totalPages={totalPages} />
        </div>
      )}
    </>
  );
}
