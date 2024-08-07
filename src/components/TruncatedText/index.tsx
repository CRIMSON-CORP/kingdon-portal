"use client";
import { useState } from "react";

interface TruncatedTextProps {
  content: string;
}
function TruncatedText({ content }: TruncatedTextProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Set a limit for truncation
  const contentLimit = 100;

  // Determine if the content should be truncated
  const isTruncated = content.length > contentLimit;
  const truncatedContent =
    content.length > contentLimit
      ? content.slice(0, contentLimit) + "..."
      : content;
  const fullContent = content;

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <>
      {isExpanded || !isTruncated ? fullContent : truncatedContent}
      {isTruncated && (
        <span
          className="text-[#2967b3] text-[10px] font-light cursor-pointer"
          onClick={handleToggle}
        >
          {isExpanded ? "...See less" : "...See more"}
        </span>
      )}
    </>
  );
}

export default TruncatedText;
