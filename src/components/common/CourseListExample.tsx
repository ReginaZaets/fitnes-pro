import { useEffect, useState } from "react";
import { Course } from "../../types/types";
import { fetchGetCourse, fetchGetCourses } from "../../api/coursesApi";
//import { useParams } from "react-router-dom";

const CourseListExample = () => {
  // Состояние для хранения массива курсов
  const [courseArray, setCourseArray] = useState<Course[]>([]);

  // Состояние для хранения курса
  const [course, setCourse] = useState<Course | null>(null);

  // Получение всех курсов при загрузке
  useEffect(() => {
    fetchGetCourses().then((data) => {
      setCourseArray(data);
    });
  }, []);

  // Пока хардкодим ID курса. В последствии ID нужно будет получать из адреса с помощью useParams
  //const { courseID } = useParams<{ courseID: string }>();
  const courseID = "6i67sm";

  // Получение курса по ID при загрузке
  useEffect(() => {
    fetchGetCourse(courseID).then((data) => {
      setCourse(data);
    });
  }, []);

  return (
    <div>
      <div>Курсы</div>
      {courseArray.map((course) => (
        <li key={course._id}>{course.nameRU}</li>
      ))}
      <br />
      <br />
      <div>{course && course.nameRU}</div>
    </div>
  );
};

export default CourseListExample;
