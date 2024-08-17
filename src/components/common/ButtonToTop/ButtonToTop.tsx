import { useLocation } from "react-router-dom";

export const ButtonToTop = () => {
  const location = useLocation();
  return (
    <button
      onClick={() => {
        window.scroll({ top: 0, behavior: "smooth" });
      }}
      className={`${
        location.pathname === "/profile" && "sm:hidden"
      } bg-[#BCEC30] w-[127px] h-[52px] rounded-[46px] font-medium text-lg items-center flex justify-center`}
    >
      Наверх ↑
    </button>
  );
};
