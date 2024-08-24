import ListPagination from "@/components/ListPagination";
import PrayerCard from "@/components/PrayerCard";
import { getPrayers } from "@/lib/server-actions";
async function page({ searchParams }: PageProps) {
  const params = {
    ...searchParams,
    owner: "self",
    prayer_status: searchParams.view === "pending" ? "praying" : "prayed",
  };
  const prayers = await getPrayers<{ data: Prayer[] } & PaginationData>(params);
  return (
    <div className="flex flex-col gap-5">
      {prayers.data.map((prayer) => (
        <PrayerCard key={prayer.uuid} {...prayer} />
      ))}
      <ListPagination {...prayers} />
    </div>
  );
}

export default page;
