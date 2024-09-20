"use client";
import InfiniteScroll from "@/components/InifiniteScroll";
import PrayerCard from "@/components/PrayerCard";
import { getPrayers } from "@/lib/server-actions";

function Feed({ prayers, status }: { prayers: Prayer[]; status: string }) {
  return (
    <InfiniteScroll
      initialData={{
        pages: [prayers],
        pageParams: [1],
      }}
      initialPageParam={1}
      queryFn={async ({ pageParam }) => {
        const response = await getPrayers<{ data: Prayer[] }>({
          page: pageParam.toString(),
          owner: "self",
          prayer_status: status,
        });

        return response.data;
      }}
      queryKey={["prayers", "self", status]}
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

export default Feed;
