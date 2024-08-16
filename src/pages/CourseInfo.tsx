import { Outlet } from "react-router-dom";
import CourseInfo from "../components/CourseInfo/CourseInfo";

const CourseInfoPage = () => {
  return (
    <main>
      <CourseInfo />
      <Outlet />
    </main>
  );
};

export default CourseInfoPage;
