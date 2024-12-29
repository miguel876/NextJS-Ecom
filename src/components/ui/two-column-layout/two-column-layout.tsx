'use server';

import { TwoColumnLayoutProps } from './two-column-layout.types';
import TwoColumnContainer from './two-column-container';
import { getHeroes } from '@/lib/db/heroes';

export default async function TwoColumnLayout() {
  const heroes = await getHeroes();

  return (
    <div className="container my-20">
      {heroes.map((productBanner, i) => (
        <TwoColumnContainer
          key={`homepage-banner-${productBanner.id}`}
          {...productBanner}
          isEven={i % 2 === 0}
        />
      ))}
    </div>
  );
}
