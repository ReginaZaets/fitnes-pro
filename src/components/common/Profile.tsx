import { CourseCard } from "./CourseCard";

import { Link } from "react-router-dom";
import { paths } from "../../lib/paths";
import { useUserContext } from "../../context/hooks/useUser";
import { useEffect, useState } from "react";
import { fetchGetCoursesUser } from "../../api/coursesApi";
import { Course } from "../../types/types";

const Profile = () => {
  const { user, logout } = useUserContext();
  const [coursesUser, setCoursesUser] = useState<Course[]>([]);

  useEffect(() => {
    if (user) {
      fetchGetCoursesUser(user._uid).then(({ filteredCourses }) => {
        setCoursesUser(filteredCourses);
      });
    }
  }, [user]);

  return (
    <div>
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
              {user?.name}
            </p>
            <p className="text-[18px] font-normal pb-[30px]">
              Логин: {user?.email}
            </p>
          </div>

          <div className="flex flex-col items-center gap-[10px] sm:flex-row ">
            <Link to={paths.NEW_PASSWORD_MODAL}>
              <button className="bg-btnColor hover:bg-btnHoverGreen active:bg-black active:text-white rounded-small h-[52px] sm:w-[192px] w-[248px] text-black text-[18px]">
                Изменить пароль
              </button>
            </Link>
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
      <h2 className="text-[24px] lg:text-[40px] font-semibold text-black pt-[24px] pb-[0] sm:pt-[60px] sm:pb-[30px]">
        Мои курсы
      </h2>

      {/* Здесь будут карточки */}
      <div className="flex flex-row flex-wrap items-center gap-[40px]">
        {coursesUser.map((course) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default Profile;
