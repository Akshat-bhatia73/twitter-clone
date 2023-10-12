import { useAuthState } from "react-firebase-hooks/auth";
import { RiAddLine } from "react-icons/ri";
import { auth } from "@/app/config/firebase";
import { useAuthModalContext } from "@/app/context/AuthModalContext";

const SidebarPostButton = () => {
  const [user, loading, error] = useAuthState(auth);
  const { onLoginOpen } = useAuthModalContext();
  const handleClick = () => [!user && onLoginOpen()];
  // const router = useRouter()
  return (
    <div
      onClick={handleClick}
      className="
      bg-green-600
        flex
        items-center
        gap-x-4
        px-5
        py-2
        text-neutral-900
        cursor-pointer
        hover:bg-green-500
        transition
    "
    >
      <RiAddLine size={25} />
      <p className="text-lg font-bold">Post</p>
    </div>
  );
};
export default SidebarPostButton;
