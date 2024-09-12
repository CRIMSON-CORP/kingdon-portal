"use client";
import { usePathname } from "next/navigation";
import AsideContent from "../AsideContent";
import AsidePostButton from "./AsidePostButton";

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

function Aside() {
  const pathname = usePathname();
  const URLSWhereCannotShowAsideBar = ["settings"];
  const canShowAsidebar = !URLSWhereCannotShowAsideBar.includes(
    pathname.split("/")[2]
  );

  return (
    <aside
      data-can-show={canShowAsidebar}
      className="flex-col gap-6 data-[can-show='true']:flex hidden h-full overflow-auto scrollable"
    >
      <AsideContent title="Let's Complete" content={completContent} />
      <AsideContent title="Trending Prayer Requests" content={completContent} />
      <AsidePostButton />
    </aside>
  );
}

export default Aside;
