import { createContext, ReactNode, useEffect, useMemo, useState } from "react";
import { Course, UserCourse, UserCourseWorkout } from "../types/types";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../api/firebaseConfig";

export const UserCoursesContext = createContext<{
  coursesUserDefault: Course[] | null;
  setCoursesUserDefault: React.Dispatch<React.SetStateAction<Course[]>>;
  coursesUserFull: UserCourse[] | null;
  setCoursesUserFull: React.Dispatch<React.SetStateAction<UserCourse[]>>;
  workoutUsers: UserCourseWorkout[];
  setWorkoutUsers: React.Dispatch<React.SetStateAction<UserCourseWorkout[]>>;
  isLoadingCourses: boolean;
  setIsLoadingCourses: React.Dispatch<React.SetStateAction<boolean>>
}>({
  coursesUserDefault: null,
  setCoursesUserDefault: () => {},
  coursesUserFull: null,
  setCoursesUserFull: () => {},
  workoutUsers: [],
  setWorkoutUsers: () => {},
  isLoadingCourses: true,
  setIsLoadingCourses: () => {},
});

interface UserProviderProps {
  children: ReactNode;
}

export function UserCoursesProvider({ children }: UserProviderProps) {
  const [coursesUserDefault, setCoursesUserDefault] = useState<Course[]>([]);
  const [coursesUserFull, setCoursesUserFull] = useState<UserCourse[]>([]);
  const [workoutUsers, setWorkoutUsers] = useState<UserCourseWorkout[]>([]);
  const [isLoadingCourses, setIsLoadingCourses] = useState(true);
  // Мемоизация значения контекста
  const value = useMemo(
    () => ({
      coursesUserDefault,
      setCoursesUserDefault,
      coursesUserFull,
      setCoursesUserFull,
      workoutUsers,
      setWorkoutUsers,
      isLoadingCourses,
      setIsLoadingCourses
    }),
    [coursesUserDefault, coursesUserFull, workoutUsers]
  );
  useEffect(() => {
    const exitUser = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setCoursesUserDefault([]);
        setCoursesUserFull([]);
        setWorkoutUsers([]);
      }
    });
    return () => exitUser();
  }, []);
  return (
    <UserCoursesContext.Provider value={value}>
      {children}
    </UserCoursesContext.Provider>
  );
}
