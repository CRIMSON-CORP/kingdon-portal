import Image from "next/image";

function CommentForm() {
  return (
    <form
      action=""
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
        pattern=".{3,}"
      />
      <button className="py-1.5 px-5 bg-[#2967b3] rounded-[10px] text-[#f5fbfe] text-[13px] font-normal pointer-events-none opacity-30 group-valid:pointer-events-auto group-valid:opacity-100">
        Post
      </button>
    </form>
  );
}

export default CommentForm;
