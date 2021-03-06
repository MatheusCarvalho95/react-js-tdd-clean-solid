import { fireEvent, waitFor, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import Login from "./index";
import { ValidationStub } from "@/presentation/test/mock-validation";
import faker from "faker";
import {
  AuthenticationSpy,
  FormHelper,
  RenderWithHistory,
} from "@/presentation/test";
import { InvalidCredentialsError } from "@/domain/errors";
import { Authentication } from "@/domain/usecases";

type SutTypes = {
  authenticationSpy: AuthenticationSpy;
  setCurrentAccountMock: (account: Authentication.Model) => void;
};
type SutParams = {
  validationError: string;
};
const history = createMemoryHistory({ initialEntries: ["/login"] });
const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  validationStub.errorMessage = params?.validationError;
  const authenticationSpy = new AuthenticationSpy();

  const { setCurrentAccountMock } = RenderWithHistory({
    history,
    Page: () =>
      Login({ validation: validationStub, authentication: authenticationSpy }),
  });
  return { authenticationSpy, setCurrentAccountMock };
};

const simulateValidSubmit = async (
  email = faker.internet.email(),
  password = faker.internet.password(),
): Promise<void> => {
  FormHelper.fillField("email", email);
  FormHelper.fillField("password", password);

  const form = screen.getByTestId("form");
  fireEvent.submit(form);
  await waitFor(() => form);
};

describe("Login component", () => {
  test("Should start with inicial state ", () => {
    const validationError = faker.random.words();
    makeSut({ validationError });

    FormHelper.testChidrenCount("status-container", 0);

    FormHelper.testButtonIsDisabled("submitButton", true);

    FormHelper.testStatusField("email", validationError);

    FormHelper.testStatusField("password", validationError);
  });

  test("Should show email error message if validation fails", () => {
    const validationError = faker.random.words();
    makeSut({ validationError });
    FormHelper.fillField("email");
    FormHelper.testStatusField("email", validationError);
  });

  test("Should show password error message if validation fails", () => {
    const validationError = faker.random.words();
    makeSut({ validationError });
    FormHelper.fillField("password");
    FormHelper.testStatusField("password", validationError);
  });

  test("Should valid email state if validation is success", () => {
    makeSut();

    FormHelper.fillField("email");
    FormHelper.testStatusField("email");
  });

  test("Should valid password state if validation is success", () => {
    makeSut();
    const passwordInput = screen.getByTestId("password");
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() },
    });
    FormHelper.testStatusField("password");
  });

  test("Submit button should be enabled if validation is success", () => {
    makeSut();
    FormHelper.fillField("email");
    FormHelper.fillField("password");

    FormHelper.testButtonIsDisabled("submitButton", false);
    const submitButton = screen.getByTestId(
      "submitButton",
    ) as HTMLButtonElement;
    expect(submitButton.disabled).toBe(false);
  });

  test("Should show loading if form is submited", async () => {
    makeSut();
    await simulateValidSubmit();

    FormHelper.testElementToBeTruthy("spinner");
  });

  test("Should calll authetication with correct values", async () => {
    const { authenticationSpy } = makeSut();

    const email = faker.internet.email();
    const password = faker.internet.password();
    await simulateValidSubmit(email, password);

    expect(authenticationSpy.params).toEqual({
      email,
      password,
    });
  });

  test("Should call authetication only once", async () => {
    const { authenticationSpy } = makeSut();

    await simulateValidSubmit();
    await simulateValidSubmit();
    expect(authenticationSpy.callsCount).toBe(1);
  });

  test("Should not call authetication if invalid form", async () => {
    const validationError = faker.random.words();

    const { authenticationSpy } = makeSut({ validationError });

    await simulateValidSubmit();

    expect(authenticationSpy.callsCount).toBe(0);
  });

  test("Should show error if authentication fails", async () => {
    const { authenticationSpy } = makeSut();

    const error = new InvalidCredentialsError();
    jest
      .spyOn(authenticationSpy, "auth")
      .mockReturnValueOnce(Promise.reject(error));

    await simulateValidSubmit();
    FormHelper.testElementText("main-error", error.message);
    FormHelper.testChidrenCount("status-container", 1);
  });

  test("Should call SaveAccessToken to localstorage on success", async () => {
    const { authenticationSpy, setCurrentAccountMock } = makeSut();

    await simulateValidSubmit();
    expect(setCurrentAccountMock).toHaveBeenCalledWith(
      authenticationSpy.account,
    );

    expect(history.length).toBe(1);

    expect(history.location.pathname).toBe("/");
  });

  test("Should navigate to sign up page", async () => {
    makeSut();
    const registerButton = screen.getByTestId("register-button");

    fireEvent.click(registerButton);

    expect(history.length).toBe(2);

    expect(history.location.pathname).toBe("/signup");
  });
});
