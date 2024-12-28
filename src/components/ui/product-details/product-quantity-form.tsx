'use client';

import { useState } from 'react';
import { Product } from '@/interfaces/product';
import { ProductDetailCta } from './product-detail-cta';
import { Input } from '../input';
import { Label } from '../label';

export const ProductQuantityForm = ({ product }: { product: Product }) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div>
      <div className="flex items-center gap-2">
        <Label>Quantity:</Label>
        <Input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          min={1}
          max={product.stock}
          className="text-sm h-8 w-16"
        />
      </div>
      <ProductDetailCta product={product} quantity={quantity} />
    </div>
  );
};
