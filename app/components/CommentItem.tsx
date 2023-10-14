import React from "react";
import { Comments } from "../hooks/use-get-comments";
import useGetUserProfile from "../hooks/use-get-user-profile";
import Link from "next/link";
import { RiUser4Line } from "react-icons/ri";
import Image from "next/image";

interface CommentItemProps {
  data: Comments;
}

const CommentItem: React.FC<CommentItemProps> = ({ data }) => {
  const { user, loading } = useGetUserProfile(data.author);
  return (
    user && (
      <div className="w-full">
        <div
          className="
        mt-2
        flex gap-x-4 items-start
        w-full
        bg-neutral-800
        border-b border-neutral-700/70
        px-5 py-2
        transition
        "
        >
          <div className="profileImage">
            {user.photoUrl ? (
              <Image
                src={user.photoUrl}
                alt="profile"
                width={40}
                height={40}
                className="rounded-full"
              />
            ) : (
              <div className="h-[40px] w-[40px] p-2 flex items-center justify-center bg-neutral-700 rounded-full">
                <RiUser4Line size={30} />
              </div>
            )}
          </div>
          <div className="flex flex-col gap-y-2 w-full">
            <Link href={`/users/${user.uid}`} className="w-fit">
              <div className="flex flex-col group">
                <h3 className="font-semibold text-sm group-hover:underline">
                  {user.displayName}
                </h3>
                <p className="text-sm font-semibold text-neutral-400 group-hover:underline">
                  @{user.username}
                </p>
              </div>
            </Link>
            <div className="font-semibold text-md cursor-default">
              {data.commentBody}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default CommentItem;
