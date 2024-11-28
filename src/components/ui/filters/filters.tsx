'use client';

import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { CiFilter } from 'react-icons/ci';
import { Button } from '../button';
import { useTranslations } from 'next-intl';

const Filters = () => {
  const translate = useTranslations('labels');

  return (
    <Sheet>
      <SheetTrigger>
        <Button
          asChild
          variant={'outline'}
          className="float-end mb-3 text-xs gap-1 mt-[-30px]"
        >
          <CiFilter size={18} />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default Filters;
