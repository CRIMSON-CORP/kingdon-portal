import { DatePickerWithRange } from "@/components/DatePicker";
import PostPrayerFeed from "@/components/PostPrayerFeed";
import { Suspense } from "react";
import NavBar from "./NavBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col gap-4">
      <Suspense>
        <NavBar />
      </Suspense>
      <PostPrayerFeed />
      <DateRangeFilter />

      <div className="flex flex-col gap-5">{children}</div>
    </div>
  );
}

function DateRangeFilter() {
  return (
    <div className="flex justify-end">
      <DatePickerWithRange />
    </div>
  );
}
