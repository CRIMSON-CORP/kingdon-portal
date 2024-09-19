"use client";
import axios from "axios";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";

function CommentForm({
  uuid,
  mode,
  card,
  setCommentList,
  commnetUuid,
}: {
  uuid: string;
  mode?: "reply";
  card?: "prayer" | "testimony";
  commnetUuid?: string | undefined;
  setCommentList: Dispatch<SetStateAction<Partial<PrayerComment>[] | null>>;
}) {
  if (mode === "reply" && !commnetUuid) {
    throw new Error("commentUuid is required when mode is set to reply");
  }
  const handleCommentsubmit: React.FormEventHandler = async (e) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const comment = formData.get("comment");

    if (!comment) {
      return toast.error("Pleas write a comment!");
    }

    try {
      form.style.opacity = "0.5";
      form.style.pointerEvents = "none";
      let response = null;
      if (mode === "reply") {
        response = await axios.post(`/api/prayer/comment/reply`, {
          comment_uuid: commnetUuid,
          reply: comment,
        });
      } else {
        response = await axios.post(`/api/prayer/comment/${uuid}`, {
          description: comment,
          ...(card === "testimony"
            ? { testimony_uuid: uuid }
            : { prayer_uuid: uuid }),
        });
      }
      const { data } = response.data;
      console.log(data, "response");

      setCommentList((prev) =>
        prev
          ? [
              {
                comment: data.title,
                created_at: data.created_at,
                id: data.id,
                user: data.user,
                uuid: data.uuid,
              },
              ...prev,
            ]
          : null
      );
      form.reset();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      form.style.opacity = "";
      form.style.pointerEvents = "";
    }
  };

  return (
    <form
      onSubmit={handleCommentsubmit}
      className="flex items-center gap-4 group bg-[#FBFBFB] px-6 py-2"
    >
      <Image
        src="/img/avatar.png"
        width={35}
        height={35}
        alt="avatar"
        className="rounded-full"
      />
      <input
        type="text"
        placeholder="Post your reply"
        className="flex-1 text-sm font-medium outline-none bg-transparent"
        required
        name="comment"
        pattern=".{3,}"
      />
      <button
        type="submit"
        className="py-1.5 px-5 bg-[#2967b3] rounded-[10px] text-[#f5fbfe] text-[13px] font-normal pointer-events-none opacity-30 group-valid:pointer-events-auto group-valid:opacity-100"
      >
        Post
      </button>
    </form>
  );
}

export default CommentForm;
