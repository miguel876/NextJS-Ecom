import GoogleLogin from '@/app/(auth)/login/GoogleLogin';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu as CNDropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { authConfig } from '@/lib/auth';
import { getInitials } from '@/lib/utils';
import { getServerSession } from 'next-auth';
import React from 'react';
import { AiOutlineShopping } from 'react-icons/ai';
import DropdownMenu from './dropdown';
import ThemeSwitch from '@/components/ui/theme-switch';
import Link from 'next/link';

const Navbar = async () => {
  const session = await getServerSession(authConfig);

  return (
    <header>
      <div className="shadow-md w-100 p-2">
        <div className="container flex justify-between items-center ">
          <Link href="/">MigStore</Link>
          <div className="flex items-center gap-5">
            <ThemeSwitch />
            {!session?.user?.name ? (
              <GoogleLogin />
            ) : (
              <CNDropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage
                      src={session?.user?.image as string}
                      alt="Profile Image"
                    />
                    <AvatarFallback>
                      {getInitials(session?.user?.name as string)}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenu />
              </CNDropdownMenu>
            )}
            <AiOutlineShopping size={20} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
