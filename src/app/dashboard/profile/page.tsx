import { getPrayers, getTestimonies } from "@/lib/server-actions";
import PrayerFeed from "./PrayerFeed";
import TestimonyFeed from "./TestimonyFeed";

async function page({ searchParams }: PageProps) {
  const { page } = searchParams;
  if (page === "testimonies") {
    const testimonies = await getTestimonies<{
      data: Testimony[];
    }>({
      self: "self",
      page: 1,
    });
    return <TestimonyFeed testimonies={testimonies.data} />;
  }
  const prayers = await getPrayers<{ data: Prayer[] }>({
    owner: "self",
    page: "1",
  });
  return <PrayerFeed prayers={prayers.data} />;
}

export default page;
