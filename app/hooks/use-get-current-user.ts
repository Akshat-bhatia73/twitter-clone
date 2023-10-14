import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../config/firebase";

export interface CurrentUserModel {
  uid: string;
  displayName: string;
  email: string;
  username: string;
  photoUrl: string;
  posts: string[];
  likes: string[];
  comments: [];
  followerCount: number;
  followingCount: number;
  followers: string[];
  following: string[];
  onboarded: boolean;
  createdAt: any;
}

const
  useGetCurrentUserFromFirestore = () => {
    const [currentUser, setCurrentUser] = useState<CurrentUserModel | null>(null);
    const [user, loading, error] = useAuthState(auth);
    const [currUserLikes, setCurrUserLikes] = useState<string[] | null>(null)

    const getUser = async (uid: string) => {
      const userRef = doc(db, "users", uid);
      onSnapshot(userRef, (userSnap) => {

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
          setCurrUserLikes(userData.likes)
        }
      })
    };
    useEffect(() => {
      if (user) {
        getUser(user.uid);
      }
    }, [user, loading]);

    return { currentUser, setCurrentUser, currUserLikes, setCurrUserLikes };
  };

export default useGetCurrentUserFromFirestore;
