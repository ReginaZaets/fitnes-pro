import { UserCourse } from "../types/types";

// Функция подсчета прогресса
export const getCourseProgress = (courseID: string, workouts: [], userCoursesData: UserCourse[]) => {
    // Объявляем переменную для хранения прогресс курса
    let currentProgress = 0;
    // Объявляем переменную для хранения количества тренировок в курсе
    const countWorkouts = workouts.length;
    // Находим массив тренировок из объект курса с полной информацией о тренировках
    const currentWorkouts = userCoursesData.find((course) => {
      return course.course_id === courseID;
    })?.workouts;

    // Объявляем переменную для хранения количества завершенных тренировок в курсе
    let countWorkoutsDone = 0;

    if (currentWorkouts) {
        // Прогоняем массив тренировок в цикле
        // Если тренировка со свойством done = true, увеличиваем на единицу переменную с количеством завершенных тренировок
      for (let workoutDone of currentWorkouts) {
        if (workoutDone.done) {
          countWorkoutsDone += 1;
        }
      }
    }

    currentProgress = (countWorkoutsDone / countWorkouts) * 100;
    return currentProgress;
  };