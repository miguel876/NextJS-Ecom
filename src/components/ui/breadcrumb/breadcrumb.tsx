'use client';

import React from 'react';
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Breadcrumb as SBreadcrumb,
} from '../breadcrumb';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export const Breadcrumb = () => {
  const pathname = usePathname();
  const pathNames = pathname.split('/').filter((path) => path);
  const pathNamesWithoutLastName = pathNames.slice(0, -1);

  const translate = useTranslations('menus');

  return (
    <SBreadcrumb>
      {pathNames.length > 1 && (
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">{translate('home')}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {pathNamesWithoutLastName.map((path, i) => {
            let href = `/${pathNames.slice(0, i + 1).join('/')}`;

            return (
              <BreadcrumbItem key={path}>
                <BreadcrumbSeparator />
                <BreadcrumbLink asChild>
                  <Link href={href}>{translate(path)}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            );
          })}
        </BreadcrumbList>
      )}
    </SBreadcrumb>
  );
};
