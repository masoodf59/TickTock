"use client";

import { useEffect, useState } from "react";
import CustomTable from "@/components/CustomTable";
import Pagination from "@/components/Pagination";
import CustomDropdown from "@/components/CustomDropdown";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [date,setDate]=useState("");
  const [status,setStatus]=useState("");
  const columns = [
    { key: "week", label: "WEEK #" },
    { key: "date", label: "DATE" },
    { key: "status", label: "STATUS" },
    { key: "action", label: "ACTIONS" },
  ];

  const data = [
    { week: 1, date: "1 - 5 January, 2024", status: "COMPLETED" },
    { week: 2, date: "8 - 12 January, 2024", status: "COMPLETED" },
    { week: 3, date: "15 - 19 January, 2024", status: "INCOMPLETE" },
    { week: 4, date: "22 - 26 January, 2024", status: "COMPLETED" },
    { week: 5, date: "28 January - 1 February, 2024", status: "MISSING" },
    { week: 6, date: "1 - 5 February, 2024", status: "COMPLETED" },
    { week: 7, date: "6 - 11 February, 2024", status: "COMPLETED" },
    { week: 8, date: "12 - 17 February, 2024", status: "INCOMPLETE" },
    { week: 9, date: "18 - 23 February, 2024", status: "COMPLETED" },
    { week: 10, date: "23 - 28 February, 2024", status: "MISSING" },
  ];

  const statusOptions = [
    { title: "COMPLETED", value: "completed" },
    { title: "INCOMPLETE", value: "incomplete" },
    { title: "MISSING", value: "missing" },
  ];
  const dateOptions = [
    { title: "1 - 5 January, 2024", value: "1 - 5 January, 2024" },
    { title: "8 - 12 January, 2024", value: "8 - 12 January, 2024" },
    { title: "15 - 19 January, 2024", value: "15 - 19 January, 2024" },
    { title: "22 - 26 January, 2024", value: "22 - 26 January, 2024" },
    { title: "28 January - 1 February, 2024", value: "28 January - 1 February, 2024" },
  ];

  const startIndex = (page - 1) * rowsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + rowsPerPage);

  const totalPages = Math.ceil(data.length / rowsPerPage);
  //  const fetchData = async () => {
  //   try {
  //     // setLoading(true);
  //     const res = await getDashboardData();
  //     // setData(res);
  //   } catch (error: any) {
  //     console.error(error.message);
  //   } finally {
  //     // setLoading(false);
  //   }
  // };

  // useEffect(() => {
  // fetchData()
  // }, []);

  return (
    <>

      <div className="bg-[#ffff] p-[24px] rounded-[8px] shadow w-[85%] mx-auto">
        <p className="text-2xl font-bold mb-4">
          Your Timesheets
        </p>
        <div className="flex items-center gap-3 mb-5">
          <div className="lg:w-auto">

            <CustomDropdown options={dateOptions} value={date} placeholder={"Date Range"} onChange={(val:any)=>setDate(val)} />
          </div>
          <div className="lg:w-[13%]">

            <CustomDropdown options={statusOptions} value={status} placeholder={"Status"} onChange={(val:any)=>setStatus(val)} />
          </div>
        </div>

        <CustomTable columns={columns} data={paginatedData} />

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          rowsPerPage={rowsPerPage}
          onPageChange={(p) => {
            if (p >= 1 && p <= totalPages) setPage(p);
          }}
          onRowsPerPageChange={(rows) => {
            setRowsPerPage(rows);
            setPage(1);
          }}
        />
      </div>
      <div className="bg-[#ffff] p-6 text-center mt-4 rounded-[8px] w-[85%] mx-auto shadow">
        <p className="text-sm text-[#6B7280]">© 2024 tentwenty. All rights reserved</p>
      </div>
    </>
  );
}