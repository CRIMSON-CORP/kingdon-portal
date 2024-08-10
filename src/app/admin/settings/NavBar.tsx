"use client";
import Icon from "@/components/Icon";
import Link from "next/link";
import { usePathname } from "next/navigation";

function NavBar() {
  const pathname = usePathname();
  const path = pathname.split("/")[3];
  console.log(path);

  return (
    <nav className="relative w-full max-w-[400px] h-full bg-white pb-10 flex flex-col gap-12 before:absolute after:absolute before:bg-white after:bg-white before:w-[30vw] after:w-[40vw] before:inset-0 before:left-0 before:-translate-x-full after:h-10 after:top-0 after:right-0 after:-translate-y-full before:block">
      <header className="text-2xl font-medium ">Settings</header>
      <div className="flex flex-col gap-10">
        <Link
          href="/dashboard/settings"
          data-active={path === undefined}
          className="flex items-center gap-5 data-[active='true']:text-[#020B23] text-[#808591]"
        >
          <Icon name="profile" />
          Edit Profile
        </Link>
        <Link
          href="/dashboard/settings/donation"
          data-active={path === "donation"}
          className="flex items-center gap-5 data-[active='true']:text-[#020B23] text-[#808591]"
        >
          <Icon name="donate-heart" />
          Make a donation
        </Link>
        <Link
          href="/dashboard/settings/invite"
          data-active={path === "invite"}
          className="flex items-center gap-5 data-[active='true']:text-[#020B23] text-[#808591]"
        >
          <Icon name="group" />
          Invite Friends
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
