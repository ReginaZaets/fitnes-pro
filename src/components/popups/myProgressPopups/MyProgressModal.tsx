import { useEffect, useState } from "react";
import MyProgressDone from "./MyProgressDone";
import { Exercise } from "../../../types/types";
import {
  fetchAddProgressExercisesCourseUser,
  fetchAddProgressWorkoutCourseUser,
  fetchGetExercisesWorkoutUser,
} from "../../../api/coursesApi";
import { useUserContext } from "../../../context/hooks/useUser";
import { workoutProgress } from "../../../lib/workoutProgress";

const MyProgressModal = ({
  courseID,
  workoutID,
  onProgressUpdated,
  toggleModalAddProgress,
  exercisesDefault,
}: {
  courseID: string | undefined;
  workoutID: string | undefined;
  onProgressUpdated: () => void;
  toggleModalAddProgress: () => void;
  exercisesDefault: Exercise[];
}) => {
  const user = useUserContext();
  const [isOpenedMyProgressModal, setIsOpenedMyProgressModal] =
    useState<boolean>(true);
  const [isOpenedMyProgressDone, setIsOpenedMyProgressDone] =
    useState<boolean>(false);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [inputValues, setInputValues] = useState<{ [key: number]: number }>({});

  // Обработка изменения значения инпута
  const handleInputChange = (index: number, value: number) => {
    setInputValues((prev) => ({ ...prev, [index]: value }));
  };

  const handleClickAddProgress = () => {
    const progress: Exercise[] = exercises.map((item, index) => ({
      ...item,
      quantity: inputValues[index] || 0, // Используем значение из состояния или 0, если значение отсутствует
    }));
    // Вызываем функцию подсчета прогресса тренировки и передаем в нее прогресс всех упражнений и дефлотный массив упражнений по данной тренировке
    const isDoneWorkout = workoutProgress(progress, exercisesDefault);

    if (user && courseID && workoutID) {
      fetchAddProgressExercisesCourseUser(
        user?.uid,
        courseID,
        workoutID,
        progress
      ).finally(() => {
        onProgressUpdated();
        toggleModalAddProgress();
        setIsOpenedMyProgressDone(true);
        isDoneWorkout &&
          fetchAddProgressWorkoutCourseUser(
            user?.uid,
            courseID,
            workoutID,
            isDoneWorkout
          );
      });
    }
  };

  useEffect(() => {
    if (user && courseID && workoutID)
      fetchGetExercisesWorkoutUser(user?.uid, courseID, workoutID).then(
        (data) => {
          setExercises(data);
          // Инициализируем состояние значений инпутов
          const initialValues: { [key: number]: number } = {};
          data.forEach((exercise, index) => {
            initialValues[index] = exercise.quantity || 0; // Инициализируем значением из данных или 0, если данных нет
          });
          setInputValues(initialValues);
        }
      );
  }, []);

  return (
    <>
      {isOpenedMyProgressModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 z-10">
          <div className="absolute bg-white border w-[343px] h-[572px] md:w-[425px] md:h-[595.5px] shadow-customShadow rounded-radiusModal p-10">
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
                            name={`exerciseQuantity${index}`}
                            placeholder="0"
                            value={inputValues[index] || ""}
                            onChange={(e) =>
                              handleInputChange(index, Number(e.target.value))
                            }
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
          <button
            onClick={handleClickAddProgress}
            className="w-[263px] md:w-[346px] h-inputHeight border rounded-small bg-btnColor text-lg font-normal text-black leading-textHeight mt-btnModalMargin hover:bg-[#C6FF00] active:bg-[#000000] active:text-[#FFFFFF]"
          >
            Сохранить
          </button>
        </div>
      )}
      {isOpenedMyProgressDone && <MyProgressDone />}
    </>
  );
};

export default MyProgressModal;
