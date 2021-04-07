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
import Login from "./index";
import { ValidationStub } from "@/presentation/test/mock-validation";
import faker from "faker";
import {
  AuthenticationSpy,
  FormHelper,
  SaveAccessTokenMock,
} from "@/presentation/test";
import { InvalidCredentialsError } from "@/domain/errors";
import { fillField } from "@/presentation/test/form-helper";

type SutTypes = {
  sut: RenderResult;
  authenticationSpy: AuthenticationSpy;
  saveAccessTokenMock: SaveAccessTokenMock;
};
type SutParams = {
  validationError: string;
};
const history = createMemoryHistory({ initialEntries: ["/login"] });
const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  validationStub.errorMessage = params?.validationError;
  const authenticationSpy = new AuthenticationSpy();
  const saveAccessTokenMock = new SaveAccessTokenMock();

  const sut = render(
    <Router history={history}>
      <Login
        validation={validationStub}
        authentication={authenticationSpy}
        saveAccessToken={saveAccessTokenMock}
      />
      ,
    </Router>,
  );
  return { sut, authenticationSpy, saveAccessTokenMock };
};

const simulateValidSubmit = async (
  sut: RenderResult,
  email = faker.internet.email(),
  password = faker.internet.password(),
): Promise<void> => {
  const { getByTestId } = sut;
  FormHelper.fillField(sut, "email", email);
  FormHelper.fillField(sut, "password", password);

  const form = getByTestId("form");
  fireEvent.submit(form);
  await waitFor(() => form);
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

describe("Login component", () => {
  afterEach(cleanup);

  test("Should start with inicial state ", () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    const { getByTestId } = sut;

    FormHelper.testChidrenCount(sut, "status-container", 0);

    FormHelper.testButtonIsDisabled(sut, "submitButton", true);

    FormHelper.testStatusField(sut, "email", validationError);

    FormHelper.testStatusField(sut, "password", validationError);
  });

  test("Should show email error message if validation fails", () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    FormHelper.fillField(sut, "email");
    FormHelper.testStatusField(sut, "email", validationError);
  });

  test("Should show password error message if validation fails", () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    FormHelper.fillField(sut, "password");
    FormHelper.testStatusField(sut, "password", validationError);
  });

  test("Should valid email state if validation is success", () => {
    const { sut } = makeSut();
    const { getByTestId } = sut;

    FormHelper.fillField(sut, "email");
    FormHelper.testStatusField(sut, "email");
  });

  test("Should valid password state if validation is success", () => {
    const { sut } = makeSut();
    const { getByTestId } = sut;

    const passwordInput = getByTestId("password");
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() },
    });
    FormHelper.testStatusField(sut, "password");
  });

  test("Submit button should be enabled if validation is success", () => {
    const { sut } = makeSut();
    const { getByTestId } = sut;
    FormHelper.fillField(sut, "email");
    FormHelper.fillField(sut, "password");

    FormHelper.testButtonIsDisabled(sut, "submitButton", false);
    const submitButton = getByTestId("submitButton") as HTMLButtonElement;
    expect(submitButton.disabled).toBe(false);
  });

  test("Should show loading if form is submited", async () => {
    const { sut } = makeSut();

    await simulateValidSubmit(sut);

    FormHelper.testElementToBeTruthy(sut, "spinner");
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
    FormHelper.testChidrenCount(sut, "status-container", 1);
  });

  test("Should call SaveAccessToken to localstorage on success", async () => {
    const { sut, authenticationSpy, saveAccessTokenMock } = makeSut();
    const { getByTestId } = sut;

    await simulateValidSubmit(sut);
    expect(saveAccessTokenMock.accessToken).toBe(
      authenticationSpy.account.accessToken,
    );

    expect(history.length).toBe(1);

    expect(history.location.pathname).toBe("/");
  });

  test("Should show error if SaveAccessToken fails", async () => {
    const { sut, saveAccessTokenMock } = makeSut();
    const { getByTestId } = sut;
    const error = new InvalidCredentialsError();
    jest
      .spyOn(saveAccessTokenMock, "save")
      .mockReturnValueOnce(Promise.reject(error));

    await simulateValidSubmit(sut);
    testElementText(sut, "main-error", error.message);
    FormHelper.testChidrenCount(sut, "status-container", 1);
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
