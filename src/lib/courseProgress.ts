import { UserCourse } from "../types/types";

// Функция подсчета прогресса
export const getCourseProgress = (
  courseID: string,
  workouts: string[],
  userCoursesData: UserCourse[]
) => {
  // Объявляем переменную для хранения прогресс курса
  let currentProgress = 0;
  // Объявляем переменную для хранения количества тренировок в курсе
  const countWorkouts = workouts.length;
  const userCoursesDataArray = Object.values(userCoursesData);

  // Находим массив тренировок из объект курса с полной информацией о тренировках
  const currentWorkouts = userCoursesDataArray.find((course) => {
    return course._id === courseID;
  })?.workouts;

  // Объявляем переменную для хранения количества завершенных тренировок в курсе
  let countWorkoutsDone = 0;

  if (currentWorkouts) {
    // Прогоняем объект тренировок в цикле
    // Если тренировка со свойством done = true, увеличиваем на единицу переменную с количеством завершенных тренировок
    for (let workoutKey in currentWorkouts) {
      if (currentWorkouts[workoutKey].done) {
        countWorkoutsDone += 1;
      }
    }
  }

  currentProgress = Math.round((countWorkoutsDone / countWorkouts) * 100);
  return currentProgress;
};
