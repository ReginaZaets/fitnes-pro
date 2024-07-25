
const SigninModal = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 z-10">
      <div className="absolute bg-white border w-signinModalWidth h-signinModalHeight shadow-customShadow rounded-radiusModal p-10">
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
            type="text"
            name="password"
            placeholder="Пароль"
          />
          <input
            className="border w-inputWidth h-inputHeight rounded-lg pl-inputPadding py-4 text-lg leading-textHeight"
            type="text"
            name="password"
            placeholder="Повторите пароль"
          />
        </div>
        <div className="flex flex-col gap-2.5 mt-btnModalMargin">
          <button className="w-inputWidth h-inputHeight border rounded-small bg-btnColor text-lg font-normal text-black leading-textHeight">
           Зарегистрироваться
          </button>
          <button className="w-inputWidth h-inputHeight border border-black rounded-small text-lg font-normal text-black leading-textHeight">
            Войти
          </button>
        </div>
      </div>
    </div>
  );
};

export default SigninModal;
