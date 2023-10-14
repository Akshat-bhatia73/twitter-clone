import LoginModal from "@/app/components/Modals/LoginModal";
import OnboardingModal from "@/app/components/Modals/OnboardingModal";
import RegisterModal from "@/app/components/Modals/RegisterModal";
import Navbar from "@/app/components/Navbar";
import RightBar from "@/app/components/RightBar";
import Sidebar from "@/app/components/Sidebar";
import ToasterComponent from "@/app/components/Toaster";
import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const font = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Twitter Clone",
  description: "A Twitter clone made useing NextJs and Firebase.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className + " bg-neutral-900"}>
        <Providers>
          <ToasterComponent />
          <LoginModal />
          <RegisterModal />
          <OnboardingModal />
          <div className="flex max-w-7xl mx-auto gap-x-2 bg-neutral-900 sm:p-2 h-screen overflow-x-hidden">
            <Sidebar />
            <div className="h-full w-full bg-neutral-800 sm:rounded-lg overflow-y-auto">
              <Navbar label="Twitter" />
              {children}
            </div>
            <RightBar />
          </div>
        </Providers>
      </body>
    </html>
  );
}
