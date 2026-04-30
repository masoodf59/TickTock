import { z } from "zod";

export const timesheetSchema = z.object({
  project: z.string().min(1, "Project is required"),
  type: z.string().min(1, "Type of work is required"),
  description: z.string().min(20, "Min 20 characters required"),
  hours: z.number().min(1, "At least 1 hour required"),
});

export type TimesheetFormType = z.infer<typeof timesheetSchema>;