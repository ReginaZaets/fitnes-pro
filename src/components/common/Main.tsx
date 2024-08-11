import { useEffect, useState } from "react";
import { CourseCard } from "./CourseCard";
import { fetchGetCourses, fetchGetCoursesUser } from "../../api/coursesApi";
import { Course, UserCourse } from "../../types/types";
import { getCourseProgress } from "../../lib/courseProgress";

export const Main = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [courses, setCourses] = useState<Course[]>([]);
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await fetchGetCourses();
        setCourses(data);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCourses();
  }, []);

  return (
    <>
      <div className="flex gap-[5px] font-normal  text-2xl items-center my-4 w-full">
        <div className=" w-[947px] h-[120px] text-black text-[60px] font-medium leading-[60px] text-left">
          Начните заниматься спортом и улучшите качество жизни
        </div>
        <div className="relative max-w-xs p-3 bg-[#BCEC30] text-black rounded-lg w-[288px] flex items-center ">
          <div className="absolute top-[88%]  rotate-45 w-0 h-0 border-l-[10px] border-r-[10px] border-t-[30px] border-l-transparent border-r-transparent border-t-[#BCEC30] "></div>{" "}
          <p>Измени своё тело за полгода!</p>
        </div>
      </div>
      {isLoading ? (
        <div className="w-full flex justify-center">
          <div
            className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-black"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        </div>
      ) : (
        <div className="flex flex-row flex-wrap items-center gap-[40px]">
          {courses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      )}
      <section className="mt-[20px] mb-[20px] flex justify-center">
        <button
          onClick={() => {
            window.scrollTo(0, 0);
          }}
          className="bg-[#BCEC30] w-[127px] h-[52px] rounded-[46px] font-medium text-lg items-center flex justify-center"
        >
          Наверх ↑
        </button>
      </section>
    </>
  );
};
