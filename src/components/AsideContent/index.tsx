import Image from "next/image";
import TruncatedText from "../TruncatedText";

interface AsideContentProps {
  title: string;
  content: AsideContent[];
}
function AsideContent({ title, content }: AsideContentProps) {
  return (
    <div className="py-4 px-5 bg-white rounded-[20px] border border-[#e7e7e7] flex-col justify-start items-start gap-[18px] flex">
      <a>
        <span>{title} &rarr;</span>
      </a>
      {content.map((item) => (
        <Content key={item.title} {...item} />
      ))}
    </div>
  );
}

export default AsideContent;

function Content({ title, content, avatar, userId }: AsideContent) {
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
