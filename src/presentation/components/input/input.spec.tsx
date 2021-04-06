import React from "react";
import { render } from "@testing-library/react";
import Input from "./index";
import Context from "./../context/form";

describe("Input component", () => {
  test("should begin with read only", () => {
    const { getByTestId } = render(
      <Context.Provider value={{ status: {} }}>
        <Input name="field" />
      </Context.Provider>,
    );
    const input = getByTestId("field") as HTMLInputElement;
    expect(input.readOnly).toBe(true);
  });
});
