import { createContext, ReactNode, useState } from "react";
import { Course } from "../types/types";

type ContextType = {
    coursesUser: Course[];
    setCoursesUser: React.Dispatch<React.SetStateAction<Course[]>>;
    };

export const UserCoursesContext = createContext<ContextType | null>(null);
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