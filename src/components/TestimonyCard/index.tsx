"use client";
import Image from "next/image";
import { useCallback, useState } from "react";
import CommentForm from "../Comment/CommentForm";
import CommentList from "../Comment/CommentList";
import Icon from "../Icon";
import TruncatedText from "../TruncatedText";

function TestimonyCard() {
  const [isCommentOpen, setIsCommentOpen] = useState(false);

  const toggleCommentOpen = useCallback(() => {
    setIsCommentOpen((prev) => !prev);
  }, []);
  return (
    <div className="rounded-[20px] border border-[#e7e7e7] overflow-hidden">
      <div className="bg-white py-6 flex-col gap-2.5 flex">
        <header className="px-6 flex items-center justify-between gap-5">
          <div className="flex items-center gap-3">
            <Image
              src="/img/avatar.png"
              width={50}
              height={50}
              alt="avatar"
              className="rounded-full"
            />
            <span className="text-[#020b23] text-xs">Ele1981</span>
          </div>
          <Icon name="ellipses" />
        </header>
        <div className="pl-7 pr-[26px] py-3.5 bg-[#f0f5ff] flex-col justify-center items-start gap-1.5 inline-flex">
          <h3 className="text-[#020b23] text-xs font-semibold">
            Prayer of healing for my mum
          </h3>
          <p className="text-[#020b23] text-[10px] font-light">
            <TruncatedText
              content=" Heavenly Father, I humbly ask for your healing touch on my beloved mum.
            Grant her strength to overcome the storms of life."
            />
          </p>
        </div>
        <p className="text-[#020b23] text-xs font-light px-6">
          <TruncatedText content="Heavenly Father, I humbly ask for your healing touch on my beloved mum. Grant her strength, Father lord you said we should ask and it shall be given unto us ...See more" />
        </p>
        <Image
          width={606}
          height={238}
          alt="avatar"
          src="/img/feed-image.png"
          className="rounded-[10px] object-cover object-center w-full h-auto px-6"
        />
        <div className="flex items-center gap-4 justify-between px-6">
          <div className="flex items-center gap-1">
            <Icon name="like" size={20} stroke="transpaent" fill="#F0255D" />
            <span className="text-[#020b23] text-[10px] font-light">10k</span>
          </div>
          <button
            onClick={toggleCommentOpen}
            className="flex items-center gap-1"
          >
            <Icon name="comment" size={20} />
            <span className="text-[#020b23] text-[10px] font-light">1k</span>
          </button>
          <div className="flex items-center gap-1">
            <Icon name="praying" size={20} />
            <span className="text-[#020b23] text-[10px] font-light">2k</span>
          </div>
          <Icon name="share" size={20} />
        </div>
      </div>
      {isCommentOpen ? (
        <>
          <CommentForm />
          <CommentList />
        </>
      ) : null}
    </div>
  );
}

export default TestimonyCard;
