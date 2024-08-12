import { exerciseProgress } from "../../lib/exerciseProgress";

type ExerciseItem = {
  name: string;
  quantity: number;
  maxQuantity: number;
};

const ExerciseItem = ({ name, quantity, maxQuantity }: ExerciseItem) => {
  return (
    <div className="w-full h-[55,6px] text-left flex flex-col justify-between">
      <h3 className="font-[Roboto] text-[18px] leading-[110%] font-normal">
        {name} {exerciseProgress(quantity, maxQuantity)}%
      </h3>
      <progress
        value={quantity}
        max={maxQuantity}
        className="w-full h-[6px] mt-[10px] rounded-[30px] block [&::-webkit-progress-bar]:bg-[#F7F7F7] [&::-webkit-progress-value]:bg-[#00C1FF] [&::-moz-progress-bar]:bg-[#00C1FF]"
      />
    </div>
  );
};

export default ExerciseItem;
