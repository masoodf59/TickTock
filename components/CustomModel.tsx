"use client";

import { X } from "lucide-react";
import { useEffect } from "react";

export default function Modal({ isOpen, onClose, title, children }:any) {
  useEffect(() => {
    const handleEsc = (e:any) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
   
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />
      <div className="relative bg-white w-full max-w-lg rounded-xl shadow-lg p-6 z-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[18px] font-semibold">{title}</h2>
          <button onClick={onClose} className="text-gray-500 text-3xl cursor-pointer">
            <X size={20}/>
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}