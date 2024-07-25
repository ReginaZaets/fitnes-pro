const SignupModal = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 z-10 ">
      <div className="absolute bg-white border w-[360px] h-[425px] rounded-radiusModal p-10 shadow-customShadow">
        <img
          src="/images/logo.svg"
          alt="imageLogo"
          className="w-logosigninModalW h-logosigninModalH pl-logoPaddingSigninModal "
        />
        <div className="flex flex-col items-center mt-12 gap-2.5">
          <input
            className="border w-inputWidth h-inputHeight rounded-lg pl-inputPadding py-4 text-lg"
            type="text"
            name="login"
            placeholder="Логин"
          />
          <input
            className="border w-inputWidth h-inputHeight rounded-lg pl-inputPadding py-4 text-lg"
            type="text"
            name="login"
            placeholder="Пароль"
          />
        </div>
        <div className="flex flex-col gap-2.5 mt-btnModalMargin">
          <button className="w-inputWidth h-inputHeight border rounded-small bg-btnColor text-lg font-normal text-black">
            Войти
          </button>
          <button className="w-inputWidth h-inputHeight border border-black rounded-small text-lg font-normal text-black">
            Зарегистрироваться
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupModal;
