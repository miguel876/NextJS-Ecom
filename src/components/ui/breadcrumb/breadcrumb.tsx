"use client"

import React from 'react'
import { BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, Breadcrumb as SBreadcrumb } from '../breadcrumb';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export const Breadcrumb = () => {
  const pathname = usePathname();
  const pathNames = pathname.split('/').filter(path => path)
    
  return (
    <SBreadcrumb className='container my-4'>
      <BreadcrumbList>
        {
          pathNames.map((path, i) => {
            let href = `/${pathNames.slice(0, i + 1).join('/')}`

            return (
              <BreadcrumbItem key={path}>
                {
                  pathNames.length > 1 && (
                    pathNames.length - 1 === i ?
                      <BreadcrumbPage>{path}</BreadcrumbPage>
                      :
                      <>
                        <BreadcrumbLink asChild>
                          <Link href={href}>{path}</Link>
                        </BreadcrumbLink>
                        <BreadcrumbSeparator />
                      </>
                  )
                }
              </BreadcrumbItem>
            )
          })
        }
      </BreadcrumbList>
    </SBreadcrumb>

  )
}
