import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ExerciseItem from "./ExerciseItem";
import {
  fetchAddProgressWorkoutCourseUser,
  fetchGetCoursesUser,
  fetchGetExercisesWorkoutUser,
  fetchGetWorkout,
} from "../../api/coursesApi";
import { Exercise, Workout } from "../../types/types";
import MyProgressModal from "../popups/myProgressPopups/MyProgressModal";
import { useUserContext } from "../../context/hooks/useUser";
import { useUserCoursesContext } from "../../context/hooks/useUserCourses";
import { paths } from "../../lib/paths";
import MyProgressDone from "../popups/myProgressPopups/MyProgressDone";

const WorkoutComponent = () => {
  const user = useUserContext();
  const { coursesUserDefault, setCoursesUserDefault, setCoursesUserFull } =
    useUserCoursesContext();
  const { courseID } = useParams<{ courseID: string }>();
  const { id } = useParams<{ id: string }>();
  const workoutID = id;
  const navigate = useNavigate();

  const [workout, setWorkout] = useState<Workout | null>(null);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState<string | null>(null);
  const [coursesLoaded, setCoursesLoaded] = useState(false);
  const [nonZeroProgressExercisesCount, setNonZeroProgressExercisesCount] =
    useState(0);

  const [isWorkoutProgressModal, setIsWorkoutProgressModal] =
    useState<boolean>(false);
  const [isWorkoutProgressModalDone, setIsWorkoutProgressModalDone] =
    useState<boolean>(false);
  const [hasUpdated, setHasUpdated] = useState(false); // флаг для контроля вызова handleProgressUpdate

  const toggleModalAddProgress = () => {
    setIsWorkoutProgressModal((prev) => !prev);
  };

  // Обновляем прогресс тренировок, если были внесены какие то изменения в модалке заполнения прогресса по упражнениям
  const handleProgressUpdate = () => {
    if (user && workoutID && courseID) {
      fetchGetExercisesWorkoutUser(user.uid, courseID, workoutID)
        .then((data) => {
          setExercises(data);
          setIsWorkoutProgressModal(false);
          setIsWorkoutProgressModalDone(true);
          setHasUpdated(true); // Обновляем флаг после успешного обновления
        })
        .catch((error) => {
          console.error("Ошибка при загрузке упражнений:", error);
          setIsError("Ошибка при загрузке упражнений");
        });
    }
  };

  // Обновляем контекст с курсами, если изменился прогресс по упражнениям
  useEffect(() => {
    if (user) {
      fetchGetCoursesUser(user.uid)
        .then((data) => {
          setCoursesUserDefault(data.filteredCourses);
          setCoursesUserFull(data.userCourses);
          setCoursesLoaded(true);
        })
        .catch((error) => {
          console.error("Ошибка при загрузке курсов:", error);
          setIsError("Ошибка при загрузке курсов");
        });
    }
  }, [user, setCoursesUserDefault, setCoursesUserFull, exercises]);

  // Получаем информацию по тренировке после того, как вытянули курсы из контекста
  useEffect(() => {
    if (coursesLoaded && workoutID) {
      fetchGetWorkout(workoutID)
        .then((data) => {
          setWorkout(data);
        })
        .catch((error) => {
          console.error("Ошибка при загрузке тренировки:", error);
          setIsError("Ошибка при загрузке тренировки");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [coursesLoaded, workoutID]);

  // получаем информацию по упражнениям тренировки
  useEffect(() => {
    if (user && workoutID && courseID) {
      fetchGetExercisesWorkoutUser(user.uid, courseID, workoutID)
        .then((data) => {
          setExercises(data);
        })
        .catch((error) => {
          console.error("Ошибка при загрузке упражнений:", error);
          setIsError("Ошибка при загрузке упражнений");
        });
    }
  }, [user, workoutID, courseID]);

  // После загрузки курсов из контекста делаем проверку на существование такого курса и тренировки
  useEffect(() => {
    if (coursesLoaded && courseID && workoutID) {
      if (coursesUserDefault) {
        const currentCourse = coursesUserDefault.find(
          (course) => course._id === courseID
        );
        if (!currentCourse) {
          navigate(paths.MAIN);
        } else {
          if (!currentCourse.workouts.includes(workoutID)) {
            navigate(paths.MAIN);
          }
        }
      } else {
        setIsError("Курсы не загружены.");
      }
    }
  }, [coursesLoaded, coursesUserDefault, courseID, workoutID, navigate]);

  // Находим хотя бы одно упражнение с прогрессом больше нуля, чтобы менять название кнопки
  useEffect(() => {
    if (coursesLoaded && user && courseID && workoutID) {
      if (exercises.length > 0) {
        const currentProgress = exercises.filter(
          (exercise) => exercise.quantity > 0
        );
        setNonZeroProgressExercisesCount(currentProgress.length);
      } else if (!hasUpdated) {
        // Проверка перед обновлением прогресса
        fetchAddProgressWorkoutCourseUser(user?.uid, courseID, workoutID, true);
        handleProgressUpdate();
      }
    }
  }, [exercises, coursesLoaded, hasUpdated]);

  if (isLoading || !coursesLoaded) {
    return (
      <main className="flex justify-center mb-[131px]">
        <div className=" flex justify-center w-[360px] h-[325px] items-center">
          <div
            className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-black"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        </div>
      </main>
    );
  }

  if (isError) {
    return <div>{isError}</div>;
  }

  // Убедимся, что currentCourse определен перед использованием
  const currentCourse = coursesUserDefault?.find(
    (course) => course._id === courseID
  );

  if (!currentCourse) {
    return <div>Курс не найден</div>;
  }

  return (
    <main className="flex flex-col justify-start gap-6 md:gap-10 mb-[131px]">
      <div className="max-w-[810px] max-h-[175px] flex flex-col justify-start ">
        <h1 className="font-[Roboto] text-[24px] font-medium text-black md:text-[60px]">
          {currentCourse?.nameRU}
        </h1>
        <h3 className="font-[Roboto] text-[18px] font-normal md:text-[32px]">
          {workout?.name}
        </h3>
      </div>
      <div className="h-[0px]  max-w-[1160px] relative pb-[56%] pt-[30px] overflow-hidden rounded-[30px] shadow-[customShadow]">
        <iframe
          className="w-full h-full absolute top-0 left-0"
          src={workout?.video}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
      {exercises.length > 0 && (
        <div className="rounded-[30px] bg-white shadow-[0_4px_67px_-12px_rgba(0,0,0,0.13)] w-full max-h-[838px] p-[30px] md:p-10 flex flex-col justify-start items-start ">
          <h2 className="font-[StratosSkyeng, sans-serif] text-[32px] font-normal mb-5">
            Упражнения тренировки
          </h2>
          <div className="mb-[40px] max-h-[606px] grid grid-cols-1 gap-x-[60px] gap-y-[24px] md:grid-cols-3 md:gap-y-[20px]">
            {workout &&
              exercises.map((item, index) => (
                <ExerciseItem
                  key={index}
                  name={item.name}
                  quantity={item.quantity}
                  maxQuantity={workout?.exercises[index].quantity}
                />
              ))}
          </div>

          <button
            onClick={toggleModalAddProgress}
            className="w-[251px] md:w-[320px] h-[52px] rounded-[30px] bg-[#BCEC30] font-[Roboto san-serif] text-[18px] font-normal leading-[110%] "
          >
            <p className="mx-[20px] my-[16px]">
              {nonZeroProgressExercisesCount
                ? "Обновить свой прогресс"
                : "Заполнить свой прогресс"}
            </p>
          </button>

          {isWorkoutProgressModal && workout && (
            <MyProgressModal
              courseID={courseID}
              workoutID={workoutID}
              onProgressUpdated={handleProgressUpdate}
              toggleModalAddProgress={toggleModalAddProgress}
              exercisesDefault={workout?.exercises}
              setIsWorkoutProgressModalDone={setIsWorkoutProgressModalDone}
            />
          )}
          {isWorkoutProgressModalDone && (
            <MyProgressDone
              setIsWorkoutProgressModalDone={setIsWorkoutProgressModalDone}
            />
          )}
        </div>
      )}
    </main>
  );
};

export default WorkoutComponent;
