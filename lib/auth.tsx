import { apiRequest } from "./index";

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  user: {
    id: number;
    name: string;
    email: string;
  };
  token: string;
};

export const loginApi = async (data: LoginPayload) => {
  return apiRequest<LoginResponse>("/api/login", "POST", data);
};