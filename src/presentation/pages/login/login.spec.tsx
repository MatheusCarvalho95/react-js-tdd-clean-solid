import React from "react";
import { render } from "@testing-library/react";
import Login from "./index";

describe("Login component", () => {
  test("Should start with inicial state ", () => {
    const { getByTestId } = render(<Login />);
    const status = getByTestId("status-container");
    expect(status.childElementCount).toBe(0);
    const submitButton = getByTestId("submitButton") as HTMLButtonElement;
    expect(submitButton.disabled).toBe(true);
  });
});
