import { useState } from "react";
import { Link } from "react-router-dom";
import { paths } from "../../lib/paths";

const User = () => {
  const [user, setUser] = useState<string | null>("julia");
  const [isOpen, setIsOpen] = useState(false);
  const ToggleDropdown = () => setIsOpen((prevState) => !prevState);
  const clickExit = () => {
    setUser(null);
    setIsOpen(false);
  };
  return (
    <div className="flex gap-x-3 items-center relative">
      {!user && (
        <Link to={paths.SIGN_IN_MODAL}>
          <button className="bg-btnColor  hover:bg-btnHoverGreen active:bg-black active:text-white rounded-small w-[83px] h-[36px] sm:w-[103px] sm:h-[52px] text-black text-lg">
            Войти
          </button>
        </Link>
      )}
      {user && (
        <div className="">
          <div className="flex gap-x-3 items-center relative">
            <img src="/images/Profile.svg" alt="profile" />
            <p className="hidden sm:block py-4 text-2xl text-black font-normal">Сергей</p>
            <svg
              onClick={ToggleDropdown}
              className="mx-2"
              width="14"
              height="9"
              viewBox="0 0 14 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.3552 1.03308L6.67761 6.7107L0.999999 1.03308"
                stroke="black"
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>
      )}

      {isOpen && (
        <div className="absolute z-10 top-24 right-0 rounded-3xl bg-white w-[266px] shadow-[0_4px_67px_-12px_rgba(0,0,0,0.13)]">
          <div className="flex flex-col items-center justify-center gap-2.5 my-7">
            <p className="text-lg font-normal  text-black">Сергей</p>
            <p className="text-lg font-normal text-headerPopLinkColor mb-8">
              sergey.petrov96@mail.ru
            </p>
            <Link to={paths.PROFILE}>
              <button
                onClick={() => setIsOpen(false)}
                className="bg-btnColor hover:bg-btnHoverGreen active:bg-black active:text-white rounded-small h-btnHeight w-btnUserPopWidth text-black text-lg"
              >
                Мой профиль
              </button>
            </Link>

            <Link to={paths.MAIN}>
              <button
                onClick={clickExit}
                className="hover:bg-btnHoverWhite active:bg-btnActive rounded-small  h-btnHeight w-btnUserPopWidth border border-black  text-black text-lg"
              >
                Выйти
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
