import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext({});

export type AuthUser = {
  name: string;
  email: string;
  photo: string;
  uid: string;
};

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<AuthUser>({
    name: "",
    email: "",
    photo: "",
    uid: "",
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

export const useAuth = () => {
  return useContext(AuthContext);
};
