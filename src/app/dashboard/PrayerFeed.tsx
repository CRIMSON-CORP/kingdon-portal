"use client";
import InfiniteScroll from "@/components/InifiniteScroll";
import PrayerCard from "@/components/PrayerCard";
import { getPrayers } from "@/lib/server-actions";

interface PrayerFeedProps {
  initialPrayers: Prayer[];
  params: PageProps["searchParams"];
}
function PrayerFeed({ initialPrayers, params }: PrayerFeedProps) {
  return (
    <InfiniteScroll
      initialData={{
        pages: [initialPrayers],
        pageParams: [1],
      }}
      initialPageParam={1}
      queryFn={async ({ pageParam }) => {
        const response = await getPrayers<{ data: Prayer[] }>({
          ...params,
          page: pageParam.toString(),
        });

        return response.data;
      }}
      queryKey={["prayers", "self"]}
    >
      {({ data }) => (
        <>
          {data.map((prayer, index) => (
            <PrayerCard key={prayer.uuid} {...prayer} />
          ))}
        </>
      )}
    </InfiniteScroll>
  );
}

export default PrayerFeed;
