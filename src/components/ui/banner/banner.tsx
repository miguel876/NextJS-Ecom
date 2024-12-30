'use client';

import Image from 'next/image';
import React from 'react';
import { Button } from '../button';
import { useRouter } from 'next/navigation';
import { Skeleton } from '../skeleton';
import { BannerType } from './banner.types';

interface BannerProps {
  banners: BannerType[];
}

export const Banner = ({ banners }: BannerProps) => {
  const router = useRouter();

  return banners.map(
    ({ id, subtitle, title, description, imgUrl, ctaTitle, ctaLink }) => (
      <div key={`banner-${id}`} className="relative w-screen h-screen">
        <Image
          src={imgUrl}
          alt="Banner Product Image"
          className="object-cover"
          fill
          priority
        />
        <div className="bg-gradient-to-r dark:from-black from-white from-0% h-full w-full absolute top-0 left-0"></div>
        <div className="container absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="flex gap-5 flex-col items-start max-w-full md:max-w-[70%]">
            <h4 className="uppercase font-thin text-sm md:text-lg">
              {subtitle}
            </h4>
            <h1 className="text-2xl md:text-5xl">{title}</h1>
            <p className="text-md md:text-lg">{description}</p>
            <Button onClick={() => router.push(ctaLink)} variant="outline">
              {ctaTitle}
            </Button>
          </div>
        </div>
      </div>
    )
  );
};

export function BannerSkeleton() {
  return <Skeleton className="w-full h-96" />;
}
