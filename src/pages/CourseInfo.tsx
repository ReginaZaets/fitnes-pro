import { Outlet } from "react-router-dom";
import CourseInfo from "../components/common/CourseInfo/CourseInfo";

const CourseInfoPage = () => {
  return (
    <main>
      <CourseInfo />
      <Outlet />
    </main>
  );
};

export default CourseInfoPage;
