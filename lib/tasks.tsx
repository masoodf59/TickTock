import { apiRequest } from "./index";

export type Task = {
  id: number;
  name: string;
  status: "COMPLETED" | "INCOMPLETE" | "MISSING";
};

export const getTasks = async (): Promise<Task[]> => {
  return apiRequest<Task[]>("/api/tasks");
};

export const createTask = async (data: Partial<Task>) => {
  return apiRequest<Task>("/api/tasks", "POST", data);
};

export const updateTask = async (id: number, data: Partial<Task>) => {
  return apiRequest<Task>(`/api/tasks/${id}`, "PUT", data);
};

export const deleteTask = async (id: number) => {
  return apiRequest<null>(`/api/tasks/${id}`, "DELETE");
};