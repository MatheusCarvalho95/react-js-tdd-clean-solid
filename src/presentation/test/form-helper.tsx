import { RenderResult } from "@testing-library/react";

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
