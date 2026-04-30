"use client";

import { useState } from "react";

type InputType = "text" | "password" | "textarea";

interface CustomInputProps {
  label: string;
  type?: InputType;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export default function CustomInput({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
}: CustomInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className="w-full mb-3">
     
      <label className="block mb-1 text-sm font-medium text-[#111928]">
        {label}
      </label>

      {type === "textarea" ? (
        <textarea
          value={value}
          placeholder={placeholder}
          rows={5}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-3 border border-[#D1D5DB] rounded-lg outline-none "
        />
      ) : (
        <div className="relative">
          <input
            type={inputType}
            value={value}
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-[16px] py-[12px]  border border-[#D1D5DB] rounded-[8px] outline-none "
          />

          {/* {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          )} */}
        </div>
      )}

      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}