"use client";
import Icon from "@/components/Icon";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Header() {
  return (
    <header className="py-10 bg-white">
      <div className="container flex justify-between items-center gap-4 w-full">
        <Image src="/img/logo.png" width={60} height={60} alt="logo" />
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
    href: "/admin",
    name: "Dashboard",
    matchers: ["/", "dashbaord", undefined],
  },
  {
    href: "/admin/prayer-bank",
    name: "Prayer Bank",
    matchers: ["prayer-bank"],
  },
  {
    href: "/admin/testimonies",
    name: "Testimonies",
    matchers: ["testimonies"],
  },
  {
    href: "/admin/users",
    name: "Users",
    matchers: ["users"],
  },
  {
    href: "/admin/profile",
    name: "More",
    matchers: ["profile", "settings"],
  },
];

function NavBar() {
  return (
    <nav className="flex gap-16 items-center">
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
  return (
    <div className="flex items-center gap-6">
      <Icon name="search" />
      <div className="relative">
        <Icon name="notification" />
        <span className="absolute right-1 top-1 w-[4.80px] h-[4.80px] bg-[#2967b3] rounded-full"></span>
      </div>
      <button className="flex gap-3 items-center">
        <Image
          src="/img/avatar.png"
          width={38}
          height={38}
          alt="avatar"
          className="rounded-full"
        />
        <Icon name="caret-down" size={20} />
      </button>
    </div>
  );
}
