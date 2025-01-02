'use client';

import React from 'react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useCartStore } from '@/store/cart';
import { CreditCard, ShoppingCart, X } from 'lucide-react';
import Image from 'next/image';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const Cart = () => {
  const { items, total, removeItem } = useCartStore((state) => state);

  const cartRemoveProductHandler = (itemId: number) => {
    removeItem(itemId);
  };

  return (
    <Sheet>
      <SheetTrigger className="float-end relative">
        <ShoppingCart size={17} />
        <AnimatePresence>
          {items.length > 0 && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            >
              <Badge className="absolute bottom-[-10px] p-1 h-4 rounded-full text-[10px] font-thin">
                {items.length}
              </Badge>
            </motion.div>
          )}
        </AnimatePresence>
      </SheetTrigger>
      <SheetContent className="h-full flex flex-col justify-between">
        <SheetHeader>
          <SheetTitle className="mb-3">Cart</SheetTitle>
          <SheetDescription>
            <div className="flex flex-col gap-5">
              {items?.length > 0 ? (
                items.map((item) => (
                  <div
                    key={`product-${item.id}`}
                    className="flex justify-between"
                  >
                    <div className="flex gap-3">
                      <Link href={`/products/${item.id}`}>
                        <Image
                          src={item.imageUrl}
                          width={100}
                          height={100}
                          alt="Product cart image"
                          className="rounded-lg "
                        />
                      </Link>
                      <div className="text-left">
                        <p className="font-bold">{item.name}</p>
                        <p className="text-lg font-bold text-primary">
                          {item.price} €
                        </p>
                        <p className="text-xs">
                          Quantity:{' '}
                          <span className="font-bold">{item.quantity}</span>
                        </p>
                      </div>
                    </div>
                    <div>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="link"
                            className="p-0 h-4 text-none"
                            aria-label="Remove cart item"
                          >
                            <X
                              size={17}
                              className="text-default hover:text-primary"
                            />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Remove {item.name} from Cart?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Lorem ipsum dolor sit amet consectetur,
                              adipisicing elit. Necessitatibus enim alias non
                              veniam.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => cartRemoveProductHandler(item.id)}
                            >
                              Remove
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                ))
              ) : (
                <p>The cart is empty.</p>
              )}
            </div>
          </SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <div className="w-full">
            <div className="text-xl mb-3" aria-label="Total cart">
              Total: <b>{total} €</b>
            </div>
            <SheetClose asChild>
              <Button className="w-full uppercase flex gap-1">
                <CreditCard size={15} /> Continue to Checkout
              </Button>
            </SheetClose>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
