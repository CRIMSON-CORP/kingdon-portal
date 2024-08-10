"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

function NavBar() {
  const urlSearchParams = useSearchParams();
  const page = urlSearchParams.get("page");
  return (
    <nav className="[&>[data-active='true']]:text-[#2967b3] text-[#808591] text-base font-medium font-['Lexend Deca'] flex gap-5 items-center">
      <Link href="/admin/prayer-bank" data-active={page === null}>
        All - 10,000
      </Link>
      <Link
        href="/admin/prayer-bank?page=suspended"
        data-active={page === "suspended"}
      >
        Suspended/Banned Users - 100
      </Link>
    </nav>
  );
}

export default NavBar;
