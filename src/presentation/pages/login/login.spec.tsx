import React from "react";
import {
  render,
  RenderResult,
  fireEvent,
  cleanup,
} from "@testing-library/react";
import Login from "./index";
import { ValidationStub } from "@/presentation/test/mock-validation";
import faker from "faker";

type SutTypes = {
  sut: RenderResult;
  validationStub: ValidationStub;
};

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub();
  validationStub.errorMessage = faker.random.words();
  const sut = render(<Login validation={validationStub} />);
  return { sut, validationStub };
};

describe("Login component", () => {
  test("Should start with inicial state ", () => {
    const { sut, validationStub } = makeSut();
    const { getByTestId } = sut;

    const status = getByTestId("status-container");
    expect(status.childElementCount).toBe(0);

    const submitButton = getByTestId("submitButton") as HTMLButtonElement;
    expect(submitButton.disabled).toBe(true);

    const emailStatus = getByTestId("email-status");
    expect(emailStatus.title).toBe(validationStub.errorMessage);
    expect(emailStatus.textContent).toBe("🔴");

    const passwordStatus = getByTestId("password-status");
    expect(passwordStatus.title).toBe(validationStub.errorMessage);
    expect(passwordStatus.textContent).toBe("🔴");
  });

  test("Should show email error message if validation fails", () => {
    const { sut, validationStub } = makeSut();
    const { getByTestId } = sut;
    const emailInput = getByTestId("email");
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } });
    const emailStatus = getByTestId("email-status");
    expect(emailStatus.title).toBe(validationStub.errorMessage);
    expect(emailStatus.textContent).toBe("🔴");
  });
  test("Should show password error message if validation fails", () => {
    const { sut, validationStub } = makeSut();
    const { getByTestId } = sut;
    const passwordInput = getByTestId("password");
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() },
    });
    const passwordStatus = getByTestId("password-status");
    expect(passwordStatus.title).toBe(validationStub.errorMessage);
    expect(passwordStatus.textContent).toBe("🔴");
  });
  test("Should valid password state if validation is success", () => {
    const { sut, validationStub } = makeSut();
    const { getByTestId } = sut;
    validationStub.errorMessage = null;
    const passwordInput = getByTestId("password");
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() },
    });
    const passwordStatus = getByTestId("password-status");
    expect(passwordStatus.title).toBe("Ok..");
    expect(passwordStatus.textContent).toBe("🟢");
  });
});
