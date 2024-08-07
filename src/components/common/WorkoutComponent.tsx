import { Link, useParams } from "react-router-dom";
import { Exercise } from "../../lib/exercises";
// import { Workout } from "../../lib/workout";
// import WorkoutItem from "../popups/workoutPopups/WorkoutItem";
import ExerciseItem from "./ExerciseItem";
import { paths } from "../../lib/paths";
import { useEffect, useState } from "react";
import { fetchGetWorkouts } from "../../api/coursesApi";
import { Workout } from "../../types/types";

const WorkoutComponent = () => {
  const NameSelectedCourse = "Йога";
  const workoutNumber = "2";
  const topicWorkout = "Красота и здоровье";
  const titleWorkout = "Йога на каждый день / 2 день";
  const video = "https://www.youtube.com/embed/v-xTLFDhoD0";

  const [allWorkouts, setAllWorkouts] = useState<Workout[]>([]);

  const workoutID = "hfgxlo";

  useEffect(() => {
    fetchGetWorkouts().then((data) => {
      setAllWorkouts(data);
    });
  }, []);

  
  return (
    <main className="max-h-[1262px] flex flex-col justify-start gap-6 md:gap-10 mb-[131px]">
      <div className="max-w-[810px] max-h-[119px] flex flex-col justify-start ">
        <h1 className="font-[Roboto] text-[24px] font-medium text-black md:text-[60px]">
          {NameSelectedCourse}
        </h1>
        <h3 className="font-[Roboto] text-[18px] font-normal md:text-[32px]">
          {topicWorkout} / {titleWorkout}
        </h3>
      </div>
      <div className="h-[0px]  max-w-[1160px] relative pb-[56%] pt-[30px] overflow-hidden rounded-[30px] shadow-[customShadow]">
        <iframe
          className="w-full h-full absolute top-0 left-0"
          src={video}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
      <div className="rounded-[30px] bg-white shadow-[customShadow] w-full max-h-[838px] p-[30px] md:p-10 flex flex-col justify-start items-start ">
        <h2 className="font-[StratosSkyeng, sans-serif] text-[32px] font-normal mb-5">
          Упражнения тренировки {workoutNumber}
        </h2>
        <div className="mb-[40px] max-h-[606px] grid grid-cols-1 gap-x-[60px] gap-y-[24px] md:grid-cols-3 md:gap-y-[20px]">
          {Exercise.map((item) => {
            return (
              <ExerciseItem
                key={item.id}
                name={item.name}
                quantity={item.quantity}
              />
            );
          })}
        </div>
        <Link to={paths.WORKOUT_PROGRESS_MODAL}>
          <button className="w-[283px] md:w-[320px] h-[52px] rounded-[30px] bg-[#BCEC30] font-[Roboto san-serif] text-[18px] font-normal leading-[110%] ">
            <p className="mx-[35px] my-[16px]">Заполнить свой прогресс</p>
          </button>
        </Link>
      </div>
    </main>
  );
};

export default WorkoutComponent;
