import { get, ref, remove, set } from "firebase/database";
import { db } from "./firebaseConfig";
import { Course, UserCourse, Workout } from "../types/types";
import { getBlob, ref as storageRef, getStorage } from "firebase/storage";

// Получение всех курсов
export const fetchGetCourses = async () => {
  let data: Course[] = [];
  try {
    const dbRef = ref(db, "courses");
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      data = Object.values(snapshot.val());
    } else {
      console.warn("Нет доступных курсов");
    }
  } catch (error) {
    console.log(`Ошибка получения данных: ${error}`);
  }
  return data;
};

// Получение курса по ID
export const fetchGetCourse = async (courseID: string) => {
  let data: Course | null = null;
  try {
    const dbRef = ref(db, `courses/${courseID}`);
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      data = snapshot.val();
    } else {
      console.warn("Нет доступных курсов");
    }
  } catch (error) {
    console.log(`Ошибка получения данных: ${error}`);
  }
  return data;
};

// Получение всех курсов конкретного юзера
export const fetchGetCoursesUser = async (userID: string) => {
  let userCourses: UserCourse[] = [];
  let filteredCourses: Course[] = [];
  try {
    const dbRef = ref(db, `users/${userID}/courses`);
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      userCourses = snapshot.val();
      console.log(userCourses);
      const allCourses = await fetchGetCourses();
      // Фильтрация курсов по ID
      filteredCourses = allCourses.filter((course) =>
        userCourses.some((userCourse) => userCourse.course_id === course._id)
      );
    } else {
      console.warn("Нет приобретенных курсов");
    }
  } catch (error) {
    console.log(`Ошибка получения данных: ${error}`);
  }
  return { userCourses, filteredCourses };
};

// Добавление курса в приобретенные к юзеру

export const fetchAddCourseUser = async (
  userID: string,
  courseID: string,
  workouts: {
    workoutsID: string;
    exercises: { name: string; quantity: number }[];
    done: boolean;
  }[]
) => {
  try {
    const dbRef = ref(db, `users/${userID}/courses/${courseID}`);
    await set(dbRef, {
      _id: courseID,
      workouts: workouts,
    });
  } catch (error) {
    console.log(`Ошибка получения данных: ${error}`);
  }
};

// Удаление курса из приобретенных

export const fetchDeleteCourseUser = async (
  userID: string,
  courseID: string
) => {
  try {
    const dbRef = ref(db, `users/${userID}/courses/${courseID}`);
    await remove(dbRef);
  } catch (error) {
    console.log(`Ошибка получения данных: ${error}`);
  }
};

// Добавление прогресса в занятие курса

export const fetchAddProgressCourseUser = async (
  courseID: string,
  progress: number
) => {
  try {
  } catch (error) {
    console.log(`Ошибка получения данных: ${error}`);
  }
};

// Получение списка всех тренировок

export const fetchGetWorkouts = async () => {
  let data: Workout[] = [];
  try {
    const dbRef = ref(db, `workouts`);
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      data = snapshot.val();
    } else {
      console.warn("Нет доступных тренировок");
    }
  } catch (error) {
    console.log(`Ошибка получения данных: ${error}`);
  }
  return data;
};

// Получение списка всех тренировок курса

export const fetchGetWorkoutsCourse = async (userID: string, courseID: string) => {
  let data: Workout[] = [];
  try {
    const dbRef = ref(db, `users/${userID}/courses/${courseID}/workouts`);
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      data = snapshot.val();
    } else {
      console.warn("Нет доступных тренировок");
    }
  } catch (error) {
    console.log(`Ошибка получения данных: ${error}`);
  }
  return data;
};

// Получение данных тренировки по ID

export const fetchGetWorkout = async (workoutID: string) => {
  let data: Workout | null = null;
  try {
    const dbRef = ref(db, `workouts/${workoutID}`);
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      data = snapshot.val();
    } else {
      console.warn("Нет данных о тренировке");
    }
  } catch (error) {
    console.log(`Ошибка получения данных: ${error}`);
  }
  return data;
};

// Получение картинок по пути (свойство img в объекте Course)
export const fetchGetCourseImage = async (src: string) => {
  try {
    const storage = getStorage();
    const storRef = storageRef(
      storage,
      `gs://fitness-pro-72544.appspot.com/${src}`
    );
    const blob = await getBlob(storRef);

    const url = URL.createObjectURL(blob);
    return url;
  } catch (error) {
    console.error("Ошибка получения изображения:", error);
    throw error;
  }
};

// Получение курса пользователя и обновление данных курса, в зависимости от его тренировках и упражнениях

export const fetchDataUser = async (userID: string, courseID: string) => {
  try {
    // получаем курс
    const course = await fetchGetCourse(courseID);
    if (!course) {
      return;
    }
    // получаем тренировки курса
    const workout: string[] = course.workouts;
    // получаем все упражнения
    const fetchWorkout = await fetchGetWorkouts();
    const workoutArray = Object.values(fetchWorkout);
    // отфильтровываем упражнения курса от всех упражнений
    const filterWorkouts = workoutArray.filter((item) =>
      workout.includes(item._id)
    );
    // создаем массив из упражнений, который включает айди тренировки, имя и количество подходов
    const fetchExercises = filterWorkouts
      .map((item) => ({
        workoutsID: item._id,
        exercises: item.exercises.map((i) => ({ name: i.name, quantity: 0 })),
        done: false,
      }))
      .filter((item) => item !== undefined);
    if (fetchExercises.length === 0) {
      console.log("нет доступных разминок");
      return;
    }
    //записываем все необходимые данные для базы данных
    await fetchAddCourseUser(userID, courseID, fetchExercises);
  } catch (error) {
    console.log(error);
  }
};
