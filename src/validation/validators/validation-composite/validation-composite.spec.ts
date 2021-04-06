import { FieldValidationSpy } from "../test/intex";
import { ValidationComposite } from "./validation-composite";
import faker from "faker";

type SutTypes = {
  sut: ValidationComposite;
  fieldValidationsSpy: FieldValidationSpy[];
};

const makeSut = (fieldName: string): SutTypes => {
  const fieldValidationsSpy = [
    new FieldValidationSpy(fieldName),
    new FieldValidationSpy(fieldName),
  ];

  const sut = ValidationComposite.build(fieldValidationsSpy);
  return { sut, fieldValidationsSpy };
};
describe("ValidationComposite", () => {
  test("should return error if any validation fails", () => {
    const fieldName = faker.database.column();
    const { sut, fieldValidationsSpy } = makeSut(fieldName);
    const error1 = faker.random.words();
    const error2 = faker.random.words();
    fieldValidationsSpy[0].error = new Error(error1);
    fieldValidationsSpy[1].error = new Error(error2);
    const error = sut.validate(fieldName, faker.random.word());
    expect(error).toBe(error1);
  });

  test("should return error if any validation fails", () => {
    const fieldName = faker.database.column();
    const { sut } = makeSut(fieldName);
    const error = sut.validate(fieldName, faker.random.word());
    expect(error).toBeFalsy();
  });
});
