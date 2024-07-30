import { Outlet } from "react-router-dom";
import { CourseCard } from "../components/common/CourseCard";
import {courses} from  "../consts"

const UserProfile = () => {
  return (
    <>
      <main>
        <h2 className="text-[40px] font-semibold text-black pb-10">Профиль</h2>

        <div className="flex gap-[33px] bg-white rounded-[30px] shadow-[0_4px_67px_-12px_rgba(0,0,0,0.13)] p-[30px] w-full">
          
            <img
              className="w-[141px] lg:w-[197px]"
              src="/images/icon-profile.svg"
              alt="картинка пользователя"
            />
         
          
          <div className="flex flex-col justify-between">
            <div>
              <p className="text-[32px] font-semibold pb-[30px]">Сергей</p>
              <p className="text-[18px] font-normal">Логин: sergey.petrov96</p>
            </div>

            <div className="flex gap-[10px]">
              <button className="bg-btnColor hover:bg-btnHoverGreen active:bg-black active:text-white rounded-small h-[52px] w-[192px] text-black text-[18px]">
                Изменить пароль
              </button>
              <button className=" hover:bg-btnHoverWhite active:bg-btnActive rounded-small h-[52px] w-[192px] border border-black  text-black text-lg">
                Выйти
              </button>
            </div>
          </div>
        </div>
        <h2 className="text-[40px] font-semibold text-black pt-[60px] pb-[30px]">
          Мои курсы
        </h2>

        {/* Здесь будут карточки */}
        <div className="flex flex-row flex-wrap items-center gap-[40px]">
          {courses.map((course) => (
            <CourseCard key={course.name} course={course} />
          ))}
        </div>
        <Outlet />
      </main>
    </>
  );
};

export default UserProfile;
