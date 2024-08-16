import { Exercise } from "../types/types";

export const workoutProgress = (
  progress: Exercise[],
  exercisesDefault: Exercise[]
) => {
  // Объявляем переменную, которая будет показывать выполнена ли тренировка или нет
  let isDoneWorkout: boolean = false;
  // Объявляем переменную, которая будет фиксировать количество выполненных упражнений в тренировке
  let countExerciseProgressDone = 0;
  // Сравниваем в цикле полученный прогресс от пользователя в progress с максимальными значениями по каждому упражнения из exercisesDefault
  for (let index = 0; index < exercisesDefault.length; index++) {
    if (progress[index].quantity >= exercisesDefault[index].quantity) {
      // Если прогресс равен или превышает максимальное значение, необходимое по данной тренировке, увеличиваем на единицу количество выполненных упражнений
      countExerciseProgressDone++;
    }
  }
  // После цикла сравниваем количество упражнений в тренировке с количеством выполненных упражнений
  if (exercisesDefault.length === countExerciseProgressDone) {
    // Если условие выполняется, значит тренировка выполнена
    isDoneWorkout = true;
  }

  console.log(isDoneWorkout);

  return isDoneWorkout;
};
