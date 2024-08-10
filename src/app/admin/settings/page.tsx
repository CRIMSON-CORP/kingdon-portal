import Icon from "@/components/Icon";
import Image from "next/image";
import Link from "next/link";

function page() {
  return (
    <div className="relative bg-white rounded-[20px] border border-[#e7e7e7] py-14 px-12 flex flex-col gap-14">
      <div className="flex items-center gap-5 justify-between">
        <div className="flex items-center gap-4">
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
              className="w-8 h-8 absolute flex items-center justify-center left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#2967B3] rounded-full"
            >
              <Icon name="pencil" size={18} />
              <input type="file" id="avatar-input" className="hidden" />
            </label>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium">Adebimpe Ashley</p>
            <p className="text-[#808591] text-[10px] font-light">@ashley23</p>
          </div>
        </div>
        <Link
          href="/dashboard/settings"
          className="p-4 bg-[#fbfbfb] rounded border border-[#e7e7e7] w-full max-w-[163px] text-center text-sm font-normal"
        >
          Reset Password
        </Link>
      </div>
      <div className="flex flex-col gap-7">
        <div className="flex flex-col gap-3">
          <p>Full Name</p>
          <div className="flex items-center gap-4 border-b border-[#f3f4f5] pb-2">
            <input
              type="text"
              readOnly
              value="Adepimpe Ashley"
              className="flex-1 text-[#939597] text-sm font-extralight"
            />
            <Icon name="profile" />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <p>Email Address</p>
          <div className="flex items-center gap-4 border-b border-[#f3f4f5] pb-2">
            <input
              type="email"
              readOnly
              value="ashley678@gmail.com"
              className="flex-1 text-[#939597] text-sm font-extralight"
            />
            <Icon name="envelope" />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <p>Phone Number</p>
          <div className="flex items-center gap-4 border-b border-[#f3f4f5] pb-2">
            <input
              type="email"
              readOnly
              value="+234 7023456789"
              className="flex-1 text-[#939597] text-sm font-extralight"
            />
            <Icon name="envelope" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
