import { InvalidFieldError } from "@/validation/errors";
import { MinLenghtValidation } from "./min-length-validation";
import faker, { fake } from "faker";

const makeSut = (minLenght?: number): MinLenghtValidation =>
  new MinLenghtValidation(faker.database.column(), (minLenght = 5));

describe("MinLenghtValidation", () => {
  test("should return error if value too short", () => {
    const sut = makeSut();
    const error = sut.validate(faker.random.alphaNumeric(4));
    expect(error).toEqual(new InvalidFieldError());
  });

  test("should return falsy if value is valid", () => {
    const sut = makeSut(5);
    const error = sut.validate(faker.random.alphaNumeric(5));
    expect(error).toBeFalsy();
  });
});
