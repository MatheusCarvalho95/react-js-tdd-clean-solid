import { cleanup, render, RenderResult } from "@testing-library/react";
import React from "react";
import { Router } from "react-router-dom";
import SignUp from "./signup";
import { createMemoryHistory } from "history";
import { FormHelper, ValidationStub } from "@/presentation/test";
import faker from "faker";
type SutTypes = {
  sut: RenderResult;
};
type SutParams = {
  validationError: string;
};
const history = createMemoryHistory({ initialEntries: ["/signup"] });
const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  validationStub.errorMessage = params?.validationError;
  const sut = render(
    <Router history={history}>
      <SignUp validation={validationStub} />,
    </Router>,
  );
  return { sut };
};

describe("SignUp component", () => {
  afterEach(cleanup);

  test("Should start with inicial state ", () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    const { getByTestId } = sut;

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
});
