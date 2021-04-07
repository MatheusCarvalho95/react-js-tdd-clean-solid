import { InvalidFieldError } from "@/validation/errors";
import { FieldValidation } from "../../protocols";

export class CompareFieldValidation implements FieldValidation {
  constructor(
    readonly field: string,
    private readonly fieldToCompare: string,
  ) {}

  validate(input: object): Error {
    return input[this.field] !== input[this.fieldToCompare]
      ? new InvalidFieldError()
      : null;
  }
}
