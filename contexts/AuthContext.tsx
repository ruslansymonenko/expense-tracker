import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { TEST_USERS } from "../mocks/mockData";
import { AuthContextType, User } from "../types/auth";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const foundUser = TEST_USERS.find(
      (u) => u.email === email && u.password === password,
    );

    if (!foundUser) {
      setIsLoading(false);
      throw new Error("Invalid email or password");
    }

    const { password: _, ...userWithoutPassword } = foundUser;
    setUser(userWithoutPassword);
    setIsLoading(false);
  };

  const register = async (
    email: string,
    password: string,
    name: string,
  ): Promise<void> => {
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const existingUser = TEST_USERS.find((u) => u.email === email);
    if (existingUser) {
      setIsLoading(false);
      throw new Error("Email already exists");
    }

    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
    };

    TEST_USERS.push({ ...newUser, password });
    setUser(newUser);
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, isLoading, login, register, logout }),
    [user, isLoading, login, register, logout],
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
