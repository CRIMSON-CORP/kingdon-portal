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

function SideBar() {
  const pathname = usePathname();
  const URLSWhereCannotShowSideBar = ["profile", "settings"];
  const canShowSidebar = !URLSWhereCannotShowSideBar.includes(
    pathname.split("/")[2]
  );

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
                src="/img/avatar.png"
                width={100}
                height={100}
                quality={100}
                alt="avatar"
                className="rounded-full"
              />
              <span className="text-[#020b23] text-sm font-medium">
                Adebimpe Ashley
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#808591] text-sm">
                <Icon name="book" size={20} />
                <span>My Prayer Requests</span>
              </div>
              <span className=" text-[#020b23]">10</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#808591] text-sm">
                <Icon name="speaker" size={20} />
                <span>Testimonies</span>
              </div>
              <span className=" text-[#020b23]">5</span>
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
                    1500
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
                    1450
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
