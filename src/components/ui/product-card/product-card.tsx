import Image from 'next/image';
import React from 'react';
import { Badge } from '../badge';
import { Skeleton } from '../skeleton';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../card';
import Link from 'next/link';

type Props = {
  id: string;
  title: string;
  imgUrl: string;
  price: string;
  badges?: [];
};

export const ProductCard = ({ id, title, imgUrl, price, badges }: Props) => {
  return (
    <Link href={`/products/${id}`}>
      <Card className="relative bg-transparent shadow-none overflow-hidden border-none gap-1 rounded-none">
        <CardHeader className='p-0'>
          <div className='relative w-full h-80 overflow-hidden'>
            <Image
              src={imgUrl}
              alt="Product Image"
              objectFit="cover"
              layout="fill"
              className='hover:scale-110 transition-all duration-500'
              width={0}
              height={0}
            />
          </div>
          <CardTitle className="text-sm font-bold text">{title}</CardTitle>
          <CardDescription />
        </CardHeader>
        <CardContent className='p-0'>
          <div className="text-sm">{price}</div>
        </CardContent>
        <CardFooter className='p-0 mt-2'>
          {badges?.map((badge) => (
            <Badge key={badge}>
              <div className="text-xs">{badge}</div>
            </Badge>
          ))}
        </CardFooter>
      </Card>
    </Link>
  );
};

export const ProductSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full">
      {[...Array(5)].map((_, index) => (
        <div key={index} className="flex m-5 flex-col items-start gap-2">
          <Skeleton className="w-full h-80" />
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-[22px] w-12 rounded-xl" />
        </div>
      ))}
    </div>
  );
};
