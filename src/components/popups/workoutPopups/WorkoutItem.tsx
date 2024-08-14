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

  const handleClickPageWorkout = () => {
    navigate(`/profile/${courseID}/workout/${workoutID}`);
  };

  return (
    <label className="flex items-center border-b-2 border-[#C4C4C4] w-[354px] py-[10px]">
      <img
        src={done ? "/icones/check.svg" : "/icones/ellipse.svg"}
        alt={done ? "check" : "ellipse"}
      />
      <div
        onClick={handleClickPageWorkout}
        className="flex flex-col justify-center ml-[10px] w-[354px] h-[74px]"
      >
        <h1 className=" text-2xl leading-[26.4px]">{firstParts}</h1>
        {secondParts && (
          <p className="text-base leading-[17.6px] mt-[10px]">{secondParts}</p>
        )}
      </div>
    </label>
  );
};

export default WorkoutItem;
