type PropsExerciseItem = {
  title: string;
  progress: number;
};

const ExerciseItem = ({ title, progress }: PropsExerciseItem) => {
    return (
        <div className="w-80 h-9 text-left">
        <h3 className="font-[Roboto] text-[18px] leading-[110%] font-normal">{title}0%</h3>
        <input
          value=""
          max="100"
          className="w-full h-[6px] mt-[10px] block"
          {progress}
        />
      </div>
    );
  };
  
  export default ExerciseItem;