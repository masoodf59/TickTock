"use client";

import { ChevronDown } from "lucide-react";

interface Props {
  currentPage: number;
  totalPages: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rows: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}: Props) {
  const getPages = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 8) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);

      if (currentPage > 3) pages.push("...");

      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) pages.push("...");

      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-between mt-6 flex-wrap gap-3">

      <div className="relative w-fit">
        <select
          value={rowsPerPage}
          onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
          className="
          border border-gray-300
          rounded-[12px]
          bg-[#F9FAFB]
          px-[12px] py-[8px]
          pr-10
          text-sm
          outline-none
          appearance-none
          cursor-pointer
    "
        >
          <option value={5}>5 per page</option>
          <option value={10}>10 per page</option>
          <option value={20}>20 per page</option>
        </select>

        {/* Custom Arrow */}
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none text-xs">
          <ChevronDown size={20} />
        </span>
      </div>
      <div className="flex items-center gap-1">

        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 border border-gray-300 cursor-pointer rounded-md text-sm disabled:opacity-50"
        >
          Previous
        </button>

        {getPages().map((page, index) =>
          page === "..." ? (
            <span key={index} className="px-2 text-gray-400">
              ...
            </span>
          ) : (
            <button
              key={index}
              onClick={() => onPageChange(Number(page))}
              className={`px-3 py-1 border border-gray-300 rounded-md text-sm ${currentPage === page
                ? "bg-gray-100 text-blue-600"
                : "hover:bg-gray-100"
                }`}
            >
              {page}
            </button>
          )
        )}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border border-gray-300 cursor-pointer rounded-md text-sm disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}