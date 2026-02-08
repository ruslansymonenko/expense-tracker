import { User } from "@/types/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiClient } from "./client";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  name: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export const authApi = {
  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>("/auth/login", data);
    await AsyncStorage.setItem("token", response.data.token);
    await AsyncStorage.setItem("user", JSON.stringify(response.data.user));
    return response.data;
  },

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>("/auth/register", data);
    await AsyncStorage.setItem("token", response.data.token);
    await AsyncStorage.setItem("user", JSON.stringify(response.data.user));
    return response.data;
  },

  async logout(): Promise<void> {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");
  },

  async getCurrentUser(): Promise<User | null> {
    try {
      const userJson = await AsyncStorage.getItem("user");
      return userJson ? JSON.parse(userJson) : null;
    } catch {
      return null;
    }
  },

  async getToken(): Promise<string | null> {
    return await AsyncStorage.getItem("token");
  },
};
