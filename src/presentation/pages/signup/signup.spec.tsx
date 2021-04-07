import { cleanup, render, RenderResult } from "@testing-library/react";
import React from "react";
import { Router } from "react-router-dom";
import SignUp from "./signup";
import { createMemoryHistory } from "history";
import { FormHelper } from "@/presentation/test";
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

describe("SignUp component", () => {
  afterEach(cleanup);

  test("Should start with inicial state ", () => {
    const { sut } = makeSut();
    const { getByTestId } = sut;
    const validationError = "Campo obrigatório";

    FormHelper.testChidrenCount(sut, "status-container", 0);

    FormHelper.testButtonIsDisabled(sut, "submitButton", true);

    FormHelper.testStatusField(sut, "name", validationError);

    FormHelper.testStatusField(sut, "email", validationError);

    FormHelper.testStatusField(sut, "password", validationError);

    FormHelper.testStatusField(sut, "passwordConfirmation", validationError);
  });
});
