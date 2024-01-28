import React, { createContext, useContext, useEffect, useState } from "react";
import { IAuthUser, IAuth } from "../types";

export const AuthContext = createContext<IAuth | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<IAuthUser>({
    name: "",
    email: "",
    photo: "",
    uid: "",
    _id: "",
  });

  useEffect((): void => {
    const localUser = localStorage && localStorage.getItem("auth");
    if (localUser) {
      const parsedUser = JSON.parse(localUser);
      setUser(parsedUser);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): IAuth {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
