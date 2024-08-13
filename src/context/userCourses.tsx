import { createContext, ReactNode, useMemo, useState } from "react";
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

  // Мемоизация значения контекста
  const value = useMemo(
    () => ({
      coursesUserDefault,
      setCoursesUserDefault,
      coursesUserFull,
      setCoursesUserFull,
    }),
    [coursesUserDefault, coursesUserFull]
  );

  return (
    <UserCoursesContext.Provider value={value}>
      {children}
    </UserCoursesContext.Provider>
  );
}
