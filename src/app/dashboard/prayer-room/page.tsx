import PrayerCard from "@/components/PrayerCard";
function page({ searchParams }: PageProps) {
  const { page } = searchParams;
  return (
    <>
      <PrayerCard />
    </>
  );
}

export default page;
