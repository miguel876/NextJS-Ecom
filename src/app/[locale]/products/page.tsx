import { Suspense } from 'react';
import db from '@/lib/firestore';
import { collection, getDocs } from "firebase/firestore";
import { ProductCard, ProductSkeleton } from '@/components/ui/product-card/product-card';
import { ProductType } from '@/interfaces/product';

export default function Products() {
  return (
    <div className="container flex gap-2">
      <Suspense fallback={<ProductSkeleton />}>
        <ProductsList />
      </Suspense>

    </div>
  );
}

const ProductsList = async () => {
  const querySnapshot = await getDocs(collection(db, "products"))
  const products = querySnapshot.docs.map((doc) => ({ ...doc.data() as ProductType }))

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full gap-2">
      {products.map((product) => (
        <ProductCard key={product.title} {...product} />
      ))}
    </div>
  );
};
