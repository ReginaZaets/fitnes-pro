import { useState } from "react";

const MyProgressDone = () => {
  const [isOpenedMyProgressDone, setIsOpenedMyProgressDone] =
    useState<boolean>(true);

  const toggleModal = () => {
    setIsOpenedMyProgressDone(false);
  };

  return (
    <>
      {isOpenedMyProgressDone && (
        <div
          onClick={toggleModal}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 z-10"
        >
          <div className="absolute bg-white border w-[343px] h-[252px] md:w-[426px] md:h-[278px] shadow-customShadow rounded-radiusModal p-10">
            <p className="text-[32px] md:text-[40px] leading-[110%] text-center">
              Ваш прогресс засчитан!
            </p>
            <img
              src="/images/CheckInCircle.png"
              alt="check"
              className="w-[68px] h-[68px] mt-[34px] mx-[97px] md:mx-[139px]"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default MyProgressDone;
