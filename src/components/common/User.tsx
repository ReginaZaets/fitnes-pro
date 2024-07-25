const User = () => {
  return (
    <div className="flex gap-x-3 items-center relative">

      <button className="bg-btnColor rounded-small w-btnWidth h-btnHeight text-black text-lg">
        Войти
      </button>

      <div className="hidden">
      <img src="/images/Profile.svg" alt="profile" width={50} height={50} />
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
          stroke-width="2"
        />
      </svg>
      </div>

      <div className="hidden absolute top-24 right-0 rounded-3xl bg-white w-userPopWidth h-userPopHeight">
        <div className="flex flex-col items-center justify-center gap-2.5 my-7">
          <p className="text-lg font-normal  text-black">Сергей</p>
          <p className="text-lg font-normal text-headerPopLinkColor mb-8">
            sergey.petrov96@mail.ru
          </p>
          <button className="bg-btnColor hover:bg-btnHoverGreen active:bg-black active:text-white rounded-small h-btnHeight w-btnUserPopWidth text-black text-lg">
            Мой профиль
          </button>
          <button className=" hover:bg-btnHoverWhite active:bg-btnActive rounded-small h-btnHeight w-btnUserPopWidth border border-black  text-black text-lg">
            Выйти
          </button>
        </div>
      </div>
    </div>
  );
};

export default User;
