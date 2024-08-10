import PrayerCard from "@/components/PrayerCard";

function page({ searchParams }: PageProps) {
  const { page } = searchParams;
  return (
    <div className="flex flex-col gap-5">
      <PrayerCard />
    </div>
  );
}

export default page;
