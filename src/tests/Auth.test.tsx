import { describe, test } from "@jest/globals";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import User from "../components/common/User";
import "@testing-library/jest-dom";
import { login } from "../api/authUsersApi";
import { User as FirebaseUser } from "@firebase/auth";

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

    const clickSignin = screen.getByText("Войти");
    fireEvent.click(clickSignin);

    const emailInput = screen.getByPlaceholderText(/Логин/i);
    fireEvent.input(emailInput, { target: { value: "rigi@mail.ru" } });

    const passwordInput = screen.getByPlaceholderText(/Пароль/i);
    fireEvent.input(passwordInput, { target: { value: "111222" } });

    // Мокируем успешный результат функции login
    const loginMock = login as jest.MockedFunction<typeof login>;
    
    const mockUser: FirebaseUser = {
      uid: "s6EFazgbKeWUnq2QzYrcva7ByvJ2",
      email: "rigi@mail.ru",
      displayName: "rigi",
    } as FirebaseUser;

    loginMock.mockResolvedValueOnce(mockUser);

    const submitButton = screen.getByTestId("signin");
    fireEvent.click(submitButton);

    // Проверяем, что login был вызван с правильными данными
    expect(loginMock).toHaveBeenCalledWith(userEmail, userPassword);

    await waitFor(() => {
      // Убедитесь, что модалка закрылась и кнопка "Войти" исчезла
      expect(screen.queryByText("Войти")).not.toBeInTheDocument();
      // Проверяем, что отобразилось имя пользователя после успешного входа
      expect(screen.getByText(user)).toBeInTheDocument();
    });
  });
});
