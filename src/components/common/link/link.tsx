import { createSharedPathnamesNavigation } from 'next-intl/navigation';

const locales = ['pt', 'en'];

export const { Link, redirect, usePathname, useRouter } =
    createSharedPathnamesNavigation({ locales });