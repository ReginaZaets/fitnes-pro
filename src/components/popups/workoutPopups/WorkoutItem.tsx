type PropsWorkoutItem = {
  title: string;
};
const WorkoutItem = ({ title }: PropsWorkoutItem) => {
  //будет состояние, которое изменит иконку на выполненную /icones/check.svg
  const parts = title.split("/");

  const firstParts = parts[0] || "";
  const secondParts = parts.slice(1).join("/");

  return (
    <label className="flex items-center border-b-2 border-[#C4C4C4] w-[354px] py-[10px]">
      <img src="/icones/Ellipse.svg" alt="ellipse" />
      <div className="flex flex-col justify-center ml-[10px] w-[354px] h-[74px]">
        <h1 className=" text-2xl leading-[26.4px]">{firstParts}</h1>
        {secondParts && (
          <p className="text-base leading-[17.6px] mt-[10px]">{secondParts}</p>
        )}
      </div>
    </label>
  );
};

export default WorkoutItem;
