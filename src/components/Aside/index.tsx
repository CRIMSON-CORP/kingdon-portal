"use client";
import Image from "next/image";
import TruncatedText from "../TruncatedText";
import AsidePostButton from "./AsidePostButton";

interface AsideContent {
  avatar: string;
  userId: string;
  title: string;
  content: string;
}

const completContent: AsideContent[] = [
  {
    avatar: "/img/avatar.png",
    userId: "Ele1981",
    title: "Prayer of healing for my mum",
    content:
      "Heavenly Father, I humbly ask for your healing touch on my beloved mum. Grant her strength to overcome the storms of life.",
  },
  {
    avatar: "/img/avatar.png",
    userId: "layla34",
    title: "Prayer for scholarship",
    content:
      "Heavenly Father, I humbly ask for your healing touch on my beloved mum. Grant her strength to overcome the storms of life.",
  },
  {
    avatar: "/img/avatar.png",
    userId: "Jordan678",
    title: "Prayer for visa approval",
    content:
      "Heavenly Father, I humbly ask for your healing touch on my beloved mum. Grant her strength to overcome the storms of life.",
  },
];

function Aside() {
  return (
    <aside className="flex flex-col gap-6">
      <div className="py-4 px-5 bg-white rounded-[20px] border border-[#e7e7e7] flex-col justify-start items-start gap-[18px] flex">
        <a>
          <span>Let&apos;s Complete &rarr;</span>
        </a>
        {completContent.map((item) => (
          <AsideContent key={item.title} {...item} />
        ))}
      </div>
      <div className="py-4 px-5 bg-white rounded-[20px] border border-[#e7e7e7] flex-col justify-start items-start gap-[18px] flex">
        <a>
          <span>Trending Prayer Requests &rarr;</span>
        </a>
        {completContent.map((item) => (
          <AsideContent key={item.title} {...item} />
        ))}
      </div>
      <AsidePostButton />
    </aside>
  );
}

export default Aside;

function AsideContent({ title, content, avatar, userId }: AsideContent) {
  return (
    <article className="flex flex-col pb-2 last:border-none last:pb-0 border-b border-[#E7E7E7]">
      <div className="flex items-center gap-1.5">
        <Image
          src={avatar}
          width={34}
          height={34}
          alt="avatar"
          className="rounded-full border border-[#E7E7E7]"
        />
        <span className="text-[#020b23] text-xs">{userId}</span>
      </div>
      <h3 className="text-[#020b23] text-xs font-semibold ">{title}</h3>
      <p className="text-[#020b23] text-[10px] font-light">
        <TruncatedText content={content} />
      </p>
    </article>
  );
}
