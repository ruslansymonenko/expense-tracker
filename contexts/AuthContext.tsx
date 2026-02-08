import { authApi } from "@/lib/api/auth";
import { AuthContextType, User } from "@/types/auth";
import { useQueryClient } from "@tanstack/react-query";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const queryClient = useQueryClient();

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      setIsLoading(true);
      const currentUser = await authApi.getCurrentUser();
      const token = await authApi.getToken();

      if (currentUser && token) {
        setUser(currentUser);
      }
    } catch (error) {
      console.error("Error loading user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);

    try {
      const response = await authApi.login({ email, password });

      queryClient.clear();

      setUser(response.user);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Invalid email or password";
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    email: string,
    password: string,
    name: string,
  ): Promise<void> => {
    setIsLoading(true);

    try {
      const response = await authApi.register({ email, name, password });

      queryClient.clear();

      setUser(response.user);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || error.message || "Registration failed";
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await authApi.logout();
    setUser(null);

    queryClient.clear();
  };

  const value = useMemo(
    () => ({ user, isLoading, login, register, logout }),
    [user, isLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
