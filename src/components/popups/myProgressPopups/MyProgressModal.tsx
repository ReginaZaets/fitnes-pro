import { Link } from "react-router-dom";
import { MyProgress } from "../../../lib/myProgress";
import { paths } from "../../../lib/paths";

const MyProgressModal = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 z-10">
      <div className="absolute bg-white border w-[425px] h-[595.5px] shadow-customShadow rounded-radiusModal p-10">
        <h1 className="text-[32px] leading-[35.2px] ml-[17px] text-black">
          Мой прогресс
        </h1>
        <div className="w-[346px] h-[432.5px] mt-[48px] ">
          <div className="w-[346px] h-[346.5px] mt-[48px] overflow-y-auto">
            <div className="w-[320px] h-[346px] ">
              {MyProgress.map((item) => {
                return (
                  <>
                    <h1 className=" text-lg leading-textHeight text-black">
                      {item.topic}
                    </h1>
                    <input
                      className="border w-[320px] h-[52px] rounded-lg mt-[10px] mb-[20px] pl-inputPadding py-4 text-lg leading-textHeight"
                      type="number"
                      name="number"
                      placeholder="0"
                    />
                  </>
                );
              })}
            </div>
          </div>
          <Link to={paths.WORKOUT}>
          <button className="w-[346px] h-inputHeight border rounded-small bg-btnColor text-lg font-normal text-black leading-textHeight mt-btnModalMargin hover:bg-[#C6FF00] active:bg-[#000000] active:text-[#FFFFFF]">
            Сохранить
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyProgressModal;
