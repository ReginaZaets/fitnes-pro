import test, { describe } from "node:test";
import { render, screen, fireEvent } from "@testing-library/react";
import { UserProvider } from "../context/user";
import User from "../components/common/User";

describe("auth test", () => {
  test("click on button register", () => {
    render(
      <UserProvider>
        <User />
      </UserProvider>
    );

    const [clickSignin] = screen.getAllByText("Войти");
    fireEvent.click(clickSignin);
  });
});
