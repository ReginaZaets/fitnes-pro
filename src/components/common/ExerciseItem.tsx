type PropsExerciseItem = {
    title: string;
    progress: number;
  };

const ExerciseItem = ({ title, progress }: PropsExerciseItem) => {
    return (
        <div className="w-[330px] h-[36px] text-left flex flex-col">
        <h3 className="font-[Roboto] text-[18px] leading-[110%] font-normal">{title} {progress}%</h3>
        <progress
          value={progress}
          max="100"
          className="w-full h-[6px] mt-[10px] block [&::-webkit-progress-bar]:bg-[#F7F7F7] [&::-webkit-progress-value]:bg-blue-400 [&::-moz-progress-bar]:bg-[#00C1FF]"
        />
      </div>
    );
  };
  
  export default ExerciseItem;