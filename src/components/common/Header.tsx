import { Link } from "react-router-dom";
import User from "./User";
import { paths } from "../../lib/paths";

const Header = () => {
  return (
    <header>
      <div className="flex flex-row justify-between items-center py-4 sm:py-12 ">
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
          <Link to={paths.MAIN}>
          <img
            src="/images/logo.svg"
            alt="imageLogo"
            className="w-[220px] h-[35px]"
          />
          </Link>
          <p className="hidden py-2 text-sm  text-black font-normal opacity-70  sm:block">
            Онлайн-тренировки для занятий дома
          </p>
        </div>
        <User />
      </div>
    </header>
  );
};

export default Header;
