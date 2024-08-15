import { Outlet, useParams } from "react-router-dom";
import CourseInfo from "../components/CourseInfo/CourseInfo";

const CourseInfoPage = () => {
  let { id } = useParams();
  if (!id) {
    // Обработка случая, когда id не передан
    return <p>Course not found.</p>;
  }
  return (
    <main>
      <CourseInfo _id={id} />
      <Outlet />
    </main>
  );
};

export default CourseInfoPage;
