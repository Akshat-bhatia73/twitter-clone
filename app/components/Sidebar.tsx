"use client";

import { auth } from "@/app/config/firebase";
import { useAuthContext } from "@/app/context/AuthContext";
import { useSignOut } from "react-firebase-hooks/auth";
import { toast } from "react-hot-toast";
import {
  RiCloseLine,
  RiHome6Line,
  RiLoginCircleLine,
  RiLogoutCircleLine,
  RiMenu3Line,
  RiNotification3Line,
} from "react-icons/ri";
import SidebarItem from "./SidebarItem";
import SidebarPostButton from "./SidebarPostButton";
import SidebarProfile from "./SidebarProfile";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

const items = [
  {
    label: "Home",
    href: "/",
    icon: RiHome6Line,
  },
  {
    label: "Notifications",
    href: "/notifications",
    icon: RiNotification3Line,
  },
];

const Sidebar = () => {
  const { currentUser, setCurrentUser, setCurrUserLikes } = useAuthContext();
  const [signOut, loading] = useSignOut(auth);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSignout = async () => {
    let success = await signOut();
    if (success) {
      setCurrentUser(null);
      setCurrUserLikes(null);
      toast.success("Signed Out");
    }
  };

  return (
    <>
      <div
        onClick={() => setSidebarOpen((prev) => !prev)}
        className=" fixed sm:hidden right-4 top-2 bg-neutral-800 border border-neutral-700/70 p-2 rounded-full hover:bg-neutral-700 cursor-pointer transition z-20"
      >
        {!sidebarOpen ? <RiMenu3Line size={25} /> : <RiCloseLine size={25} />}
      </div>
      <div
        className={twMerge(`
          transition fixed z-10 sm:z-0 h-full sm:static sm:flex flex-col gap-y-2 w-[280px] md:w-[400px] lg:w-[450px]
        `, 
        sidebarOpen? 'left-0 ': '-left-full'
        )}
      >
        {currentUser && (
          <div className="bg-neutral-800 rounded-lg py-2">
            <SidebarProfile
              uid={currentUser.uid}
              name={currentUser.displayName}
              isLoading={loading}
              username={currentUser.username}
              followerCount={currentUser.followerCount}
              followingCount={currentUser.followingCount}
              photoUrl={currentUser.photoUrl}
            />
          </div>
        )}
        <div className="h-full bg-neutral-800 rounded-lg py-2 overflow-x-hidden overflow-y-auto">
          {items.map((item) => {
            return (
              <SidebarItem
                key={item.label}
                label={item.label}
                href={item.href}
                icon={item.icon}
                auth={currentUser ? true : false}
              />
            );
          })}
          {currentUser ? (
            <SidebarItem
              label="Sign Out"
              onClick={handleSignout}
              icon={RiLogoutCircleLine}
              auth={true}
            />
          ) : (
            <SidebarItem
              label="Sign In"
              icon={RiLoginCircleLine}
              auth={false}
            />
          )}
          <SidebarPostButton />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
