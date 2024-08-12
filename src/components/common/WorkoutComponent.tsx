import { Link, useParams } from "react-router-dom";
// import { Exercise } from "../../lib/exercises";
import ExerciseItem from "./ExerciseItem";
import { paths } from "../../lib/paths";
import { useEffect, useState } from "react";
import {
  fetchGetExercisesWorkoutUser,
  fetchGetWorkout,
} from "../../api/coursesApi";
import { Exercise, Workout } from "../../types/types";

const WorkoutComponent = () => {
  const { id } = useParams<{ id: string }>();
  const workoutID = id;
  console.log(workoutID);

  const NameSelectedCourse = "Йога";

  // const workoutID = "hfgxlo";
  const userID = "SjButaRUOBNfpLRxzMjCSvUTowd2";
  const courseID = "ab1c3f";

  const [workout, setWorkout] = useState<Workout | null>(null);
  const [exercises, setExercises] = useState<Exercise[]>([]);

  useEffect(() => {
    if (workoutID) {
      fetchGetWorkout(workoutID).then((data) => {
        setWorkout(data);
      });
    }
  }, []);

  console.log(workout);

  useEffect(() => {
    if (workoutID)
      fetchGetExercisesWorkoutUser(userID, courseID, workoutID).then((data) => {
        setExercises(data);
      });
  }, []);

  console.log(exercises);

  // const exercises: Exercise[] | undefined = workout?.exercises;

  return (
    <main className="max-h-[1262px] flex flex-col justify-start gap-6 md:gap-10 mb-[131px]">
      <div className="max-w-[810px] max-h-[175px] flex flex-col justify-start ">
        <h1 className="font-[Roboto] text-[24px] font-medium text-black md:text-[60px]">
          {NameSelectedCourse}
        </h1>
        <h3 className="font-[Roboto] text-[18px] font-normal md:text-[32px]">
          {workout?.name}
        </h3>
      </div>
      <div className="h-[0px]  max-w-[1160px] relative pb-[56%] pt-[30px] overflow-hidden rounded-[30px] shadow-[customShadow]">
        <iframe
          className="w-full h-full absolute top-0 left-0"
          src={workout?.video}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
      <div className="rounded-[30px] bg-white shadow-[0_4px_67px_-12px_rgba(0,0,0,0.13)] w-full max-h-[838px] p-[30px] md:p-10 flex flex-col justify-start items-start ">
        <h2 className="font-[StratosSkyeng, sans-serif] text-[32px] font-normal mb-5">
          Упражнения тренировки
        </h2>
        <div className="mb-[40px] max-h-[606px] grid grid-cols-1 gap-x-[60px] gap-y-[24px] md:grid-cols-3 md:gap-y-[20px]">
          {exercises &&
            workout &&
            exercises.map((item, index) => {
              return (
                <ExerciseItem
                  key={index}
                  name={item.name}
                  quantity={item.quantity}
                  maxQuantity={workout?.exercises[index].quantity}
                />
              );
            })}
        </div>
        <Link to={paths.WORKOUT_PROGRESS_MODAL}>
          <button className="w-[251px] md:w-[320px] h-[52px] rounded-[30px] bg-[#BCEC30] font-[Roboto san-serif] text-[18px] font-normal leading-[110%] ">
            <p className="mx-[20px] my-[16px]">Заполнить свой прогресс</p>
          </button>
        </Link>
      </div>
    </main>
  );
};

export default WorkoutComponent;
