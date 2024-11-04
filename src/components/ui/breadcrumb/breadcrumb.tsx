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
  const translate = useTranslations('menus');

  return (
    <SBreadcrumb>
      <BreadcrumbList>
        {pathNames.map((path, i) => {
          let href = `/${pathNames.slice(0, i + 1).join('/')}`;

          return (
            <BreadcrumbItem key={path}>
              <BreadcrumbLink asChild>
                <Link href="/">{translate('home')}</Link>
              </BreadcrumbLink>
              <BreadcrumbSeparator />
              {pathNames.length > 0 &&
                (pathNames.length - 1 === i ? (
                  <BreadcrumbPage>{translate(path)}</BreadcrumbPage>
                ) : (
                  <>
                    <BreadcrumbLink asChild>
                      <Link href={href}>{translate(path)}</Link>
                    </BreadcrumbLink>
                    <BreadcrumbSeparator />
                  </>
                ))}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </SBreadcrumb>
  );
};
