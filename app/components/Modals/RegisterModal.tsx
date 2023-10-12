"use client";
import { auth } from "@/app/config/firebase";
import { FirebaseErrors } from "@/app/config/firebaseErrors";
import { useAuthModalContext } from "@/app/context/AuthModalContext";
import { useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { FcGoogle } from "react-icons/fc";
import { RiArrowRightLine } from "react-icons/ri";
import Input from "../Input";
import Loader from "../Loader";
import Modal from "../Modal";
import OAuthButton from "../OAuthButton";

const RegisterModal = () => {
  const { isRegisterOpen, onRegisterClose, onLoginOpen, onOnboardingOpen } =
    useAuthModalContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const [oAuthLoading, setOAuthLoading] = useState(false);

  const onSubmit = () => {
    err && setErr("");
    if (!email || !password) {
      setErr("Please enter all the credentials.");
      return;
    }

    createUserWithEmailAndPassword(email, password).then((res) => {
      if (res) {
        setPassword("");
        setEmail("");
        onRegisterClose();
        onOnboardingOpen();
      }
    });
  };

  const onToggle = () => {
    if (loading) return;

    onLoginOpen();
  };

  const bodyContent =
    loading || oAuthLoading ? (
      <Loader />
    ) : (
      <div className="flex flex-col gap-4">
        <OAuthButton setLoading={setOAuthLoading}
          disabled={loading}
          className="relative text-neutral-100 group flex items-center justify-between font-normal hover:bg-neutral-700"
        >
          <FcGoogle size={25} />
          <span>Continue With Google</span>
          <RiArrowRightLine className="opacity-0 group-hover:opacity-100 transition" />
        </OAuthButton>
        <p className="text-center text-neutral-400 text-sm font-semibold">Or</p>
        <Input
          placeholder="Enter Your Email"
          type="email"
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
      <p>Already have an account?</p>
      <span
        className="text-green-600 hover:text-green-500 cursor-pointer transition"
        onClick={onToggle}
      >
        Sign In
      </span>
    </div>
  );
  return (
    <>
      <Modal
        view="register"
        title="Sign Up"
        isOpen={isRegisterOpen}
        onClose={onRegisterClose}
        onSubmit={onSubmit}
        body={bodyContent}
        footer={footerContent}
        actionLabel="Sign Up"
        isLoading={loading || oAuthLoading}
      />
    </>
  );
};

export default RegisterModal;
