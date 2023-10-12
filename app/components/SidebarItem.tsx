import { useRouter } from "next/navigation";
import React from "react";
import { IconType } from "react-icons";
import { useAuthModalContext } from "@/app/context/AuthModalContext";

interface SidebarItemProps {
  label: string;
  href?: string;
  icon: IconType;
  onClick?: () => void;
  auth?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  href,
  icon: Icon,
  onClick,
  auth
}) => {
  const router = useRouter();
  const { onLoginOpen } = useAuthModalContext()
  const handleClick = () => {
    if (!auth && href!=='/') {
      onLoginOpen()
      return
    }
    if (href) {
      router.push(href);
      return
    } else if (onClick) {
      onClick();
    }
  };
  return (
    <div
      onClick={handleClick}
      className="flex items-center gap-x-4 w-full py-3 px-5 cursor-pointer hover:bg-neutral-700 transition"
    >
      <Icon size={25} />
      <p className="text-md font-semibold">{label}</p>
    </div>
  );
};

export default SidebarItem;
