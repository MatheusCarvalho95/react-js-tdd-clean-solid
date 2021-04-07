import { InvalidFieldError } from "@/validation/errors";
import faker from "faker";
import { CompareFieldValidation } from "./compare-fields-validation";

const makeSut = (
  field: string,
  valueToCompare: string,
): CompareFieldValidation => new CompareFieldValidation(field, valueToCompare);
describe("CompareFieldValidation", () => {
  test("should return error if compare is invalid", () => {
    const field = faker.database.column();
    const fieldToCompare = faker.random.word();
    const sut = makeSut(field, fieldToCompare);
    const error = sut.validate({
      [field]: faker.random.word(),
      [fieldToCompare]: faker.random.word(),
    });
    expect(error).toEqual(new InvalidFieldError());
  });

  test("should return falsy if compare is valid", () => {
    const field = faker.database.column();
    const fieldToCompare = faker.random.word();
    const sut = makeSut(field, fieldToCompare);
    const valueToCompare = faker.random.word();
    const error = sut.validate({
      [field]: valueToCompare,
      [fieldToCompare]: valueToCompare,
    });
    expect(error).toBeFalsy();
  });
});
