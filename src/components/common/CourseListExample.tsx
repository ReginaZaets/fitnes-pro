import { get, getDatabase, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { app } from "../../firebaseConfig";
import { Course } from "../../types/types";

const CourseListExample = () => {
  const [courseArray, setCourseArray] = useState<Course[]>([]);

  const fetchCourseList = async () => {
    const db = getDatabase(app);
    const dbRef = ref(db, "courses");
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      setCourseArray(Object.values(snapshot.val()));
    }
  };

  useEffect(() => {
    fetchCourseList();
  }, []);

  return (
    <div>
      <div>Курсы</div>
      {courseArray.map((course) => (
        <li key={course._id}>{course.nameRU}</li>
      ))}
    </div>
  );
};

export default CourseListExample;
