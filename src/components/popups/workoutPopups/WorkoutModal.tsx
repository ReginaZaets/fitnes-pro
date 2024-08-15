import WorkoutItem from "./WorkoutItem";
import { fetchGetWorkoutsCourse } from "../../../api/coursesApi";
import { useUserContext } from "../../../context/hooks/useUser";
import { useEffect, useRef, useState } from "react";
import { Course } from "../../../types/types";
import { useOnClickOutside } from "../../../context/hooks/useOnClickToCloseModal";
import { useUserCoursesContext } from "../../../context/hooks/useUserCourses";

const WorkoutModal = ({
  course,
  setClickModal,
}: {
  course: Course;
  setClickModal: (state: boolean) => void;
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const user = useUserContext();
  const { workoutUsers, setWorkoutUsers } = useUserCoursesContext();
  // Добавляем флаг для отображения загрузки
  const [isLoading, setIsLoading] = useState(true);

  useOnClickOutside(modalRef, () => {
    setClickModal(false);
  });

  useEffect(() => {
    const userData = async () => {
      if (user && course) {
        fetchGetWorkoutsCourse(user.uid, course._id).then((data) => {
          setWorkoutUsers(data);
          setIsLoading(false);
        });
      }
    };
    userData();
  }, [user, course]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 z-10 transition-opacity duration-300">
      <div
        ref={modalRef}
        className="absolute bg-white border xl:p-10 p-[30px] w-auto h-auto xl:w-[460px] xl:h-[590x] shadow-customShadow rounded-radiusModal"
      >
        <h1 className="text-[32px] leading-[35.2px] xl:ml-[17px] xl:w-[346px] w-[283px]">
          Выберите тренировку
        </h1>
        <div className=" xl:mt-[48px] mt-[34px] w-auto h-auto  xl:w-[380px] xl:h-[400px] overflow-y-auto">
          {workoutUsers &&
            workoutUsers.map((item) => {
              return (
                <WorkoutItem
                  key={item._id}
                  title={item.name}
                  done={item.done}
                  courseID={course._id}
                  workoutID={item._id}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default WorkoutModal;
