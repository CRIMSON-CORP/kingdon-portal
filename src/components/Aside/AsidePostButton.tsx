"use client";
import { usePathname } from "next/navigation";

function AsidePostButton() {
  const pathname = usePathname();
  const URLSWhereCannotShowSideBar = ["profile", "settings"];
  const canShowButton = URLSWhereCannotShowSideBar.includes(
    pathname.split("/")[2]
  );
  return (
    <button
      data-can-show={canShowButton}
      className="p-4 bg-[#2967b3] rounded text-white text-sm font-semibold  data-[can-show='true']:block hidden"
    >
      Post
    </button>
  );
}

export default AsidePostButton;
