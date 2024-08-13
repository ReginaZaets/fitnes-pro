import WorkoutItem from "./WorkoutItem";
import { fetchGetWorkoutsCourse } from "../../../api/coursesApi";
import { useUserContext } from "../../../context/hooks/useUser";
import { useEffect, useRef, useState } from "react";
import { Course } from "../../../types/types";
import { useOnClickOutside } from "../../../context/hooks/useOnClickToCloseModal";
import { useLocation } from "react-router-dom";

const WorkoutModal = ({
  course,
  setClickModal,
}: {
  course: Course;
  setClickModal: (state: boolean) => void;
}) => {
  const [userWorkout, setUserWorkout] = useState<any[]>([]);

  const modalRef = useRef<HTMLDivElement>(null);
  const user = useUserContext();
  const location = useLocation();

  useOnClickOutside(modalRef, () => {
    setClickModal(false);
  });

  useEffect(() => {
    console.log("User:", user);
    console.log("Course:", course);
    const userData = async () => {
      if (user && course) {
        const getWorkout = await fetchGetWorkoutsCourse(user.uid, course._id);
        console.log(getWorkout);
        setUserWorkout(getWorkout);
      }
    };
    userData();
  }, [user, course]);
  if (!location.pathname.startsWith("/profile")) {
    return null;
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 z-10">
      <div
        ref={modalRef}
        className="absolute bg-white border w-auto max-w-lg h-auto shadow-customShadow rounded-radiusModal p-10"
      >
        <h1 className="text-[32px] leading-[35.2px] ml-[17px]">
          Выберите тренировку
        </h1>
        <div className="w-[380px] h-[360px] mt-[48px] overflow-y-auto">
          {userWorkout.map((item, index) => {
            return <WorkoutItem key={index} title={item.name} />;
          })}
        </div>
        {/* <button className="w-[380px] h-inputHeight border rounded-small bg-btnColor text-lg font-normal text-black leading-textHeight mt-btnModalMargin hover:bg-[#C6FF00] active:bg-[#000000] active:text-[#FFFFFF]">
          Начать
        </button> */}
      </div>
    </div>
  );
};

export default WorkoutModal;
