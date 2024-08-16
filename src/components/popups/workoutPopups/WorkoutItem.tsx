import { useNavigate } from "react-router-dom";

type PropsWorkoutItem = {
  title: string;
  done: boolean;
  courseID: string;
  workoutID: string;
};
const WorkoutItem = ({
  title,
  done,
  courseID,
  workoutID,
}: PropsWorkoutItem) => {
  const navigate = useNavigate();

  const parts = title.split("/");

  const firstParts = parts[0] || "";
  const secondParts = parts.slice(1).join("/");

  const clickModalWorkout = (e: React.MouseEvent<HTMLLabelElement>) => {
    e.preventDefault();
    navigate(`/profile/${courseID}/workout/${workoutID}`);
  };

  return (
    <label
      onClick={clickModalWorkout}
      className="flex items-center border-b-2 border-[#C4C4C4] w-[258px] h-auto  xl:w-[354px] py-[10px]"
    >
      <img
        src={done ? "/icones/check.svg" : "/icones/Ellipse.svg"}
        alt={done ? "check" : "Ellipse"}
      />
      <div className="flex flex-col justify-center ml-[10px] w-[223px] h-auto  xl:w-[354px] xl:h-[74px]  cursor-pointer">
        <h1 className="text-lg xl:text-2xl leading-[19.8px] xl:leading-[26.4px]">
          {firstParts}
        </h1>
        {secondParts && (
          <p className="text-sm xl:text-base leading-[15.4px] xl:leading-[17.6px] mt-[10px]">
            {secondParts}
          </p>
        )}
      </div>
    </label>
  );
};

export default WorkoutItem;
