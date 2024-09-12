import Icon from "@/components/Icon";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import NavBar from "./NavBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="lg:col-span-2 flex flex-col gap-6">
      <div className="bg-white rounded-[20px] border border-[#e7e7e7] py-9 px-12 text-[#020b23] flex flex-col gap-5">
        <div className="flex items-center gap-8">
          <div className="relative">
            <Image
              src="/img/avatar.png"
              width={100}
              height={100}
              alt="avatar.png"
              className="rounded-full"
            />
            <label
              htmlFor="avatar-input"
              className="w-8 h-8 absolute flex items-center justify-center right-0 top-1/2 translate-x-1/2 -translate-y-1/2 bg-[#2967B3] rounded-full"
            >
              <Icon name="pencil" size={18} />
              <input type="file" id="avatar-input" className="hidden" />
            </label>
          </div>
          <div className="flex flex-col items-center gap-4">
            <span className="text-sm font-medium">10</span>
            <p className="text-xs font-light">Prayer Requests</p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <span className="text-sm font-medium">5</span>
            <p className="text-xs font-light">Testimonies</p>
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <p className="text-base font-medium">Adebimpe Ashley (Ele1981)</p>
          <p className="text-sm font-light">
            Devoted follower of Christ, passionate about growing in faith and
            building meaningful connections. Let&apos;s grow together in His
            love and grace. 🙏✨
          </p>
        </div>
        <nav className="flex items-center gap-5">
          <Link
            href="/dashboard/settings"
            className="p-4 bg-[#fbfbfb] rounded border border-[#e7e7e7] w-full max-w-[163px] text-center text-sm font-normal"
          >
            Settings
          </Link>
          <Link
            href="/dashboard/invite"
            className="p-4 bg-[#fbfbfb] rounded border border-[#e7e7e7] w-full max-w-[163px] text-center text-sm font-normal"
          >
            Invite Friends
          </Link>
        </nav>
      </div>
      <div className="flex items-center justify-between">
        <Suspense>
          <NavBar />
        </Suspense>
        <div>
          <span className="text-sm">Analytics:</span>
        </div>
      </div>
      {children}
    </div>
  );
}
