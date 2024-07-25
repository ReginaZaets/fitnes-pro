import { CourseCard } from "../components/common/CourseCard";
import Header from "../components/common/Header";
import { courses } from "../consts";

const MainPage = () => {
  return (
    <div className="bg-mainColor flex flex-col justify-center items-center">
      <Header />
      <div className="flex gap-[5px] font-normal  text-2xl w-[79%] items-center my-4 ">
        <div className="text-6xl w-5/6 h-32 text-black font-medium leading-[60px]">
          Начните заниматься спортом и улучшите качество жизни
        </div>
        <div className="relative max-w-xs p-4 bg-[#BCEC30] text-black rounded-lg w-[288px] flex items-center ">
          <div className="absolute top-[94%] transform -translate-y-1/1 w-4 h-4 bg-[#BCEC30] rotate-45 "></div>{" "}
          <p>Измени своё тело за пол года</p>
        </div>
      </div>
      <div className="flex flex-row flex-wrap items-center gap-[30px] pl-[6%] ml-[5%] ">
        {courses.map((course) => (
          <CourseCard key={course.name} course={course} />
        ))}
      </div>
    </div>
  );
};

export default MainPage;
