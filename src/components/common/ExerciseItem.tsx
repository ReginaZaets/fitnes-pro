// type PropsExerciseItem = {
//   title: string;
//   progress: number;
// };

import { Exercise } from "../../types/types";

const ExerciseItem = ({ name, quantity }: Exercise) => {
  return (
    <div className="w-full h-full text-left ">
      <h3 className="font-[Roboto] text-[18px] leading-[110%] font-normal">
        {name} {quantity}%
      </h3>
      <progress
        value={quantity}
        max="100"
        className="w-full h-[6px] mt-[10px] rounded-[30px] block [&::-webkit-progress-bar]:bg-[#F7F7F7] [&::-webkit-progress-value]:bg-[#00C1FF] [&::-moz-progress-bar]:bg-[#00C1FF]"
      />
    </div>
  );
};

export default ExerciseItem;
