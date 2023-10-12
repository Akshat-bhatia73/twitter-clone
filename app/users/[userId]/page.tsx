"use client";
import Button from "@/app/components/Button";
import Loader from "@/app/components/Loader";
import Posts from "@/app/components/Posts";
import { useAuthContext } from "@/app/context/AuthContext";
import usegetUserPosts from "@/app/hooks/use-get-user-posts";
import useGetUserProfile from "@/app/hooks/use-get-user-profile";
import Image from "next/image";
import { RiUser4Line } from "react-icons/ri";

export default function User({ params }: { params: { userId: string } }) {
  const { userPosts, postsloading } = usegetUserPosts(params.userId);
  const { user, loading, error } = useGetUserProfile(params.userId);
  const { currentUser } = useAuthContext();

  return (
    <div className="mt-4">
      {loading && <Loader />}
      {error && <h1>User does not exist...</h1>}
      {user && (
        <div className="">
          <div className="mb-4 sm:mb-6">
            <div className=" h-32 relative">
              <div className="h-full w-full bg-neutral-700"></div>
              <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 rounded-full border-2 border-green-500">
                {user.photoUrl ? (
                  <Image
                    src={user.photoUrl}
                    width={80}
                    height={80}
                    alt="Profile"
                    className="rounded-full"
                  />
                ) : (
                  <div className="rounded-full bg-neutral-700 h-[80px] w-[80px] p-2 flex items-center justify-center">
                    <RiUser4Line size={40} />
                  </div>
                )}
              </div>
            </div>
            <div className="mt-10 py-2 flex flex-col items-center text-center font-semibold">
              <h1 className=" text-lg">{user.displayName}</h1>
              <h2 className=" text-neutral-400 text-md">@{user.username}</h2>
              <div className="flex gap-x-4 justify-center items-center mt-2">
                <div className="">
                  <p>{user.followerCount}</p>
                  <span className="text-sm">Followers</span>
                </div>
                <div className="">
                  <p>{user.followingCount}</p>
                  <span className="text-sm">Following</span>
                </div>
              </div>
              {user.uid === currentUser?.uid ? (
                <Button className="mt-2 bg-neutral-300 text-neutral-800 hover:bg-neutral-100">
                  Edit
                </Button>
              ) : (
                <Button className="mt-2 bg-green-600 text-neutral-800 hover:bg-green-500">
                  Follow
                </Button>
              )}
            </div>
          </div>
          <div className="flex mb-2 border-t border-b border-neutral-700/70">
            <Button className="flex-1 rounded-none border-r border-r-neutral-700/70 bg-neutral-800 border-b-4 hover:bg-neutral-700">
              Posts
            </Button>
            <Button className="flex-1 rounded-none bg-neutral-800 hover:bg-neutral-700">
              Likes
            </Button>
          </div>
          {postsloading ? <Loader /> : <Posts posts={userPosts} />}
        </div>
      )}
    </div>
  );
}
