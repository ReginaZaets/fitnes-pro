import { Workout } from "../../../lib/workout";
import WorkoutItem from "./WorkoutItem";

const WorkoutModal = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 z-10">
      <div className="absolute bg-white border w-auto max-w-lg h-auto shadow-customShadow rounded-radiusModal p-10">
        <h1 className="text-[32px] leading-[35.2px] ml-[17px]">
          Выберите тренировку
        </h1>
        <div className="w-[380px] h-[360px] mt-[48px] overflow-y-auto">
          {Workout.map((item) => {
            return <WorkoutItem title={item.title} topic={item.topic} />;
          })}
        </div>
        <button className="w-[380px] h-inputHeight border rounded-small bg-btnColor text-lg font-normal text-black leading-textHeight mt-btnModalMargin hover:bg-[#C6FF00] active:bg-[#000000] active:text-[#FFFFFF]">
          Начать
        </button>
      </div>
    </div>
  );
};

export default WorkoutModal;
