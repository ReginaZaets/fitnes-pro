const CourseInfo = () => {
  return (
    <div className="w-contentWidth my-0 mx-auto">
      <div className=" bg-yogaCard  max-w-[1160px] h-[310px] rounded-[30px] text-[16px] text-white font-bold flex-wrap">
        <p className="p-10 text-[60px]">Йога</p>
      </div>
      <section className="my-[60px] flex flex-col">
        <p className="p-10 text-[40px] text-black font-semibold">
          Подойдет для вас, если:
        </p>
        <section className="flex gap-[17px]  flex-wrap">
          <div className="bg-courseInfoBlock card">
            <div className="flex">
              <span className="text-btnColor number-reasons">1</span>
              <p className="text-reasons">
                Давно хотели
                <br /> попробовать йогу, <br /> но не решались начать
              </p>
            </div>
          </div>

          <div className="bg-courseInfoBlock card">
            <div className="flex">
              <span className="text-btnColor number-reasons">2</span>
              <p className="text-reasons">
                Хотите укрепить <br />
                позвоночник, избавиться <br />
                от болей в спине и суставах
              </p>
            </div>
          </div>
          <div className="bg-courseInfoBlock card">
            <div className="flex">
              <span className="text-btnColor number-reasons">3</span>
              <p className="text-reasons">
                Ищете активность, <br />
                полезную для тела <br /> и души
              </p>
            </div>
          </div>
        </section>
      </section>
      <section className="flex flex-col">
        <p className="p-10 text-[40px] text-black font-semibold">Направления</p>
        <div className="bg-btnColor h-[146px] rounded-[28px] p-[30px] flex items-center justify-center">
          <div className=" grid grid-cols-3 gap-x-[190px] gap-y-8">
            <span className="directions-name ">Йога для новичков</span>
            <span className="directions-name">Классическая йога</span>
            <span className="directions-name">Кундалини-йога</span>
            <span className="directions-name">Йогатерапия</span>
            <span className="directions-name">Хатха-йога</span>
            <span className="directions-name">Аштанга-йога</span>
          </div>
        </div>
      </section>
      <section className="flex absolute">
        <div className="flex flex-col items-start">
          <p className="p-10 text-[60px] text-black font-bold">
            Начни путь к новому телу
          </p>
          <ul className="w-[437px]">
            <li className="items">проработка всех групп мышц</li>
            <li className="items">тренировка суставов</li>
            <li className="items">улучшение циркуляции крови</li>
            <li className="items">упражнения заряжают бодростью</li>
            <li className="items">помогают противостоять стрессам</li>
          </ul>
          <button className="bg-btnColor rounded-small w-[437px] h-btnHeight text-black text-lg m-[28px]">
            <p>Войдите, чтобы добавить курс</p>
          </button>
        </div>
        <img
          src="/images/infoCourse.svg"
          alt=""
          className="relative left-[130px] z-10"
        />
        <img
          src="/images/vector1.svg"
          alt=""
          className="relative bottom-[150px] right-[300px]"
        />
        <img
          src="/images/vector2.svg"
          alt=""
          className="relative right-[570px] top-[120px]"
        />
      </section>
    </div>
  );
};

export default CourseInfo;
