import PrayerRequestCard from "@/components/PrayerCard/PrayerRequestCard";
import TestimonyCard from "@/components/TestimonyCard";

function page({ searchParams }: PageProps) {
  const { page } = searchParams;
  return (
    <div>
      {page === "testimonies" ? <TestimonyCard /> : <PrayerRequestCard />}
    </div>
  );
}

export default page;
