import { useEffect, useState } from "react";
import WorkoutModal from "../popups/workoutPopups/WorkoutModal";
import { Course } from "../../types/types";
import {
  fetchGetCourseImage,
  fetchGetWorkoutsCourse,
} from "../../api/coursesApi";
import { Link, useLocation } from "react-router-dom";
import ProgressBar from "./ProgressBar";
import { useUserCoursesContext } from "../../context/hooks/useUserCourses";
import { useUserContext } from "../../context/hooks/useUser";
type CourseCardProps = {
  course: Course;
  progress: number;
  isUserCourse?: boolean;
  onAdd: (courseId: string) => void;
  onRemove: (courseId: string) => void;
  _id?: string;
};
export const CourseCard = ({
  course,
  progress,
  isUserCourse = false,
  onAdd,
  onRemove,
  _id,
}: CourseCardProps) => {
  const [isCourseProgressModal, setIsCourseProgressModal] =
    useState<boolean>(false);
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const user = useUserContext();
  const courseLink = "/course/" + _id;
  const { setWorkoutUsers } = useUserCoursesContext();

  const handleAdd = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    onAdd(course._id);
  };

  const handleRemove = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    onRemove(course._id);
  };
  const handleClickModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsCourseProgressModal(true);
  };

  useEffect(() => {
    const fetchImg = async () => {
      try {
        const res = await fetchGetCourseImage(course.img);
        setUrl(res);
        setIsLoading(false);
      } catch {
        console.log("error");
      }
    };
    fetchImg();
  }, []);

  useEffect(() => {
    const userData = async () => {
      if (user && course) {
        const getWorkout = await fetchGetWorkoutsCourse(user.uid, course._id);
        setWorkoutUsers(getWorkout);
      }
    };
    userData();
  }, [user, course]);
  return (
    <Link to={courseLink}>
      <div
        data-testid="course"
        className={`cursor-pointer ${
          isCourseProgressModal
            ? ""
            : "hover:scale-[1.03] hover:ease-in duration-[300ms] "
        } w-[360px] min-h-[501px] flex flex-col justify-start font-normal text-[16px] leading-[17px] bg-white rounded-[30px] shadow-lg`}
      >
        {isUserCourse ? (
          <div className="flex justify-end " onClick={handleRemove}>
            <svg
              className="absolute mx-[18px] mt-[18px] mb-[12px] cursor-pointer hover:scale-105"
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.9998 27.3333C21.3636 27.3333 27.3332 21.3638 27.3332 14C27.3332 6.63616 21.3636 0.666626 13.9998 0.666626C6.63604 0.666626 0.666504 6.63616 0.666504 14C0.666504 21.3638 6.63604 27.3333 13.9998 27.3333ZM7.33317 12.6666V15.3333H20.6665V12.6666H7.33317Z"
                fill="white"
              />
            </svg>
          </div>
        ) : (
          <div className="flex justify-end " onClick={handleAdd}>
            <svg
              className="hover:scale-105 cursor-pointer absolute mx-[18px] my-[12px] mt-[18px]"
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14 27.3333C21.3638 27.3333 27.3333 21.3638 27.3333 14C27.3333 6.63616 21.3638 0.666626 14 0.666626C6.63619 0.666626 0.666656 6.63616 0.666656 14C0.666656 21.3638 6.63619 27.3333 14 27.3333ZM12.6667 12.6666V7.33329H15.3333V12.6666H20.6667V15.3333H15.3333V20.6666H12.6667V15.3333H7.33332V12.6666H12.6667Z"
                fill="white"
              />
            </svg>
          </div>
        )}
        {isLoading ? (
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
        ) : (
          <img src={url} className="rounded-[30px] max-w-[360px] h-[325px] " />
        )}

        <div className="flex flex-col gap-[10px] mt-[10px] pl-[10px] pr-[10px]">
          <div className="font-medium text-[32px] leading-[35px]">
            {course.nameRU}
          </div>
          <div className=" flex flex-row gap-[5px] ">
            <div className="flex gap-[5px] bg-[#F7F7F7] w-[103px] h-[38px] justify-center items-center rounded-[50px]">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.5 1.625C6.5 0.796573 5.82843 0.125 5 0.125C4.17157 0.125 3.5 0.796573 3.5 1.625C1.84315 1.625 0.5 2.96815 0.5 4.625H15.5C15.5 2.96815 14.1569 1.625 12.5 1.625C12.5 0.796573 11.8284 0.125 11 0.125C10.1716 0.125 9.5 0.796573 9.5 1.625H6.5Z"
                  fill="#202020"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0.5 6.125H15.5V10.325C15.5 12.0052 15.5 12.8452 15.173 13.487C14.8854 14.0515 14.4265 14.5104 13.862 14.798C13.2202 15.125 12.3802 15.125 10.7 15.125H5.3C3.61984 15.125 2.77976 15.125 2.13803 14.798C1.57354 14.5104 1.1146 14.0515 0.82698 13.487C0.5 12.8452 0.5 12.0052 0.5 10.325V6.125ZM9.5 10.325C9.5 9.90496 9.5 9.69494 9.58175 9.53451C9.65365 9.39338 9.76838 9.27865 9.90951 9.20675C10.0699 9.125 10.28 9.125 10.7 9.125H11.3C11.72 9.125 11.9301 9.125 12.0905 9.20675C12.2316 9.27865 12.3463 9.39338 12.4183 9.53451C12.5 9.69494 12.5 9.90496 12.5 10.325V10.925C12.5 11.345 12.5 11.5551 12.4183 11.7155C12.3463 11.8566 12.2316 11.9713 12.0905 12.0433C11.9301 12.125 11.72 12.125 11.3 12.125H10.7C10.28 12.125 10.0699 12.125 9.90951 12.0433C9.76838 11.9713 9.65365 11.8566 9.58175 11.7155C9.5 11.5551 9.5 11.345 9.5 10.925V10.325Z"
                  fill="#202020"
                />
              </svg>
              <div className="дни">{course.workouts.length} дней</div>
            </div>
            <div className="flex gap-[5px] bg-[#F7F7F7] w-[163px] h-[38px] justify-center items-center rounded-[50px]">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8 15.5C12.1421 15.5 15.5 12.1421 15.5 8C15.5 3.85786 12.1421 0.5 8 0.5C3.85786 0.5 0.5 3.85786 0.5 8C0.5 12.1421 3.85786 15.5 8 15.5ZM7.25 3.5V8C7.25 8.41421 7.58579 8.75 8 8.75H11.75V7.25H8.75V3.5H7.25Z"
                  fill="#202020"
                />
              </svg>
              <div className="min">20-50 мин/день</div>
            </div>
          </div>
          <div className="flex bg-[#F7F7F7] w-[129px] h-[38px] justify-center items-center rounded-[50px] gap-[5px]">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15 2.625C15.2984 2.625 15.5845 2.74353 15.7955 2.9545C16.0065 3.16548 16.125 3.45163 16.125 3.75V14.25C16.125 14.5484 16.0065 14.8345 15.7955 15.0455C15.5845 15.2565 15.2984 15.375 15 15.375C14.7016 15.375 14.4155 15.2565 14.2045 15.0455C13.9935 14.8345 13.875 14.5484 13.875 14.25V3.75C13.875 3.45163 13.9935 3.16548 14.2045 2.9545C14.4155 2.74353 14.7016 2.625 15 2.625Z"
                fill="#D9D9D9"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 4.875C12.2984 4.875 12.5845 4.99353 12.7955 5.2045C13.0065 5.41548 13.125 5.70163 13.125 6V14.25C13.125 14.5484 13.0065 14.8345 12.7955 15.0455C12.5845 15.2565 12.2984 15.375 12 15.375C11.7016 15.375 11.4155 15.2565 11.2045 15.0455C10.9935 14.8345 10.875 14.5484 10.875 14.25V6C10.875 5.70163 10.9935 5.41548 11.2045 5.2045C11.4155 4.99353 11.7016 4.875 12 4.875Z"
                fill="#D9D9D9"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9 7.125C9.29837 7.125 9.58452 7.24353 9.7955 7.4545C10.0065 7.66548 10.125 7.95163 10.125 8.25V14.25C10.125 14.5484 10.0065 14.8345 9.7955 15.0455C9.58452 15.2565 9.29837 15.375 9 15.375C8.70163 15.375 8.41548 15.2565 8.2045 15.0455C7.99353 14.8345 7.875 14.5484 7.875 14.25V8.25C7.875 7.95163 7.99353 7.66548 8.2045 7.4545C8.41548 7.24353 8.70163 7.125 9 7.125Z"
                fill="#00C1FF"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6 9.375C6.29837 9.375 6.58452 9.49353 6.7955 9.7045C7.00647 9.91548 7.125 10.2016 7.125 10.5V14.25C7.125 14.5484 7.00647 14.8345 6.7955 15.0455C6.58452 15.2565 6.29837 15.375 6 15.375C5.70163 15.375 5.41548 15.2565 5.2045 15.0455C4.99353 14.8345 4.875 14.5484 4.875 14.25V10.5C4.875 10.2016 4.99353 9.91548 5.2045 9.7045C5.41548 9.49353 5.70163 9.375 6 9.375Z"
                fill="#00C1FF"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 11.625C3.29837 11.625 3.58452 11.7435 3.7955 11.9545C4.00647 12.1655 4.125 12.4516 4.125 12.75V14.25C4.125 14.5484 4.00647 14.8345 3.7955 15.0455C3.58452 15.2565 3.29837 15.375 3 15.375C2.70163 15.375 2.41548 15.2565 2.2045 15.0455C1.99353 14.8345 1.875 14.5484 1.875 14.25V12.75C1.875 12.4516 1.99353 12.1655 2.2045 11.9545C2.41548 11.7435 2.70163 11.625 3 11.625Z"
                fill="#00C1FF"
              />
            </svg>

            <div className="slognost">Сложность</div>
          </div>
          {location.pathname === "/profile" && (
            <>
              <div className="pb-[20px] w-full flex flex-col gap-2">
                <div className="text-[18px] front-normal">
                  Прогресс {progress}%
                </div>
                <ProgressBar progress={progress} />
              </div>
              <button
                data-testid="workout"
                onClick={handleClickModal}
                className="w-full h-[52px] bg-[#BCEC30] rounded-[46px] mb-[10px] hover:bg-btnHoverGreen active:bg-black active:text-white"
              >
                {progress == 0 ? "Начать тренировку" : "Продолжить"}
              </button>
            </>
          )}
        </div>
        {isCourseProgressModal && (
          <WorkoutModal
            course={course}
            setClickModal={setIsCourseProgressModal}
          />
        )}
      </div>
    </Link>
  );
};
