import PostPrayerFeed from "@/components/PostPrayerFeed";
import PrayerCard from "@/components/PrayerCard";

async function page() {
  return (
    <div className="flex flex-col gap-5">
      <PostPrayerFeed />
      <PrayerCard />
    </div>
  );
}

export default page;
