import { createContext, ReactNode, useState } from "react";
import { Course, UserCourse } from "../types/types";

export const UserCoursesContext = createContext<{
  coursesUserDefault: Course[] | null;
  setCoursesUserDefault: React.Dispatch<React.SetStateAction<Course[]>>;
  coursesUserFull: UserCourse[] | null;
  setCoursesUserFull: React.Dispatch<React.SetStateAction<UserCourse[]>>;
}>({
  coursesUserDefault: null,
  setCoursesUserDefault: () => {},
  coursesUserFull: null,
  setCoursesUserFull: () => {},
});

interface UserProviderProps {
  children: ReactNode;
}

export function UserCoursesProvider({ children }: UserProviderProps) {
  const [coursesUserDefault, setCoursesUserDefault] = useState<Course[]>([]);
  const [coursesUserFull, setCoursesUserFull] = useState<UserCourse[]>([]);

  return (
    <UserCoursesContext.Provider
      value={{
        coursesUserDefault,
        setCoursesUserDefault,
        coursesUserFull,
        setCoursesUserFull,
      }}
    >
      {children}
    </UserCoursesContext.Provider>
  );
}
