import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ExerciseItem from "./ExerciseItem";
import {
  fetchGetCoursesUser,
  fetchGetExercisesWorkoutUser,
  fetchGetWorkout,
} from "../../api/coursesApi";
import { Exercise, Workout } from "../../types/types";
import MyProgressModal from "../popups/myProgressPopups/MyProgressModal";
import { useUserContext } from "../../context/hooks/useUser";
import { useUserCoursesContext } from "../../context/hooks/useUserCourses";
import { paths } from "../../lib/paths";

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
  const [isOpenedMyProgress, setIsOpenedMyProgressModal] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState<string | null>(null);
  const [coursesLoaded, setCoursesLoaded] = useState(false);

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
  }, [user, setCoursesUserDefault, setCoursesUserFull]);

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

  const toggleModalAddProgress = () => {
    setIsOpenedMyProgressModal((prev) => !prev);
  };

  const handleProgressUpdate = () => {
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
  };

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
          <p className="mx-[20px] my-[16px]">Заполнить свой прогресс</p>
        </button>
        {isOpenedMyProgress && workout && (
          <MyProgressModal
            courseID={courseID}
            workoutID={workoutID}
            onProgressUpdated={handleProgressUpdate}
            toggleModalAddProgress={toggleModalAddProgress}
            exercisesDefault={workout?.exercises}
          />
        )}
      </div>
    </main>
  );
};

export default WorkoutComponent;
