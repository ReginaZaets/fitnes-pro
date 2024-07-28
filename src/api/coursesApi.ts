import { get, ref } from "firebase/database";
import { db } from "./firebaseConfig";
import { Course } from "../types/types";

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