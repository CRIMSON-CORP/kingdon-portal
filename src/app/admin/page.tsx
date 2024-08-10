import { DatePickerWithRange } from "@/components/DatePicker";
import Icon from "@/components/Icon";
import PostPrayerFeed from "@/components/PostPrayerFeed";
import Link from "next/link";

function page() {
  return (
    <div className="flex flex-col gap-5">
      <PostPrayerFeed />
      <DateRangeFilter />
      <Stats />
      <Graph />
    </div>
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

function Stats() {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(203px,1fr))] gap-6">
      <Stat title="TOTAL USERS" value={12283} iconName="group-fill" />
      <Stat title="ONLINE USERS" value={10183} iconName="group-fill" />
      <Stat title="PRAYER REQUESTS" value={10183} iconName="book-fill" />
      <Stat title="CHOSEN PR" value={10183} iconName="book-fill" />
      <Stat title="COMPLETED PR" value={10183} iconName="book-fill" />
      <div className="col-span-full">
        <Stat
          title="TESTIMONIES"
          value={10183}
          iconName="mega-phone"
          rightElement={
            <Link href="" className="text-[#2967b3] text-sm w-max">
              Details&rarr;
            </Link>
          }
        />
      </div>
    </div>
  );
}

interface StatsProps {
  title: string;
  iconName: string;
  value: number;
  trend?: "up" | "down";
  trendValue?: string;
  rightElement?: React.ReactNode;
}
function Stat({ title, iconName, value, rightElement }: StatsProps) {
  return (
    <div className="bg-white rounded-[10px] border border-[#e7e7e7] p-4 w-full flex items-center justify-between gap-4">
      <div className="w-full flex flex-col gap-2">
        <div className="flex items-center gap-2.5">
          <div className="size-10 flex items-center justify-center bg-[#e5e6e7]/50 rounded-xl">
            <Icon name={iconName} size={20} />
          </div>
          <span className="uppercase text-sm font-normal">{title}</span>
        </div>
        <div className="flex gap-2">
          <span className="text-[32px] font-medium">{value}</span>
          <div className="flex items-center gap-1">
            <Icon name="up-trend" size={16} />
            <span className="text-[#0ac87e] text-sm font-normal">24.1%</span>
          </div>
        </div>
      </div>
      {rightElement}
    </div>
  );
}

function Graph() {
  return (
    <div className="bg-white rounded-[20px] border border-[#e7e7e7] px-4 py-6">
      <h2 className="text-base font-medium uppercase">TOTAL USAGE</h2>
    </div>
  );
}
