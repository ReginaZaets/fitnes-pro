import { useContext } from "react";
import { UserCoursesContext } from "../userCourses";

export function useUserCoursesContext() {
  return useContext(UserCoursesContext);
}
