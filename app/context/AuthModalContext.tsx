"use client";

import { createContext, useContext, useState } from "react";

interface AuthModalState {
  isLoginOpen: boolean;
  isRegisterOpen: boolean;
  isOnboardingOpen: boolean;
  onLoginOpen: () => void;
  onOnboardingOpen: () => void;
  onRegisterOpen: () => void;
  onLoginClose: () => void;
  onOnboardingClose: () => void;
  onRegisterClose: () => void;
}

const AuthModalContext = createContext({} as AuthModalState);

export const AuthModalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const onLoginOpen = () => {
    isRegisterOpen && setIsRegisterOpen(false);
    setIsLoginOpen(true);
  };
  const onOnboardingOpen = () => {
    setIsRegisterOpen(false);
    setIsLoginOpen(false);
    setIsOnboardingOpen(true);
  };
  const onOnboardingClose = () => {
    setIsOnboardingOpen(false);
  };
  const onLoginClose = () => {
    setIsLoginOpen(false);
  };
  const onRegisterOpen = () => {
    isLoginOpen && setIsLoginOpen(false);
    setIsRegisterOpen(true);
  };
  const onRegisterClose = () => {
    setIsRegisterOpen(false);
  };
  return (
    <AuthModalContext.Provider
      value={{
        isLoginOpen,
        isRegisterOpen,
        isOnboardingOpen,
        onLoginOpen,
        onRegisterOpen,
        onLoginClose,
        onRegisterClose,
        onOnboardingOpen,
        onOnboardingClose,
      }}
    >
      {children}
    </AuthModalContext.Provider>
  );
};

export const useAuthModalContext = () => {
  return useContext(AuthModalContext);
};
