// contexts/UserContext.tsx
import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "Regular Staff" | "Line Manager" | "Finance Officer" | "Auditor/Admin";
  department: string;
  avatar?: string;
}

interface UserContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  demoLogin: (role: User["role"]) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Mock user data based on roles
const mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "staff@company.com",
    role: "Regular Staff",
    department: "Marketing",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "manager@company.com",
    role: "Line Manager",
    department: "Operations",
  },
  {
    id: "3",
    name: "Robert Johnson",
    email: "finance@company.com",
    role: "Finance Officer",
    department: "Finance",
  },
  {
    id: "4",
    name: "Sarah Williams",
    email: "admin@company.com",
    role: "Auditor/Admin",
    department: "Administration",
  },
];

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    // In a real app, this would be an API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const foundUser = mockUsers.find((u) => u.email === email);
        if (foundUser && password === "password") {
          // Simple password for demo
          setUser(foundUser);
          resolve(true);
        } else {
          resolve(false);
        }
      }, 1000);
    });
  };

  const demoLogin = (role: User["role"]) => {
    const demoUser = mockUsers.find((u) => u.role === role);
    if (demoUser) {
      setUser(demoUser);
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout, demoLogin }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
