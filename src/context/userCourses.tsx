import { createContext, ReactNode, useMemo, useState } from "react";
import { Course, UserCourse, UserCourseWorkout } from "../types/types";

export const UserCoursesContext = createContext<{
  coursesUserDefault: Course[] | null;
  setCoursesUserDefault: React.Dispatch<React.SetStateAction<Course[]>>;
  coursesUserFull: UserCourse[] | null;
  setCoursesUserFull: React.Dispatch<React.SetStateAction<UserCourse[]>>;
  workoutUsers: UserCourseWorkout[];
  setWorkoutUsers: React.Dispatch<React.SetStateAction<UserCourseWorkout[]>>;
}>({
  coursesUserDefault: null,
  setCoursesUserDefault: () => {},
  coursesUserFull: null,
  setCoursesUserFull: () => {},
  workoutUsers: [],
  setWorkoutUsers: () => {},
});

interface UserProviderProps {
  children: ReactNode;
}

export function UserCoursesProvider({ children }: UserProviderProps) {
  const [coursesUserDefault, setCoursesUserDefault] = useState<Course[]>([]);
  const [coursesUserFull, setCoursesUserFull] = useState<UserCourse[]>([]);
  const [workoutUsers, setWorkoutUsers] = useState<UserCourseWorkout[]>([]);

  // Мемоизация значения контекста
  const value = useMemo(
    () => ({
      coursesUserDefault,
      setCoursesUserDefault,
      coursesUserFull,
      setCoursesUserFull,
      workoutUsers,
      setWorkoutUsers,
    }),
    [coursesUserDefault, coursesUserFull, workoutUsers]
  );

  return (
    <UserCoursesContext.Provider value={value}>
      {children}
    </UserCoursesContext.Provider>
  );
}
