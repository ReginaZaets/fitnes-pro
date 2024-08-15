import { Link } from "react-router-dom";

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

  const parts = title.split("/");

  const firstParts = parts[0] || "";
  const secondParts = parts.slice(1).join("/");

  return (
    <label className="flex items-center border-b-2 border-[#C4C4C4]  w-[354px] py-[10px]">
      <img
        src={done ? "/icones/check.svg" : "/icones/Ellipse.svg"}
        alt={done ? "check" : "ellipse"}
      />
      <div className="flex flex-col justify-center ml-[10px] w-[354px] h-[74px]  cursor-pointer">
        <Link to={`/profile/${courseID}/workout/${workoutID}`}>
          <h1 className=" text-2xl leading-[26.4px]">{firstParts}</h1>
          {secondParts && (
            <p className="text-base leading-[17.6px] mt-[10px]">
              {secondParts}
            </p>
          )}
        </Link>
      </div>
    </label>
  );
};

export default WorkoutItem;
