"use client";
import Button from "@/app/components/Button";
import CommentSection from "@/app/components/CommentSection";
import Loader from "@/app/components/Loader";
import PostMain from "@/app/components/PostMain";
import { db } from "@/app/config/firebase";
import { useAuthContext } from "@/app/context/AuthContext";
import useGetComments from "@/app/hooks/use-get-comments";
import useGetPost from "@/app/hooks/use-get-post";
import {
  doc,
  runTransaction,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { RiUser4Line } from "react-icons/ri";
import { v4 as uuidv4 } from "uuid";

const PostPage = ({ params }: { params: { postId: string } }) => {
  const { post, postLoading } = useGetPost(params.postId);
  const { currentUser } = useAuthContext();
  const [commentBody, setCommentBody] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { comments, commentsLoading } = useGetComments(params.postId);

  const createComment = async () => {
    if (!post) {
      toast.error("Something went wrong");
      return;
    } else if (!currentUser) {
      toast.error("Please Sign in to comment");
      return;
    } else if (!commentBody) {
      toast.error("Reply can't be empty");
      return;
    } else {
      setLoading(true);
      const commentid = uuidv4();
      await runTransaction(db, async (transaction) => {
        transaction.set(doc(db, "comments", commentid), {
          author: currentUser.uid,
          postId: params.postId,
          commentBody: commentBody,
          commentId: commentid,
          createdAt: serverTimestamp(),
        });
        transaction.update(doc(db, "users", currentUser.uid), {
          comments: [...currentUser.comments, commentid],
        });
        transaction.update(doc(db, "posts", params.postId), {
          commentsids: post.commentsIds
            ? [...post.commentsIds, commentid]
            : [commentid],
          comments: post.comments + 1,
        });
      });
      setLoading(false);
    }
    setCommentBody("");
  };

  return postLoading ? (
    <div className="h-screen">
      <Loader />
    </div>
  ) : (
    post && (
      <>
        <PostMain
          userId={post.userId}
          postId={post.postId}
          comments={post.comments}
          likes={post.likes}
          commentsIds={post.commentsIds}
          body={post.body}
          createdAt={post.createdAt}
        />
        {currentUser && (
          <div className="flex gap-4 bg-neutral-800 border-b border-neutral-700/70 px-5 py-2">
            <div className="">
              {currentUser.photoUrl ? (
                <Image
                  src={currentUser.photoUrl}
                  alt="profile"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              ) : (
                <div className="h-[40px] w-[40px] p-2 flex items-center justify-center bg-neutral-700 rounded-full">
                  <RiUser4Line size={25} />
                </div>
              )}
            </div>
            <div className=" flex flex-col gap-y-2 w-full">
              <div className="">
                <textarea
                  onChange={(e) => {
                    setCommentBody(e.target.value);
                  }}
                  value={commentBody}
                  placeholder="Write your reply"
                  className="
                  resize-none outline-none rounded-none
                  ring-0
                  w-full
                  py-2
                  font-semibold
                  text-neutral-100
                  bg-neutral-800
                  border-b border-neutral-700/70 focus:border-neutral-400
                  transition
                "
                />
              </div>
              <div className="flex justify-end">
                <Button
                  onClick={createComment}
                  disabled={loading}
                  className="bg-green-600 hover:bg-green-500 text-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Reply
                </Button>
              </div>
            </div>
          </div>
        )}
        {commentsLoading ? (
          <Loader />
        ) : (
          comments && <CommentSection comments={comments} />
        )}
      </>
    )
  );
};

export default PostPage;
