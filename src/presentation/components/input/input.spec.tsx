import React from "react";
import { fireEvent, render, RenderResult } from "@testing-library/react";
import Input from "./index";
import faker from "faker";

const makeSut = (fieldName: string): RenderResult => {
  return render(<Input name={fieldName} state={{}} setState={null} />);
};
describe("Input component", () => {
  test("should begin with read only", () => {
    const field = faker.database.column();
    const sut = makeSut(field);
    const input = sut.getByTestId(field) as HTMLInputElement;
    expect(input.readOnly).toBe(true);
  });

  test("should remove read only on focus", () => {
    const field = faker.database.column();
    const sut = makeSut(field);
    const input = sut.getByTestId(field) as HTMLInputElement;
    fireEvent.focus(input);
    expect(input.readOnly).toBe(false);
  });
});
