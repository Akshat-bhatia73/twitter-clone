import React from "react";
import { Comments } from "@/app/hooks/use-get-comments";
import CommentItem from "./CommentItem";

interface CommentSectionProps {
  comments: Comments[];
}

const CommentSection: React.FC<CommentSectionProps> = ({ comments }) => {
  return (
    <div>
      {comments.map((comment) => {
        return (
          <CommentItem key={comment.commentId} data={comment} />
        );
      })}
    </div>
  );
};

export default CommentSection;
