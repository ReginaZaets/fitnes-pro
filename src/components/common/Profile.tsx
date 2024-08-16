import { CourseCard } from "./CourseCard";
import { Link } from "react-router-dom";
import { paths } from "../../lib/paths";
import { useEffect } from "react";
import {
  fetchDataUser,
  fetchDeleteCourseUser,
  fetchGetCourses,
} from "../../api/coursesApi";
import { Course } from "../../types/types";
import { useUserContext } from "../../context/hooks/useUser";
import { logout } from "../../api/authUsersApi";
import { getCourseProgress } from "../../lib/courseProgress";
import { useUserCoursesContext } from "../../context/hooks/useUserCourses";
import { useState } from "react";
import ResetPassword from "../popups/ResetPassword";

const Profile = () => {
  const user = useUserContext();
  const { coursesUserDefault } = useUserCoursesContext();
  const { coursesUserFull } = useUserCoursesContext();
  const { isLoadingCourses } = useUserCoursesContext();
  const { setCoursesUserDefault } = useUserCoursesContext();
  const { setCoursesUserFull } = useUserCoursesContext();

  const [isResetPasswordModal, setIsResetPasswordModal] =
    useState<boolean>(false);

  const handleClickModal = () => {
    setIsResetPasswordModal(true);
  };

  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await fetchGetCourses();
        setCourses(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCourses();
  }, []);
  const handleAddCourse = async (courseId: string) => {
    if (user?.uid) {
      try {
        const courseToAdd = courses.find((course) => course._id === courseId);
        if (courseToAdd) {
          await fetchDataUser(
            user.uid,
            courseId,
            setCoursesUserDefault,
            setCoursesUserFull
          );
          setCoursesUserDefault((prev) => [...prev, courseToAdd]); // добавляем полный объект курса
        }
      } catch (error: any) {
        console.log(error.message);
      }
    }
  };

  const handleRemoveCourse = async (courseId: string) => {
    if (user?.uid) {
      try {
        await fetchDeleteCourseUser(user.uid, courseId);
        setCoursesUserDefault((prev) =>
          prev.filter((course) => course._id !== courseId)
        );
      } catch (error: any) {
        console.log(error.message);
      }
    }
  };

  return (
    <div className="mb-[80px]">
      <h2 className="text-[24px] font-semibold text-black pb-[20px] sm:pb-10 lg:text-[40px]">
        Профиль
      </h2>

      <div className="flex flex-wrap justify-center lg:flex-row sm:flex-col sm:justify-normal md:flex-col md:justify-normal  gap-[33px] bg-white rounded-[30px] shadow-[0_4px_67px_-12px_rgba(0,0,0,0.13)] p-[30px] w-full">
        <img
          className="w-[141px] lg:w-[197px]"
          src="/images/icon-profile.svg"
          alt="картинка пользователя"
        />

        <div className="flex flex-col justify-between">
          <div className="self-start">
            <p className="text-[24px] sm:text-[32px] font-semibold pb-[20px] sm:pb-[30px]">
              {user?.displayName}
            </p>
            <p className="text-[18px] font-normal pb-[30px]">
              Логин: {user?.email}
            </p>
          </div>

          <div className="flex flex-col items-center gap-[10px] sm:flex-row ">
            <button
              onClick={handleClickModal}
              className="bg-btnColor hover:bg-btnHoverGreen active:bg-black active:text-white rounded-small h-[52px] sm:w-[192px] w-[248px] text-black text-[18px]"
            >
              Изменить пароль
            </button>
            {isResetPasswordModal && (
              <ResetPassword
                setIsResetPasswordModal={setIsResetPasswordModal}
              />
            )}
            <Link to={paths.MAIN}>
              <button
                onClick={logout}
                className=" hover:bg-btnHoverWhite active:bg-btnActive rounded-small h-[52px] w-[248px] sm:w-[192px] border border-black  text-black text-lg"
              >
                Выйти
              </button>
            </Link>
          </div>
        </div>
      </div>
      <h2 className="text-[24px] lg:text-[40px] font-semibold text-black pt-[24px] sm:pt-[60px] pb-[20px] sm:pb-10">
        Мои курсы
      </h2>
      {isLoadingCourses ? (
        <div className="flex flex-row flex-wrap items-center justify-center st:justify-start w-full gap-[40px]">
          <div
            className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-black"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        </div>
      ) : coursesUserFull?.length != 0 ? (
        <div className="flex flex-row flex-wrap items-center justify-center st:justify-start w-full gap-[40px]">
          {coursesUserDefault &&
            coursesUserFull &&
            coursesUserDefault.map((course) => {
              const isUserCourse = true;
              return (
                <CourseCard
                  key={course._id}
                  course={course}
                  progress={getCourseProgress(
                    course._id,
                    course.workouts,
                    coursesUserFull
                  )}
                  isUserCourse={isUserCourse}
                  onAdd={handleAddCourse}
                  onRemove={handleRemoveCourse}
                  _id={course._id}
                  openSigninModal={() => {}}
                />
              );
            })}
        </div>
      ) : (
        <p className="text-[18px] font-normal">Нет приобретенных курсов</p>
      )}
      <div className="flex justify-end">
        <button
          onClick={() => {
            window.scrollTo(0, 0);
          }}
          className="sm:hidden bg-[#BCEC30] w-[127px] h-[52px] rounded-[46px] font-medium text-lg items-center flex justify-center mb-[40px] mt-[24px]"
        >
          Наверх ↑
        </button>
      </div>
    </div>
  );
};

export default Profile;
