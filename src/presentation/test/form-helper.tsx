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
  validationError: string = "",
): void => {
  const { getByTestId } = sut;
  const wrap = getByTestId(`${fieldName}-wrap`);
  const field = getByTestId(`${fieldName}`);
  const label = getByTestId(`${fieldName}-label`);
  expect(wrap.getAttribute("data-status")).toBe(
    validationError ? "invalid" : "valid",
  );
  expect(field.title).toBe(validationError);
  expect(label.title).toBe(validationError);
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
    } else if (fieldName === "name") {
      value = faker.name.findName();
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

export const testElementToBeTruthy = (
  sut: RenderResult,
  fieldName: string,
): void => {
  const { getByTestId } = sut;
  const field = getByTestId(fieldName);
  expect(field).toBeTruthy();
};

export const testElementText = (
  sut: RenderResult,
  fieldName: string,
  text: string,
): void => {
  const { getByTestId } = sut;

  const filed = getByTestId(fieldName);
  expect(filed.textContent).toBe(text);
};
