import Loader from "@/app/components/Loader";
import { Postprops, UserObject } from "@/app/components/Post";
import { db } from "@/app/config/firebase";
import { doc, getDoc, runTransaction } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import React, { SetStateAction, useEffect, useState } from "react";
import {
  RiChat1Line,
  RiHeart3Fill,
  RiHeart3Line,
  RiShareForwardLine,
  RiUser4Line,
} from "react-icons/ri";
import { useAuthContext } from "../context/AuthContext";
import { useAuthModalContext } from "../context/AuthModalContext";

const PostMain: React.FC<Postprops> = ({
  postId,
  body,
  userId,
  comments,
  likes,
  createdAt,
  commentsIds,
}) => {
  const [user, setUser] = useState<UserObject | null>();
  const [loading, setLoading] = useState<boolean>(false);
  const { currentUser } = useAuthContext();
  const { onLoginOpen } = useAuthModalContext();
  const [liked, setLiked] = useState<boolean>(false);
  const [actionLoading, setActionLoading] = useState<boolean>(false);
  const { currUserLikes, setCurrUserLikes } = useAuthContext();

  const getUser = async () => {
    setLoading(true);
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const userData = userSnap.data();
      setUser({
        uid: userData.uid,
        displayName: userData.displayName,
        username: userData.username,
        photoUrl: userData.profilePicURl,
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (!currentUser) setLiked(false);
    currentUser &&
      (currUserLikes?.includes(postId) ? setLiked(true) : setLiked(false));
  }, [user, currUserLikes, currentUser]);

  const onLike = async () => {
    if (actionLoading) {
      return;
    }
    setActionLoading(true);
    if (!currentUser) {
      onLoginOpen();
      setActionLoading(false);
      return;
    }
    await runTransaction(db, async (transaction) => {
      const currRes = await transaction.get(doc(db, "users", currentUser.uid));
      if (currRes.exists()) {
        const currLikes = currRes.data().likes;
        if (currLikes.includes(postId)) {
          const newCurrLikes = currLikes.filter((id: string) => {
            return id !== postId;
          });
          setCurrUserLikes(newCurrLikes);
          transaction.update(doc(db, "posts", postId), {
            likes: likes - 1,
          });
          transaction.update(doc(db, "users", currentUser.uid), {
            likes: newCurrLikes,
          });
          setLiked(false);
        } else {
          transaction.update(doc(db, "posts", postId), {
            likes: likes + 1,
          });
          const newCurrLikes = [...currLikes, postId];
          setCurrUserLikes(newCurrLikes);
          transaction.update(doc(db, "users", currentUser.uid), {
            likes: newCurrLikes,
          });
          setLiked(true);
        }
      } else {
        throw new Error("Something Went Wrong");
      }
    });
    setActionLoading(false);
  };

  const onComment = () => {
    if (!currentUser) {
      onLoginOpen();
      return;
    } else if (actionLoading) {
      return;
    }
  };

  const onShare = () => {};

  return loading ? (
    <div className="h-screen">
      <Loader />
    </div>
  ) : (
    user && (
      <div className="w-full">
        <div
          className="
        mt-4
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
            <div className="font-semibold text-md cursor-default">{body}</div>
            <div
              className="flex items-center gap-6"
              aria-disabled={actionLoading}
            >
              <div
                className="flex items-center justify-center gap-1 p-2 rounded-full cursor-pointer hover:bg-red-500/10 hover:text-red-400 transition"
                onClick={onLike}
              >
                {liked ? (
                  <RiHeart3Fill size={20} fill="#f87171" />
                ) : (
                  <RiHeart3Line size={20} />
                )}
                <span className="text-sm text-center">{likes}</span>
              </div>
              <div
                className="flex items-center justify-center gap-1 p-2 rounded-full cursor-pointer hover:bg-sky-500/10 hover:text-sky-500 transition"
                onClick={onComment}
              >
                <RiChat1Line size={20} />
                <span className="text-sm">{comments}</span>
              </div>
              <div
                className="flex items-center justify-center gap-1 p-2 rounded-full cursor-pointer hover:bg-green-500/10 hover:text-green-500 transition"
                onClick={onShare}
              >
                <RiShareForwardLine size={20} />
              </div>
            </div>
          </div>
        </div>
        <div className="">Comments & Comment Box</div>
      </div>
    )
  );
};

export default PostMain;
