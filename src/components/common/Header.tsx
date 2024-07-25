const Header = () => {
  return (
    <div>
      <div className="flex justify-between">
        <div>
          <img src="/images/logo.png" alt="imageLogo" width={220} height={35} />
          <p>Онлайн-тренировки для занятий дома</p>
        </div>
        <button className="bg-btnColor rounded-small w-btnWidth h-btnHeight text-black text-lg">
          Войти
        </button>
      </div>
    </div>
  );
};

export default Header;
