import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { RiUser4Line } from "react-icons/ri";
import Loader from "./Loader";
import Image from "next/image";

interface ProfileProps {
  uid: string | null;
  name: string | null;
  username: string | undefined;
  isLoading: boolean;
  followerCount: number;
  followingCount: number;
  photoUrl: string | null;
}
const SidebarProfile: React.FC<ProfileProps> = ({
  uid,
  name,
  isLoading,
  username,
  followerCount,
  followingCount,
  photoUrl,
}) => {
  useEffect(() => {}, [uid]);
  const router = useRouter();
  return isLoading ? (
    <div className="h-[100px] flex items-center justify-center">
      <Loader className=" my-6 justify-center items-center" />
    </div>
  ) : (
    <div className="space-y-2">
      <div
        onClick={() => router.push(`/users/${uid}`)}
        className="flex items-center gap-x-4 px-3 py-2 cursor-pointer hover:bg-neutral-700 transition"
      >
        {photoUrl ? (
          <Image
            src={photoUrl}
            alt="profile"
            width={45}
            height={45}
            className="rounded-full"
          />
        ) : (
          <div className="h-[45px] w-[45px] p-2 flex items-center justify-center bg-neutral-700 rounded-full">
            <RiUser4Line size={30} />
          </div>
        )}
        <div className="">
          <h3 className="text-md font-semibold">{name}</h3>
          <h4 className="text-sm font-semibold text-neutral-300">
            @{username}
          </h4>
        </div>
      </div>
      <div className=" flex items-center justify-center gap-x-4">
        <div className="">
          <h3 className="text-center font-semibold">{followerCount}</h3>
          <p className="text-sm cursor-pointer hover:underline transition">
            Followers
          </p>
        </div>
        <div className="">
          <h3 className="text-center font-semibold">{followingCount}</h3>
          <p className="text-sm cursor-pointer hover:underline transition">
            Following
          </p>
        </div>
      </div>
    </div>
  );
};

export default SidebarProfile;
