import React from "react";
import { fireEvent, render, RenderResult } from "@testing-library/react";
import Input from "./index";
import Context from "./../context/form";

const makeSut = (): RenderResult => {
  return render(
    <Context.Provider value={{ status: {} }}>
      <Input name="field" />
    </Context.Provider>,
  );
};
describe("Input component", () => {
  test("should begin with read only", () => {
    const sut = makeSut();
    const input = sut.getByTestId("field") as HTMLInputElement;
    expect(input.readOnly).toBe(true);
  });

  test("should remove read only on focus", () => {
    const sut = makeSut();
    const input = sut.getByTestId("field") as HTMLInputElement;
    fireEvent.focus(input);
    expect(input.readOnly).toBe(false);
  });
});
