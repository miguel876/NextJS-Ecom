"use client"

import Image from 'next/image'
import React from 'react'
import { Button } from '../button'
import { useRouter  } from 'next/navigation'
import { Skeleton } from '../skeleton'
import { BannerType } from './banner.types'

interface BannerProps {
  banners: BannerType[];
}

export const Banner = ({ banners }: BannerProps) => {
  const router = useRouter()

  return (
    banners.map(({ id, title, description, imgUrl, ctaTitle, ctaLink }) => (
      <div key={`banner-${id}`} className='relative w-screen h-96'>
            <Image 
              src={imgUrl} 
              alt="Banner Product Image" 
              fill
              objectFit='cover' 
              width={0}
              height={0}
              priority
            />
            <div className='bg-gradient-to-r dark:from-black from-white from-0% h-full w-full absolute top-0 left-0'></div>
            <div className='container absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex gap-5 flex-col items-start'>
              <h1 className='text-5xl'>{title}</h1>
              <div>{description}</div>
              <Button onClick={() => router.push(ctaLink)}>{ctaTitle}</Button>
            </div>
        </div>
    ))
  )
}

export function BannerSkeleton() {
 return <Skeleton className="w-full h-96" />;
}
