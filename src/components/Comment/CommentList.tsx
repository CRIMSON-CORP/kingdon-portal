import React from "react";
import Comment from "./index";
function CommentList() {
  return (
    <div className="px-6 py-3.5 bg-[#F6F7F8] flex flex-col gap-4">
      <header className="text-[#020b23] text-xs font-semibold">
        Comments (10K)
      </header>
      <Comment />
    </div>
  );
}

export default CommentList;
