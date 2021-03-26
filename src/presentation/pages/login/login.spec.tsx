import React from "react";
import { render } from "@testing-library/react";
import Login from "./index";

describe("Login component", () => {
  test("", () => {
    const { getByTestId } = render(<Login />);
    const status = getByTestId("status-container");
    expect(status.childElementCount).toBe(0);
  });
});
