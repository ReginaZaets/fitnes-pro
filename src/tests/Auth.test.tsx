import { describe, test } from "@jest/globals";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import User from "../components/common/User";
import "@testing-library/jest-dom";


const user = "rigi";
const userEmail = "rigi@mail.ru";
const userPassword = "111222";
const userID = "s6EFazgbKeWUnq2QzYrcva7ByvJ2";

jest.mock("../api/authUsersApi", () => ({
  login: jest.fn(),
}));

describe("auth test", () => {
  test("click on button signin", async () => {
    render(<User />);

    const clickSignin = screen.getByTestId("signinUser");
    fireEvent.click(clickSignin);

    const emailInput = screen.getByPlaceholderText(/Логин/i);
    expect(screen.queryByTestId("email")).toContainHTML("");
    fireEvent.input(emailInput, { target: { value: "rigi@mail.ru" } });
    expect(screen.queryByTestId("email")).toContainHTML("rigi@mail.ru");

    const passwordInput = screen.getByPlaceholderText(/Пароль/i);
    expect(screen.queryByTestId("password")).toContainHTML("");
    fireEvent.input(passwordInput, { target: { value: "111222" } });
    expect(screen.queryByTestId("password")).toContainHTML("111222");

    // const signinButton = screen.getByTestId("signin");
    // fireEvent.click(signinButton);

    // await waitFor(() => {
    //  
    //   expect(screen.getByText("Войти")).not.toBeInTheDocument();
    //   expect(screen.getByText(user)).toBeInTheDocument();
    // });
  });
});
