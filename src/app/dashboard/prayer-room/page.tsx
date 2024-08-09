import PostPrayerFeed from "@/components/PostPrayerFeed";
import PrayerCard from "@/components/PrayerCard";
function page({ searchParams }: PageProps) {
  const { page } = searchParams;
  return (
    <>
      <PostPrayerFeed />
      <PrayerCard />
    </>
  );
}

export default page;
