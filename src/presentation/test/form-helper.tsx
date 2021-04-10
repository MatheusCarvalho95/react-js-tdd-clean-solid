import { fireEvent, screen } from "@testing-library/react";
import faker from "faker";

export const testChidrenCount = (fieldName: string, count: number): void => {
  const status = screen.getByTestId(fieldName);
  expect(status.childElementCount).toBe(count);
};

export const testButtonIsDisabled = (
  fieldName: string,
  isDisabled: boolean,
): void => {
  const button = screen.getByTestId(fieldName) as HTMLButtonElement;
  expect(button.disabled).toBe(isDisabled);
};

export const testStatusField = (
  fieldName: string,
  validationError: string = "",
): void => {
  const wrap = screen.getByTestId(`${fieldName}-wrap`);
  const field = screen.getByTestId(`${fieldName}`);
  const label = screen.getByTestId(`${fieldName}-label`);
  expect(wrap.getAttribute("data-status")).toBe(
    validationError ? "invalid" : "valid",
  );
  expect(field.title).toBe(validationError);
  expect(label.title).toBe(validationError);
};

export const fillField = (fieldName: string, value?: string): void => {
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

  const input = screen.getByTestId(fieldName);
  fireEvent.input(input, {
    target: { value },
  });
};

export const testElementToBeTruthy = (fieldName: string): void => {
  expect(screen.queryByTestId(fieldName)).toBeInTheDocument();
};

export const testElementText = (fieldName: string, text: string): void => {
  const filed = screen.getByTestId(fieldName);
  expect(filed.textContent).toBe(text);
};
