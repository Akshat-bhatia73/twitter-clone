import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React, { SetStateAction, forwardRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { auth, db } from "@/app/config/firebase";
import { useAuthModalContext } from "@/app/context/AuthModalContext";
import { useAuthContext } from "@/app/context/AuthContext";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import Loader from "./Loader";
import { doc, getDoc } from "firebase/firestore";

export interface OAuthButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  setLoading: React.Dispatch<SetStateAction<boolean>>;
}

const OAuthButton = forwardRef<HTMLButtonElement, OAuthButtonProps>(
  ({ children, className, setLoading, ...props }, ref) => {
    const { onLoginClose, onRegisterClose, onOnboardingOpen } =
      useAuthModalContext();
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    const handleClick = () => {
      setLoading(true);
      signInWithGoogle().then(async (res) => {
        if (res) {
          const userRef = doc(db, "users", res.user.uid);
          const userData = await getDoc(userRef);
          if (!userData.exists()) {
            onLoginClose();
            onRegisterClose();
            onOnboardingOpen();
          } else {
            const onboarded = userData.data().onboarded;
            if (onboarded) {
              onLoginClose();
              onRegisterClose();
            }
          }
        }
        setLoading(false);
      });
    };

    return (
      <button
        onClick={handleClick}
        className={twMerge(
          `bg-neutral-700/80 font-bold text-md rounded-full px-5 py-2 text-neutral-100 transition`,
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

export default OAuthButton;
