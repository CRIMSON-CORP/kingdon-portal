import Image from "next/image";

function PostPrayerFeed() {
  return (
    <button className="p-6 bg-white rounded-[20px] border border-[#e7e7e7] gap-3.5 flex">
      <Image
        src="/img/avatar.png"
        width={50}
        height={50}
        alt="avatar"
        className="rounded-full"
      />
      <div className="px-3.5 py-4 bg-[#fbfbfb] rounded text-[#020b23] text-sm font-medium flex-grow text-left">
        Start a post
      </div>
    </button>
  );
}

export default PostPrayerFeed;
