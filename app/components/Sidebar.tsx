"use client";

import { auth } from "@/app/config/firebase";
import { useAuthContext } from "@/app/context/AuthContext";
import { useSignOut } from "react-firebase-hooks/auth";
import { toast } from "react-hot-toast";
import {
  RiHome6Line,
  RiLoginCircleLine,
  RiLogoutCircleLine,
  RiNotification3Line,
} from "react-icons/ri";
import SidebarItem from "./SidebarItem";
import SidebarPostButton from "./SidebarPostButton";
import SidebarProfile from "./SidebarProfile";

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

  const handleSignout = async () => {
    let success = await signOut();
    if (success) {
      setCurrentUser(null);
      setCurrUserLikes(null)
      toast.success("Signed Out");
    }
  };

  return (
    <div className="hidden sm:flex flex-col gap-y-2 w-[280px] md:w-[400px] lg:w-[450px]">
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
          <SidebarItem label="Sign In" icon={RiLoginCircleLine} auth={false} />
        )}
        <SidebarPostButton />
      </div>
    </div>
  );
};

export default Sidebar;
