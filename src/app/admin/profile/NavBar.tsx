"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

function NavBar() {
  const urlSearchParams = useSearchParams();
  const page = urlSearchParams.get("page");

  return (
    <nav className="[&>[data-active='true']]:text-[#2967b3] text-[#808591] text-base font-medium font-['Lexend Deca'] flex gap-5 items-center">
      <Link href="/dashboard/profile" data-active={page === null}>
        My Prayer Requests
      </Link>
      <Link
        href="/dashboard/profile?page=testimonies"
        data-active={page === "testimonies"}
      >
        My Testimonies
      </Link>
    </nav>
  );
}

export default NavBar;
