'use client';

import React, { useState } from 'react';
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
import { CiFilter } from 'react-icons/ci';
import { Button } from '../button';
import { Slider } from '../slider';
import { Label } from '../label';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const Filters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams);

  const filterCount = Array.from(params.entries()).filter(
    ([key]) => !['page', 'pageSize'].includes(key)
  ).length;

  const defaultPrice = [
    Number(params.get('minPrice') || 0),
    Number(params.get('maxPrice') || 2000),
  ];

  const [price, setPrice] = useState(defaultPrice);

  const handleSubmit = () => {
    params.set('minPrice', price[0].toString());
    params.set('maxPrice', price[1].toString());

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleReset = () => {
    params.delete('minPrice');
    params.delete('maxPrice');

    setPrice([0, 1000]);

    router.push(pathname + (params.toString() ? `?${params.toString()}` : ''));
  };

  return (
    <Sheet>
      <SheetTrigger className="float-end">
        <Button
          asChild
          variant={filterCount > 0 ? 'default' : 'outline'}
          className="text-sm h-8 mb-5"
        >
          <div className="flex gap-1">
            <CiFilter size={18} />
            <span>Filters</span>
            {filterCount > 0 && (
              <span className="text-xs bg-secondary text-primary rounded-full size-5 flex items-center justify-center">
                {filterCount}
              </span>
            )}
          </div>
        </Button>
      </SheetTrigger>
      <SheetContent className="h-full flex flex-col justify-between">
        <SheetHeader>
          <SheetTitle className="mb-3">Filters</SheetTitle>
          <SheetDescription>
            <div className="flex flex-col gap-5">
              <Label>Price (€)</Label>
              <Slider
                id="price-range"
                name="price"
                defaultValue={defaultPrice}
                max={1000}
                step={1}
                onValueChange={(evt) => setPrice(evt)}
              />
              <div className="flex justify-between">
                <span>{price[0]}€</span>
                <span>{price[1]}€</span>
              </div>
            </div>
          </SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <SheetClose asChild>
            <div className="flex w-full gap-5">
              <Button type="submit" className="w-full" onClick={handleSubmit}>
                Apply filters
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={handleReset}
              >
                Reset filters
              </Button>
            </div>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default Filters;
