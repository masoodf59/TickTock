"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function CustomDropdown({
  options = [],
  value,
  onChange,
  placeholder = "Select",
}:any) {
  const [open, setOpen] = useState(false);

  const selected = options.find((opt:any) => opt.value === value);

  return (
    <div className="relative">
      <div
        className="border border-gray-300 flex items-center justify-between rounded-[8px] p-[10px] cursor-pointer bg-white"
        onClick={() => setOpen(!open)}
      >
        {selected ? selected.title : placeholder}
        <ChevronDown className="w-5 h-5 text-gray-500" />
      </div>

      {open && (
        <div className="absolute w-full bg-white border border-gray-300 shadow mt-1 rounded-lg shadow z-10">
          {options.map((opt:any) => (
            <div
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {opt.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}