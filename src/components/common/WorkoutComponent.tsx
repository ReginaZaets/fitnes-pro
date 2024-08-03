import { Exercise } from "../../lib/exercises";
// import { Workout } from "../../lib/workout";
// import WorkoutItem from "../popups/workoutPopups/WorkoutItem";
import ExerciseItem from "./ExerciseItem";




const WorkoutComponent = () => {

  const NameSelectedCourse = "Йога";
  const workoutNumber = "2";
  const topicWorkout = "Красота и здоровье";
  const titleWorkout = "Йога на каждый день / 2 день";
  const video = "https://www.youtube.com/embed/v-xTLFDhoD0"


  return (
    <main className="flex flex-col justify-start gap-10">
      <div className="w-[810px] h-[119px] flex flex-col justify-start">
        <h1 className="font-[Roboto] text-[60px] font-medium text-black ">
        {NameSelectedCourse}
        </h1>
        <h3 className="font-[Roboto] text-[32px] font-normal">
          {topicWorkout} / {titleWorkout}
        </h3>
      </div>
      <div className="aspect-w-16 aspect-h-9 relative max-h-[639px] w-full overflow-hidden rounded-[30px] shadow-[customShadow]">
      <iframe
          width="1160"
          height="639"
          src={video}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
      ></iframe>
      </div>
      <div className="rounded-[30px] bg-white shadow-[customShadow] w-full h-[395px] p-10 flex flex-col justify-start items-start">
        <h2 className="font-[StratosSkyeng, sans-serif] text-[32px] font-normal mb-5">
          Упражнения тренировки {workoutNumber}
        </h2>
        <div className="mb-[40px] h-[168px] grid grid-cols-1 gap-x-[60px] gap-y-[24px] md:grid-cols-3 md:gap-y-[20px]">
            {Exercise.map((item) => {
              return(<ExerciseItem title={item.title} progress={item.progress} />)
            })}     
        </div>
        <button className="w-[320px] h-[52px] rounded-[30px] bg-[#BCEC30] font-[Roboto san-serif] text-[18px] font-medium leading-[110%]">
          <p className="mx-[37px] my-[16px]">Заполнить свой прогресс</p>
        </button>
      </div>
    </main>
  );
};

export default WorkoutComponent;
