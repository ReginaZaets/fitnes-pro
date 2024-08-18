import { useEffect, useState } from "react";
import { useUserCoursesContext } from "../../../context/hooks/useUserCourses";
import { useNavigate, useParams } from "react-router-dom";
import { Course } from "../../../types/types";
import { auth } from "../../../api/firebaseConfig";
import {
  fetchDataUser,
  fetchDeleteCourseUser,
  fetchGetCourse,
  fetchGetCourseImage,
  fetchGetCoursesUser,
} from "../../../api/coursesApi";
import { paths } from "../../../lib/paths";
import SigninModal from "../../popups/SigninModal";
import SignupModal from "../../popups/SignupModal";
import ResetPasswordEmail from "../../popups/ResetPasswordEmail";

const CourseInfo = () => {
  // Берем из контекста объекты курсов
  const { coursesUserDefault, setCoursesUserDefault, setCoursesUserFull } =
    useUserCoursesContext();

  const user = auth.currentUser;

  const [message, setMessage] = useState(false);
  // Добавляем флаг для отображения загрузки
  const [isLoading, setIsLoading] = useState(true);
  const [isSigninModal, setIsSigninModal] = useState(false);
  const [isSignupModal, setIsSignupModal] = useState(false);
  const [isResetPasswordEmailModal, setIsResetPasswordEmailModal] =
    useState(false);
  const [email, setEmail] = useState("");

  const nav = useNavigate();

  const { id } = useParams<{ id: string }>();

  const [data, setData] = useState<Course | null>(null);
  const [url, setUrl] = useState<string>("");

  const getBackgroundColor = (courseName: string) => {
    switch (courseName) {
      case "Йога":
        return "bg-yoga";
      case "Стретчинг":
        return "bg-sterch";
      case "Танцевальный фитнес":
        return "bg-zumba";
      case "Степ-аэробика":
        return "bg-step";
      case "Бодифлекс":
        return "bg-bodyflex";
      default:
        return "bg-white";
    }
  };

  useEffect(() => {
    if (id) {
      fetchGetCourse(id)
        .then((res) => {
          if (!res) {
            nav(paths.MAIN);
          }
          setData(res);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  useEffect(() => {
    if (data?.img) {
      fetchGetCourseImage(data?.img)
        .then((img) => {
          setUrl(img);
        })
        .then(() => {
          setIsLoading(false);
        });
    }
  }, [data]);

  const isUserCourse = coursesUserDefault?.some((course) => course._id === id);

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

  const addCourse = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (id && user?.uid && data?._id) {
      await fetchDataUser(
        user?.uid,
        data?._id,
        setCoursesUserDefault,
        setCoursesUserFull
      );
      nav(paths.PROFILE);
    }
  };

  const deleteCourse = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (id && user?.uid && data?._id) {
      await fetchDeleteCourseUser(user?.uid, data?._id);

      // Обновляем контекст курсов после удаления
      const updateData = await fetchGetCoursesUser(user.uid);
      setCoursesUserDefault(updateData.filteredCourses);
      setCoursesUserFull(updateData.userCourses);
      setMessage(true);
    }
  };
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(false);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [message]);

  if (isLoading) {
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

  return (
    <>
      <div
        className={`mt-3 rounded-[28px] md:w-full overflow-hidden ${
          data && getBackgroundColor(data?.nameRU)
        } md: mt-0`}
      >
        <div className="flex items-center md:justify-between md:items-start">
          <p className=" hidden p-10 text-[60px] text-white font-semibold 	md:block">
            {data?.nameRU}
          </p>
          <img src={url} alt="courseColor" className="block" />
        </div>
      </div>
      <section className="my-[20px] pb-[40px] flex flex-col">
        <p className="text-[24px] md:text-[40px] text-black font-semibold my-10">
          Подойдет для вас, если:
        </p>
        <section className="flex gap-[17px] flex-col md:flex-row md:flex-wrap md:justify-center md:items-stretch">
          {data?.fitting.map((item, index) => (
            <div key={index} className=" card">
              <div className="flex gap-6 ">
                <span className="text-btnColor number-reasons">
                  {index + 1}
                </span>
                <p className="text-reasons" key={item}>
                  {item}
                </p>
              </div>
            </div>
          ))}
        </section>
      </section>
      <section className="flex flex-col">
        <p className="text-[24px] md:text-[40px] text-black font-semibold">
          Направления
        </p>
        <div className="bg-btnColor mt-6 md:mt-[40px] h-full w-full rounded-[28px] p-[30px] flex wd:items-stretch wd:flex-wrap wd: justify-center">
          <div className="direction">
            {data?.directions.map((item) => (
              <span className="directions-name " key={item}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>
      <section className="relative flex my-[142px] z-0">
        <div className="shadow-lg w-full p-[40px] rounded-[30px] z-50  bg-white flex flex-col items-center z-40 st:z-0 md:justify-start md:items-start">
          <p className=" align-center z-50 leading-none text-[32px] md:text-[60px] text-black font-bold ">
            Начни путь <br />к новому телу
          </p>
          <ul className=" p-4 md:w-[437px] md:my-7 flex md:items-start flex-col">
            <li className="items">проработка всех групп мышц</li>
            <li className="items">тренировка суставов</li>
            <li className="items">улучшение циркуляции крови</li>
            <li className="items">упражнения заряжают бодростью</li>
            <li className="items">помогают противостоять стрессам</li>
          </ul>
          <button
            className={`bg-btnColor hover:bg-btnHoverGreen pointer rounded-small w-[283px] md:w-[437px] h-btnHeight text-black text-lg my-[28px]`}
          >
            {user ? (
              isUserCourse ? (
                <p onClick={deleteCourse} className="text-[18px]">
                  Удалить курс
                </p>
              ) : (
                <p onClick={addCourse} className="text-[18px]">
                  Добавить курс
                </p>
              )
            ) : (
              <p onClick={openSigninModal} className="text-[18px]">
                Войдите, чтобы добавить курс
              </p>
            )}
          </button>
        </div>
        <div className={"overflow-hidden"}>
          {" "}
          <img
            src="/images/infoCourse.svg"
            alt=""
            className="absolute z-10 bottom-[420px] left-[85px] w-[80%]
            md:w-auto
            md:right-0 
            md:left-auto
            md:bottom-[190px]
            sm:bottom-[80px]
            sm:left-auto
            sm:w-auto
            sm1:bottom-[40px]
            sm1:left-auto
            sm1:w-auto
            m2:bottom-[220px]
            m1:bottom-[270px]
            m1:left-[20px]
            m:right-0 
            m:left-auto
            m:bottom-[350px]
            m:w-[80%]
            lg:z-50
            "
          />
          <img
            src="/images/vector1.svg"
            alt=""
            className="absolute bottom-[488px] left-[164px] st:top-[9px] st:left-[720px] st:right-[4px] st:bottom-[250px] "
          />
          <img
            src="/images/vector2.svg"
            alt=""
            className="absolute right-[30px] st:right-[700px] bottom-[220px] st:left-[520px] st:top-[140px] st:bottom-0 sm1:bottom-[100px]"
          />
        </div>
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

export default CourseInfo;
