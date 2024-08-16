import { describe, test } from "@jest/globals";
import { render, screen, fireEvent } from "@testing-library/react";
import User from "../components/common/User/User";
import "@testing-library/jest-dom";

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
    fireEvent.input(passwordInput, { target: { value: "000000" } });
    expect(screen.queryByTestId("password")).toContainHTML("000000");

    const signinButton = screen.getByTestId("signin");
    fireEvent.click(signinButton);

    await screen.findByText("Ошибка входа. Попробуйте еще раз.");

    expect(screen.getByTestId("signin")).toBeInTheDocument();
  });
});
