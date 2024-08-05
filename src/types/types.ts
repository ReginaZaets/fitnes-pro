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
  img: string;
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

// Типизация для объекта пользователя
export type User = {
  _uid: string;
  name: string;
  email: string;
  courses: UserCourse[];
}

// Типизация для объекта курса пользователя
export type UserCourse = {
  course_id: string;
  workouts: UserCourseWorkout[];
}

// Типизация для объекта тренировки пользовательского курса
export type UserCourseWorkout = {
  _id: string;
  exercises: Exercise[];
  done: boolean;
}