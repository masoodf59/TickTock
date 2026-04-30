// import { apiRequest } from "./client";

import { apiRequest } from "./index";

export type DashboardItem = {
  id: number;
  name: string;
  status: "COMPLETED" | "INCOMPLETE" | "MISSING";
};
  
export const getDashboardData = async (): Promise<DashboardItem[]> => {
  return apiRequest<DashboardItem[]>("/api/dashboard");
};