import { describe, test } from "@jest/globals";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import User from "../components/common/User";
import "@testing-library/jest-dom";
import { act } from "react";
import { UserProvider } from "../context/user";
import Profile from "../components/common/Profile";
import WorkoutComponent from "../components/common/WorkoutComponent";
import { MemoryRouter, Route, Routes, useLocation } from "react-router-dom";
import { Course, Workout } from "../types/types";
import { CourseCard } from "../components/common/CourseCard";

export const initializeApp = jest.fn();
export const getAnalytics = jest.fn(() => ({
  isSupported: jest.fn(() => false),
}));
export const getDatabase = jest.fn();
export const getAuth = jest.fn();

const user = "rigi";
const userEmail = "rigi@mail.ru";
const userPassword = "111222";
const userID = "s6EFazgbKeWUnq2QzYrcva7ByvJ2";

jest.mock("../api/firebaseConfig.ts", () => ({
  initializeApp: jest.fn(),
  getAnalytics: jest.fn(() => ({
    isSupported: jest.fn(() => false),
  })),
  getDatabase: jest.fn(),
  getAuth: jest.fn(),
}));
jest.mock("../api/authUsersApi.ts", () => ({
  login: jest.fn(() =>
    Promise.resolve({
      user: { name: "rigi", id: "s6EFazgbKeWUnq2QzYrcva7ByvJ2" },
    })
  ),
}));
jest.mock("firebase/auth", () => ({
  onAuthStateChanged: jest.fn((auth, callback) => {
    callback({
      uid: "s6EFazgbKeWUnq2QzYrcva7ByvJ2",
      email: "rigi@mail.ru",
      displayName: "rigi",
    });
    return () => {};
  }),
}));
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: jest.fn(),
}));
const workout: Workout = {
  _id: "3yvozj",
  exercises: [],
  name: "Утренняя практика / Йога на каждый день / 1 день / Алексей Казубский",
  video: "https://www.youtube.com/embed/oqe98Dxivns",
};
const course: Course = {
  _id: "ab1c3f",
  nameEN: "Yoga",
  nameRU: "Йога",
  order: 4,
  workouts: ["3yvozj", "hfgxlo"],
  img: "course_img/cardImg1.png",
  description: "",
  directions: [],
  fitting: [],
};

const mockUseLocation = (pathname: string) => {
  (useLocation as jest.Mock).mockReturnValue({ pathname });
};

describe("workout test", () => {
  test("click on button workout", async () => {
    mockUseLocation("/profile");
    render(
      <MemoryRouter initialEntries={[`/profile`]}>
        <Routes>
          <Route
            path="/profile"
            element={
              <UserProvider>
                <CourseCard
                  course={course}
                  progress={10}
                  onAdd={() => {}}
                  onRemove={() => {}}
                  _id={course._id}
                  openSigninModal={() => {}}
                />
              </UserProvider>
            }
          />
          <Route
            path={`/course/${course._id}/workout/${workout._id}`}
            element={<WorkoutComponent />}
          />
        </Routes>
      </MemoryRouter>
    );
    await waitFor(() => {
      fireEvent.click(screen.getByTestId("workout"));
    });
    expect(screen.getByTestId("workout")).toBeInTheDocument();
    await waitFor(() => {
      fireEvent.click(screen.getByTestId("workoutUser"));
    });

    // // // Обертываем в act
    // // await act(async () => {
    // //   fireEvent.click(signinButton);
    // // });

    // await waitFor(() => {
    //   expect(screen.getByText("Основы")).toBeInTheDocument();
    // });
  });
});
