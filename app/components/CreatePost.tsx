import { doc, runTransaction } from "firebase/firestore";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { RiImageAddLine, RiUser4Line } from "react-icons/ri";
import { v4 as uuidv4 } from "uuid";
import { db } from "../config/firebase";
import { useAuthContext } from "../context/AuthContext";
import Button from "./Button";

const CreatePost = () => {
  const { currentUser } = useAuthContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [post, setPost] = useState("");

  const createPost = async () => {
    setLoading(true);
    if (!post) {
      toast.error("Empty post.");
      setLoading(false);
      return;
    }
    const docRef = doc(db, "users", currentUser.uid);
    await runTransaction(db, async (transaction) => {
      const userDoc = await transaction.get(docRef);
      if (!userDoc.exists()) {
        setLoading(false);
        return;
      }
      const userPosts = [...userDoc.data().posts, post];
      transaction.update(docRef, { posts: userPosts });
      transaction.set(doc(db, "posts", uuidv4()), {
        userId: currentUser.uid,
        body: post,
        likes: 0,
        comments: 0,
        commentsIds: [],
        createdAt: new Date(),
      });
    });
    toast.success("Post created.");
    setPost("");
    setLoading(false);
  };

  return (
    currentUser && (
      <div className="flex gap-4 bg-neutral-800 border-t border-b border-neutral-700/70 px-5 py-2">
        <div className="">
          {currentUser.photoUrl ? (
            <Image
              src={currentUser.photoUrl}
              alt="profile"
              width={50}
              height={50}
              className="rounded-full"
            />
          ) : (
            <div className="h-[50px] w-[50px] p-2 flex items-center justify-center bg-neutral-700 rounded-full">
              <RiUser4Line size={30} />
            </div>
          )}
        </div>
        <div className=" flex flex-col gap-y-2 w-full">
          <div className="">
            <textarea
              onChange={(e) => {
                setPost(e.target.value);
              }}
              value={post}
              placeholder="Write Post"
              className="
              resize-none outline-none rounded-none
              ring-0
              w-full
              px-5 py-2
              font-semibold
              text-neutral-100
              bg-neutral-800
              border-b border-neutral-700/70 focus:border-neutral-400
              transition
            "
            />
          </div>
          <div className="flex justify-between items-center">
            <div className="p-2 rounded-full group hover:bg-green-700/20 cursor-pointer transition">
              <RiImageAddLine
                size={25}
                className="text-neutral-400 group-hover:text-green-400"
              />
            </div>
            <Button
              onClick={createPost}
              disabled={loading}
              className="bg-green-600 hover:bg-green-500 text-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Post
            </Button>
          </div>
        </div>
      </div>
    )
  );
};

export default CreatePost;
