const CourseInfo = () => {
  return (
    <main>
      <div>
        <p className="p-10 text-[60px] absolute z-10 text-white font-semibold ">
          Йога
        </p>
        <img
          src="/images/skillCards/yoga.png"
          alt=""
          className="relative"
          md:w-32
        />
      </div>

      <section className="my-[20px] pb-[40px] flex flex-col">
        <p className=" text-[40px] text-black font-semibold my-10">
          Подойдет для вас, если:
        </p>
        <section className="flex gap-[17px]  flex-wrap justify-center items-stretch">
          <div className=" card">
            <div className="flex gap-6 ">
              <span className="text-btnColor number-reasons">1</span>
              <p className="text-reasons">
                Давно хотели
                <br /> попробовать йогу, <br /> но не решались начать
              </p>
            </div>
          </div>

          <div className="card ">
            <div className="flex gap-6">
              <span className="text-btnColor number-reasons">2</span>
              <p className="text-reasons">
                Хотите укрепить <br />
                позвоночник, избавиться <br />
                от болей в спине и суставах
              </p>
            </div>
          </div>
          <div className="card ">
            <div className="flex gap-6 w-full">
              <span className="text-btnColor number-reasons">3</span>
              <p className="text-reasons w-full">
                Ищете активность, полезную для тела и души
              </p>
            </div>
          </div>
        </section>
      </section>
      <section className="flex flex-col">
        <p className=" text-[40px] text-black font-semibold">Направления</p>
        <div className="bg-btnColor mt-[40px] w-full rounded-[28px] p-[30px] flex items-stretch flex-wrap justify-center">
          <div className="direction">
            <span className="directions-name ">Йога для новичков</span>
            <span className="directions-name">Классическая йога</span>
            <span className="directions-name">Кундалини-йога</span>
            <span className="directions-name">Йогатерапия</span>
            <span className="directions-name">Хатха-йога</span>
            <span className="directions-name">Аштанга-йога</span>
          </div>
        </div>
      </section>
      <section className="flex absolute my-[142px]">
        <div className="flex flex-col items-start">
          <p className=" leading-none text-[60px] text-black font-bold ">
            Начни путь <br />к новому телу
          </p>
          <ul className="w-[437px] my-7 flex items-start flex-col justify-start">
            <li className="items">проработка всех групп мышц</li>
            <li className="items">тренировка суставов</li>
            <li className="items">улучшение циркуляции крови</li>
            <li className="items">упражнения заряжают бодростью</li>
            <li className="items">помогают противостоять стрессам</li>
          </ul>
          <button className="bg-btnColor rounded-small w-[437px] h-btnHeight text-black text-lg my-[28px]">
            <p className="text-[18px]">Войдите, чтобы добавить курс</p>
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
    </main>
  );
};

export default CourseInfo;
