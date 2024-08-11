import { Link } from "react-router-dom";
import { paths } from "../../../lib/paths";

const MyProgressDone = () => {
  return (
    <>
      <Link to={paths.WORKOUT}>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 z-10">
      <div className="absolute bg-white border w-[343px] h-[252px] md:w-[426px] md:h-[278px] shadow-customShadow rounded-radiusModal p-10">
        <p className="text-[32px] md:text-[40px] leading-[48px] text-center">
          Ваш прогресс засчитан!
        </p>
        <img
          src="/images/CheckInCircle.png"
          alt="check"
          className="w-[68px] h-[68px] mt-[34px] mx-[139px]"
        />
      </div>
    </div>
      </Link>
      
    </>
    
  );
};

export default MyProgressDone;
