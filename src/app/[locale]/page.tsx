import { Banner, BannerSkeleton } from '@/components/ui/banner';
import { ContactUs } from '@/components/ui/contact-us';
import { Discover } from '@/components/ui/discover';
import ProductHightlights, {
  ProductHightlightsSkeleton,
} from '@/components/ui/product-highlights/product-highlights';
import TwoColumnLayout from '@/components/ui/two-column-layout/two-column-layout';
import { getBanners } from '@/lib/db/banners';
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
      <ContactUs />
    </>
  );
}

async function HomepageBanner() {
  const banners = await getBanners();

  return <Banner banners={banners} />;
}
