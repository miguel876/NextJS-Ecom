'use client';

import React from 'react';
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { signOut } from 'next-auth/react';

type Props = {};

export const DropdownMenu = (props: Props) => {
  return (
    <DropdownMenuContent>
      <DropdownMenuItem>Profile</DropdownMenuItem>
      <DropdownMenuItem>Settings</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem className="font-bold" onClick={() => signOut()}>
        Logout
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
};
