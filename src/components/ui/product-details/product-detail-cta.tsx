'use client';

import React from 'react';
import { Button } from '../button';
import { ShoppingCart } from 'lucide-react';

export const ProductDetailCta = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-2">
      <Button className="uppercase w-full font-bold gap-2">
        <ShoppingCart size={17} /> Add to Cart
      </Button>
      <Button variant="outline" className="uppercase w-full font-bold">
        Buy now
      </Button>
    </div>
  );
};
