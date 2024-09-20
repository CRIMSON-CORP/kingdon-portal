"use client";
import { usePostPrayerModal } from "@/contexts/PostPrayerModalProvider";
import Image from "next/image";
import { usePathname } from "next/navigation";
import AsideContent from "../AsideContent";
import Icon from "../Icon";

const completContent: AsideContent[] = [
  {
    avatar: "/img/avatar.png",
    userId: "Ele1981",
    title: "Prayer of healing for my mum",
    content:
      "Heavenly Father, I humbly ask for your healing touch on my beloved mum. Grant her strength to overcome the storms of life.",
  },
  {
    avatar: "/img/avatar.png",
    userId: "layla34",
    title: "Prayer for scholarship",
    content:
      "Heavenly Father, I humbly ask for your healing touch on my beloved mum. Grant her strength to overcome the storms of life.",
  },
  {
    avatar: "/img/avatar.png",
    userId: "Jordan678",
    title: "Prayer for visa approval",
    content:
      "Heavenly Father, I humbly ask for your healing touch on my beloved mum. Grant her strength to overcome the storms of life.",
  },
];

const numberFormatter = Intl.NumberFormat("en-US", {
  compactDisplay: "short",
});

function SideBar({ dashboardData }: { dashboardData: UserDashboard }) {
  const pathname = usePathname();
  const URLSWhereCannotShowSideBar = ["profile", "settings"];
  const canShowSidebar = !URLSWhereCannotShowSideBar.includes(
    pathname.split("/")[2]
  );

  const {
    user,
    prayer_count,
    testimony_count,
    chosen_prayer_count,
    completed_prayer_count,
  } = dashboardData;

  return (
    <div className="hidden md:block">
      <div
        data-can-show={canShowSidebar}
        className="flex-col gap-4 data-[can-show='true']:flex hidden md:flex self-start sticky top-0"
      >
        <div className="bg-white rounded-[20px] border border-[#e7e7e7] flex-col py-5">
          <div className="flex flex-col gap-4 px-4">
            <div className="flex flex-col items-center gap-2">
              <Image
                src={user.image_url || "/img/avatar.png"}
                width={100}
                height={100}
                quality={100}
                alt={user.unique_id}
                className="rounded-full"
              />
              <span className="text-[#020b23] text-sm font-medium">
                {user.unique_id}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#808591] text-sm">
                <Icon name="book" size={20} />
                <span>My Prayer Requests</span>
              </div>
              <span className=" text-[#020b23]">
                {numberFormatter.format(prayer_count)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#808591] text-sm">
                <Icon name="speaker" size={20} />
                <span>Testimonies</span>
              </div>
              <span className=" text-[#020b23]">
                {numberFormatter.format(testimony_count)}
              </span>
            </div>
          </div>
          <hr className="border-[#e7e7e7] my-5" />
          <div className="flex flex-col gap-4 px-4">
            <span className="text-[#020b23] text-sm">Analytics</span>
            <div className="flex justify-between">
              <div className="flex items-center gap-2 text-[#808591] text-sm">
                <Icon name="prayer" />
                <div className="flex flex-col gap-0.5">
                  <span className="text-[#020b23] text-[10px] font-light leading-none">
                    Total Chosen
                  </span>
                  <span className="text-[#020b23] text-xs font-medium leading-none">
                    {numberFormatter.format(chosen_prayer_count)}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-[#808591] text-sm">
                <Icon name="completed" />
                <div className="flex flex-col gap-0.5">
                  <span className="text-[#020b23] text-[10px] font-light leading-none">
                    Completed
                  </span>
                  <span className="text-[#020b23] text-xs font-medium leading-none">
                    {numberFormatter.format(completed_prayer_count)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <PostPrayerButton />
        {pathname.includes("admin") && (
          <AsideContent title="Check Reports" content={completContent} />
        )}
      </div>
    </div>
  );
}

export default SideBar;

function PostPrayerButton() {
  const { openModal } = usePostPrayerModal();
  return (
    <button
      onClick={openModal}
      className="p-4 bg-[#2967b3] rounded text-white text-sm font-semibold"
    >
      Post
    </button>
  );
}
