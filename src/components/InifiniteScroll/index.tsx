"use client";
import {
  InfiniteData,
  InitialDataFunction,
  QueryFunction,
  QueryObserverResult,
  RefetchOptions,
  useInfiniteQuery,
} from "@tanstack/react-query";
import React, { useEffect, useMemo, useRef } from "react";

interface InfiniteScrollProps<T> {
  children:
    | React.ReactNode
    | ((props: {
        isPending: boolean;
        error: Error | null;
        data: T[];
        refetch: (
          options?: RefetchOptions
        ) => Promise<QueryObserverResult<InfiniteData<T[], unknown>, Error>>;
      }) => React.ReactNode);
  queryFn: QueryFunction<T[], string[], number>;
  queryKey: any;
  initialData:
    | InfiniteData<T[], number>
    | InitialDataFunction<InfiniteData<T[], number>>
    | undefined;
  initialPageParam: number;
}

function InfiniteScroll<T>({
  queryKey,
  queryFn,
  children,
  initialData,
  initialPageParam,
}: InfiniteScrollProps<T>) {
  const observerRoot = useRef<HTMLDivElement | null>(null);
  const observeElement = useRef<HTMLDivElement | null>(null);
  const { isPending, error, data, refetch, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey,
      initialPageParam,
      queryFn,
      initialData: initialData,
      getNextPageParam: (lastPage, allPages) => {
        return (lastPage as UserLike[]).length <
          parseInt(process.env.NEXT_PUBLIC_PAGINATION_PAGE_SIZE || "10")
          ? null
          : allPages.length + 1;
      },
    });

  useEffect(() => {
    let observer = null;
    if (observeElement.current) {
      observer = new IntersectionObserver(
        (entries) => {
          console.log(entries[0].isIntersecting);

          if (
            entries[0].target === observeElement.current &&
            entries[0].isIntersecting
          ) {
            fetchNextPage();
          }
        },
        {
          rootMargin: "200px 0px",
          threshold: 0.1,
        }
      );

      observer.observe(observeElement.current);
    }

    return () => {
      observer?.disconnect();
    };
  }, [fetchNextPage]);

  const collapsedData = useMemo(() => {
    return data?.pages.flatMap((page) => page) || [];
  }, [data]);

  if (typeof children === "function") {
    return (
      <>
        {children({
          isPending,
          error,
          data: collapsedData,
          refetch,
        })}
        <div
          ref={observeElement}
          style={{ height: "120px", flex: "none" }}
        ></div>
      </>
    );
  } else {
    return children;
  }
}

export default InfiniteScroll;
