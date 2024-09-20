import { getPrayers } from "@/lib/server-actions";
import Feed from "./Feed";
async function page({ searchParams }: PageProps) {
  const params = {
    ...searchParams,
    owner: "self",
    prayer_status: searchParams.view === "pending" ? "praying" : "prayed",
  };
  const prayers = await getPrayers<{ data: Prayer[] }>(params);
  return <Feed prayers={prayers.data} status={params.prayer_status} />;
}

export default page;
