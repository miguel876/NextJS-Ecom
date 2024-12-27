'use client';

import Image from 'next/image';
import React, { MouseEventHandler } from 'react';
import { Badge } from '../badge';
import { Skeleton } from '../skeleton';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../card';
import Link from 'next/link';
import { Product } from '@/interfaces/product';
import { Button } from '../button';

export const ProductCard = ({
  id,
  name,
  imageUrl,
  price,
  stock,
  status,
}: Product) => {
  const addToCartHandler: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
  };

  return (
    <Link href={`/products/${id}`}>
      <Card className="relative bg-transparent shadow-none overflow-hidden border-none gap-1 rounded-none">
        <CardHeader className="p-0">
          <div className="relative w-full h-80 overflow-hidden group transition">
            <Image
              src={imageUrl}
              alt="Product Image"
              objectFit="cover"
              layout="fill"
              className="group-hover:scale-105 transition-all duration-500"
              width={0}
              height={0}
            />
            <Button
              className="absolute bottom-0 w-full rounded-none uppercase 
                opacity-0 translate-y-full group-hover:translate-y-0 group-hover:opacity-100
                transition-all duration-300 text-xs"
              variant="secondary"
              onClick={addToCartHandler}
            >
              Add to Cart
            </Button>
          </div>
          <CardTitle className="text-sm font-bold text">{name}</CardTitle>
          <CardDescription />
        </CardHeader>
        <CardContent className="p-0">
          <div className="text-sm">{price}</div>
        </CardContent>
        <CardFooter className="p-0 mt-2">
          <Badge>
            <div className="text-xs">{stock}</div>
          </Badge>
        </CardFooter>
      </Card>
    </Link>
  );
};

export const ProductSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="flex m-5 flex-col items-start gap-1">
          <Skeleton className="w-full h-80" />
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-[22px] w-12 rounded-xl" />
        </div>
      ))}
    </div>
  );
};
