"use client";

type Props = {
  title: string;
  onClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
  type?: "button" | "submit";
  className?: string;
};

export default function CustomButton({
  title,
  onClick,
  loading = false,
  disabled = false,
  type = "button",
  className = "",
}: Props) {
  const isDisabled = loading || disabled;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={`
        w-full
        bg-[#1A56DB]
        text-sm
        font-medium
        text-white
        py-[10px]
        px-[20px]
        rounded-lg
        transition
        flex
        cursor-pointer
        items-center
        justify-center
        gap-2
        ${
          isDisabled
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-blue-700"
        }
        ${className}
      `}
    >
      {loading && (
        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
      )}

      {loading ? "Loading..." : title}
    </button>
  );
}