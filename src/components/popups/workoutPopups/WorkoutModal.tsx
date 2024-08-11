import WorkoutItem from "./WorkoutItem";
import { fetchGetWorkoutsCourse } from "../../../api/coursesApi";
import { useUserContext } from "../../../context/hooks/useUser";
import { useEffect, useState } from "react";
import { Course } from "../../../types/types";

const WorkoutModal = ({ course }: { course: Course }) => {
  const [userWorkout, setUserWorkout] = useState<any[]>([]);
  const user = useUserContext();
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

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 z-10">
      <div className="absolute bg-white border w-auto max-w-lg h-auto shadow-customShadow rounded-radiusModal p-10">
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
