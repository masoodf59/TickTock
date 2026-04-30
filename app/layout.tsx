"use client"
import type { Metadata } from "next";
import "./globals.css";

import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", // optional (for CSS usage)
});



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
   const token = useAuthStore((state) => state.token);
  const router = useRouter()
   useEffect(() => {
      if (!token) {
        router.push("/login");
      } else {
        router.push("/dashboard")
      }
    }, [token]);
  return (
    <html lang="en" className={`${inter.className} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
