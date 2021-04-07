import { fireEvent, RenderResult } from "@testing-library/react";
import faker from "faker";

export const testChidrenCount = (
  sut: RenderResult,
  fieldName: string,
  count: number,
): void => {
  const { getByTestId } = sut;
  const status = getByTestId(fieldName);
  expect(status.childElementCount).toBe(count);
};

export const testButtonIsDisabled = (
  sut: RenderResult,
  fieldName: string,
  isDisabled: boolean,
): void => {
  const { getByTestId } = sut;

  const button = getByTestId(fieldName) as HTMLButtonElement;
  expect(button.disabled).toBe(isDisabled);
};

export const testStatusField = (
  sut: RenderResult,
  fieldName: string,
  validationError?: string,
): void => {
  const { getByTestId } = sut;
  const fieldStatus = getByTestId(`${fieldName}-status`);
  expect(fieldStatus.title).toBe(validationError || "Ok..");
  expect(fieldStatus.textContent).toBe(validationError ? "🔴" : "🟢");
};

export const fillField = (
  sut: RenderResult,
  fieldName: string,
  value?: string,
): void => {
  if (!value) {
    if (fieldName === "email") {
      value = faker.internet.email();
    } else if (fieldName === "password") {
      value = faker.internet.password();
    } else {
      value = faker.random.word();
    }
  }

  const { getByTestId } = sut;
  const input = getByTestId(fieldName);
  fireEvent.input(input, {
    target: { value },
  });
};
