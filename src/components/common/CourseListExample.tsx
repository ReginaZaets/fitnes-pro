import { useEffect, useState } from "react";
import { Course, UserCourse, Workout } from "../../types/types";
import {
  fetchGetCourse,
  fetchGetCourseImage,
  fetchGetCourses,
  fetchGetCoursesUser,
  fetchGetWorkout,
  fetchGetWorkouts,
  fetchGetWorkoutsCourse,
} from "../../api/coursesApi";
import { getCourseProgress } from "../../lib/courseProgress";
import { useUserContext } from "../../context/hooks/useUser";
//import { useParams } from "react-router-dom";

const CourseListExample = () => {
  const user = useUserContext();
  // Состояние для хранения массива курсов
  const [allCourses, setAllCourses] = useState<Course[]>([]);

  // Состояние для хранения курса
  const [course, setCourse] = useState<Course | null>(null);
  // Состояние для хранения картинки курса
  const [imgCourse, setImgCourse] = useState("");

  // Состояние для хранения курсов пользователя
  const [userCourses, setUserCourses] = useState<Course[]>([]);

  // Состояние для хранения курсов, тренировок и прогресса тренировок пользователя
  const [userCoursesData, setUserCoursesData] = useState<UserCourse[]>([]);

  // Состояние для хранения всех тренировок
  const [allWorkouts, setAllWorkouts] = useState<Workout[]>([]);

  // Состояние для хранения тренировок курса
  const [workoutsCourse, setWorkoutsCourse] = useState<Workout[]>([]);

  // Состояние для хранения тренировки
  const [workout, setWorkout] = useState<Workout | null>(null);

  // // Пока хардкодим ID курса. В последствии ID нужно будет получать из адреса с помощью useParams
  // //const { courseID } = useParams<{ courseID: string }>();
  const courseID = "6i67sm";

  // Пока хардкодим ID тренировки. В последствии ID нужно будет получать из адреса с помощью useParams
  //const { workoutID } = useParams<{ courseID: string }>();
  const workoutID = "17oz5f";

  // Получение тренировки по ID при загрузке
  useEffect(() => {
    fetchGetWorkout(workoutID).then((data) => {
      setWorkout(data);
    });
  }, []);

  //console.log(workout);

  // Получение тренировки по ID при загрузке
  useEffect(() => {
    user &&
      fetchGetWorkoutsCourse(user?.uid, courseID).then((data) => {
        setWorkoutsCourse(data);
      });
  }, []);

  console.log(workoutsCourse);

  // // Получение всех курсов при загрузке
  // useEffect(() => {
  //   fetchGetCourses().then((data) => {
  //     setAllCourses(data);
  //   });
  // }, []);

  // // Получение курса по ID при загрузке
  // useEffect(() => {
  //   fetchGetCourse(courseID).then((data) => {
  //     setCourse(data);
  //   });
  // }, []);

  // const src = course?.img;
  // // Получение url картинки по src
  // useEffect(() => {
  //   src &&
  //     fetchGetCourseImage(src).then((data) => {
  //       setImgCourse(data);
  //     });
  // }, [src]);

  // // Пока хардкодим ID пользователя. В последствии ID необходимо получать из контекста
  // const userID = "52j4se";

  // // Получение списка приобретенных курсов пользователя
  // useEffect(() => {
  //   fetchGetCoursesUser(userID).then((data) => {
  //     setUserCourses(data.filteredCourses);
  //     setUserCoursesData(data.userCourses);
  //   });
  // }, []);

  // // Получение всех тренировок при загрузке
  // useEffect(() => {
  //   fetchGetWorkouts().then((data) => {
  //     setAllWorkouts(data);
  //   });
  // }, []);

  return (
    <div>
      <div>Курсы</div>
      {allCourses.map((course) => (
        <li key={course._id}>{course.nameRU}</li>
      ))}
      <br />
      <br />
      <div>
        <h3>{course && course.nameRU}</h3>
        <img src={imgCourse} />
      </div>
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
