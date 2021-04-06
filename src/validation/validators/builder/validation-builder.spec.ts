import { RequiredFieldValidation } from "..";
import { EmailValidation } from "../email/email-validation";
import { MinLenghtValidation } from "../min-length/min-length-validation";
import { ValidationBuilder as sut } from "./validation-builder";
import faker from "faker";
describe("ValidationBuilder", () => {
  test("should return RequiredFieldValidation", () => {
    const field = faker.database.column();
    const validations = sut.field(field).required().build();
    expect(validations).toEqual([new RequiredFieldValidation(field)]);
  });

  test("should return EmailValidation", () => {
    const field = faker.database.column();
    const validations = sut.field(field).email().build();
    expect(validations).toEqual([new EmailValidation(field)]);
  });

  test("should return EmailValidation", () => {
    const field = faker.database.column();
    const length = faker.random.number();
    const validations = sut.field(field).min(length).build();
    expect(validations).toEqual([new MinLenghtValidation(field, length)]);
  });

  test("should return list of validations", () => {
    const field = faker.database.column();
    const length = faker.random.number();
    const validations = sut.field(field).required().email().min(length).build();
    expect(validations).toEqual([
      new RequiredFieldValidation(field),
      new EmailValidation(field),
      new MinLenghtValidation(field, length),
    ]);
  });
});
