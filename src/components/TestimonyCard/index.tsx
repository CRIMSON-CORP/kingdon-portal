"use client";
import useToggle from "@/hooks/useToggle";
import { getChosen, toggleLikeTestimony } from "@/lib/server-actions";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import CommentForm from "../Comment/CommentForm";
import CommentList from "../Comment/CommentList";
import Icon from "../Icon";
import Modal from "../Modal";
import TruncatedText from "../TruncatedText";

const numberFormatter = Intl.NumberFormat("en-US", {
  compactDisplay: "short",
});
function TestimonyCard({
  user,
  prayer,
  description,
  like_count,
  liked,
  uuid,
  comment_count,
  praying_user_count,
}: Testimony) {
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [localLiked, setLocalLiked] = useState({
    liked: +liked,
    like_count: +like_count,
  });

  const [commentList, setCommentList] = useState<
    Partial<PrayerComment>[] | null
  >(null);

  const toggleLocalLike = useCallback(async () => {
    try {
      if (localLiked.liked === 1) {
        setLocalLiked({
          like_count: +localLiked.like_count - 1,
          liked: 0,
        });
      } else {
        setLocalLiked({
          like_count: +localLiked.like_count + 1,
          liked: 1,
        });
      }

      await toggleLikeTestimony({ prayerId: uuid, like: !localLiked.liked });
    } catch (error) {
      setLocalLiked({
        like_count: +localLiked.like_count,
        liked: 0,
      });
    }
  }, [localLiked.like_count, localLiked.liked, uuid]);

  const toggleCommentOpen = useCallback(() => {
    setIsCommentOpen((prev) => !prev);
  }, []);

  const fetchComments = useCallback(async () => {
    try {
      const respone = await axios.get<{ data: PrayerComment[] }>(
        `/api/testimony/comment/${uuid}`
      );
      setCommentList(respone.data.data);
    } catch (error) {
      toast.error("Failed to load comments");
    }
  }, [uuid]);

  useEffect(() => {
    if (isCommentOpen) fetchComments();
  }, [fetchComments, isCommentOpen]);

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
            <span className="text-[#020b23] text-xs">{user.unique_id}</span>
          </div>
          <Icon name="ellipses" />
        </header>
        <div className="pl-7 pr-[26px] py-3.5 bg-[#f0f5ff] flex-col justify-center items-start gap-1.5 inline-flex">
          <h3 className="text-[#020b23] text-xs font-semibold">
            {prayer.title}
          </h3>
          <p className="text-[#020b23] text-[10px] font-light">
            <TruncatedText content={prayer.description} />
          </p>
        </div>
        <p className="text-[#020b23] text-xs font-light px-6">
          <TruncatedText content={description} />
        </p>
        {/* <Image
          width={606}
          height={238}
          alt="avatar"
          src="/img/feed-image.png"
          className="rounded-[10px] object-cover object-center w-full h-auto px-6"
        /> */}
        <div className="flex items-center gap-4 justify-between px-6">
          <button onClick={toggleLocalLike} className="flex items-center gap-1">
            <Icon
              name="like"
              size={20}
              stroke={!!localLiked.liked ? "transpaent" : "#020b23"}
              fill={!!localLiked.liked ? "#F0255D" : "transparent"}
            />
            <span className="text-[#020b23] text-[10px] font-light">
              {numberFormatter.format(localLiked.like_count)}
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
          <ChosenPrayerDetails
            uuid={prayer.uuid}
            praying_user_count={(+(praying_user_count || 0)).toString()}
          />
          <Icon name="share" size={20} />
        </div>
      </div>
      {isCommentOpen ? (
        <>
          <CommentForm
            card="testimony"
            uuid={uuid}
            setCommentList={setCommentList}
          />
          {commentList && (
            <CommentList commentList={commentList} card="testimony" />
          )}
        </>
      ) : null}
    </div>
  );
}

export default TestimonyCard;

function ChosenPrayerDetails({
  uuid,
  praying_user_count,
}: {
  uuid: string;
  praying_user_count: string;
}) {
  const { value, close, open } = useToggle(false);
  return (
    <>
      <button onClick={open} className="flex items-center gap-1">
        <Icon name="praying" size={20} />
        <span className="text-[#020b23] text-[10px] font-light">
          {numberFormatter.format(parseInt(praying_user_count))}
        </span>
      </button>
      <Modal open={value} closeModal={close}>
        <ViewChosenPrayers uuid={uuid} />
      </Modal>
    </>
  );
}

function ViewChosenPrayers({ uuid }: { uuid: string }) {
  const observerRoot = useRef<HTMLDivElement | null>(null);
  const observeElement = useRef<HTMLDivElement | null>(null);
  const { isPending, error, data, refetch, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["fetch-talents", uuid],
      initialPageParam: 1,
      queryFn: (pageParams) => {
        return getChosen<UserLike[]>(uuid, pageParams.pageParam);
      },
      getNextPageParam: (lastPage, allPages) => {
        return (lastPage as UserLike[]).length <
          parseInt(process.env.NEXT_PUBLIC_PAGINATION_PAGE_SIZE || "10")
          ? null
          : allPages.length + 1;
      },
    });

  useEffect(() => {
    let observer = null;
    if (observeElement.current) {
      observer = new IntersectionObserver(
        (entries) => {
          console.log(entries[0].isIntersecting);

          if (
            entries[0].target === observeElement.current &&
            entries[0].isIntersecting
          ) {
            fetchNextPage();
          }
        },
        {
          root: observerRoot.current,
          rootMargin: "0px 0px 200px 0px",
          threshold: 0.1,
        }
      );

      observer.observe(observeElement.current);
    }

    return () => {
      observer?.disconnect();
    };
  }, [fetchNextPage]);

  const users = useMemo(() => {
    return data?.pages.flatMap((page) => page) || [];
  }, [data]);

  return (
    <div className="flex flex-col gap-8 max-h-[60vh] overflow-auto">
      <h3 className="text-[#020b23] text-[32px] font-semibold">Chosen By</h3>
      {isPending && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
      {data && (
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-5">
            {users.map((like) => {
              return (
                <div
                  key={like.uuid}
                  className="flex flex-row items-center gap-5 py-4 border-b border-b-[#f3f4f5]"
                >
                  <Image
                    src="/img/avatar.png"
                    width={50}
                    height={50}
                    alt="avatar"
                    className="rounded-[100px] border-2 border-[#d5d5d5]"
                  />
                  <p className="text-[#020b23] text-sm font-semibold">
                    {like.uuid}
                  </p>
                </div>
              );
            })}
            {users.length === 0 && (
              <p className="text-[#020b23] text-sm text-center py-4">
                No one has chosen this prayer yet.
              </p>
            )}
          </div>
        </div>
      )}
      <div className="py-5" ref={observeElement}>
        {isFetchingNextPage && <h2>Loading Choosers...</h2>}
      </div>
    </div>
  );
}
