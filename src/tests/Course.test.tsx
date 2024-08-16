import { describe, test } from "@jest/globals";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Main } from "../components/common/Main/Main";
import CourseInfo from "../components/CourseInfo/CourseInfo";
import { CourseCard } from "../components/common/CourseCard";
import { Course } from "../types/types";
import { MemoryRouter, Route, Routes } from "react-router-dom";

const course: Course = {
  _id: "6i67sm",
  nameEN: "StepAirobic",
  nameRU: "Степ-аэробика",
  order: 4,
  workouts: [],
  img: "course_img/cardImg4.png",
  description: "",
  directions: [],
  fitting: [],
};

describe("course test", () => {
  test("click on course", () => {
    render(
      <MemoryRouter initialEntries={[`/`]}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Main />
                <CourseCard
                  course={course}
                  progress={0}
                  onAdd={() => {}}
                  onRemove={() => {}}
                  _id={course._id}
                  openSigninModal={() => {}}
                />
              </>
            }
          />
          <Route path={`/course/${course._id}`} element={<CourseInfo />} />
        </Routes>
      </MemoryRouter>
    );
    const courseCard = screen.getByTestId("course");
    fireEvent.click(courseCard);
    waitFor(() => {
      expect(screen.getByText("Направления")).toBeInTheDocument();
    });
  });
});
