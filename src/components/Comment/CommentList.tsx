import Comment from "./index";

const countformatter = Intl.NumberFormat("en-US", {
  compactDisplay: "short",
});
function CommentList({
  commentList,
  mode,
}: {
  mode?: "reply";
  commentList: Partial<PrayerComment>[];
}) {
  console.log(commentList);

  return (
    <div className="px-6 py-3.5 bg-[#F6F7F8] flex flex-col gap-4 max-h-96 overflow-x-auto">
      {mode !== "reply" && (
        <header className="text-[#020b23] text-xs font-semibold">
          Comments ({countformatter.format(commentList.length)})
        </header>
      )}
      {commentList.map((comment) => (
        <Comment key={comment.id} {...comment} mode={mode} />
      ))}
    </div>
  );
}

export default CommentList;
