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
        <div className="relative max-w-xs p-3 bg-[#BCEC30] text-black rounded-lg w-[288px] flex items-center ">
          <div className="absolute top-[88%]  rotate-45 w-0 h-0 border-l-[10px] border-r-[10px] border-t-[30px] border-l-transparent border-r-transparent border-t-[#BCEC30] "></div>{" "}
          <p>Измени своё тело за полгода!</p>
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
