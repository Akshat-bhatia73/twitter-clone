import React, {
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";
import useGetCurrentUserFromFirestore, { CurrentUserModel } from "../hooks/use-get-current-user";

type AuthContextType = {
  currentUser: CurrentUserModel | null;
  currUserLikes: string[] | null
  isLoading: boolean;
  setIsLoading: React.Dispatch<SetStateAction<any>>;
  setCurrentUser: React.Dispatch<SetStateAction<any>>;
  setCurrUserLikes: React.Dispatch<SetStateAction<any>>;
};

const AuthContext = createContext({} as AuthContextType);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { currentUser, setCurrentUser, currUserLikes, setCurrUserLikes } = useGetCurrentUserFromFirestore();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (currentUser) {
      toast.success(`Welcome ${currentUser.displayName}`);
    }
  }, [currentUser]);

  return (
    <AuthContext.Provider
      value={{ currentUser, setCurrentUser, isLoading, setIsLoading, currUserLikes, setCurrUserLikes }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
