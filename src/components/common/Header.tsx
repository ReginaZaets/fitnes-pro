import User from "./User";

const Header = () => {
  return (
    <div className="w-full max-w-7xl px-4 mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center py-4 md:py-12">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <img src="/images/logo.svg" alt="imageLogo" className="w-24 h-24 md:w-auto md:h-auto" />
          <p className="py-2 md:py-4 text-sm md:text-lg text-black font-normal opacity-70 md:opacity-50">
            Онлайн-тренировки для занятий дома
          </p>
        </div>
        <User />
      </div>
    </div>
  );
};

export default Header;
