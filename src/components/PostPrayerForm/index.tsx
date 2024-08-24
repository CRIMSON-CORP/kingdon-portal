"use client";
import { postPrayer } from "@/lib/server-actions";
import Image from "next/image";
import { ChangeEvent, useEffect, useId, useState } from "react";
import { FileDrop } from "react-file-drop";
import toast from "react-hot-toast";
import Icon from "../Icon";
import Modal from "../Modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

function PostPrayeForm({ closeModal }: { closeModal: () => void }) {
  const [prayerRequestSent, setPrayerRequestSent] = useState(false);
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const title = formData.get("title") as string;
    const description = formData.get("message") as string;
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

    const payload: Pick<Prayer, "title" | "description" | "image"> = {
      title,
      description,
    };
    if (image) {
      payload.image = image;
    }

    toast.promise(postPrayer(payload), {
      loading: "Posting prayer...",
      success: () => {
        setPrayerRequestSent(true);
        return "Prayer posted successfully";
      },
      error: "Failed to post prayer",
    });
  }

  const complete = () => {
    closeModal();
    setPrayerRequestSent(false);
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
              <Select value="prayer">
                <SelectTrigger className="px-4 py-2.5 bg-white rounded-[50px] border border-[#2967b3] text-[#2967b3] justify-center items-center gap-3 flex">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="prayer">Prayer</SelectItem>
                  <SelectItem value="testimony">Testimony</SelectItem>
                </SelectContent>
              </Select>
            </span>
            <p className="text-[#020b23] text-sm font-medium font-['Lexend Deca']">
              Ashley789
            </p>
          </div>
        </header>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            <p>Subject</p>
            <div className="flex items-center gap-2 border-b border-[#f3f4f5]">
              <textarea
                name="title"
                rows={1}
                required
                placeholder="Enter subject"
                className="flex-1 placeholder:text-sm placeholder:font-extralight outline-none"
              ></textarea>
              <Icon name="text" size={20} />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <p>Prayer request</p>
            <div className="flex items-center gap-2 border-b border-[#f3f4f5]">
              <textarea
                name="message"
                rows={1}
                required
                placeholder="Write your prayer request"
                className="flex-1 placeholder:text-sm placeholder:font-extralight outline-none"
              ></textarea>
              <Icon name="book" size={20} />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <p>Add Image ( Max 2 MB )</p>
            <FileDropWrapper />
          </div>
        </div>
        <button
          type="submit"
          className="ml-auto w-full max-w-[203px] p-5 bg-[#2967b3] rounded-[10px] justify-center items-center gap-2.5 flex text-center text-white text-lg font-medium leading-none"
        >
          Post
        </button>
      </form>
      <Modal open={prayerRequestSent} closeModal={complete}>
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
              Prayer request created
            </h3>
            <p className="text-center text-[#020b23] text-sm font-light text-balance">
              Your prayer request has been created successfully now people can
              pray with you Complete
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

export default PostPrayeForm;

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
