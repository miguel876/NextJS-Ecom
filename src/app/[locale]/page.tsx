import Banner from '@/components/ui/banner';
import { BannerSkeleton } from '@/components/ui/banner/Banner';
import { BannerType } from '@/components/ui/banner/banner.types';
import Discover from '@/components/ui/discover/discover';
import ProductHightlights, { ProductHightlightsSkeleton } from '@/components/ui/product-highlights/product-highlights';
import TwoColumnLayout from '@/components/ui/two-column-layout/two-column-layout';
import db from '@/lib/firestore';
import { collection, getDocs } from '@firebase/firestore';
import { Suspense } from 'react';

export default async function Home() {
  return (
    <>
      <Suspense fallback={<BannerSkeleton />}>
        <HomepageBanner />
      </Suspense>
      <TwoColumnLayout />
      <Discover />
      <Suspense fallback={<ProductHightlightsSkeleton />}>
        <ProductHightlights />
      </Suspense>
    </>
  );
}

async function HomepageBanner() {
  const querySnapshot = await getDocs(collection(db, "homepage-banner"))
  const banners = querySnapshot.docs.map((doc) => ({ ...doc.data() as BannerType }))

  return <Banner banners={banners} />
}
