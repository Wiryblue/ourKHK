// src/context/AuthContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null);

  const login = async (email: string, password: string) => {
    // Replace this with your API call for authentication.
    try {
      // Example API call: const response = await fetch('/api/auth/login', { ... });
      // On success, set user data from response:
      setUser({ email, name: "Example User", major: "CS", deltaNumber: "12345" });
      return true;
    } catch (error) {
      return false;
    }
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
