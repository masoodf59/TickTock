"use client";

export default function ProgressBar() {
  const current = 20;
  const total = 40;
  const percentage = (current / total) * 100;

  return (
    <div className="w-[188px]">
      <div className="flex justify-between mb-2 text-sm font-medium text-gray-700">
        <span></span>
        <span>{100}%</span>
      </div>

      <div className="w-full h-[6px] bg-gray-200 rounded-full relative">
        
        <div
          className="h-[6px] bg-orange-400 rounded-full relative group"
          style={{ width: `${percentage}%` }}
        >
          <div className="absolute left-2/2 -top-8 -translate-x-1/2 hidden group-hover:block">
            <div className="bg-white shadow text-[#111928] font-medium text-sm px-2 py-1 rounded-md whitespace-nowrap">
              {current}/{total} hrs
            </div>
            <div className="w-2 h-2 bg-white rotate-45 mx-auto -mt-1"></div>
          </div>
        </div>
      </div>
    </div>
  );
}