import { useEffect, useRef, useState } from "react";
import { Exercise } from "../../../types/types";
import { fetchGetExercisesWorkoutUser } from "../../../api/coursesApi";
import { useOnClickOutside } from "../../../context/hooks/useOnClickToCloseModal";

type PropsModal = {
  workoutID: string | undefined;
  setIsWorkoutProgressModal: (value: boolean) => void;
  openWorkoutProgressModal: () => void;
};
const MyProgressModal = ({
  workoutID,
  setIsWorkoutProgressModal,
  openWorkoutProgressModal,
}: PropsModal) => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  // const { id } = useParams<{ id: string }>();
  // const workoutID = id;
  const userID = "uVMizlYTetg0NcshQaZbys1bMQr2";
  const courseID = "ab1c3f";
  console.log(workoutID);

  const modalRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(modalRef, () => {
    setIsWorkoutProgressModal(false);
  });

  const handleClickAddProgress = () => {
    openWorkoutProgressModal();
  };

  useEffect(() => {
    if (workoutID)
      fetchGetExercisesWorkoutUser(userID, courseID, workoutID).then((data) => {
        setExercises(data);
      });
  }, [workoutID, courseID]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 z-10">
      <div
        ref={modalRef}
        className="absolute bg-white border w-[343px] h-[572px] md:w-[425px] md:h-[595.5px] shadow-customShadow rounded-radiusModal p-10"
      >
        <h1 className="text-[32px] leading-[35.2px] ml-[17px] text-black">
          Мой прогресс
        </h1>
        <div className="w-[263px] h-[423px] md:w-[346px] md:h-[432.5px] mt-[34px] md:mt-[48px] ">
          <div className="w-[263px] h-[337px] md:w-[346px] md:h-[346.5px] mt-[34px] md:mt-[48px] overflow-y-auto">
            <div className="w-[263px] h-[337px] md:w-[320px] md:h-[346px] ">
              {exercises &&
                exercises.map((item, index) => {
                  return (
                    <div key={index}>
                      <h1 className="max-w-[237px] md:max-w-[320px] md:text-lg leading-textHeight text-black">
                        {item.name}
                      </h1>
                      <input
                        className="border w-[237px] h-[47px] md:w-[320px] md:h-[52px] rounded-lg mt-[10px] mb-[20px] pl-inputPadding py-4 text-lg leading-textHeight"
                        type="number"
                        name="number"
                        placeholder="0"
                      />
                    </div>
                  );
                })}
            </div>
          </div>
          <button
            onClick={handleClickAddProgress}
            className="w-[263px] md:w-[346px] h-inputHeight border rounded-small bg-btnColor text-lg font-normal text-black leading-textHeight mt-btnModalMargin hover:bg-[#C6FF00] active:bg-[#000000] active:text-[#FFFFFF]"
          >
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyProgressModal;
