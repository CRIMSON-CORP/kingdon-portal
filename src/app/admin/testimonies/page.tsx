import { DatePickerWithRange } from "@/components/DatePicker";
import PostPrayerFeed from "@/components/PostPrayerFeed";
function page() {
  return (
    <>
      <PostPrayerFeed />
      <DateRangeFilter />
      {/* <TestimonyCard /> */}
    </>
  );
}

export default page;

function DateRangeFilter() {
  return (
    <div className="flex justify-end">
      <DatePickerWithRange />
    </div>
  );
}
