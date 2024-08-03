import { Outlet } from "react-router-dom";
import CourseInfo from "../components/CourseInfo/CourseInfo";
import { Course } from "../types/types";

const CourseInfoPage = () => {
  return (
    <main>
      <Outlet />
      <CourseInfo />
    </main>
  );
};

export default CourseInfoPage;
