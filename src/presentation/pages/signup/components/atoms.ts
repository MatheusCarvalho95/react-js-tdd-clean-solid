import { atom } from "recoil";

export const signUpState = atom({
  key: "signUpState",
  default: {
    isLoading: false,
    nameError: "",
    emailError: "",
    passwordError: "",
    passwordConfirmationError: "",
    errorMessage: "",
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    invalidForm: true,
  },
});
