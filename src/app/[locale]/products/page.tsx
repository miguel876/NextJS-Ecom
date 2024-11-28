import { Suspense } from 'react';
import { ProductCard, ProductSkeleton } from '@/components/ui/product-card';
import Filters from '@/components/ui/filters';
import { getProducts } from '@/lib/db';

export default async function Products(props: {
  searchParams: Promise<{ q: string; offset: string }>;
}) {
  const searchParams = await props.searchParams;
  const offset = searchParams.offset ?? 0;

  return (
    <div className="container">
      <Suspense fallback={<ProductSkeleton />}>
        <ProductsList offset={Number(offset)} />
      </Suspense>
    </div>
  );
}

const ProductsList = async ({ offset }: { offset: number }) => {
  const { products } = await getProducts('', offset);

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
