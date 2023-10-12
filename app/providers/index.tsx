"use client";
import { AuthContextProvider } from "@/app/context/AuthContext";
import { AuthModalContextProvider } from "@/app/context/AuthModalContext";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
import Loader from "../components/Loader";

const Providers = ({ children }: { children: React.ReactNode }) => {
  const [user, loading] = useAuthState(auth);
  return (
    <AuthContextProvider>
      <AuthModalContextProvider>
        {loading ? <Loader className="h-screen" /> : children}
      </AuthModalContextProvider>
    </AuthContextProvider>
  );
};

export default Providers;
