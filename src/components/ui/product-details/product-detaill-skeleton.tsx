import React from 'react';
import { Skeleton } from '../skeleton';

export const ProductDetailSkeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 flex-col md:flex-row">
        <Skeleton className="w-full md:w-3/5 rounded-lg h-96" />
        <Skeleton className="w-full md:w-2/5 rounded-lg h-96" />
      </div>
      <Skeleton className="w-full rounded-lg h-96" />
    </div>
  );
};
