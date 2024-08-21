import { DatePickerWithRange } from "@/components/DatePicker";
import Icon from "@/components/Icon";
import PostPrayerFeed from "@/components/PostPrayerFeed";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import NavBar from "./NavBar";
import Search from "./Search";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col gap-4">
      <NavBar />
      <PostPrayerFeed />
      <div className="flex items-center gap-3">
        <div className="flex items-center p-3 rounded-lg border border-[#e7e7e7] gap-2 flex-1">
          <Icon name="search" />
          <Search />
        </div>
        <DateRangeFilter />
      </div>

      <div className="flex flex-col gap-6 relative bg-white rounded-[20px] border border-[#e7e7e7] px-8 py-5">
        <Sort />
        {children}
      </div>
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

function Sort() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort By:" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="recent">
          Sort By: <span className="font-bold">Recently Joined</span>
        </SelectItem>
        <SelectItem value="banned">
          Sort By: <span className="font-bold">Banned</span>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
