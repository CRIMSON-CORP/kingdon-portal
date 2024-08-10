import Image from "next/image";

function page({ searchParams }: PageProps) {
  const { page } = searchParams;
  return (
    <div className="flex flex-col gap-5">
      <UserCard />
    </div>
  );
}

export default page;

function UserCard() {
  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-2.5">
        <Image
          src="/img/avatar.png"
          width={60}
          height={60}
          alt="avatar"
          className="rounded-full"
        />
        <div className="flex flex-col">
          <p className="text-sm font-semibold">Alex Jackson</p>
          <p className="h-[11px] text-[#808591] text-xs font-normal">
            alexjohn@12gmail.com
          </p>
          <p className="text-[#808591] text-[9px] font-light mt-1.5">
            Joined 13th April 2024
          </p>
        </div>
      </div>
      <div className="flex items-center">
        <button className="py-1.5 px-5 bg-[#2967b3] rounded text-white text-[13px]">
          Message
        </button>
      </div>
    </div>
  );
}
