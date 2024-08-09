"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function NavBar() {
  const pathname = usePathname();
  const path = pathname.split("/")[3];

  return (
    <nav className="[&>[data-active='true']]:text-[#2967b3] text-[#808591] text-base font-medium font-['Lexend Deca'] flex gap-5 items-center">
      <Link href="/dashboard/prayer-room" data-active={path === undefined}>
        Completed
      </Link>
      <Link
        href="/dashboard/prayer-room?page=pending"
        data-active={path === "pending"}
      >
        Pending
      </Link>
    </nav>
  );
}

export default NavBar;
