import { useEffect, useState } from "react";
import { fetchGetCourse, fetchGetCourseImage } from "../../api/coursesApi";
import { useParams } from "react-router-dom";
import { Course } from "../../types/types";

const CourseInfo = () => {
  const { id } = useParams<{ id: string }>();

  const [data, setData] = useState<Course | null>(null);
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    if (id) {
      fetchGetCourse(id).then((res) => {
        setData(res);
      });
      if (data?.img) {
        fetchGetCourseImage(data?.img).then((img) => {
          setUrl(img);
        });
      }
    }
  }, []);
  console.log(data?.img);

  // useEffect(() => {
  //   const fetchInfo = async () => {
  //     try {
  //       if (id) {
  //         const courses = await fetchGetCourse(id).then((res) => {
  //           setData(res);
  //         });
  //         return courses;
  //       }
  //       if (data?.img) {
  //         const img = await fetchGetCourseImage(data?.img);
  //         setUrl(img);
  //       }
  //     } catch {
  //       console.log("error");
  //     }
  //   };
  //   fetchInfo();
  // }, []);

  return (
    <main>
      <div>
        <p className="p-10 text-[60px] absolute z-10 text-white font-semibold ">
          {data?.nameRU}
        </p>
        <img src={url} alt="" className="relative" md:w-32 />
      </div>

      <section className="my-[20px] pb-[40px] flex flex-col">
        <p className=" text-[40px] text-black font-semibold my-10">
          Подойдет для вас, если:
        </p>
        <section className="flex gap-[17px]  flex-wrap justify-center items-stretch">
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
          {/* </div>
          </div> */}

          {/* <div className="card ">
            <div className="flex gap-6">
              <span className="text-btnColor number-reasons">2</span>
              <p className="text-reasons">
                Хотите укрепить <br />
                позвоночник, избавиться <br />
                от болей в спине и суставах
              </p>
            </div>
          </div>
          <div className="card ">
            <div className="flex gap-6 w-full">
              <span className="text-btnColor number-reasons">3</span>
              <p className="text-reasons w-full">
                Ищете активность, полезную для тела и души
              </p>
            </div>
          </div> */}
        </section>
      </section>
      <section className="flex flex-col">
        <p className=" text-[40px] text-black font-semibold">Направления</p>
        <div className="bg-btnColor mt-[40px] w-full rounded-[28px] p-[30px] flex items-stretch flex-wrap justify-center">
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
          <p className=" leading-none text-[60px] text-black font-bold ">
            Начни путь <br />к новому телу
          </p>
          <ul className="w-[437px] my-7 flex items-start flex-col justify-start">
            <li className="items">проработка всех групп мышц</li>
            <li className="items">тренировка суставов</li>
            <li className="items">улучшение циркуляции крови</li>
            <li className="items">упражнения заряжают бодростью</li>
            <li className="items">помогают противостоять стрессам</li>
          </ul>
          <button className="bg-btnColor rounded-small w-[437px] h-btnHeight text-black text-lg my-[28px]">
            <p className="text-[18px]">Войдите, чтобы добавить курс</p>
          </button>
        </div>
        <img
          src="/images/infoCourse.svg"
          alt=""
          className="relative left-[130px] z-10"
        />
        <img
          src="/images/vector1.svg"
          alt=""
          className="relative bottom-[150px] right-[300px]"
        />
        <img
          src="/images/vector2.svg"
          alt=""
          className="relative right-[570px] top-[120px]"
        />
      </section>
    </main>
  );
};

export default CourseInfo;
