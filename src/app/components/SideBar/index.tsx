import Image from "next/image";
import Icon from "../Icon";

function SideBar() {
  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white rounded-[20px] border border-[#e7e7e7] flex-col py-5">
        <div className="flex flex-col gap-4 px-4">
          <div className="flex flex-col items-center gap-2">
            <Image
              src="/img/avatar.png"
              width={100}
              height={100}
              quality={100}
              alt="avatar"
              className="rounded-full"
            />
            <span className="text-[#020b23] text-sm font-medium">
              Adebimpe Ashley
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[#808591] text-sm">
              <Icon name="book" size={20} />
              <span>My Prayer Requests</span>
            </div>
            <span className=" text-[#020b23]">10</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[#808591] text-sm">
              <Icon name="speaker" size={20} />
              <span>Testimonies</span>
            </div>
            <span className=" text-[#020b23]">5</span>
          </div>
        </div>
        <hr className="border-[#e7e7e7] my-5" />
        <div className="flex flex-col gap-4 px-4">
          <span className="text-[#020b23] text-sm">Analytics</span>
          <div className="flex justify-between">
            <div className="flex items-center gap-2 text-[#808591] text-sm">
              <Icon name="prayer" size={24} />
              <div className="flex flex-col gap-0.5">
                <span className="text-[#020b23] text-[10px] font-light leading-none">
                  Total Chosen
                </span>
                <span className="text-[#020b23] text-xs font-medium leading-none">
                  1500
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-[#808591] text-sm">
              <div className="size-6 bg-[#F2DF7C] rounded-full flex items-center justify-center">
                <Icon name="check" size={12.63} />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[#020b23] text-[10px] font-light leading-none">
                  Completed
                </span>
                <span className="text-[#020b23] text-xs font-medium leading-none">
                  1450
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button className="p-4 bg-[#2967b3] rounded text-white text-sm font-semibold">
        Post
      </button>
    </div>
  );
}

export default SideBar;
