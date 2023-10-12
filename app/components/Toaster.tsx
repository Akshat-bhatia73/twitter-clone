"use client"

import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

const ToasterComponent = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])
  if (!isMounted) return null
  return (

    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={8}
      containerClassName=""
      containerStyle={{}}
      toastOptions={{
        // Define default options
        className: "",
        duration: 3000,
        style: {
          background: "#262626",
          color: "#fff",
        },

        // Default options for specific types
        success: {
          duration: 3000,
          iconTheme: {
            primary: "rgb(34 197 94 / 1)",
            secondary: "#262626",
          },
        },
      }}
    />
  );
};

export default ToasterComponent;
