import {
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { useState, useEffect } from "react";

type UsersData = {
    uid: string;
    displayName: string;
    username: string;
    photoUrl: string
  }

const useGetUsers = () => {
  const [users, setUsers] = useState<UsersData[] | null>();
  const [loading, setLoading] = useState<boolean>(false)
  const getUsers = async () => {
    setLoading(true)
    const qu = query(collection(db, "users"), orderBy("createdAt", "desc"), limit(4));
    const usersSnapshot = await getDocs(qu);

    const users: UsersData[] = [];

    usersSnapshot.forEach((doc) => {
      const userData = doc.data();

      users.push({
        uid: userData.uid,
        displayName: userData.displayName,
        username: userData.username,
        photoUrl: userData.profilePicURl
      });
    });
    setUsers(users);
    setLoading(false)
  };

  useEffect(() => {
    getUsers()
  }, [])

  return {users, loading}
};

export default useGetUsers;
