"use server";

import db from '@/lib/firestore';
import { collection, getDocs } from '@firebase/firestore';
import { TwoColumnLayoutProps } from './two-column-layout.types';
import TwoColumnContainer from './two-column-container';

export default async function TwoColumnLayout() {
    const querySnapshot = await getDocs(collection(db, "banners"))
    const productBanners = querySnapshot.docs.map((doc) => ({ ...doc.data() as TwoColumnLayoutProps }))

  return (
    <div className='container my-20'>
      { productBanners.map((productBanner, i) => <TwoColumnContainer key={`homepage-banner-${productBanner.id}`} {...productBanner} isEven={i % 2 === 0 } />) }
    </div>
    
  );
};
