"use client";

import { useState } from "react";
import { CircleAlert, MoreHorizontal, Plus } from "lucide-react";
import ProgressBar from "@/components/ProgressBar";
import Modal from "@/components/CustomModel";
import CustomDropdown from "@/components/CustomDropdown";
import CustomInput from "@/components/CustomInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TimesheetFormType, timesheetSchema } from "@/lib/validations/timeSheetSchema";
import CustomButton from "@/components/CustomButton";
// import { timesheetSchema, TimesheetFormType } from "@/lib/validations/timesheetSchema";

type Task = {
  id: number;
  title: string;
  hours: string;
  project: string;
};

type Day = {
  date: string;
  tasks: Task[];
};

const initialData: Day[] = [
  {
    date: "Jan 21",
    tasks: [
      { id: 1, title: "Homepage Development", hours: "4 hrs", project: "Project Name" },
      { id: 2, title: "Homepage Development", hours: "4 hrs", project: "Project Name" },
    ],
  },
  {
    date: "Jan 22",
    tasks: [
      { id: 3, title: "Homepage Development", hours: "4 hrs", project: "Project Name" },
    ],
  },
];

export default function Timesheet() {
  const [data] = useState<Day[]>(initialData);
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<TimesheetFormType>({
    resolver: zodResolver(timesheetSchema),
    defaultValues: {
      project: "",
      type: "",
      description: "",
      hours: 1,
    },
  });
  const [loading, setLoading] = useState(false)

  const projectOptions = [
    { title: "Project Alpha", value: "alpha" },
    { title: "Project Beta", value: "beta" },
  ];

  const typeOptions = [
    { title: "Bug fixes", value: "bug" },
    { title: "Feature development", value: "feature" },
    { title: "Code review", value: "review" },
  ];

  const handleEditData = () => {
    setIsEdit(true);
    setOpen(true)
  }


  const onSubmit = (data: TimesheetFormType) => {
    console.log("Form Data:", data);
    setLoading(true);
    setIsEdit(false)
    reset();
    setOpen(false);
  };

  return (
    <>

      <div className="bg-white p-6 rounded-[8px] shadow lg:w-[85%] mx-auto">
        <div className="flex flex-wrap items-center justify-between">

          <h2 className=" text-xl md:text-2xl lg:text-2xl font-bold text-[#111928] mb-6">This week’s timesheet</h2>
          <ProgressBar />
        </div>

        <h3 className="text-sm font-medium text-[#6B7280] mb-3">
          {"21-26 January,2024"}
        </h3>

        {data.map((day, i) => (
          <div key={day.date} className="mb-8">

            {/* DATE */}

            <div className="flex flex-col lg:flex-row md:flex-row  items-start w-full lg:gap-10">

              <h3 className="text-[18px] font-medium text-[#111928] mb-3 lg:w-[5%]">
                {day.date}
              </h3>

              {/* TASKS */}
              <div className="space-y-2 w-full">

                {day.tasks.map((task, index) => (
                  <div
                    key={task.id}
                    className="flex  flex-wrap items-center justify-between border border-[#E5E7EB] rounded-lg px-[12px] py-[10px] hover:bg-gray-50 relative"
                  >

                    {/* LEFT */}
                    <div className="flex-1">
                      <p className="text-md font-medium text-gray-900">
                        {task.title}
                      </p>
                    </div>

                    {/* RIGHT */}
                    <div className="flex items-center gap-4 relative">

                      <span className="text-sm text-gray-400">{task.hours}</span>

                      <span className="text-xs px-2 py-1 bg-[#E1EFFE] text-[#1E429F] font-medium rounded-md">
                        {task.project}
                      </span>

                      {/* 3 DOTS */}
                      <button
                        onClick={() =>
                          setOpenMenu(openMenu === task.id ? null : task.id)
                        }
                        className="p-1 hover:bg-gray-200 rounded"
                      >
                        <MoreHorizontal size={18} />
                      </button>

                      {/* DROPDOWN */}
                      {openMenu === task.id && (
                        <div className="absolute right-0 top-10 w-28 bg-white border border-gray-50 shadow rounded-lg shadow-md z-10">

                          <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100" onClick={() => handleEditData()}>
                            Edit
                          </button>

                          <button className="w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-gray-100">
                            Delete
                          </button>

                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {/* ADD NEW TASK */}
                <button className={`w-full border cursor-pointer flex items-center justify-center gap-2 border-dashed ${i == 0 ? "bg-[#E1EFFE] text-blue-700" : "text-gray-500"} rounded-lg py-3 text-md  font-medium `} onClick={() => setOpen(true)}>
                  <Plus size={18} /> Add new task
                </button>

              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-[#ffff] p-6 text-center mt-4 rounded-[8px] w-[85%] mx-auto shadow">
        <p className="text-sm text-[#6B7280]">© 2024 tentwenty. All rights reserved</p>
      </div>

      <Modal
        isOpen={open}
        onClose={() => { setOpen(false); setIsEdit(false) }}
        title={isEdit == true ? "Edit Entry" : "Add New Entry"}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Project */}
          <div>
            <label className="block mb-1 text-sm font-medium text-[#111928] flex items-center gap-2 ">
              Select Project * <CircleAlert size={16} className="bg-gray-200 rounded-full" />
            </label>
            <CustomDropdown
              options={projectOptions}
              value={watch("project")}
              onChange={(val: any) => setValue("project", val)}
              placeholder="Project Name"
            />
            {errors.project && (
              <p className="text-red-500 text-xs">{errors.project.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-[#111928] flex items-center gap-2">
              Type of Work *  <CircleAlert size={16} className="bg-gray-200 rounded-full" />
            </label>
            <CustomDropdown
              options={typeOptions}
              value={watch("type")}
              onChange={(val: any) => setValue("type", val)}
            />
            {errors.type && (
              <p className="text-red-500 text-xs">{errors.type.message}</p>
            )}
          </div>
          <div>

            <CustomInput label="Task description *" type="textarea" value={watch("description") || ""}
              onChange={(val: any) => setValue("description", val)}
              error={errors.description?.message}
              placeholder="Write text here.." />
            <p className="text-xs text-gray-500">
              A note for extra info
            </p>
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">
              Hours *
            </label>
            <div className="flex items-center gap-2 border rounded-md border-gray-300 w-fit">
              <button
                onClick={() =>
                  setValue("hours", Math.max(1, (watch("hours") || 1) - 1))
                }
                className="px-3 py-1 border-r border-gray-300 bg-gray-100 cursor-pointer rounded-l"
              >
                -
              </button>
              <span className="w-[30px] text-center">{watch("hours")}</span>
              <button
                onClick={() =>
                  setValue("hours", (watch("hours") || 1) + 1)
                }
                className="px-3 py-1 border-l border-gray-300 bg-gray-100 cursor-pointer rounded-r"
              >
                +
              </button>
            </div>
            {errors.hours && (
              <p className="text-red-500 text-xs">{errors?.hours?.message}</p>
            )}
          </div>
          <div className="flex gap-3 pt-4">
            <CustomButton
              title={isEdit == false ? "Add entry" : "Edit entry"}
              loading={loading}
              disabled={loading == true}
              type="submit"
            />

            <button
              onClick={() => setOpen(false)}
              className="border px-4 py-2 rounded-lg w-full border-gray-300"
            >
              Cancel
            </button>
          </div>

        </form>
      </Modal>

    </>
  );
}