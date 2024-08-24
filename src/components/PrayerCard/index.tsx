"use client";
import { startPraying, toggleLike } from "@/lib/server-actions";
import Image from "next/image";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import Icon from "../Icon";
import TruncatedText from "../TruncatedText";
import CommentForm from "./../Comment/CommentForm";
import CommentList from "./../Comment/CommentList";

const numberFormatter = Intl.NumberFormat("en-US", {
  compactDisplay: "short",
});

function PrayerCard({
  user,
  title,
  description,
  like_count,
  liked,
  uuid,
  comment_count,
  praying_user_count,
  praying,
  user_prayer_status,
}: Prayer) {
  const [isCommentOpen, setIsCommentOpen] = useState(false);

  const [localLiked, setLocalLiked] = useState({ liked, like_count });

  const toggleLocalLike = useCallback(() => {
    try {
      if (localLiked.liked === 1) {
        setLocalLiked({
          like_count: (+localLiked.like_count - 1).toString(),
          liked: 0,
        });
      } else {
        setLocalLiked({
          like_count: (+localLiked.like_count + 1).toString(),
          liked: 1,
        });
      }

      toggleLike({ prayerId: uuid, like: !localLiked.liked });
    } catch (error) {
      setLocalLiked({
        like_count: (+localLiked.like_count - 1).toString(),
        liked: 0,
      });
    }
  }, [localLiked.like_count, localLiked.liked, uuid]);

  const toggleCommentOpen = useCallback(() => {
    setIsCommentOpen((prev) => !prev);
  }, []);

  const handleStartPraying = useCallback(() => {
    toast.promise(startPraying(uuid), {
      loading: "Praying...",
      success: () => {
        return "Prayer request has been sent to your Prayer room";
      },
      error: "Something went wrong, please try again",
    });
  }, [uuid]);

  return (
    <div className="rounded-[20px] border border-[#e7e7e7] overflow-hidden">
      <div className="bg-white p-6 flex-col gap-2.5 flex">
        <header className="flex items-center justify-between gap-5">
          <div className="flex items-center gap-3">
            <Image
              width={50}
              height={50}
              alt={user.unique_id}
              className="rounded-full"
              src={user.image_url || "/img/avatar.png"}
            />
            <span className="text-[#020b23] text-xs">{user.unique_id}</span>
          </div>
          <Icon name="ellipses" />
        </header>
        <h3 className="text-[#020b23] text-sm font-semibold">{title}</h3>
        <p>
          <TruncatedText content={description} />
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
            <button
              onClick={toggleLocalLike}
              className="flex items-center gap-1"
            >
              <Icon
                name="like"
                size={20}
                stroke={!!localLiked.liked ? "transpaent" : "#020b23"}
                fill={!!localLiked.liked ? "#F0255D" : "transparent"}
              />
              <span className="text-[#020b23] text-[10px] font-light">
                {numberFormatter.format(parseInt(localLiked.like_count))}
              </span>
            </button>
            <button
              onClick={toggleCommentOpen}
              className="flex items-center gap-1"
            >
              <Icon name="comment" size={20} />
              <span className="text-[#020b23] text-[10px] font-light">
                {numberFormatter.format(parseInt(comment_count))}
              </span>
            </button>
            <div className="flex items-center gap-1">
              <Icon name="praying" size={20} />
              <span className="text-[#020b23] text-[10px] font-light">
                {numberFormatter.format(parseInt(praying_user_count))}
              </span>
            </div>
          </div>
          <button
            onClick={handleStartPraying}
            className="py-2.5 px-8 bg-[#2967b3] rounded-[10px] text-[#f5fbfe] text-[13px] font-normal"
          >
            Pray
          </button>
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

export default PrayerCard;
