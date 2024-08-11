import { get, ref, remove, set } from "firebase/database";
import { db } from "./firebaseConfig";
import {
  Course,
  UserCourse,
  Exercise,
  UserCourseWorkout,
  Workout,
} from "../types/types";
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
      console.log(Object.values(userCourses));
      const allCourses = await fetchGetCourses();
      console.log(allCourses);
      // Фильтрация курсов по ID
      filteredCourses = allCourses.filter((course) =>
        Object.keys(userCourses).some((userCourse) => userCourse === course._id)
      );
    } else {
      console.warn("Нет приобретенных курсов");
    }
  } catch (error) {
    console.log(`Ошибка получения данных: ${error}`);
  }
  return { userCourses, filteredCourses };
};

// // Получение данных по упражнениям пользователя из отдельной тренировки
export const fetchGetExercisesWorkoutUser = async (
  userID: string,
  courseID: string,
  workoutID: string
) => {
  let exercises: Exercise[] = [];
  try {
    const dbRef = ref(
      db,
      `users/${userID}/courses/${courseID}/workouts/${workoutID}/exercises`
    );
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      exercises = snapshot.val();
      //console.log(exercises);
    } else {
      console.warn("В тренировки нет упражнений");
    }
  } catch (error) {
    console.log(`Ошибка получения данных: ${error}`);
  }
  return exercises;
};

// Добавление курса в приобретенные к юзеру
export const fetchAddCourseUser = async (
  userID: string,
  courseID: string,
  workouts: UserCourseWorkout[]
) => {
  try {
    // Запись данных в базу
    const dbRef = ref(db, `users/${userID}/courses/${courseID}`);
    await set(dbRef, {
      _id: courseID,
      workouts: workouts,
    });
  } catch (error) {
    console.error("Ошибка получения данных:", error);
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

// Добавление прогресса в тренировку курса

export const fetchAddProgressWorkoutCourseUser = async (
  userID: string,
  courseID: string,
  workoutID: string,
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

export const fetchGetWorkoutsCourse = async (
  userID: string,
  courseID: string
) => {
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
    if (!course) return;

    // получаем тренировки курса
    const workout: string[] = course.workouts;
    console.log(workout);
    // получаем все упражнения
    const fetchWorkout = await fetchGetWorkouts();
    const workoutArray = Object.values(fetchWorkout);
    // отфильтровываем упражнения курса от всех упражнений и сортурем по индексу

    const filterWorkouts = workoutArray
      .filter((item) => workout.includes(item._id))
      .sort(
        (a, b) =>
          workout.findIndex((id) => id === a._id) -
          workout.findIndex((id) => id === b._id)
      );

    console.log(filterWorkouts);
    // создаем массив из упражнений, который включает айди тренировки, имя и количество подходов
    const fetchExercises = filterWorkouts.map((item) => {
      return {
        _id: item._id,
        exercises: item.exercises
          ? item.exercises.map((i) => ({ name: i.name, quantity: 0 }))
          : [],
        done: false,
        name: item.name,
      };
    });

    console.log(fetchExercises);
    //записываем все необходимые данные для базы данных
    await fetchAddCourseUser(userID, courseID, fetchExercises);
  } catch (error) {
    console.log(error);
  }
};
