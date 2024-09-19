"use client";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

function Comment({
  user,
  title,
  uuid,
  replies,
  mode,
  comment,
  card,
}: Partial<PrayerComment> & { mode?: "reply"; card?: "prayer" | "testimony" }) {
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [replyList, setReplyList] = useState<Partial<PrayerComment>[] | null>(
    replies || []
  );

  const toggleCommentOpen = useCallback(() => {
    setIsCommentOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    setIsCommentOpen(false);
  }, [replyList]);

  return (
    <div className="flex flex-col gap-3">
      <div className="gap-3 flex items-start">
        <Image
          width={40}
          height={40}
          alt="avatar"
          src={user?.image_url || "/img/avatar.png"}
          className="rounded-full"
        />
        <div className="flex flex-col gap-1">
          <p className="text-[#020b23] text-xs font-normal">
            @{user?.unique_id}
          </p>
          <p className="text-[#1e272f] text-sm font-light leading-[18px]">
            {title || comment}
          </p>
          {mode !== "reply" && (
            <button
              onClick={toggleCommentOpen}
              className="text-[#808591] text-[10px] self-start"
            >
              Reply
            </button>
          )}
        </div>
      </div>
      {mode !== "reply" && (
        <>
          {isCommentOpen ? (
            <>
              <CommentForm
                uuid={uuid || ""}
                setCommentList={setReplyList}
                mode="reply"
                commnetUuid={uuid}
                card={card}
              />
            </>
          ) : null}
          {replyList && (
            <CommentList mode="reply" commentList={replyList} card={card} />
          )}
        </>
      )}
    </div>
  );
}

export default Comment;
