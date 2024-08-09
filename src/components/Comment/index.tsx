import Image from "next/image";

function Comment() {
  return (
    <div className="gap-3 flex">
      <Image
        src="/img/avatar.png"
        width={40}
        height={40}
        alt="avatar"
        className="rounded-full"
      />
      <div className="flex flex-col gap-1">
        <p className="text-[#020b23] text-xs font-normal ">@AdeyemiGreg</p>
        <p className="text-[#1e272f] text-sm font-light leading-[18px]">
          God will heal your mum i will continue praying for you.
        </p>
      </div>
    </div>
  );
}

export default Comment;
