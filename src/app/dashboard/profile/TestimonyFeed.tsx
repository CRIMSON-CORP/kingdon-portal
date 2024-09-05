"use client";
import InfiniteScroll from "@/components/InifiniteScroll";
import TestimonyCard from "@/components/TestimonyCard";
import { getTestimonies } from "@/lib/server-actions";

function TestimonyFeed({ testimonies }: { testimonies: Testimony[] }) {
  return (
    <InfiniteScroll
      initialPageParam={1}
      initialData={{
        pages: [testimonies],
        pageParams: [1],
      }}
      queryFn={async ({ pageParam }) => {
        const response = await getTestimonies<{ data: Testimony[] }>({
          self: "self",
          page: pageParam,
        });
        return response.data;
      }}
      queryKey={["testimonies", "self"]}
    >
      {({ data }) => (
        <>
          {data.map((testimony, index) => (
            <TestimonyCard key={index} {...testimony} />
          ))}
        </>
      )}
    </InfiniteScroll>
  );
}

export default TestimonyFeed;
