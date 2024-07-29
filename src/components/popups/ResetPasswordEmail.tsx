const ResetPasswordEmail = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 z-10">
      <div className="relative bg-white border w-auto max-w-lg h-auto shadow-customShadow rounded-radiusModal p-10">
        <img
          src="/images/logo.svg"
          alt="imageLogo"
          className="w-[220px] h-logosigninModalH ml-[30px] "
        />
        <p className="text-lg leading-textHeight mt-12 text-center">
          Ссылка для востановления пароля отправлена на sergey.petrov96@mail.ru
        </p>
      </div>
    </div>
  );
};

export default ResetPasswordEmail;
