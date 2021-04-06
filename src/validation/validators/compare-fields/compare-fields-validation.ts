import { InvalidFieldError } from "@/validation/errors";
import { FieldValidation } from "../../protocols";

export class CompareFieldValidation implements FieldValidation {
  constructor(
    readonly field: string,
    private readonly valueToCompare: string,
  ) {}

  validate(value: string): Error {
    return new InvalidFieldError();
  }
}
