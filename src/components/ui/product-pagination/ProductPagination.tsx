'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Pagination as ShadCNPagination,
} from '../pagination';
import { ProductPaginationInterface } from '@/interfaces/product';

const ProductPagination = ({ totalPages = 1 }: ProductPaginationInterface) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams);

  // Get current page from URL or default to 1
  const page = Number(searchParams.get('page')) || 1;

  const handlePageChange = (pageNumber: number) => {
    params.set('page', pageNumber.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  // Generate array of page numbers to show
  const getPageNumbers = () => {
    const pages: number[] = [];
    const showMax = 5; // Maximum number of page buttons to show

    if (totalPages <= showMax) {
      console.log(totalPages, showMax);

      // Show all pages if total is less than or equal to showMax
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Always show first page
    pages.push(1);

    // Calculate start and end of page numbers around current page
    let start = Math.max(2, page - 1);
    let end = Math.min(totalPages - 1, page + 1);

    // Add ellipsis after first page if needed
    if (start > 2) {
      pages.push(-1); // -1 represents ellipsis
    }

    // Add pages around current page
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Add ellipsis before last page if needed
    if (end < totalPages - 1) {
      pages.push(-1); // -1 represents ellipsis
    }

    // Always show last page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <ShadCNPagination>
      <PaginationContent>
        {page > 1 && (
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(page - 1);
              }}
            />
          </PaginationItem>
        )}

        {getPageNumbers().map((pageNumber, index) => (
          <PaginationItem key={`${pageNumber}-${index}`}>
            {pageNumber === -1 ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href="#"
                isActive={pageNumber === page}
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(pageNumber);
                }}
              >
                {pageNumber}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        {page < totalPages && (
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(page + 1);
              }}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </ShadCNPagination>
  );
};

export default ProductPagination;
