import React from "react";
import { twMerge } from "tailwind-merge";

interface LoaderProps {
  className?: string
}
const Loader: React.FC<LoaderProps> = ({ className }) => {
  return (
    <div className={twMerge(`relative flex h-full w-full items-center justify-center mb-4`, className)}>
      <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-green-400 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-5 w-5 bg-green-500"></span>
    </div>
  );
};

export default Loader;
