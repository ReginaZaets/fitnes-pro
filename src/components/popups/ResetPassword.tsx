const ResetPassword = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 z-10">
      <div className="absolute bg-white border w-auto h-auto shadow-customShadow rounded-radiusModal p-10">
        <img
          src="/images/logo.svg"
          alt="imageLogo"
          className="w-logosigninModalW h-logosigninModalH ml-[30px] "
        />
        <div className="flex flex-col items-center mt-12 gap-2.5">
          <input
            className="border w-inputWidth h-inputHeight rounded-lg leading-textHeight pl-inputPadding py-4 text-lg"
            type="password"
            name="password"
            placeholder="Пароль"
          />
          <input
            className="border w-inputWidth h-inputHeight rounded-lg leading-textHeight pl-inputPadding py-4 text-lg"
            type="password"
            name="password"
            placeholder="Повторите пароль"
          />
        </div>
        <div className="flex flex-col gap-2.5 mt-btnModalMargin">
          <button className="w-inputWidth h-inputHeight border rounded-small bg-btnColor leading-textHeight text-lg font-normal text-black hover:bg-[#C6FF00] active:bg-[#000000] active:text-[#FFFFFF]">
            Подтвердить
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
