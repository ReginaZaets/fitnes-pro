type CourseType = {
  name: string;
  img: string;
  duration: string;
  days: number;
  difficulty: number;
};

export const CourseCard = ({ course }: { course: CourseType }) => {
  return (
    <div className="w-[360px] h-[501px]  flex flex-col justify-start font-normal text-[16px] leading-[17px] bg-white gap-[10px] mt-[24px] rounded-[30px]">
      <img src={course.img} className="rounded-[30px]" />
      <div className="flex flex-col gap-[17px] pl-[10px]">
        <div className="font-medium text-[32px] leading-[35px]">
          {course.name}
        </div>
        <div className="content flex flex-row ">
          <div className="days">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.5 1.625C6.5 0.796573 5.82843 0.125 5 0.125C4.17157 0.125 3.5 0.796573 3.5 1.625C1.84315 1.625 0.5 2.96815 0.5 4.625H15.5C15.5 2.96815 14.1569 1.625 12.5 1.625C12.5 0.796573 11.8284 0.125 11 0.125C10.1716 0.125 9.5 0.796573 9.5 1.625H6.5Z"
                fill="#202020"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.5 6.125H15.5V10.325C15.5 12.0052 15.5 12.8452 15.173 13.487C14.8854 14.0515 14.4265 14.5104 13.862 14.798C13.2202 15.125 12.3802 15.125 10.7 15.125H5.3C3.61984 15.125 2.77976 15.125 2.13803 14.798C1.57354 14.5104 1.1146 14.0515 0.82698 13.487C0.5 12.8452 0.5 12.0052 0.5 10.325V6.125ZM9.5 10.325C9.5 9.90496 9.5 9.69494 9.58175 9.53451C9.65365 9.39338 9.76838 9.27865 9.90951 9.20675C10.0699 9.125 10.28 9.125 10.7 9.125H11.3C11.72 9.125 11.9301 9.125 12.0905 9.20675C12.2316 9.27865 12.3463 9.39338 12.4183 9.53451C12.5 9.69494 12.5 9.90496 12.5 10.325V10.925C12.5 11.345 12.5 11.5551 12.4183 11.7155C12.3463 11.8566 12.2316 11.9713 12.0905 12.0433C11.9301 12.125 11.72 12.125 11.3 12.125H10.7C10.28 12.125 10.0699 12.125 9.90951 12.0433C9.76838 11.9713 9.65365 11.8566 9.58175 11.7155C9.5 11.5551 9.5 11.345 9.5 10.925V10.325Z"
                fill="#202020"
              />
            </svg>
            <div className="дни">{course.days} дней</div>
          </div>
          <div className="times">
            <div className="icon"></div>
            <div className="min">{course.duration} мин/день</div>
          </div>
        </div>
        <div className="level">
          <div className="icon"></div>
          <div className="slognost">Сложность</div>
        </div>
      </div>
    </div>
  );
};
