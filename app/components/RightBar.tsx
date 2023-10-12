"use client";

import Link from "next/link";
import { RiUser4Line } from "react-icons/ri";
import useGetUsers from "../hooks/use-get-users";
import Loader from "./Loader";
import Image from "next/image";
const RightBar = () => {
  const { users, loading } = useGetUsers();

  return (
    <div className="hidden lg:flex flex-col gap-y-2 w-[280px] md:w-[350px] lg:w-[450px]">
      <div className="bg-neutral-800 rounded-lg py-2">
        <h2 className="text-md font-semibold px-3">Who to follow</h2>
        {/* User List */}
        {loading && (
          <div className="my-6">
            <Loader />
          </div>
        )}
        <div className="mt-4 flex flex-col gap-y-1">
          {users &&
            users.map((user) => {
              //Users
              return (
                <Link key={user.uid} href={`/users/${user.uid}`}>
                  <div
                    className="flex items-center gap-2 px-3 py-1 transition hover:bg-neutral-700"
                    key={user.uid}
                  >
                    {user.photoUrl ? (
                      <Image
                        src={user.photoUrl}
                        alt="profile"
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    ) : (
                      <div className="p-2 rounded-full bg-neutral-700">
                        <RiUser4Line size={25} />
                      </div>
                    )}
                    <div className="flex flex-col">
                      <h3 className="font-semibold text-sm">
                        {user.displayName.length > 19
                          ? user.displayName.slice(0, 16) + "..."
                          : user.displayName}
                      </h3>
                      <p className="text-sm font-semibold text-neutral-400">
                        @{user.username}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default RightBar;
