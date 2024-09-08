"use server"

import { ProductType } from "@/interfaces/product"
import db from "@/lib/firestore"
import { collection, getDocs, query, where } from "@firebase/firestore"
import { ProductCard } from "../product-card/product-card";
import { Skeleton } from "../skeleton";

export default async function ProductHightlights() {
  const highlightsQuery = query(
    collection(db, "products"),
    where("isHighlight", "==", true)
  );

  const querySnapshot = await getDocs(highlightsQuery);
  
  const products = querySnapshot.docs.map((doc) => ({
    ...doc.data() as ProductType,
  }));

  return (
       <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full gap-2">
            { products.map((product) => <ProductCard key={product.title} {...product} />) }
        </div>
  )
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
