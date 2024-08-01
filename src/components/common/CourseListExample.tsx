import { useEffect, useState } from "react";
import { Course, UserCourse } from "../../types/types";
import {
  fetchGetCourse,
  fetchGetCourses,
  fetchGetCoursesUser,
} from "../../api/coursesApi";
//import { useParams } from "react-router-dom";

const CourseListExample = () => {
  // Состояние для хранения массива курсов
  const [courseArray, setCourseArray] = useState<Course[]>([]);

  // Состояние для хранения курса
  const [course, setCourse] = useState<Course | null>(null);

  // Состояние для хранения курсов пользователя
  const [userCourses, setUserCourses] = useState<Course[]>([]);

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

  // Пока хардкодим ID пользователя. В последствии ID необходимо получать из контекста
  const userID = "52j4se";

  // Получение списка приобретенных курсов пользователя
  useEffect(() => {
    fetchGetCoursesUser(userID).then((data) => {
      setUserCourses(data);
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
      <br />
      <br />
      <div>Курсы пользователя</div>
      {userCourses.map((course) => (
        <li key={course._id}>{course.nameRU}</li>
      ))}
    </div>
  );
};

export default CourseListExample;
