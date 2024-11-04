'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import GoogleLogin from '@/app/(auth)/login/GoogleLogin';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu as CNDropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getInitials } from '@/lib/utils';
import { CiShoppingCart } from 'react-icons/ci';
import DropdownMenu from './dropdown';
import ThemeSwitch from '@/components/ui/theme-switch';
import menus from './menus.json';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';

const Header = () => {
  const { data: session } = useSession();
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

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
      className={`${
        isHomePage ? 'fixed' : 'sticky'
      } z-10 top-0 w-full transition-colors duration-300 ${
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
              <CiShoppingCart size={20} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
