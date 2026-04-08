import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  user: any;
  isAuthenticated: boolean;
  isAuthLoading: boolean;
  login: (userData: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);
  const isAuthenticated = !!user;
  // login user
  const login = (userData: any) => {
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
    let storeduser = localStorage.getItem("user");

    if (storeduser) {
      storeduser = JSON.parse(storeduser);
      setUser(storeduser);
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
