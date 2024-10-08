import {
  fetchDataUser,
  fetchDeleteCourseUser,
  fetchGetCourses,
} from "../../../api/coursesApi";
import { useUserContext } from "../../../context/hooks/useUser";
import { useUserCoursesContext } from "../../../context/hooks/useUserCourses";
import { useEffect, useState } from "react";
import { Course } from "../../../types/types";
import ResetPasswordEmail from "../../popups/ResetPasswordEmail";
import SignupModal from "../../popups/SignupModal";
import SigninModal from "../../popups/SigninModal";
import { CourseCard } from "../CourseCard/CourseCard";
import { ButtonToTop } from "../ButtonToTop/ButtonToTop";

export const Main = () => {
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const {
    setCoursesUserFull,
    setCoursesUserDefault,
    coursesUserDefault,
    setIsLoadingCourses,
  } = useUserCoursesContext();
  const user = useUserContext();
  const [isSigninModal, setIsSigninModal] = useState(false);
  const [isSignupModal, setIsSignupModal] = useState(false);
  const [isResetPasswordEmailModal, setIsResetPasswordEmailModal] =
    useState(false);
  const [email, setEmail] = useState("");

  const openSigninModal = () => {
    setIsSigninModal(true);
    setIsSignupModal(false);
  };
  const openSignupModal = () => {
    setIsSignupModal(true);
    setIsSigninModal(false);
  };
  const openResetPasswordModal = (email: string) => {
    setEmail(email);
    setIsResetPasswordEmailModal(true);
    setIsSigninModal(false);
  };
  const handleAddCourse = async (courseId: string) => {
    if (user?.uid) {
      try {
        const courseToAdd = allCourses?.find(course => course._id === courseId);
        if (courseToAdd) {
          const { userCourses } = await fetchDataUser(user.uid, courseId);
          setCoursesUserDefault((prev) => [...prev, courseToAdd]); // добавляем полный объект курса
          setCoursesUserFull(userCourses); // обновляем полные данные
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        }
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
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(error.message);
        }
      }
    }
  };
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await fetchGetCourses();
        setAllCourses(data);
        setIsLoadingCourses(false);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(error);
        }
      }
    };

    fetchCourses();
  }, [setIsLoadingCourses]);
  return (
    <>
      <div className="flex gap-[5px] font-normal text-2xl items-center my-4 w-full mb-[50px]">
        <div className=" w-[947px] min-h-[120px] text-black md:text-[60px]  sm:text-[45px] text-[32px] font-medium leading-[32px] sm:leading-[45px]   md:leading-[60px] text-left ">
          Начните заниматься спортом и улучшите качество жизни
        </div>
        <div className="relative max-w-xs p-3 bg-[#BCEC30] text-black rounded-lg w-[288px] items-center hidden st:flex">
          <div className="absolute top-[88%]  rotate-45 w-0 h-0 border-l-[10px] border-r-[10px] border-t-[30px] border-l-transparent border-r-transparent border-t-[#BCEC30] "></div>{" "}
          <p>Измени своё тело за полгода!</p>
        </div>
      </div>
      {allCourses?.length !== 0 ? (
        <div className="flex flex-row flex-wrap items-center justify-center st:justify-start w-full gap-[40px]">
          {allCourses?.map((course) => {
            const isUserCourse = coursesUserDefault?.some(
              (courseUserDefault) => courseUserDefault._id === course._id
            );
            return (
              <CourseCard
                key={course._id}
                course={course}
                progress={0}
                isUserCourse={isUserCourse}
                onAdd={handleAddCourse}
                onRemove={handleRemoveCourse}
                _id={course._id}
                openSigninModal={openSigninModal}
              />
            );
          })}
        </div>
      ) : (
        <div className="w-full flex justify-center">
          <div
            className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-black"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        </div>
      )}
      <section className="mt-[20px] mb-[20px] flex justify-end md:justify-center ">
        <ButtonToTop />
      </section>
      {isSigninModal && (
        <SigninModal
          setIsSigninModal={setIsSigninModal}
          openSignupModal={openSignupModal}
          openResetPasswordModal={openResetPasswordModal}
        />
      )}
      {isSignupModal && (
        <SignupModal
          setIsSignupModal={setIsSignupModal}
          openSigninModal={openSigninModal}
        />
      )}
      {isResetPasswordEmailModal && (
        <ResetPasswordEmail
          email={email}
          setIsResetPasswordEmailModal={setIsResetPasswordEmailModal}
        />
      )}
    </>
  );
};
