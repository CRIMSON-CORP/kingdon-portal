"use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

const maxVisiblePages = parseInt(
  process.env.NEXT_PUBLIC_PAGINATION_PAGE_SIZE || "10"
);

function ListPagination({
  offset,
  page,
  pageSize,
  pages,
  rows,
}: PaginationData) {
  const searchParams = useSearchParams();
  const urlSearchparams = new URLSearchParams(searchParams);
  const currentPage = parseInt(urlSearchparams.get(`page`) || "1");

  const prevSearchParams = new URLSearchParams(searchParams);
  const nextSearchParams = new URLSearchParams(searchParams);

  if (currentPage === 2) {
    prevSearchParams.delete(`page`);
  } else {
    prevSearchParams.set(`page`, (currentPage - 1).toString());
  }

  nextSearchParams.set(`page`, (currentPage + 1).toString());

  const paginationButtons = useMemo(() => {
    const pageButtons = [];
    const paginationSearchParams = new URLSearchParams(searchParams);
    if (pages <= maxVisiblePages) {
      for (let i = 1; i <= pages; i++) {
        paginationSearchParams.set(`page`, i.toString());
        pageButtons.push(
          <PaginationItem key={i}>
            <PaginationLink href={`?${paginationSearchParams.toString()}`}>
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      const startPage = Math.max(page - Math.floor(maxVisiblePages / 2), 1);
      const endPage = Math.min(startPage + maxVisiblePages - 1, pages);

      if (startPage > 1) {
        paginationSearchParams.set(`page`, "1");
        pageButtons.push(
          <PaginationItem key={1}>
            <PaginationLink href={`?${paginationSearchParams.toString()}`}>
              1
            </PaginationLink>
          </PaginationItem>
        );
        if (startPage > 2) {
          pageButtons.push(
            <PaginationItem key="ellipses">
              <PaginationEllipsis />
            </PaginationItem>
          );
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        paginationSearchParams.set(`page`, i.toString());
        pageButtons.push(
          <PaginationItem key={i}>
            <PaginationLink href={`?${paginationSearchParams.toString()}`}>
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }

      if (endPage < pages) {
        if (endPage < pages - 1) {
          pageButtons.push(
            <PaginationItem key="ellipses">
              <PaginationEllipsis />
            </PaginationItem>
          );
        }
        paginationSearchParams.set(`page`, pages.toString());
        pageButtons.push(
          <PaginationItem key={pages}>
            <PaginationLink href={`?${paginationSearchParams.toString()}`}>
              {pages}
            </PaginationLink>
          </PaginationItem>
        );
      }
    }
    return pageButtons;
  }, [page, pages, searchParams]);

  return (
    <Pagination>
      <PaginationContent className="w-full flex items-center justify-between space-x-2 py-5 border-t flex-wrap gap-3">
        <PaginationItem
          data-first={page === 1}
          className="data-[first='true']:opacity-40 data-[first='true']:pointer-events-none"
        >
          <PaginationPrevious href={`?${prevSearchParams.toString()}`} />
        </PaginationItem>
        <div className="flex items-center gap-1">{paginationButtons}</div>
        <PaginationItem
          data-last={page === pages}
          className="data-[last='true']:opacity-40 data-[last='true']:pointer-events-none"
        >
          <PaginationNext href={`?${nextSearchParams.toString()}`} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default ListPagination;
