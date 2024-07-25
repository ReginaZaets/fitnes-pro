import { CourseCard } from "../components/common/CourseCard";
import Header from "../components/common/Header";
import { courses } from "../consts";

const MainPage = () => {
  return (
    <div className="bg-mainColor flex flex-col justify-center items-center">
      <Header />
      <div className="text-6xl w-5/6 h-32 text-black font-medium leading-[60px]" >
        Начните заниматься спортом и улучшите качество жизни
      </div>
      <div className="flex flex-row flex-wrap items-center gap-[30px] pl-[7vw] ">
     {courses.map((course) => (
      <CourseCard key={course.name} course={course}/>
     ))}
     </div>
    </div>
  );
};

export default MainPage;
