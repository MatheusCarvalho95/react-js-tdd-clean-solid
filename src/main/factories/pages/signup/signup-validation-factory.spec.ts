import {
  EmailValidation,
  MinLenghtValidation,
  RequiredFieldValidation,
  ValidationComposite,
} from "@/validation/validators";

import { CompareFieldValidation } from "@/validation/validators/compare-fields/compare-fields-validation";
import { makeSignUpValidation } from "./signup-validation-factory";

describe("LoginValidationFactory", () => {
  test("should compose ValidationComposite with correct validation", () => {
    const composite = makeSignUpValidation();
    expect(composite).toEqual(
      ValidationComposite.build([
        new RequiredFieldValidation("name"),
        new RequiredFieldValidation("email"),
        new EmailValidation("email"),
        new RequiredFieldValidation("password"),
        new MinLenghtValidation("password", 5),
        new RequiredFieldValidation("passwordConfirmation"),
        new CompareFieldValidation("passwordConfirmation", "password"),
      ]),
    );
  });
});
