import { createContext, useContext, useEffect, useState } from "react";
import type { AuthResponse, User } from "../Types/Auth";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAuthLoading: boolean;
  login: (data: AuthResponse) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);
  const isAuthenticated = !!user;
  // login user
  const login = (data: AuthResponse) => {
    const userData: User = {
      _id: data._id,
      name: data.name,
      email: data.email,
    };

    // store token
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };
  // Logout logic
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  // Auto Login - when website refreshes user become null so we need to set user from localStorage when component is mounted
  useEffect(() => {
    const storeduser = localStorage.getItem("user");

    if (storeduser) {
      const parsedUser: User = JSON.parse(storeduser);
      setUser(parsedUser);
    }
    setIsAuthLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isAuthLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};

export default AuthContext;
