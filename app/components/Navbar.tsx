"use client"
import Image from "next/image";
import Link from "next/link";
import { useAuthModalContext } from "@/app/context/AuthModalContext";
import Button from "./Button";
import { useAuthContext } from "@/app/context/AuthContext";
import { RiMenu2Line } from "react-icons/ri";

const Navbar = ({ label }: { label: string }) => {
  const { onLoginOpen, onRegisterOpen } = useAuthModalContext();
  const { currentUser } = useAuthContext();
  return (
    <div className="flex items-center justify-between sm:rounded-t-lg bg-gradient-to-b from-green-900 px-4 py-2">
      <div className="flex items-center gap-x-4">
        <Link
          href="/"
          className="bg-neutral-800 hover:bg-neutral-700 cursor-pointer p-3 rounded-full transition"
        >
          <Image src="/images/Logo.svg" alt="T" width={25} height={25} />
        </Link>
        <h1 className="text-xl font-semibold text-neutral-100 cursor-default">
          {label}
        </h1>
      </div>
      {!currentUser && (
        <div className="hidden sm:flex gap-x-4">
          <Button
            onClick={onRegisterOpen}
            className="bg-neutral-800 hover:bg-neutral-700"
          >
            Sign Up
          </Button>
          <Button
            onClick={onLoginOpen}
            className="bg-green-600 text-neutral-900 hover:bg-green-500"
          >
            Sign In
          </Button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
