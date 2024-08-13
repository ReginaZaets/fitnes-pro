import { useEffect, useState } from "react";
import {
  fetchDataUser,
  fetchDeleteCourseUser,
  fetchGetCourse,
  fetchGetCourseImage,
} from "../../api/coursesApi";
import { useNavigate, useParams } from "react-router-dom";
import { Course } from "../../types/types";
import { paths } from "../../lib/paths";
import { useUserContext } from "../../context/hooks/useUser";
import { auth } from "../../api/firebaseConfig";

const CourseInfo = () => {
  // const user = useUserContext();
  const user = auth.currentUser;
  const [message, setMessage] = useState(false);
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
      default:
        return "bg-white";
    }
  };

  const nav = useNavigate();
  // const user = true;
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
  console.log(data?.img);

  useEffect(() => {
    if (data?.img) {
      fetchGetCourseImage(data?.img).then((img) => {
        setUrl(img);
      });
    }
  }, [data]);

  const addCourse = async () => {
    if (user?.uid && data?._id) {
      await fetchDataUser(user?.uid, data?._id);
      nav(paths.PROFILE);
      console.log("курс добавлен");
    }
  };
  // const addCourse = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   event.preventDefault();
  // };

  const deleteCourse = async () => {
    if (user?.uid && data?._id) {
      await fetchDeleteCourseUser(user?.uid, data?._id);
      console.log("курс удален");
    }
  };

  return (
    <>
      <div
        className={` opacity-0 rounded-[28px] md:w-full  md:opacity-100 ${data && getBackgroundColor(data?.nameRU)}`}
      >
        <div className="flex items-center md:justify-between md:items-start">
          <p className="p-10 text-[60px] opacity-0 text-white font-semibold md:opacity-100	">
            {data?.nameRU}
          </p>
          <img src={url} alt="courseColor" md:w-32 className="" />
        </div>
      </div>

      <section className="my-[20px] pb-[40px] flex flex-col">
        <p className="text-[24px] md:text-[40px] text-black font-semibold my-10">
          Подойдет для вас, если:
        </p>
        <section className="flex gap-[17px] flex-col md:flex-row md:flex-wrap md:justify-center md:items-stretch">
          <>
            {data?.fitting.map((item, index) => (
              <div className=" card">
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
      <section className="flex absolute my-[142px]">
        <div className="flex flex-col items-start">
          <p className=" z-40 leading-none text-[32px] md:text-[60px] text-black font-bold ">
            Начни путь <br />к новому телу
          </p>
          <ul className=" md:w-[437px] my-7 flex md:items-start flex-col justify-start">
            <li className="items">проработка всех групп мышц</li>
            <li className="items">тренировка суставов</li>
            <li className="items">улучшение циркуляции крови</li>
            <li className="items">упражнения заряжают бодростью</li>
            <li className="items">помогают противостоять стрессам</li>
          </ul>
          <button
            className="bg-btnColor rounded-small w-[283px] md:w-[437px] h-btnHeight text-black text-lg my-[28px]"
            onClick={addCourse}
          >
            {user ? (
              <p className="text-[18px]">Добавить курс</p>
            ) : (
              <p className="text-[18px]">Войдите, чтобы добавить курс</p>
            )}
          </button>
          <button onClick={deleteCourse}>удалить</button>
          {message && <p>Курс добавлен</p>}
        </div>
        <img
          src="/images/infoCourse.svg"
          alt=""
          className="relative z-10 right-[175px] bottom-[270px] md:left-[130px] md:z-10 md:right-[0px] md:bottom-[100px]"
        />
        <img
          src="/images/vector1.svg"
          alt=""
          className="relative bottom-[350px] right-[490px] md:bottom-[250px] md:right-[300px]"
        />
        <img
          src="/images/vector2.svg"
          alt=""
          className="relative right-[700px] bottom-[188px] md:right-[580px] md:top-[30px] md:bottom-0"
        />
      </section>
    </>
  );
};

export default CourseInfo;
