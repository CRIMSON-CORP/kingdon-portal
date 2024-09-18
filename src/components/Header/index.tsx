"use client";
import useToggle from "@/hooks/useToggle";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Icon from "../Icon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

function Header() {
  return (
    <header className="py-3 sm:py-5 md:py-10 bg-white">
      <div className="container flex justify-between items-center gap-4 w-full">
        <Image
          src="/img/logo.png"
          width={60}
          height={60}
          alt="logo"
          className="h-8 sm:h-auto w-auto"
        />
        <NavBar />
        <ProfileBar />
      </div>
    </header>
  );
}

export default Header;

interface NavItem {
  href: string;
  name: string;
  matchers: (string | undefined)[];
}

const navItems: NavItem[] = [
  {
    href: "/dashboard",
    name: "Prayer Bank",
    matchers: ["/", "dashbaord", undefined],
  },
  {
    href: "/dashboard/prayer-room",
    name: "Prayer Room",
    matchers: ["prayer-room"],
  },
  {
    href: "/dashboard/testimonies",
    name: "Testimonies",
    matchers: ["testimonies"],
  },
  {
    href: "/dashboard/profile",
    name: "Profile",
    matchers: ["profile", "settings"],
  },
];

function NavBar() {
  return (
    <nav className="gap-16 items-center hidden lg:flex">
      {navItems.map((item) => (
        <NavItem key={item.href} {...item} />
      ))}
    </nav>
  );
}

function NavItem({ href, name, matchers }: NavItem) {
  const pathname = usePathname();

  const active = matchers.includes(pathname.split("/")[2]);
  return (
    <Link
      href={href}
      data-active={active}
      className="data-[active='true']:text-[#020b23] text-[#808591] text-lg font-bold"
    >
      {name}
    </Link>
  );
}

function ProfileBar() {
  const pathname = usePathname();
  const { value, close, open, toggle } = useToggle(false);

  useEffect(() => {
    close();
  }, [pathname, close]);

  return (
    <div className="flex items-center gap-6">
      <Icon name="search" />
      <div className="relative">
        <Icon name="notification" />
        <span className="absolute right-1 top-1 w-[4.80px] h-[4.80px] bg-[#2967b3] rounded-full"></span>
      </div>
      <DropdownMenu open={value} onOpenChange={toggle}>
        <DropdownMenuTrigger className="flex gap-3 items-center">
          <Image
            src="/img/avatar.png"
            width={38}
            height={38}
            alt="avatar"
            className="rounded-full"
          />
          <Icon name="caret-down" size={20} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <Link href="/dashboard">Prayer Bank</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/dashboard/prayer-room">Prayer Room</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/dashboard/testimonies">Testimines</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/dashboard/profile">Profile</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
