import PostPrayerFeed from "@/components/PostPrayerFeed";
import { getPrayers } from "@/lib/server-actions";
import PrayerFeed from "./PrayerFeed";

async function page({ searchParams }: PageProps) {
  const params = { ...searchParams, owner: "self", page: "1", size: "10" };
  const prayersData = await getPrayers<{ data: Prayer[] }>(params);

  return (
    <div className="flex flex-col gap-5">
      <PostPrayerFeed />
      <PrayerFeed initialPrayers={prayersData.data} />
    </div>
  );
}

export default page;
