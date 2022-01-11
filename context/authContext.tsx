import { createContext, useContext, useEffect, useState } from "react";
import { IAuth, IAuthUser } from "../types";

export const AuthContext = createContext({} as IAuth);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<IAuthUser>({
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

export const useAuth = (): IAuth => {
  return useContext(AuthContext);
};
