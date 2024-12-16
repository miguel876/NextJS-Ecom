'use server';

import { Skeleton } from '../skeleton';
import { ProductCard } from '../product-card';
import { getProducts } from '@/lib/db';

export default async function ProductHightlights() {
  const { products } = await getProducts({ limit: 3, offset: 0 });

  return (
    <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full gap-2">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}

export async function ProductHightlightsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="flex m-5 flex-col items-start gap-2">
          <Skeleton className="w-full h-80" />
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-[22px] w-12 rounded-xl" />
        </div>
      ))}
    </div>
  );
}
