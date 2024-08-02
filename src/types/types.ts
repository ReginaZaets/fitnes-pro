// Типизация для объекта курса
export type Course = {
  _id: string;
  nameRU: string;
  nameEN: string;
  description: string;
  directions: [];
  fitting: [];
  order: number;
  workouts: [];
  //Нужно изображение
};

// Типизация для объекта тренировки
export type Workout = {
  _id: string;
  exercises: Exercise[];
  name: string;
  video: string;
}

// Типизация для объекта упражнения
export type Exercise = {
  name: string;
  quantity: number;
}