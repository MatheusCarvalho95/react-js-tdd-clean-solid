import React from "react";
import {
  render,
  RenderResult,
  fireEvent,
  cleanup,
} from "@testing-library/react";
import Login from "./index";
import { Validation } from "@/presentation/protocols/validation";
import { ValidationSpy } from "@/presentation/test/mock-validation";

type SutTypes = {
  sut: RenderResult;
  validationSpy: ValidationSpy;
};

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy();
  const sut = render(<Login validation={validationSpy} />);
  return { sut, validationSpy };
};

describe("Login component", () => {
  test("Should start with inicial state ", () => {
    const { sut } = makeSut();
    const { getByTestId } = sut;

    const status = getByTestId("status-container");
    expect(status.childElementCount).toBe(0);

    const submitButton = getByTestId("submitButton") as HTMLButtonElement;
    expect(submitButton.disabled).toBe(true);

    const emailStatus = getByTestId("email-status");
    expect(emailStatus.title).toBe("Campo obrigatório");
    expect(emailStatus.textContent).toBe("🔴");

    const passwordStatus = getByTestId("password-status");
    expect(passwordStatus.title).toBe("Campo obrigatório");
    expect(passwordStatus.textContent).toBe("🔴");
  });

  test("Should call validation with correct email", () => {
    const { sut, validationSpy } = makeSut();
    const { getByTestId } = sut;
    const emailInput = getByTestId("email");
    fireEvent.input(emailInput, { target: { value: "any_email" } });
    expect(validationSpy.fieldName).toBe("email");
    expect(validationSpy.fieldValue).toBe("any_email");
  });

  test("Should call validation with correct password", () => {
    const { sut, validationSpy } = makeSut();
    const { getByTestId } = sut;
    const passwordInput = getByTestId("password");
    fireEvent.input(passwordInput, { target: { value: "any_password" } });
    expect(validationSpy.fieldName).toBe("password");
    expect(validationSpy.fieldValue).toBe("any_password");
  });
});
