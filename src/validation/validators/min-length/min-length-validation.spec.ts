import { InvalidFieldError } from "@/validation/errors";
import { MinLenghtValidation } from "./min-length-validation";
import faker, { fake } from "faker";

const makeSut = (field: string): MinLenghtValidation =>
  new MinLenghtValidation(field, 5);

describe("MinLenghtValidation", () => {
  test("should return error if value too short", () => {
    const field = faker.database.column();
    const sut = makeSut(field);
    const error = sut.validate({ [field]: faker.random.alphaNumeric(4) });
    expect(error).toEqual(new InvalidFieldError());
  });

  test("should return falsy if value is valid", () => {
    const field = faker.database.column();
    const sut = makeSut(field);
    const error = sut.validate({ [field]: faker.random.alphaNumeric(5) });
    expect(error).toBeFalsy();
  });
});
