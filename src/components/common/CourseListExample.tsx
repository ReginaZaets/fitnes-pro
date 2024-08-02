import { useEffect, useState } from "react";
import { Course, UserCourse, Workout } from "../../types/types";
import {
  fetchGetCourse,
  fetchGetCourses,
  fetchGetCoursesUser,
  fetchGetWorkouts,
} from "../../api/coursesApi";
import { getCourseProgress } from "../../lib/courseProgress";
//import { useParams } from "react-router-dom";

const CourseListExample = () => {
  // Состояние для хранения массива курсов
  const [allCourses, setAllCourses] = useState<Course[]>([]);

  // Состояние для хранения курса
  const [course, setCourse] = useState<Course | null>(null);

  // Состояние для хранения курсов пользователя
  const [userCourses, setUserCourses] = useState<Course[]>([]);

  // Состояние для хранения курсов, тренировок и прогресса тренировок пользователя
  const [userCoursesData, setUserCoursesData] = useState<UserCourse[]>([]);

  // Состояние для хранения всех тренировок
  const [allWorkouts, setAllWorkouts] = useState<Workout[]>([]);

  // Получение всех курсов при загрузке
  useEffect(() => {
    fetchGetCourses().then((data) => {
      setAllCourses(data);
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
      setUserCourses(data.filteredCourses);
      setUserCoursesData(data.userCourses);
    });
  }, []);

  // Получение всех тренировок при загрузке
  useEffect(() => {
    fetchGetWorkouts().then((data) => {
      setAllWorkouts(data);
    });
  }, []);

  return (
    <div>
      <div>Курсы</div>
      {allCourses.map((course) => (
        <li key={course._id}>{course.nameRU}</li>
      ))}
      <br />
      <br />
      <div>{course && course.nameRU}</div>
      <br />
      <br />
      <div>Курсы пользователя</div>
      {userCourses.map((course) => (
        <div key={course._id}>
          <li>{course.nameRU}</li>
          <span>
            Прогресс:{" "}
            {getCourseProgress(course._id, course.workouts, userCoursesData)}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CourseListExample;
