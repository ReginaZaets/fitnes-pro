const UserProfile = () => {
  return (
    <div className="w-contentWidth my-0 mx-auto">
      <h2 className="text-[40px] font-semibold text-black pb-10">Профиль</h2>

      <div className=" flex gap-[33px] bg-white rounded-[30px] shadow-[0_4px_67px_-12px_rgba(0,0,0,0.13)] p-[30px]">
        <div className="bg-[#D9D9D9] w-[197px] h-[197px] rounded-[20px] relative">
          <img
            className="absolute top-[28px] left-[61px]"
            src="/images/Icon.svg"
            alt=""
          />
          <img
            className="absolute top-[125px]"
            src="/images/Ellipse.svg"
            alt=""
          />
        </div>
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
    </div>
  );
};

export default UserProfile;
