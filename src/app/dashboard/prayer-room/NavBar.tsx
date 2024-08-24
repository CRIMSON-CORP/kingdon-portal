"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

function NavBar() {
  const urlSearchParams = useSearchParams();
  const view = urlSearchParams.get("view");
  return (
    <nav className="[&>[data-active='true']]:text-[#2967b3] text-[#808591] text-base font-medium font-['Lexend Deca'] flex gap-5 items-center">
      <Link href="/dashboard/prayer-room" data-active={view === null}>
        Completed
      </Link>
      <Link
        href="/dashboard/prayer-room?view=pending"
        data-active={view === "pending"}
      >
        Pending
      </Link>
    </nav>
  );
}

export default NavBar;
