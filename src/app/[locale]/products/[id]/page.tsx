import {
  ProductDetails,
  ProductDetailSkeleton,
} from '@/components/ui/product-details';
import { Suspense } from 'react';

export default function ProductPage({ params }: { params: { id: string } }) {
  return (
    <div className="container">
      <Suspense fallback={<ProductDetailSkeleton />}>
        <ProductDetails id={params.id} />
      </Suspense>
    </div>
  );
}
