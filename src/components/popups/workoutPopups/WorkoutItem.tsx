type PropsWorkoutItem = {
  topic: string;
  title: string;
};
const WorkoutItem = ({ topic, title }: PropsWorkoutItem) => {
  //будет состояние, которое изменит иконку на выполненную /icones/check.svg
  return (
    <label className="flex items-center border-b-2 border-[#C4C4C4] w-[354px] mb-[10px]">
      <img src="/icones/Ellipse.svg" alt="ellipse" />
      <div className="ml-[10px] w-[354px] h-[64px]">
        <h1 className=" text-2xl leading-[26.4px]">{topic}</h1>
        <p className="text-base leading-[17.6px] mt-[10px]">{title}</p>
      </div>
    </label>
  );
};

export default WorkoutItem;
