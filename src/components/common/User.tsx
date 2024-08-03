import { useNavigate } from "react-router-dom";
import { paths } from "../../lib/paths";
import { useEffect } from "react";

const User = () => {
  const navigate = useNavigate();

  const handleCloseModal = () => {
    navigate(paths.MAIN);
  };
  const handleOpenModal = () => {
    navigate(paths.SIGN_IN_MODAL);
  };
  useEffect(() => {
    const handleEscape = (event: any) => {
      if (event.key === "Escape") {
        handleCloseModal();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);
  return (
    <div className="flex gap-x-3 items-center relative">
      <button
        onClick={handleOpenModal}
        className="bg-btnColor  hover:bg-btnHoverGreen active:bg-black active:text-white rounded-small w-[103px] h-[52px] text-black text-lg"
      >
        Войти
      </button>
      <div className="hidden">
        <div className="flex gap-x-3 items-center relative">
          <img src="/images/Profile.svg" alt="profile" />
          <p className="py-4 text-2xl text-black font-normal">Сергей</p>
          <svg
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
      )}

      {isOpen && (
        <div className="absolute z-10 top-24 right-0 rounded-3xl bg-white w-[266px] shadow-[0_4px_67px_-12px_rgba(0,0,0,0.13)]">
          <div className="flex flex-col items-center justify-center gap-2.5 my-7">
            <p className="text-lg font-normal  text-black">{user?.name}</p>
            <p className="text-lg font-normal text-headerPopLinkColor mb-8">
             {user?.email}
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
