import { describe, test } from "@jest/globals";
import { render, screen, fireEvent } from "@testing-library/react";
import User from "../components/common/User";

describe("auth test", () => {
  test("click on button signin", () => {
    render(<User />);

    const clickSignin = screen.getByText("Войти");
    fireEvent.click(clickSignin);
  });
});
