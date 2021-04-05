import React from "react";
import { Router } from "react-router-dom";
import {
  render,
  RenderResult,
  fireEvent,
  cleanup,
  waitFor,
} from "@testing-library/react";
import { createMemoryHistory } from "history";
import "jest-localstorage-mock";
import Login from "./index";
import { ValidationStub } from "@/presentation/test/mock-validation";
import faker from "faker";
import { AuthenticationSpy } from "@/presentation/test";
import { InvalidCredentialsError } from "@/domain/errors";

type SutTypes = {
  sut: RenderResult;
  authenticationSpy: AuthenticationSpy;
};
type SutParams = {
  validationError: string;
};
const history = createMemoryHistory({ initialEntries: ["/login"] });
const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  const authenticationSpy = new AuthenticationSpy();
  validationStub.errorMessage = params?.validationError;
  const sut = render(
    <Router history={history}>
      <Login validation={validationStub} authentication={authenticationSpy} />,
    </Router>,
  );
  return { sut, authenticationSpy };
};

const simulateValidSubmit = async (
  sut: RenderResult,
  email = faker.internet.email(),
  password = faker.internet.password(),
): Promise<void> => {
  const { getByTestId } = sut;
  fillEmailField(sut, email);
  fillPasswordField(sut, password);

  const form = getByTestId("form");
  fireEvent.submit(form);
  await waitFor(() => form);
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

const testStatusField = (
  sut: RenderResult,
  fieldName: string,
  validationError?: string,
): void => {
  const { getByTestId } = sut;
  const emailStatus = getByTestId(`${fieldName}-status`);
  expect(emailStatus.title).toBe(validationError || "Ok..");
  expect(emailStatus.textContent).toBe(validationError ? "🔴" : "🟢");
};

const testChidrenCount = (sut: RenderResult, count: number): void => {
  const { getByTestId } = sut;
  const status = getByTestId("status-container");
  expect(status.childElementCount).toBe(count);
};

const testElementToBeTruthy = (sut: RenderResult, fieldName: string): void => {
  const { getByTestId } = sut;
  const field = getByTestId(fieldName);
  expect(field).toBeTruthy();
};

const testElementText = (
  sut: RenderResult,
  fieldName: string,
  text: string,
): void => {
  const { getByTestId } = sut;

  const filed = getByTestId(fieldName);
  expect(filed.textContent).toBe(text);
};

const testButtonIsDisabled = (
  sut: RenderResult,
  fieldName: string,
  isDisabled: boolean,
): void => {
  const { getByTestId } = sut;

  const button = getByTestId(fieldName) as HTMLButtonElement;
  expect(button.disabled).toBe(isDisabled);
};

describe("Login component", () => {
  afterEach(cleanup);

  beforeEach(() => {
    localStorage.clear();
  });

  test("Should start with inicial state ", () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    const { getByTestId } = sut;

    testChidrenCount(sut, 0);

    testButtonIsDisabled(sut, "submitButton", true);

    testStatusField(sut, "email", validationError);

    testStatusField(sut, "password", validationError);
  });

  test("Should show email error message if validation fails", () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    fillEmailField(sut);
    testStatusField(sut, "email", validationError);
  });

  test("Should show password error message if validation fails", () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    fillPasswordField(sut);
    testStatusField(sut, "password", validationError);
  });

  test("Should valid email state if validation is success", () => {
    const { sut } = makeSut();
    const { getByTestId } = sut;

    fillEmailField(sut);
    testStatusField(sut, "email");
  });

  test("Should valid password state if validation is success", () => {
    const { sut } = makeSut();
    const { getByTestId } = sut;

    const passwordInput = getByTestId("password");
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() },
    });
    testStatusField(sut, "password");
  });

  test("Submit button should be enabled if validation is success", () => {
    const { sut } = makeSut();
    const { getByTestId } = sut;
    fillPasswordField(sut);
    fillEmailField(sut);

    testButtonIsDisabled(sut, "submitButton", false);
    const submitButton = getByTestId("submitButton") as HTMLButtonElement;
    expect(submitButton.disabled).toBe(false);
  });

  test("Should show loading if form is submited", async () => {
    const { sut } = makeSut();

    await simulateValidSubmit(sut);

    testElementToBeTruthy(sut, "spinner");
  });

  test("Should calll authetication with correct values", async () => {
    const { sut, authenticationSpy } = makeSut();

    const email = faker.internet.email();
    const password = faker.internet.password();
    await simulateValidSubmit(sut, email, password);

    expect(authenticationSpy.params).toEqual({
      email,
      password,
    });
  });

  test("Should call authetication only once", async () => {
    const { sut, authenticationSpy } = makeSut();

    await simulateValidSubmit(sut);
    await simulateValidSubmit(sut);
    expect(authenticationSpy.callsCount).toBe(1);
  });

  test("Should not call authetication if invalid form", async () => {
    const validationError = faker.random.words();

    const { sut, authenticationSpy } = makeSut({ validationError });

    await simulateValidSubmit(sut);

    expect(authenticationSpy.callsCount).toBe(0);
  });

  test("Should show error if authentication fails", async () => {
    const { sut, authenticationSpy } = makeSut();
    const { getByTestId } = sut;
    const error = new InvalidCredentialsError();
    jest
      .spyOn(authenticationSpy, "auth")
      .mockReturnValueOnce(Promise.reject(error));

    await simulateValidSubmit(sut);
    testElementText(sut, "main-error", error.message);
    testChidrenCount(sut, 1);
  });

  test("Should add accessToken to localstorage on success", async () => {
    const { sut, authenticationSpy } = makeSut();
    const { getByTestId } = sut;

    const form = getByTestId("form");

    await simulateValidSubmit(sut);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      "accessToken",
      authenticationSpy.account.accessToken,
    );

    expect(history.length).toBe(1);

    expect(history.location.pathname).toBe("/");
  });

  test("Should navigate to sign up page", async () => {
    const { sut } = makeSut();
    const { getByTestId } = sut;

    const registerButton = getByTestId("register-button");

    fireEvent.click(registerButton);

    expect(history.length).toBe(2);

    expect(history.location.pathname).toBe("/signup");
  });
});
