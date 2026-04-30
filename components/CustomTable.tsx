"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MoveDown, MoveUp } from "lucide-react";

interface Column {
  key: string;
  label: string;
}

interface Props {
  columns: Column[];
  data: any[];
}

export default function CustomTable({ columns, data }: Props) {
  const router = useRouter();

  const [sortKey, setSortKey] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const sortedData = [...data].sort((a, b) => {
    if (!sortKey) return 0;

    const aValue = a[sortKey];
    const bValue = b[sortKey];

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortOrder === "asc"
        ? aValue - bValue
        : bValue - aValue;
    }

    return sortOrder === "asc"
      ? String(aValue).localeCompare(String(bValue))
      : String(bValue).localeCompare(String(aValue));
  });

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const getStatusStyle = (status: string) => {
    if (status === "COMPLETED")
      return "bg-[#DEF7EC] text-green-800";
    if (status === "INCOMPLETE")
      return "bg-yellow-100 text-yellow-800";
    if (status === "MISSING")
      return "bg-pink-100 text-pink-800";
    return "";
  };

  const getAction = (status: string) => {
    if (status === "COMPLETED") return "View";
    if (status === "INCOMPLETE") return "Update";
    if (status === "MISSING") return "Create";
    return "";
  };

  const handleActionClick = (row: any) => {
    if (row.status === "COMPLETED") {
      router.push(`/${row.week}`);
    }

    if (row.status === "INCOMPLETE") {
      console.log("Update logic here", row);
    }

    if (row.status === "MISSING") {
      console.log("Create logic here", row);
    }
  };

  const SortIcon = ({ active }: { active: boolean }) => (
    <span className="ml-1 text-xs">
      {active ? <MoveUp size={14} />  :   <MoveDown size={14} />}
    </span> 
  );

  return (
    <div className="w-full overflow-x-auto shadow rounded-xl">
      <div className="bg-white rounded-xl shadow min-w-[700px]">
        <table className="w-full">

          <thead className="bg-gray-50">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  className="text-left p-4 font-semibold text-[12px] text-gray-500 whitespace-nowrap cursor-pointer select-none"
                >
                  <div className="flex items-center">
                    {col.label}

                   {col?.label ==="ACTIONS"?"":<SortIcon active={sortKey === col.key} />} 
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row, i) => (
              <tr key={i} className="border-t border-gray-100">

                {columns.map((col, index) => (
                  <td
                    key={col.key}
                    className={`p-4 whitespace-nowrap ${
                      index === 0 ? "bg-gray-50 w-[100px]" : ""
                    }`}
                  >

                    {col.key === "status" ? (
                      <span
                        className={`px-[10px] py-[3px] text-xs rounded-md font-medium ${getStatusStyle(
                          row.status
                        )}`}
                      >
                        {row.status}
                      </span>

                    ) : col.key === "action" ? (

                      <button
                        className="text-[#1C64F2] text-[16px] cursor-pointer"
                        onClick={() => handleActionClick(row)}
                      >
                        {getAction(row.status)}
                      </button>

                    ) : (

                      <p className="text-[#6B7280] text-[14px]">
                        {row[col.key]}
                      </p>
                    )}

                  </td>
                ))}

              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}







