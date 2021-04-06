import { cleanup, render, RenderResult } from "@testing-library/react";
import React from "react";
import { Router } from "react-router-dom";
import SignUp from "./signup";
import { createMemoryHistory } from "history";
type SutTypes = {
  sut: RenderResult;
};
const history = createMemoryHistory({ initialEntries: ["/signup"] });
const makeSut = (): SutTypes => {
  const sut = render(
    <Router history={history}>
      <SignUp />,
    </Router>,
  );
  return { sut };
};

const testChidrenCount = (
  sut: RenderResult,
  fieldName: string,
  count: number,
): void => {
  const { getByTestId } = sut;
  const status = getByTestId(fieldName);
  expect(status.childElementCount).toBe(count);
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

const testStatusField = (
  sut: RenderResult,
  fieldName: string,
  validationError?: string,
): void => {
  const { getByTestId } = sut;
  const fieldStatus = getByTestId(`${fieldName}-status`);
  expect(fieldStatus.title).toBe(validationError || "Ok..");
  expect(fieldStatus.textContent).toBe(validationError ? "🔴" : "🟢");
};

describe("SignUp component", () => {
  afterEach(cleanup);

  test("Should start with inicial state ", () => {
    const { sut } = makeSut();
    const { getByTestId } = sut;
    const validationError = "Campo obrigatório";

    testChidrenCount(sut, "status-container", 0);

    testButtonIsDisabled(sut, "submitButton", true);

    testStatusField(sut, "name", validationError);

    testStatusField(sut, "email", validationError);

    testStatusField(sut, "password", validationError);

    testStatusField(sut, "passwordConfirmation", validationError);
  });
});
