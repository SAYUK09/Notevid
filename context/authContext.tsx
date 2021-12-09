import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

export interface AuthUser {
  name: string;
  email: string;
  photo: string;
  uid: string;
}
export interface IAuth {
  user: AuthUser;
  setUser: Dispatch<SetStateAction<AuthUser>>;
}

export const AuthContext = createContext({} as IAuth);

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

export const useAuth = (): IAuth => {
  return useContext(AuthContext);
};
