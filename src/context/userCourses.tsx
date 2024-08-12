import { createContext, ReactNode, useState } from "react";
import { Course } from "../types/types";

export const UserCoursesContext = createContext<{
  coursesUser: Course[] | null;
  setCoursesUser: React.Dispatch<React.SetStateAction<Course[]>>;
}>({
  coursesUser: null,
  setCoursesUser: () => {},
});

interface UserProviderProps {
  children: ReactNode;
}

export function UserCoursesProvider({ children }: UserProviderProps) {
  const [coursesUser, setCoursesUser] = useState<Course[]>([]);

  return (
    <UserCoursesContext.Provider value={{ coursesUser, setCoursesUser }}>
      {children}
    </UserCoursesContext.Provider>
  );
}
