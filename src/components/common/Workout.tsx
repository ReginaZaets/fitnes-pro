
// import { Exercise } from "../../lib/exercises";
// import ExerciseItem from "./ExerciseItem";

const Workout = () => {
  return (
    <div className="pl-[calc(50%-580px)] pr-[calc(50%-580px)] h-[1213px] flex flex-col justify-start items-start gap-10">
      <div className="w-[810px] h-[119px] flex flex-col justify-start">
        <h1 className="font-[Roboto] text-[60px] font-medium text-black pb-6">
          Йога
        </h1>
        <h3 className="font-[Roboto] text-[32px] font-normal">
          Красота и здоровье / Йога на каждый день / 2 день
        </h3>
      </div>
      <div className="aspect-w-16 aspect-h-9 relative max-h-[639px] w-full overflow-hidden rounded-[30px] shadow-[customShadow]">
      <iframe
          width="1160"
          height="639"
          src=""
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
      ></iframe>
      </div>
      <div className="rounded-[30px] bg-white shadow-[customShadow] w-full h-[375px] p-10 flex flex-col justify-start items-start">
        <h2 className="font-[StratosSkyeng] text-[32px] font-normal mb-5">
          Упражнения тренировки 2
        </h2>
        <div className="mb-[40px] grid grid-cols-1 gap-x-[60px] gap-y-[24px] md:grid-cols-3 md:gap-y-[20px]">
          
            {/* {Exercise.map((item) => {
              return(<ExerciseItem title={item.title} progress={item.progress} />)
            })} */}

            <div className="w-80 h-9 text-left flex flex-col">
              <h3 className="font-[Roboto] text-[18px] leading-[110%] font-normal">Наклоны вперед 0%</h3>
              <progress
                value="40"
                max="100"
                className="w-full h-[6px] mt-[10px] block [&::-webkit-progress-bar]:bg-[#F7F7F7] [&::-webkit-progress-value]:bg-blue-400 [&::-moz-progress-bar]:bg-[#00C1FF]"
                />
            </div>
            <div className="w-80 h-9 text-left flex flex-col">
              <h3 className="font-[Roboto] text-[18px] leading-[110%] font-normal">Наклоны назад 0%</h3>
              <progress
                value="80"
                max="100"
                className="w-full h-[6px] mt-[10px] block [&::-webkit-progress-bar]:bg-[#F7F7F7] [&::-webkit-progress-value]:bg-blue-400 [&::-moz-progress-bar]:bg-[#00C1FF]"
              />
            </div>
            <div className="w-80 h-9 text-left flex flex-col">
              <h3 className="font-[Roboto] text-[18px] leading-[110%] font-normal">Поднятие ног, согнутых в коленях 0%</h3>
              <progress
                value="40"
                max="100"
                className="w-full h-[6px] mt-[10px] block [&::-webkit-progress-bar]:bg-[#F7F7F7] [&::-webkit-progress-value]:bg-blue-400 [&::-moz-progress-bar]:bg-[#00C1FF]"
              />
            </div>

            <div className="w-80 h-9 text-left flex flex-col">
              <h3 className="font-[Roboto] text-[18px] leading-[110%] font-normal">Наклоны вперед 0%</h3>
              <progress
                value="30"
                max="100"
                className="w-full h-[6px] mt-[10px] block [&::-webkit-progress-bar]:bg-[#F7F7F7] [&::-webkit-progress-value]:bg-blue-400 [&::-moz-progress-bar]:bg-[#00C1FF]"
              />
            </div>
            <div className="w-80 h-9 text-left flex flex-col">
              <h3 className="font-[Roboto] text-[18px] leading-[110%] font-normal">Наклоны назад 0%</h3>
              <progress
                value="5"
                max="100"
                className="w-full h-[6px] mt-[10px] block [&::-webkit-progress-bar]:bg-[#F7F7F7] [&::-webkit-progress-value]:bg-blue-400 [&::-moz-progress-bar]:bg-[#00C1FF]"
              />
            </div>
            <div className="w-80 h-9 text-left flex flex-col">
              <h3 className="font-[Roboto] text-[18px] leading-[110%] font-normal">Поднятие ног, согнутых в коленях 0%</h3>
              <progress
                value="50"
                max="100"
                className="w-full h-[6px] mt-[10px] block [&::-webkit-progress-bar]:bg-[#F7F7F7] [&::-webkit-progress-value]:bg-blue-400 [&::-moz-progress-bar]:bg-[#00C1FF]"
              />
            </div>

            <div className="w-80 h-9 text-left flex flex-col">
              <h3 className="font-[Roboto] text-[18px] leading-[110%] font-normal">Наклоны вперед 0%</h3>
              <progress
                value="20"
                max="100"
                className="w-full h-[6px] mt-[10px] block [&::-webkit-progress-bar]:bg-[#F7F7F7] [&::-webkit-progress-value]:bg-blue-400 [&::-moz-progress-bar]:bg-[#00C1FF]"
              />
            </div>
            <div className="w-80 h-9 text-left flex flex-col">
              <h3 className="font-[Roboto] text-[18px] leading-[110%] font-normal">Наклоны назад 0%</h3>
              <progress
                value="15"
                max="100"
                className="w-full h-[6px] mt-[10px] block [&::-webkit-progress-bar]:bg-[#F7F7F7] [&::-webkit-progress-value]:bg-blue-400 [&::-moz-progress-bar]:bg-[#00C1FF]"
              />
            </div>
            <div className="w-80 h-9 text-left flex flex-col">
              <h3 className="font-[Roboto] text-[18px] leading-[110%] font-normal">Поднятие ног, согнутых в коленях 0%</h3>
              <progress
                value="60"
                max="100"
                className="w-full h-[6px] mt-[10px] block [&::-webkit-progress-bar]:bg-[#F7F7F7] [&::-webkit-progress-value]:bg-blue-400 [&::-moz-progress-bar]:bg-[#00C1FF]"
              />
            </div>
              
        </div>
        <button className="rounded-[30px] bg-[#BCEC30] text-[18px] font-normal leading-[110%]">
          <p className="mx-[37px] my-[16px]">Заполнить свой прогресс</p>
        </button>
      </div>
    </div>
  );
};

export default Workout;
