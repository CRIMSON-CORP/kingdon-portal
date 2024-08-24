"use client";
import { donePraying, startPraying, toggleLike } from "@/lib/server-actions";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import toast from "react-hot-toast";
import Icon from "../Icon";
import TruncatedText from "../TruncatedText";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
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
  removePrayer,
}: Prayer & { removePrayer?: (prayerId: string) => void }) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();
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

  const handleRemovePrayer = () => {
    removePrayer?.(uuid);
  };

  return (
    <div
      ref={cardRef}
      className="rounded-[20px] border border-[#e7e7e7] overflow-hidden"
    >
      <div className="bg-white p-6 flex-col gap-2.5 flex">
        <header className="flex items-center justify-between gap-5">
          <div className="flex items-center gap-3">
            <Image
              width={50}
              height={50}
              alt={uuid}
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
          {userPrayingStatusButtonMap[user_prayer_status || ""]({
            uuid,
            handleRemovePrayer,
          })}
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

const userPrayingStatusButtonMap = {
  praying: DoneButton,
  "": PrayButton,
  prayed: FinishedPrayingButton,
};

export default PrayerCard;

function PrayButton({
  uuid,
  handleRemovePrayer,
}: {
  uuid: string;
  handleRemovePrayer: () => void;
}) {
  const handleStartPraying = useCallback(() => {
    toast.promise(startPraying(uuid), {
      loading: "Praying...",
      success: () => {
        handleRemovePrayer();
        return "Prayer request has been sent to your Prayer room";
      },
      error: "Something went wrong, please try again",
    });
  }, [handleRemovePrayer, uuid]);

  return (
    <button
      onClick={handleStartPraying}
      className="py-2.5 px-8 bg-[#2967b3] rounded-[10px] text-[#f5fbfe] text-[13px] font-normal"
    >
      Pray
    </button>
  );
}

function DoneButton({
  uuid,
  handleRemovePrayer,
}: {
  uuid: string;
  handleRemovePrayer: () => void;
}) {
  const handleDonePraying = useCallback(() => {
    toast.promise(donePraying(uuid), {
      loading: "finishing prayer...",
      success: () => {
        handleRemovePrayer();
        return "Done Praying, Thank you!";
      },
      error: "Something went wrong, please try again",
    });
  }, [handleRemovePrayer, uuid]);

  return (
    <AlertDialog>
      <AlertDialogTrigger className="py-2.5 px-8 bg-[#2967b3] rounded-[10px] text-[#f5fbfe] text-[13px] font-normal">
        Done?
      </AlertDialogTrigger>
      <AlertDialogContent className="!rounded-[20px] m-5">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex flex-col items-center gap-10">
            <Image
              src="/img/done-praying.gif"
              alt="done-praying"
              width={500}
              height={500}
            />
            <p className="text-center text-[#020b23] text-lg font-medium text-balance">
              Are you sure you are done praying?
            </p>
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-[#020b23] text-sm font-light">
            Once you click confirm this prayer will move to completed
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="!justify-center">
          <AlertDialogCancel className="px-[30px] py-5 rounded-[10px]">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDonePraying}
            className="px-[30px] py-5 bg-[#2967b3] rounded-[10px]"
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function FinishedPrayingButton() {
  return <Icon name="check" className="text-[#5BBBA9]" size={38} />;
}
