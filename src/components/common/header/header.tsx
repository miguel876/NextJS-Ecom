'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import GoogleLogin from '@/app/(auth)/login/GoogleLogin';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getInitials } from '@/lib/utils';
import ThemeSwitch from '@/components/ui/theme-switch';
import menus from './menus.json';
import { signOut, useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import Cart from './cart';
import { Menu, Settings, UserRound } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

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
            <div className="flex items-center gap-2">
              <Sheet>
                <SheetTrigger>
                  <Menu />
                </SheetTrigger>
                <SheetContent
                  side="left"
                  className="h-full flex flex-col justify-between"
                >
                  <SheetHeader>
                    <SheetTitle />
                    <SheetDescription>
                      {menus.map((menu) => (
                        <div key={`menu-${menu.id}`} className="mb-2">
                          <Link
                            href={menu.link}
                            className="text-primary text-lg relative
                              after:absolute after:bottom-0 after:left-0 after:h-[2px] 
                              after:w-0 after:bg-primary after:transition-all after:duration-300
                              hover:after:w-full"
                          >
                            {menu.label}
                          </Link>
                        </div>
                      ))}
                    </SheetDescription>
                  </SheetHeader>
                  <SheetFooter />
                </SheetContent>
              </Sheet>
              <Link href="/">MigStore</Link>
            </div>
            <div className="flex items-center gap-3">
              <Sheet>
                <SheetTrigger>
                  {!session?.user?.name ? (
                    <UserRound size={20} />
                  ) : (
                    <Avatar className="size-7">
                      <AvatarImage
                        src={session?.user?.image as string}
                        alt="Profile Image"
                      />
                      <AvatarFallback>
                        {getInitials(session?.user?.name as string)}
                      </AvatarFallback>
                    </Avatar>
                  )}
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>
                      {session?.user?.name || 'Login/ Register'}
                    </SheetTitle>
                    <SheetDescription className="flex flex-col gap-4">
                      {session?.user?.name ? (
                        <div className="flex flex-col gap-2 mt-3">
                          <Link
                            href="/profile"
                            className="hover:text-primary transition flex gap-1 items-center"
                          >
                            <UserRound size={15} />
                            Profile
                          </Link>
                          <Link
                            href="/settings"
                            className="hover:text-primary transition flex gap-1 items-center"
                          >
                            <Settings size={15} />
                            Settings
                          </Link>
                        </div>
                      ) : (
                        <>
                          <h1>Login with your account or create an account!</h1>
                          <GoogleLogin />
                        </>
                      )}
                    </SheetDescription>
                  </SheetHeader>
                  <SheetFooter>
                    {session?.user?.name && (
                      <Button
                        className="uppercase w-full mt-7"
                        onClick={() => signOut()}
                      >
                        Logout
                      </Button>
                    )}
                  </SheetFooter>
                </SheetContent>
              </Sheet>
              <ThemeSwitch />
              <Cart />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
