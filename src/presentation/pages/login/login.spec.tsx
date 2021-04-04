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
};
type SutParams = {
  validationError: string;
};

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  validationStub.errorMessage = params?.validationError;
  const sut = render(<Login validation={validationStub} />);
  return { sut };
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

    const emailStatus = getByTestId("email-status");
    expect(emailStatus.title).toBe(validationError);
    expect(emailStatus.textContent).toBe("🔴");

    const passwordStatus = getByTestId("password-status");
    expect(passwordStatus.title).toBe(validationError);
    expect(passwordStatus.textContent).toBe("🔴");
  });

  test("Should show email error message if validation fails", () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    const { getByTestId } = sut;
    const emailInput = getByTestId("email");
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } });
    const emailStatus = getByTestId("email-status");
    expect(emailStatus.title).toBe(validationError);
    expect(emailStatus.textContent).toBe("🔴");
  });

  test("Should show password error message if validation fails", () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    const { getByTestId } = sut;
    const passwordInput = getByTestId("password");
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() },
    });
    const passwordStatus = getByTestId("password-status");
    expect(passwordStatus.title).toBe(validationError);
    expect(passwordStatus.textContent).toBe("🔴");
  });

  test("Should valid email state if validation is success", () => {
    const { sut } = makeSut();
    const { getByTestId } = sut;

    const emailInput = getByTestId("email");
    fireEvent.input(emailInput, {
      target: { value: faker.internet.email() },
    });
    const emailStatus = getByTestId("email-status");
    expect(emailStatus.title).toBe("Ok..");
    expect(emailStatus.textContent).toBe("🟢");
  });

  test("Should valid password state if validation is success", () => {
    const { sut } = makeSut();
    const { getByTestId } = sut;

    const passwordInput = getByTestId("password");
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() },
    });
    const passwordStatus = getByTestId("password-status");
    expect(passwordStatus.title).toBe("Ok..");
    expect(passwordStatus.textContent).toBe("🟢");
  });

  test("Submit button should be enabled if validation is success", () => {
    const { sut } = makeSut();
    const { getByTestId } = sut;
    const passwordInput = getByTestId("password");
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() },
    });

    const emailInput = getByTestId("email");
    fireEvent.input(emailInput, {
      target: { value: faker.internet.email() },
    });

    const submitButton = getByTestId("submitButton") as HTMLButtonElement;
    expect(submitButton.disabled).toBe(false);
  });

  test("Should show loading if form is submited", async () => {
    const { sut } = makeSut();
    const { getByTestId } = sut;
    const passwordInput = getByTestId("password");
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() },
    });

    const emailInput = getByTestId("email");
    fireEvent.input(emailInput, {
      target: { value: faker.internet.email() },
    });

    const submitButton = getByTestId("submitButton");
    fireEvent.click(submitButton);
    const loading = getByTestId("spinner");
    expect(loading).toBeTruthy();
  });
});
