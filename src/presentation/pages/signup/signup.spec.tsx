import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { Router } from "react-router-dom";
import ApiContext from "../../components/context/api/api-context";
import SignUp from "./signup";
import { createMemoryHistory } from "history";
import { AddAccountSpy, FormHelper, ValidationStub } from "@/presentation/test";
import faker from "faker";
import { EmailInUseError } from "@/domain/errors";
import { AddAccount } from "@/domain/usecases";
import { RecoilRoot } from "recoil";
type SutTypes = {
  addAccountSpy: AddAccountSpy;
  setCurrentAccountMock: (account: AddAccount.Model) => void;
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
  render(
    <RecoilRoot>
      <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
        <Router history={history}>
          <SignUp validation={validationStub} addAccount={addAccountSpy} />,
        </Router>
      </ApiContext.Provider>
    </RecoilRoot>,
  );
  return { addAccountSpy, setCurrentAccountMock };
};

const simulateValidSubmit = async (
  email = faker.internet.email(),
  password = faker.internet.password(),
  name = faker.name.findName(),
): Promise<void> => {
  FormHelper.fillField("name", name);
  FormHelper.fillField("email", email);
  FormHelper.fillField("password", password);
  FormHelper.fillField("passwordConfirmation", password);

  const form = screen.getByTestId("form");
  fireEvent.submit(form);
  await waitFor(() => form);
};

describe("SignUp component", () => {
  test("Should start with inicial state ", () => {
    const validationError = faker.random.words();
    makeSut({ validationError });

    FormHelper.testChidrenCount("status-container", 0);

    FormHelper.testButtonIsDisabled("submitButton", true);

    FormHelper.testStatusField("name", validationError);

    FormHelper.testStatusField("email", validationError);

    FormHelper.testStatusField("password", validationError);

    FormHelper.testStatusField("passwordConfirmation", validationError);
  });

  test("Should show name error message if validation fails", () => {
    const validationError = faker.random.words();
    makeSut({ validationError });
    FormHelper.fillField("name");
    FormHelper.testStatusField("name", validationError);
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

  test("Should show passwordConfirmation error message if validation fails", () => {
    const validationError = faker.random.words();
    makeSut({ validationError });
    FormHelper.fillField("passwordConfirmation");
    FormHelper.testStatusField("passwordConfirmation", validationError);
  });

  test("Should valid email state if validation is success", () => {
    makeSut();

    FormHelper.fillField("email");
    FormHelper.testStatusField("email");
  });

  test("Should valid name state if validation is success", () => {
    makeSut();

    FormHelper.fillField("name");
    FormHelper.testStatusField("name");
  });

  test("Should valid password state if validation is success", () => {
    makeSut();

    FormHelper.fillField("password");
    FormHelper.testStatusField("password");
  });

  test("Should valid password confirmation state if validation is success", () => {
    makeSut();

    FormHelper.fillField("passwordConfirmation");
    FormHelper.testStatusField("passwordConfirmation");
  });

  // test("Submit button should be enabled if validation is success", () => {
  //   makeSut();

  //   FormHelper.fillField("name");
  //   FormHelper.fillField("email");
  //   FormHelper.fillField("password");
  //   FormHelper.fillField("passwordConfirmation");

  //   FormHelper.testButtonIsDisabled("submitButton", false);
  //   const submitButton = screen.getByTestId(
  //     "submitButton",
  //   ) as HTMLButtonElement;
  //   expect(submitButton.disabled).toBe(false);
  // });

  test("Should show loading if form is submited", async () => {
    makeSut();

    await simulateValidSubmit();

    FormHelper.testElementToBeTruthy("spinner");
  });

  test("Should calll AddAccount with correct values", async () => {
    const { addAccountSpy } = makeSut();

    const name = faker.name.findName();
    const email = faker.internet.email();
    const password = faker.internet.password();

    await simulateValidSubmit(email, password, name);

    expect(addAccountSpy.params).toEqual({
      name,
      email,
      password,
      passwordConfirmation: password,
    });
  });

  test("Should call authetication only once", async () => {
    const { addAccountSpy } = makeSut();

    await simulateValidSubmit();
    await simulateValidSubmit();
    expect(addAccountSpy.callsCount).toBe(1);
  });

  test("Should not call addAccount if invalid form", async () => {
    const validationError = faker.random.words();

    const { addAccountSpy } = makeSut({ validationError });

    await simulateValidSubmit();

    expect(addAccountSpy.callsCount).toBe(0);
  });

  test("Should show error if add account fails", async () => {
    const { addAccountSpy } = makeSut();

    const error = new EmailInUseError();
    jest.spyOn(addAccountSpy, "add").mockRejectedValueOnce(error);

    await simulateValidSubmit();
    FormHelper.testElementText("main-error", error.message);
    FormHelper.testChidrenCount("status-container", 1);
  });

  test("Should call SaveAccessToken to localstorage on success", async () => {
    const { addAccountSpy, setCurrentAccountMock } = makeSut();
    await simulateValidSubmit();
    expect(setCurrentAccountMock).toHaveBeenCalledWith(addAccountSpy.account);

    expect(history.length).toBe(1);

    expect(history.location.pathname).toBe("/");
  });

  test("Should navigate to login page", async () => {
    makeSut();

    const registerButton = screen.getByTestId("login-button");

    fireEvent.click(registerButton);

    expect(history.length).toBe(2);

    expect(history.location.pathname).toBe("/login");
  });
});
