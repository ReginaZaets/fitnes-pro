type CourseType = {
  name: string;
  days: number;
  duration: string;
  img: string;
  difficulty: number;
  id: string;
};

export const courses: CourseType[] = [
  {
    name: "Йога",
    days: 25,
    duration: "20-50",
    difficulty: 1,
    img: "../src/assets/courseImg/image 9.png",
    id: "ab1c3f",
  },
  {
    name: "Cтретчинг",
    days: 25,
    duration: "20-50",
    difficulty: 1,
    img: "../src/assets/courseImg/image 5.png",
    id: "kfpq8e",
  },
  {
    name: "Зумба",
    days: 25,
    duration: "20-50",
    difficulty: 1,
    img: "../src/assets/courseImg/Untitled-1 1.png",
    id: "ypox9r",
  },
  {
    name: "Степ-аэробика",
    days: 25,
    duration: "20-50",
    difficulty: 1,
    img: "../src/assets/courseImg//image 7.png",
    id: "6i67sm",
  },
  {
    name: "Бодифлекс",
    days: 25,
    duration: "20-50",
    difficulty: 1,
    img: "../src/assets/courseImg/image 8.png",
    id: "q02a6i",
  },
];
