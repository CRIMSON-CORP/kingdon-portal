"use client";
import useToggle from "@/hooks/useToggle";
import {
  donePraying,
  getChosen,
  getLikes,
  postTestimony,
  startPraying,
  toggleLike,
} from "@/lib/server-actions";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  ChangeEvent,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { FileDrop } from "react-file-drop";
import toast from "react-hot-toast";
import Icon from "../Icon";
import Modal from "../Modal";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
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
  mode = "prayer",
}: Prayer & { removePrayer?: (prayerId: string) => void }) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();
  const [isCommentOpen, setIsCommentOpen] = useState(false);

  const [localLiked, setLocalLiked] = useState({ liked, like_count });

  const [commentList, setCommentList] = useState<
    Partial<PrayerComment>[] | null
  >(null);

  const toggleLocalLike = useCallback(async () => {
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

      await toggleLike({ prayerId: uuid, like: !localLiked.liked });
    } catch (error) {
      setLocalLiked({
        like_count: (+localLiked.like_count).toString(),
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

  const fetchComments = useCallback(async () => {
    try {
      const respone = await axios.get<{ data: PrayerComment[] }>(
        `/api/prayer/comment/${uuid}`
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
    <div
      ref={cardRef}
      className="rounded-[20px] border border-[#e7e7e7] overflow-hidden flex-none"
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
          <MoreOptions
            prayerDescription={description}
            prayerId={uuid}
            prayerTitle={title}
            uuid={uuid}
            mode={mode}
          />
        </header>
        <h3 className="text-[#020b23] text-sm font-semibold">{title}</h3>
        <p>
          <TruncatedText content={description} />
        </p>
        {/* <Image
          width={606}
          height={238}
          alt="avatar"
          src="/img/feed-image.png"
          className="rounded-[10px] object-cover object-center w-full h-auto"
        /> */}
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
            <ChosenPrayerDetails
              uuid={uuid}
              praying_user_count={praying_user_count}
            />
          </div>
          {mode === "prayer" &&
            userPrayingStatusButtonMap[user_prayer_status || ""]({
              uuid,
              handleRemovePrayer,
            })}
        </div>
      </div>
      {isCommentOpen ? (
        <>
          <CommentForm uuid={uuid} setCommentList={setCommentList} />
          {commentList && <CommentList commentList={commentList} />}
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

function MoreOptions({
  mode,
  prayerId,
  prayerTitle,
  prayerDescription,
}: {
  uuid: string;
  mode: Prayer["mode"];
  prayerId: string;
  prayerTitle: string;
  prayerDescription: string;
}) {
  const { value, close, open } = useToggle(false);
  const {
    value: sendTestimonyOpen,
    close: closeSendTestimony,
    open: openSendTestimony,
  } = useToggle(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Icon name="ellipses" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {mode === "request" ? (
            <DropdownMenuItem>
              <button onClick={openSendTestimony}>Send Testimony</button>
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem>Report</DropdownMenuItem>
          )}
          <DropdownMenuItem>
            <button onClick={open}>View Likes</button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Modal open={value} closeModal={close}>
        <ViewLikesModal uuid={prayerId} />
      </Modal>
      <Modal open={sendTestimonyOpen} closeModal={closeSendTestimony}>
        <SendTestimony
          prayerId={prayerId}
          prayerTitle={prayerTitle}
          closeModal={closeSendTestimony}
          prayerDescription={prayerDescription}
        />
      </Modal>
    </>
  );
}

function ViewLikesModal({ uuid }: { uuid: string }) {
  const observerRoot = useRef<HTMLDivElement | null>(null);
  const observeElement = useRef<HTMLDivElement | null>(null);
  const { isPending, error, data, refetch, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["fetch-talents", uuid],
      initialPageParam: 1,
      queryFn: (pageParams) => {
        return getLikes<UserLike[]>(uuid, pageParams.pageParam);
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
      <h3 className="text-[#020b23] text-[32px] font-semibold">Liked By</h3>
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
                No one has liked this prayer yet.
              </p>
            )}
          </div>
        </div>
      )}
      <div className="py-5" ref={observeElement}>
        {isFetchingNextPage && <h2>Loading Likes...</h2>}
      </div>
    </div>
  );
}

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

interface SendTestimonyProps {
  prayerId: string;
  prayerTitle: string;
  prayerDescription: string;
  closeModal: () => void;
}
function SendTestimony({
  closeModal,
  prayerId,
  prayerTitle,
  prayerDescription,
}: SendTestimonyProps) {
  const [testimonyRequestSent, setTestimonyRequestSent] = useState(false);
  const { push } = useRouter();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const title = formData.get("title") as string;
    const description = formData.get("testimony") as string;
    const image = formData.get("media") as string;

    // make only title and description required
    if (!title) {
      toast.error("Title is required");
      return;
    }

    if (!description) {
      toast.error("Description is required");
      return;
    }

    const payload: Pick<Prayer, "uuid" | "title" | "description" | "image"> = {
      title,
      description,
      uuid: prayerId,
    };
    if (image) {
      payload.image = image;
    }
    setTestimonyRequestSent(false);

    toast.promise(postTestimony(payload), {
      loading: "Posting Testimony...",
      success: () => {
        setTestimonyRequestSent(true);
        return "Testimony posted successfully";
      },
      error: "Failed to post Testimony",
    });
  }

  const complete = () => {
    closeModal();
    setTestimonyRequestSent(false);
    push("/dashboard/profile?page=testimonies");
  };

  const onTestimonyInput: React.ChangeEventHandler<HTMLTextAreaElement> = (
    e
  ) => {
    const target = e.target as HTMLTextAreaElement;
    target.style.height = "auto";
    target.style.height = target.scrollHeight + "px";
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <header className="flex items-center gap-3">
          <Image
            src="/img/avatar.png"
            width={80}
            height={80}
            alt="avatar"
            className="rounded-full"
          />
          <div className="flex flex-col gap-2.5">
            <span className="text-[#020b23] text-xs">
              <Select value="testimony" disabled>
                <SelectTrigger className="px-4 py-2.5 bg-white rounded-[50px] border border-[#2967b3] text-[#2967b3] justify-center items-center gap-3 flex">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="testimony">Testimony</SelectItem>
                </SelectContent>
              </Select>
            </span>
            <p className="text-[#020b23] text-sm font-medium font-['Lexend Deca']">
              Ashley789
            </p>
          </div>
        </header>
        <div className="flex flex-col gap-2">
          <h4 className="text-[#020b23] text-base font-medium">
            Prayer Request
          </h4>
          <div className="px-4 py-3 bg-[#f0f5ff] rounded-[10px] flex-col justify-center items-start gap-1.5 inline-flex">
            <div className="text-[#020b23] text-xs font-semibold">
              {prayerTitle}
            </div>
            <span className="text-[#020b23] text-[10px] font-light">
              <TruncatedText content={prayerDescription} />
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            <p>Testimony</p>
            <div className="flex items-center gap-2 border-b border-[#f3f4f5]">
              <textarea
                name="testimony"
                rows={1}
                required
                onInput={onTestimonyInput}
                placeholder="Write your testimony"
                className="flex-1 placeholder:text-sm placeholder:font-extralight outline-none max-h-[30vh] scrollable"
              ></textarea>
              <Icon name="book" size={20} />
            </div>
          </div>
          {/* <div className="flex flex-col gap-3">
            <p>Add Image ( Max 2 MB )</p>
            <FileDropWrapper />
          </div> */}
        </div>
        <button
          type="submit"
          className="ml-auto w-full max-w-[203px] p-5 bg-[#2967b3] rounded-[10px] justify-center items-center gap-2.5 flex text-center text-white text-lg font-medium leading-none"
        >
          Post
        </button>
      </form>
      <Modal open={testimonyRequestSent} closeModal={complete}>
        <div className="flex flex-col items-center text-center gap-6">
          <Image
            alt="prayer"
            width={372.93}
            height={311.02}
            src="/img/pray-gif.gif"
            className="w-full max-w-[372.93px] aspect-[372.93/311.02]"
          />
          <div className="flex flex-col gap-1.5">
            <h3 className="text-[#020b23] text-lg font-medium">
              Testimony request created
            </h3>
            <p className="text-center text-[#020b23] text-sm font-light text-balance">
              Your testimony request has been created successfully now people
              can pray with you
            </p>
          </div>
          <button
            onClick={complete}
            className="px-[30px] py-5 bg-[#2967b3] rounded-[10px] justify-center items-center gap-[15px] flex text-center text-white text-base font-normal"
          >
            Complete
          </button>
        </div>
      </Modal>
    </>
  );
}

export function FileDropWrapper() {
  const fileInputId = useId();
  const [file, setFile] = useState<File | null>(null);
  const [fileBase64, setFileBase64] = useState("");

  function addFile(
    files: FileList | null,
    event: React.DragEvent<HTMLDivElement>
  ) {
    if (files && files.length > 0) {
      if (!validateFile(files[0])) return;
      setFile(files[0]);
    }
  }

  function addFileInput(e: ChangeEvent<HTMLInputElement>) {
    const { files } = e.target;
    if (files && files.length > 0) {
      if (!validateFile(files[0])) return;
      setFile(files[0]);
    }
  }

  function validateFile(file: File) {
    if (file.size > 2 * 1024 * 1024) {
      toast.error(" File size is too large, max 2MB");
      return false;
    } else if (file.type !== "image/jpeg" && file.type !== "image/png") {
      toast.error("Invalid file type, only jpeg/png is allowed");
      return false;
    }
    return true;
  }

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setFileBase64(reader.result as string);
      };
    }
  }, [file]);

  return (
    <div className="relative max-w-[199px]">
      <FileDrop
        draggingOverTargetClassName="scale-105"
        targetClassName="scale-100 transition-tranform duration-500 ease-out pl-5 pr-[18.31px] py-[23px] bg-white rounded-[20px] border border-dashed border-[#121212]/10 justify-center items-center flex flex-col"
        onDrop={addFile}
      >
        {file instanceof File ? (
          <>
            <span className="text-[#020b23] text-xs font-light truncate w-full">
              {file.name}
            </span>
            <label
              htmlFor={fileInputId}
              className="text-[#2967b3] text-xs font-light"
            >
              click or drop to replace
            </label>
          </>
        ) : (
          <>
            <Icon name="thumbnail" size={30} />
            <div className="text-center">
              <span className="text-[#020b23] text-xs font-light">
                Drop your images here or select{" "}
              </span>
              <label
                htmlFor={fileInputId}
                className="text-[#2967b3] text-xs font-light"
              >
                click to browse
              </label>
            </div>
          </>
        )}
      </FileDrop>
      <input
        type="text"
        value={fileBase64}
        name="media"
        className="absolute size-4 invisible top-1/2 left-1/2"
        required
        readOnly
      />
      <input
        type="file"
        name="media-input"
        id={fileInputId}
        className="hidden"
        onChange={addFileInput}
      />
    </div>
  );
}
