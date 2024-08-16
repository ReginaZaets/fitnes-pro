import { useEffect, useState } from "react";
import {
  fetchDataUser,
  fetchDeleteCourseUser,
  fetchGetCourse,
  fetchGetCourseImage,
} from "../../api/coursesApi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Course } from "../../types/types";
import { paths } from "../../lib/paths";
import { auth } from "../../api/firebaseConfig";
import { useUserCoursesContext } from "../../context/hooks/useUserCourses";

const CourseInfo = () => {
  const { coursesUserDefault, setCoursesUserDefault } = useUserCoursesContext();
  const { setCoursesUserFull } = useUserCoursesContext();

  const user = auth.currentUser;

  const [message, setMessage] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const getBackgroundColor = (courseName: string) => {
    switch (courseName) {
      case "Йога":
        return "bg-yoga";
      case "Стретчинг":
        return "bg-sterch";
      case "Зумба":
        return "bg-zumba";
      case "Степ-аэробика":
        return "bg-step";
      case "Бодифлекс":
        return "bg-bodyflex";
      default:
        return "bg-white";
    }
  };

  const nav = useNavigate();

  const { id } = useParams<{ id: string }>();

  const [data, setData] = useState<Course | null>(null);
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    if (id) {
      fetchGetCourse(id).then((res) => {
        setData(res);
      });
    }
  }, []);

  useEffect(() => {
    if (data?.img) {
      fetchGetCourseImage(data?.img).then((img) => {
        setUrl(img);
      });
    }
  }, [data]);

  const isUserCourse = coursesUserDefault?.some((course) => course._id === id);

  // const handleClick = async () => {
  //   if (!isUserCourse) {
  //     if (user?.uid && data?._id) {
  //       await fetchDataUser(
  //         user?.uid,
  //         data?._id,
  //         setCoursesUserDefault,
  //         setCoursesUserFull
  //       );
  //       nav(paths.PROFILE);
  //       console.log("курс добавлен");
  //     }
  //   } else {
  //     if (user?.uid && data?._id) {
  //       await fetchDeleteCourseUser(user?.uid, data?._id);
  //       console.log("курс удален");
  //     }
  //   }
  // };

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
      console.log("курс добавлен");
    }
  };

  const deleteCourse = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (id && user?.uid && data?._id) {
      await fetchDeleteCourseUser(user?.uid, data?._id);
      console.log("курс удален");
      setMessage(true);
      setIsButtonDisabled(true);
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

  return (
    <>
      <div
        className={`mt-3 rounded-[28px] md:w-full ${data && getBackgroundColor(data?.nameRU)} md: mt-0`}
      >
        <div className="flex items-center md:justify-between md:items-start">
          <p className=" hidden p-10 text-[60px] text-white font-semibold 	md:block">
            {data?.nameRU}
          </p>
          <img src={url} alt="courseColor" className="block " />
        </div>
      </div>

      <section className="my-[20px] pb-[40px] flex flex-col">
        <p className="text-[24px] md:text-[40px] text-black font-semibold my-10">
          Подойдет для вас, если:
        </p>
        <section className="flex gap-[17px] flex-col md:flex-row md:flex-wrap md:justify-center md:items-stretch">
          <>
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
          </>
        </section>
      </section>
      <section className="flex flex-col">
        <p className="text-[24px] md:text-[40px] text-black font-semibold">
          Направления
        </p>
        <div className="bg-btnColor mt-6 md:mt-[40px] h-full w-full rounded-[28px] p-[30px] flex wd:items-stretch wd:flex-wrap wd: justify-center">
          <div className="direction">
            <>
              {data?.directions.map((item) => (
                <span className="directions-name " key={item}>
                  {item}
                </span>
              ))}
            </>
          </div>
        </div>
      </section>
      <section className="  flex my-[142px] ">
        <div className="w-full p-[40px] rounded-[30px] z-50  bg-white flex flex-col items-center z-40 md:z-0 md:justify-start md:items-start">
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
            disabled={isButtonDisabled}
            className={`bg-btnColor hover:bg-btnHoverGreen ${isButtonDisabled ? "opacity-70 cursor-not-allowed" : ""} pointer rounded-small w-[283px] md:w-[437px] h-btnHeight text-black text-lg my-[28px]`}
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
              <Link to={paths.SIGN_IN_MODAL}>
                <p className="text-[18px]">Войдите, чтобы добавить курс</p>
              </Link>
            )}
          </button>
          {message && (
            <p className="text-[18px] text-center text-gray-700">Курс удален</p>
          )}
        </div>
        <div className="absolute">
          {" "}
          <img
            src="/images/infoCourse.svg"
            alt=""
            className="relative z-10 bottom-[240px] left-[85px] md:left-[600px] md:z-10 md:right-[0px] md:bottom-[100px]"
          />
          <img
            src="/images/vector1.svg"
            alt=""
            className="absolute bottom-[488px] left-[164px] md:top-[9px] md:left-[720px] md:right-[4px] md:bottom-[250px] "
          />
          <img
            src="/images/vector2.svg"
            alt=""
            className="absolute right-[30px] md:right-[700px] bottom-[220px] md:left-[520px] md:top-[140px] md:bottom-0"
          />
        </div>
      </section>
    </>
  );
};

export default CourseInfo;
