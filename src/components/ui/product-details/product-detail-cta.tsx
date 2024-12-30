'use client';

import React from 'react';
import { Button } from '../button';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { Product } from '@/interfaces/product';
import { useToast } from '../use-toast';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

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

  const handleBuyNow = async () => {
    const stripe = await stripePromise; // Wait for the Stripe object to be ready

    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: [
          {
            id: product.id,
            name: product.name,
            imageUrl: product.imageUrl,
            price: product.price,
            quantity,
          },
        ],
      }),
    });

    const data = await response.json();

    if (response.ok) {
      // Redirect to Stripe Checkout
      const { error } = await stripe!.redirectToCheckout({
        sessionId: data.id,
      });
      if (error) {
        toast({
          title: 'Error',
          description: error.message || 'Failed to redirect to checkout',
        });
      }
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-2">
      <Button
        className="uppercase w-full font-bold gap-2"
        onClick={handleAddToCart}
      >
        <ShoppingCart size={17} /> Add to Cart
      </Button>
      <Button
        variant="outline"
        className="uppercase w-full font-bold"
        onClick={handleBuyNow}
      >
        Buy now
      </Button>
    </div>
  );
};
