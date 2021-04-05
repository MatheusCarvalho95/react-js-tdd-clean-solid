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
import { AuthenticationSpy } from "@/presentation/test";

type SutTypes = {
  sut: RenderResult;
  authenticationSpy: AuthenticationSpy;
};
type SutParams = {
  validationError: string;
};

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  const authenticationSpy = new AuthenticationSpy();
  validationStub.errorMessage = params?.validationError;
  const sut = render(
    <Login validation={validationStub} authentication={authenticationSpy} />,
  );
  return { sut, authenticationSpy };
};

const simulateValidSubmit = (
  sut: RenderResult,
  email = faker.internet.email(),
  password = faker.internet.password(),
): void => {
  const { getByTestId } = sut;
  fillEmailField(sut, email);
  fillPasswordField(sut, password);

  const submitButton = getByTestId("submitButton");
  fireEvent.click(submitButton);
};

const fillEmailField = (
  sut: RenderResult,
  email = faker.internet.email(),
): void => {
  const { getByTestId } = sut;
  const emailInput = getByTestId("email");
  fireEvent.input(emailInput, {
    target: { value: email },
  });
};
const fillPasswordField = (
  sut: RenderResult,
  password = faker.internet.password(),
): void => {
  const { getByTestId } = sut;
  const passwordInput = getByTestId("password");
  fireEvent.input(passwordInput, {
    target: { value: password },
  });
};

const simulateStatusField = (
  sut: RenderResult,
  fieldName: string,
  validationError?: string,
): void => {
  const { getByTestId } = sut;
  const emailStatus = getByTestId(`${fieldName}-status`);
  expect(emailStatus.title).toBe(validationError || "Ok..");
  expect(emailStatus.textContent).toBe(validationError ? "🔴" : "🟢");
};

describe("Login component", () => {
  afterEach(cleanup);

  test("Should start with inicial state ", () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    const { getByTestId } = sut;

    const status = getByTestId("status-container");
    expect(status.childElementCount).toBe(0);

    const submitButton = getByTestId("submitButton") as HTMLButtonElement;
    expect(submitButton.disabled).toBe(true);

    simulateStatusField(sut, "email", validationError);

    simulateStatusField(sut, "password", validationError);
  });

  test("Should show email error message if validation fails", () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    fillEmailField(sut);
    simulateStatusField(sut, "email", validationError);
  });

  test("Should show password error message if validation fails", () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    fillPasswordField(sut);
    simulateStatusField(sut, "password", validationError);
  });

  test("Should valid email state if validation is success", () => {
    const { sut } = makeSut();
    const { getByTestId } = sut;

    fillEmailField(sut);
    simulateStatusField(sut, "email");
  });

  test("Should valid password state if validation is success", () => {
    const { sut } = makeSut();
    const { getByTestId } = sut;

    const passwordInput = getByTestId("password");
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() },
    });
    simulateStatusField(sut, "password");
  });

  test("Submit button should be enabled if validation is success", () => {
    const { sut } = makeSut();
    const { getByTestId } = sut;
    fillPasswordField(sut);
    fillEmailField(sut);

    const submitButton = getByTestId("submitButton") as HTMLButtonElement;
    expect(submitButton.disabled).toBe(false);
  });

  test("Should show loading if form is submited", async () => {
    const { sut } = makeSut();
    const { getByTestId } = sut;

    simulateValidSubmit(sut);

    const loading = getByTestId("spinner");
    expect(loading).toBeTruthy();
  });

  test("Should calll authetication with correct values", async () => {
    const { sut, authenticationSpy } = makeSut();

    const email = faker.internet.email();
    const password = faker.internet.password();
    simulateValidSubmit(sut, email, password);

    expect(authenticationSpy.params).toEqual({
      email,
      password,
    });
  });
});
