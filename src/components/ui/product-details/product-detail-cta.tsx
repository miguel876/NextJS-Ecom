'use client';

import React from 'react';
import { Button } from '../button';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { Product } from '@/interfaces/product';
import { useToast } from '../use-toast';

interface ProductDetailCtaProps {
  product: Product;
  quantity: number;
}

export const ProductDetailCta = ({
  product,
  quantity,
}: ProductDetailCtaProps) => {
  const addItem = useCartStore((state) => state.addItem);
  const { toast } = useToast();

  const handleAddToCart = () => {
    addItem(product, quantity);
    toast({
      title: 'Item added to cart',
      description: `${quantity} ${product.name} added to your cart`,
    });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-2">
      <Button
        className="uppercase w-full font-bold gap-2"
        onClick={handleAddToCart}
      >
        <ShoppingCart size={17} /> Add to Cart
      </Button>
      <Button variant="outline" className="uppercase w-full font-bold">
        Buy now
      </Button>
    </div>
  );
};
