import { createContext, ReactNode, useState } from "react";
import { User } from "../types/types";

function checkLS(): User | null {
  try {
    const user: User = JSON.parse(localStorage.getItem("user") || "null");
    return user;
  } catch (error) {
    localStorage.removeItem("user");
    return null;
  }
}

export const UserContext = createContext<{
  user: User | null;
  userLogin: (newUser: User) => void;
  logout: () => void;
}>({
  user: null,
  userLogin: () => {},
  logout: () => {},
});

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(checkLS());
  //const [user, setUser] = useState("julia")

  function userLogin(newUser: User) {
    console.log(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
    setUser(newUser);
    return user;
  }

  function logout() {
    localStorage.removeItem("user");
    setUser(null);
    console.log(user);
    return user;
  }
  return (
    <UserContext.Provider value={{ user, userLogin, logout }}>
      {children}
    </UserContext.Provider>
  );
}
