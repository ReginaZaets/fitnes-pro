import { useEffect, useRef } from "react";
import { useOnClickOutside } from "../../../context/hooks/useOnClickToCloseModal";

type PropsModal = {
  setIsWorkoutProgressModalDone: (value: boolean) => void;
};
const MyProgressDone = ({ setIsWorkoutProgressModalDone }: PropsModal) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(modalRef, () => {
    setIsWorkoutProgressModalDone(false);
  });

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 z-10">
      <div
        ref={modalRef}
        className="absolute bg-white border w-[343px] h-[252px] md:w-[426px] md:h-[278px] shadow-customShadow rounded-radiusModal p-10"
      >
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
  );
};

export default MyProgressDone;
