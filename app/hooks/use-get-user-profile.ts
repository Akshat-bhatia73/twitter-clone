import { DocumentData, doc, getDoc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { CurrentUserModel } from "./use-get-current-user";

const useGetUserProfile = (userId: string) => {
  const [user, setUser] = useState<CurrentUserModel | null>(null);
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const getUser = async () => {
    setError(false)
    setLoading(true)
    const userRef = doc(db, "users", userId)
    onSnapshot(userRef, (userSnap) => {
      if (userSnap.exists()) {
        const userData = userSnap.data()
        setUser({
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
      else {
        setError(true)
      }
    })

    setLoading(false)
  };

  useEffect(() => {
    getUser()
  }, [])

  return { user, loading, error }
};

export default useGetUserProfile