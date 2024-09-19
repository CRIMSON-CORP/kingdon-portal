import ListPagination from "@/components/ListPagination";
import PostPrayerFeed from "@/components/PostPrayerFeed";
import TestimonyCard from "@/components/TestimonyCard";
import { getTestimonies } from "@/lib/server-actions";
async function page() {
  const testimines = await getTestimonies<
    {
      data: Testimony[];
    } & PaginationData
  >({
    self: "self",
    page: 1,
  });

  return (
    <>
      <PostPrayerFeed />
      {testimines.data.map((testimony) => (
        <TestimonyCard key={testimony.id} {...testimony} />
      ))}
      <ListPagination {...testimines} />
    </>
  );
}

export default page;
