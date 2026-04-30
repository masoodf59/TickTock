"use client"
import Topbar from "@/components/Topbar";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function DashboardLayout({
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
      console.log('User email:', token);
    }
  }, [token]);
  return (
    <div className="bg-gray-50 min-h-screen ">
      <Topbar />
      <main className="p-6 mt-17">{children}</main>
    </div>
  );
}