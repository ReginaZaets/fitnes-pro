import { Outlet } from "react-router-dom";
import CourseInfo from "../components/CourseInfo/CourseInfo";

const CourseInfoPage = () => {
  return (
    <main>
      <Outlet />
      <CourseInfo />
    </main>
  );
};

export default CourseInfoPage;
