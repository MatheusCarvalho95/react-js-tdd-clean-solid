import { InvalidFieldError } from "@/validation/errors";
import faker from "faker";
import { CompareFieldValidation } from "./compare-fields-validation";

const makeSut = (valueToCompare: string): CompareFieldValidation =>
  new CompareFieldValidation(faker.database.column(), valueToCompare);
describe("CompareFieldValidation", () => {
  test("should return error if compare is invalid", () => {
    const sut = makeSut(faker.random.word());
    const error = sut.validate(faker.random.word());
    expect(error).toEqual(new InvalidFieldError());
  });
});
