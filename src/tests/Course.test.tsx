import { describe, test } from "@jest/globals";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Main } from "../components/common/Main";
import CourseInfo from "../components/CourseInfo/CourseInfo";
import { CourseCard } from "../components/common/CourseCard";

const course = "6i67sm"

describe("course test", () => {
  test("click on button signin", async () => {
    render(
      <>
        <Main />
        {/* <CourseCard course={course} progress={0}/> */}
        <CourseInfo />
      </>
    );

  
  });
});
