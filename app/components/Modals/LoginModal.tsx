"use client";

import { auth, db } from "@/app/config/firebase";
import { FirebaseErrors } from "@/app/config/firebaseErrors";
import { useAuthModalContext } from "@/app/context/AuthModalContext";
import { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { FcGoogle } from "react-icons/fc";
import { RiArrowRightLine } from "react-icons/ri";
import Input from "../Input";
import Loader from "../Loader";
import Modal from "../Modal";
import OAuthButton from "../OAuthButton";
import { doc, getDoc } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";
import { useAuthContext } from "@/app/context/AuthContext";

const LoginModal = () => {
  const { isLoginOpen, onLoginClose, onRegisterOpen, onOnboardingOpen } =
    useAuthModalContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const { setCurrentUser } = useAuthContext();
  const [oAuthLoading, setOAuthLoading] = useState(false)

  const onSubmit = () => {
    err && setErr("");
    if (!email || !password) {
      setErr("Please enter all the credentials.");
      return;
    }

    signInWithEmailAndPassword(email, password).then(async (res) => {
      if (res) {
        const userRef = doc(db, "users", res.user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          console.log(userSnap.data());
          setCurrentUser(userSnap.data());
          onLoginClose();
        } else {
          onLoginClose();
          onOnboardingOpen();
        }
      }
    });
    setEmail("");
    setPassword("");
  };

  const onToggle = () => {
    if (loading) return;

    onRegisterOpen();
  };

  const bodyContent = loading || oAuthLoading ? (
    <Loader />
  ) : (
    <div className="flex flex-col gap-4">
      <OAuthButton setLoading={setOAuthLoading} className="relative text-neutral-100 group flex items-center justify-between font-normal hover:bg-neutral-700">
        <FcGoogle size={25} />
        <span>Continue With Google</span>
        <RiArrowRightLine className="opacity-0 group-hover:opacity-100 transition" />
      </OAuthButton>
      <p className="text-center text-neutral-400 text-sm font-semibold">Or</p>
      <Input
        placeholder="Enter Your Email"
        type="text"
        value={email}
        disabled={loading}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        placeholder="Enter Your Password"
        type="password"
        value={password}
        disabled={loading}
        onChange={(e) => setPassword(e.target.value)}
      />
      <p className="text-center text-red-500 text-sm font-bold">
        {err || FirebaseErrors[error?.message as keyof typeof FirebaseErrors]}
      </p>
    </div>
  );

  const footerContent = (
    <div className="flex items-center justify-center gap-2 text-sm font-semibold">
      <p>Don&apos;t have an account?</p>
      <span
        className="text-green-600 hover:text-green-500 cursor-pointer transition"
        onClick={onToggle}
      >
        Sign Up
      </span>
    </div>
  );
  return (
    <>
      <Modal
        view="login"
        title="Sign In"
        isOpen={isLoginOpen}
        onClose={onLoginClose}
        onSubmit={onSubmit}
        body={bodyContent}
        footer={footerContent}
        actionLabel="Sign In"
        isLoading={loading || oAuthLoading}
      />
    </>
  );
};

export default LoginModal;
