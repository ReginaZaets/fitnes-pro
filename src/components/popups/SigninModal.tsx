type PropsModal = {
  active: boolean;
  setActive: (active: boolean) => void;
  handleClickSignup: () => void;
};

const SigninModal = ({ active, setActive, handleClickSignup }: PropsModal) => {
  return (
    <div
      onClick={() => setActive(false)}
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 z-10 transition-opacity duration-300 ${active ? "opacity-1 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute bg-white border w-signinModalWidth h-signinModalHeight shadow-customShadow rounded-radiusModal p-10"
      >
        <img
          src="/images/logo.svg"
          alt="imageLogo"
          className="w-logosigninModalW h-logosigninModalH ml-[30px] "
        />
        <div className="flex flex-col items-center mt-12 gap-2.5">
          <input
            className="border w-inputWidth h-inputHeight rounded-lg pl-inputPadding py-4 text-lg leading-textHeight"
            type="text"
            name="login"
            placeholder="Эл. почта"
          />
          <input
            className="border w-inputWidth h-inputHeight rounded-lg pl-inputPadding py-4 text-lg leading-textHeight"
            type="password"
            name="password"
            placeholder="Пароль"
          />
          <input
            className="border w-inputWidth h-inputHeight rounded-lg pl-inputPadding py-4 text-lg leading-textHeight"
            type="password"
            name="password"
            placeholder="Повторите пароль"
          />
        </div>
        <div className="flex flex-col gap-2.5 mt-btnModalMargin">
          <button className="w-inputWidth h-inputHeight border rounded-small bg-btnColor text-lg font-normal text-black leading-textHeight hover:bg-[#C6FF00] active:bg-[#000000] active:text-[#FFFFFF]">
            Зарегистрироваться
          </button>
          <button
            onClick={handleClickSignup}
            className="w-inputWidth h-inputHeight border border-black rounded-small text-lg font-normal text-black leading-textHeight hover:bg-[#F7F7F7] active:bg-[#E9ECED]"
          >
            Войти
          </button>
        </div>
      </div>
    </div>
  );
};

export default SigninModal;
