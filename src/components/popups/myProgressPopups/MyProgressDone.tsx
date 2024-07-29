const MyProgressDone = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 z-10">
      <div className="absolute bg-white border w-[426px] h-[278px] shadow-customShadow rounded-radiusModal p-10">
        <p className="text-[40px] leading-[48px] text-center">
          Ваш прогресс засчитан!
        </p>
        <img
          src="/images/CheckInCircle.png"
          alt="check"
          className="w-[68px] h-[68px] mt-[34px] mx-[139px]"
        />
      </div>
    </div>
  );
};

export default MyProgressDone;
