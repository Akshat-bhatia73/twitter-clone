"use client";
import { auth, db } from "@/app/config/firebase";
import { useAuthModalContext } from "@/app/context/AuthModalContext";
import {
  doc,
  getDoc,
  runTransaction,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import { RiUpload2Line, RiUser4Line } from "react-icons/ri";
import Input from "../Input";
import Loader from "../Loader";
import Modal from "../Modal";
import { useAuthContext } from "@/app/context/AuthContext";

const OnboardingModal = () => {
  const { setCurrentUser } = useAuthContext();
  const [user, loading, error] = useAuthState(auth);
  const { isOnboardingOpen, onOnboardingClose } = useAuthModalContext();
  const [name, setName] = useState(user?.displayName || "");
  const [username, setUsername] = useState("");
  const [err, setErr] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (loading || !user) return;
    user?.email && setUsername(user.email.split("@")[0]);
    user?.displayName && setName(user.displayName);
  }, [user]);

  const onSubmit = async () => {
    err && setErr("");
    setLoading(true);
    if (!username || !name) {
      setErr("Please fill all the fields.");
      setLoading(false);
      return;
    }
    if (user) {
      const userUnique = await getDoc(doc(db, "username", username));
      if (userUnique.exists()) {
        setErr("Username already in use. Please choose another.");
      } else {
        await runTransaction(db, async (transaction) => {
          transaction.set(doc(db, "username", username), {
            username: username,
            userId: user.uid,
          });
          transaction.set(doc(db, "users", user.uid), {
            uid: user.uid,
            displayName: name,
            email: user.email,
            username: username,
            profilePicURl: user.photoURL || "",
            posts: [],
            likes: [],
            comments: [],
            followerCount: 0,
            followingCount: 0,
            followers: [],
            following: [],
            onboarded: true,
            createdAt: serverTimestamp(),
          });
        }).then(async () => {
          const userRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            const userData = userSnap.data();
            setCurrentUser({
              uid: userData.uid,
              displayName: userData.displayName,
              email: userData.email,
              username: userData.username,
              photoUrl: userData.profilePicURl,
              posts: userData.posts,
              likes: userData.likes,
              comments: userData.comments,
              followerCount: userData.followerCount,
              followingCount: userData.followingCount,
              followers: userData.followers,
              following: userData.following,
              onboarded: userData.onboarded,
              createdAt: userData.createdAt,
            });
          }
        });
        toast.success("Profile created successfully");
        onOnboardingClose();
      }
    }
    setLoading(false);
  };

  const bodyContent = isLoading ? (
    <Loader />
  ) : (
    <>
      <p className="text-neutral-300 text-sm mb-6">
        Welcome <span className="text-neutral-100 font-bold">{username}!</span>{" "}
        Please fill the following fields
      </p>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col items-center gap-4">
          {!user?.photoURL ? (
            <div className="h-[50px] w-[50px] flex items-center justify-center bg-neutral-700 outline outline-offset-2 outline-green-600 rounded-full">
              <RiUser4Line size={25} className="text-neutral-300" />
            </div>
          ) : (
            <Image
              priority
              src={user?.photoURL || ""}
              width={50}
              height={50}
              alt="Profile Picture"
              className="rounded-full outline outline-green-600 outline-offset-2"
            />
          )}
          <label
            htmlFor="profile-picture"
            className="flex items-center gap-2 text-xs font-semibold text-green-600 hover:text-green-400 transition cursor-pointer"
          >
            <RiUpload2Line size={15} />
            <span>Choose profile picture</span>
          </label>
          <input type="file" id="profile-picture" className="hidden" />
        </div>
        <Input
          placeholder="Your Name"
          type="text"
          value={name}
          disabled={loading}
          onChange={(e) => setName(e.target.value)}
          label="Name"
        />
        <Input
          placeholder="Unique Username"
          type="text"
          value={username}
          disabled={loading}
          onChange={(e) => setUsername(e.target.value)}
          label="Username"
        />
        <p className="text-center text-red-500 text-sm font-bold">{err}</p>
      </div>
    </>
  );

  return (
    <>
      <Modal
        view="onboarding"
        title="Create Username"
        isOpen={isOnboardingOpen}
        onSubmit={onSubmit}
        body={bodyContent}
        actionLabel="Enter"
        isLoading={loading}
      />
    </>
  );
};

export default OnboardingModal;
