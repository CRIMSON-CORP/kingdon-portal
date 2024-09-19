"use client";
import Image from "next/image";
import { useCallback, useState } from "react";
import Icon from "../Icon";
import TruncatedText from "../TruncatedText";

function PrayerRequestCard() {
  const [isCommentOpen, setIsCommentOpen] = useState(false);

  const toggleCommentOpen = useCallback(() => {
    setIsCommentOpen((prev) => !prev);
  }, []);

  return (
    <div className="rounded-[20px] border border-[#e7e7e7] overflow-hidden">
      <div className="bg-white p-6 flex-col gap-2.5 flex">
        <header className="flex items-center justify-between gap-5">
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
        <h3 className="text-[#020b23] text-sm font-semibold">
          Prayer of healing for my mum
        </h3>
        <p>
          <TruncatedText
            content=" Heavenly Father, I humbly ask for your healing touch on my beloved mum.
            Grant her strength to overcome the storms of life."
          />
        </p>
        <Image
          width={606}
          height={238}
          alt="avatar"
          src="/img/feed-image.png"
          className="rounded-[10px] object-cover object-center w-full h-auto"
        />
        <div className="flex justify-between gap-4">
          <div className="flex items-center gap-4">
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
            <div className="flex items-center gap-1">
              <Icon name="simple-check" size={20} />
              <span className="text-[#020b23] text-[10px] font-light">20k</span>
            </div>
          </div>
        </div>
      </div>
      {isCommentOpen ? (
        <>
          {/* <CommentForm />
          <CommentList /> */}
        </>
      ) : null}
    </div>
  );
}

export default PrayerRequestCard;
