import { get, ref } from "firebase/database";
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
      //console.log(userCourses);
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

export const fetchAddCourseUser = async (courseID: string) => {
  try {
  } catch (error) {
    console.log(`Ошибка получения данных: ${error}`);
  }
};

// Удаление курса из приобретенных

export const fetchDeleteCourseUser = async (courseID: string) => {
  try {
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
