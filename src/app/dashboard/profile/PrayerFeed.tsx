"use client";
import InfiniteScroll from "@/components/InifiniteScroll";
import PrayerCard from "@/components/PrayerCard";
import { getPrayers } from "@/lib/server-actions";

function PrayerFeed({ prayers }: { prayers: Prayer[] }) {
  return (
    <InfiniteScroll
      initialPageParam={1}
      initialData={{
        pages: [prayers],
        pageParams: [1],
      }}
      queryFn={async ({ pageParam }) => {
        const response = await getPrayers<{ data: Prayer[] }>({
          owner: "self",
          page: `${pageParam}`,
        });
        return response.data;
      }}
      queryKey={["prayes", "owner"]}
    >
      {({ data }) => (
        <>
          {data.map((prayer, index) => (
            <PrayerCard key={index} {...prayer} mode="request" />
          ))}
        </>
      )}
    </InfiniteScroll>
  );
}

export default PrayerFeed;
