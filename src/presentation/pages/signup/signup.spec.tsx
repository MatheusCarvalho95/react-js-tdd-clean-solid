import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
  waitFor,
} from "@testing-library/react";
import React from "react";
import { Router } from "react-router-dom";
import ApiContext from "../../components/context/api/api-context";
import SignUp from "./signup";
import { createMemoryHistory } from "history";
import { AddAccountSpy, FormHelper, ValidationStub } from "@/presentation/test";
import faker from "faker";
import { EmailInUseError } from "@/domain/errors";
import { AccountModel } from "@/domain/models";
type SutTypes = {
  sut: RenderResult;
  addAccountSpy: AddAccountSpy;
  setCurrentAccountMock: (account: AccountModel) => void;
};
type SutParams = {
  validationError: string;
};
const history = createMemoryHistory({ initialEntries: ["/signup"] });
const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  const addAccountSpy = new AddAccountSpy();
  const setCurrentAccountMock = jest.fn();
  validationStub.errorMessage = params?.validationError;
  const sut = render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
      <Router history={history}>
        <SignUp validation={validationStub} addAccount={addAccountSpy} />,
      </Router>
    </ApiContext.Provider>,
  );
  return { sut, addAccountSpy, setCurrentAccountMock };
};

const simulateValidSubmit = async (
  sut: RenderResult,
  email = faker.internet.email(),
  password = faker.internet.password(),
  name = faker.name.findName(),
): Promise<void> => {
  const { getByTestId } = sut;
  FormHelper.fillField(sut, "name", name);
  FormHelper.fillField(sut, "email", email);
  FormHelper.fillField(sut, "password", password);
  FormHelper.fillField(sut, "passwordConfirmation", password);

  const form = getByTestId("form");
  fireEvent.submit(form);
  await waitFor(() => form);
};

describe("SignUp component", () => {
  afterEach(cleanup);

  test("Should start with inicial state ", () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });

    FormHelper.testChidrenCount(sut, "status-container", 0);

    FormHelper.testButtonIsDisabled(sut, "submitButton", true);

    FormHelper.testStatusField(sut, "name", validationError);

    FormHelper.testStatusField(sut, "email", validationError);

    FormHelper.testStatusField(sut, "password", validationError);

    FormHelper.testStatusField(sut, "passwordConfirmation", validationError);
  });

  test("Should show name error message if validation fails", () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    FormHelper.fillField(sut, "name");
    FormHelper.testStatusField(sut, "name", validationError);
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

  test("Should show passwordConfirmation error message if validation fails", () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    FormHelper.fillField(sut, "passwordConfirmation");
    FormHelper.testStatusField(sut, "passwordConfirmation", validationError);
  });

  test("Should valid email state if validation is success", () => {
    const { sut } = makeSut();

    FormHelper.fillField(sut, "email");
    FormHelper.testStatusField(sut, "email");
  });

  test("Should valid name state if validation is success", () => {
    const { sut } = makeSut();

    FormHelper.fillField(sut, "name");
    FormHelper.testStatusField(sut, "name");
  });

  test("Should valid password state if validation is success", () => {
    const { sut } = makeSut();

    FormHelper.fillField(sut, "password");
    FormHelper.testStatusField(sut, "password");
  });

  test("Should valid password confirmation state if validation is success", () => {
    const { sut } = makeSut();

    FormHelper.fillField(sut, "passwordConfirmation");
    FormHelper.testStatusField(sut, "passwordConfirmation");
  });

  test("Submit button should be enabled if validation is success", () => {
    const { sut } = makeSut();
    const { getByTestId } = sut;
    FormHelper.fillField(sut, "name");
    FormHelper.fillField(sut, "email");
    FormHelper.fillField(sut, "password");
    FormHelper.fillField(sut, "passwordConfirmation");

    FormHelper.testButtonIsDisabled(sut, "submitButton", false);
    const submitButton = getByTestId("submitButton") as HTMLButtonElement;
    expect(submitButton.disabled).toBe(false);
  });

  test("Should show loading if form is submited", async () => {
    const { sut } = makeSut();

    await simulateValidSubmit(sut);

    FormHelper.testElementToBeTruthy(sut, "spinner");
  });

  test("Should calll AddAccount with correct values", async () => {
    const { sut, addAccountSpy } = makeSut();

    const name = faker.name.findName();
    const email = faker.internet.email();
    const password = faker.internet.password();

    await simulateValidSubmit(sut, email, password, name);

    expect(addAccountSpy.params).toEqual({
      name,
      email,
      password,
      passwordConfirmation: password,
    });
  });

  test("Should call authetication only once", async () => {
    const { sut, addAccountSpy } = makeSut();

    await simulateValidSubmit(sut);
    await simulateValidSubmit(sut);
    expect(addAccountSpy.callsCount).toBe(1);
  });

  test("Should not call addAccount if invalid form", async () => {
    const validationError = faker.random.words();

    const { sut, addAccountSpy } = makeSut({ validationError });

    await simulateValidSubmit(sut);

    expect(addAccountSpy.callsCount).toBe(0);
  });

  test("Should show error if add account fails", async () => {
    const { sut, addAccountSpy } = makeSut();
    const { getByTestId } = sut;
    const error = new EmailInUseError();
    jest.spyOn(addAccountSpy, "add").mockRejectedValueOnce(error);

    await simulateValidSubmit(sut);
    FormHelper.testElementText(sut, "main-error", error.message);
    FormHelper.testChidrenCount(sut, "status-container", 1);
  });

  test("Should call SaveAccessToken to localstorage on success", async () => {
    const { sut, addAccountSpy, setCurrentAccountMock } = makeSut();
    await simulateValidSubmit(sut);
    expect(setCurrentAccountMock).toHaveBeenCalledWith(addAccountSpy.account);

    expect(history.length).toBe(1);

    expect(history.location.pathname).toBe("/");
  });

  test("Should navigate to login page", async () => {
    const { sut } = makeSut();
    const { getByTestId } = sut;

    const registerButton = getByTestId("login-button");

    fireEvent.click(registerButton);

    expect(history.length).toBe(2);

    expect(history.location.pathname).toBe("/login");
  });
});
