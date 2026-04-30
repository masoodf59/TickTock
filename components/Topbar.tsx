"use client";

import { useAuthStore } from "@/store/authStore";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";

export default function Topbar() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter()

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavigate = () => {
    router.push("/dashboard")
  }

  const handleLogout = async () => {
   logout()
    toast.success("User logout successfully");
    router.push("/login")
  };

  return (
    <div className="flex justify-between items-center p-[16px] bg-white shadow fixed w-full">

      <div className="flex items-center gap-4">
        <h1 className="text-[24px] font-semibold cursor-pointer" onClick={handleNavigate}>ticktock</h1>
        <p className="text-sm font-medium text-[#111928]">Timesheets</p>
      </div>
      <div className="relative" ref={dropdownRef}>

        <div
          onClick={() => setOpen(!open)}
          className="flex items-center gap-1 cursor-pointer"
        >
          <span className="text-gray-500 text-md">
            {user?.name || "John Doe"}
          </span>
          <ChevronDown className="w-5 h-5 text-gray-500" />
        </div>
        {open && (
          <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-50">
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}