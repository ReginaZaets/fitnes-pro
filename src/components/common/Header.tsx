const Header = () => {
  return (
    <div className="w-contentWidth my-0 mx-auto ">
      <div className="flex justify-between py-12">
        <div>
          <img src="/images/logo.svg" alt="imageLogo" width={220} height={35} />
          <p className="py-4 text-lg text-black font-normal">Онлайн-тренировки для занятий дома</p>
        </div>
        <button className="bg-btnColor rounded-small w-btnWidth h-btnHeight text-black text-lg">
          Войти
        </button>
      </div>
    </div>
  );
};

export default Header;
