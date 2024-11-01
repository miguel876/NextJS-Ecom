'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import GoogleLogin from '@/app/(auth)/login/GoogleLogin';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu as CNDropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { authConfig } from '@/lib/auth';
import { getInitials } from '@/lib/utils';
import { getServerSession } from 'next-auth';
import { AiOutlineShopping } from 'react-icons/ai';
import DropdownMenu from './dropdown';
import ThemeSwitch from '@/components/ui/theme-switch';
import menus from './menus.json';
import { useSession } from 'next-auth/react';

const Navbar = () => {
  const { data: session } = useSession();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed z-10 top-0 w-full transition-colors duration-300 ${
        scrolled ? 'bg-background' : ''
      }`}
    >
      <div className="w-100 px-2 pt-2">
        <div className="container">
          <div
            className={`${
              scrolled ? 'shadow-md' : ' '
            } pb-2 flex justify-between items-center`}
          >
            <Link href="/">MigStore</Link>
            <div className="flex gap-10">
              {menus.map((menu) => (
                <Link href={menu.link} key={`menu-${menu.id}`}>
                  {menu.label}
                </Link>
              ))}
            </div>
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
      </div>
    </header>
  );
};

export default Navbar;
