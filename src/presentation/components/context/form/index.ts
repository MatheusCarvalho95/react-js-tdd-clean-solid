import { createContext } from "react";
export type StateProps = {
  isLoading: boolean;
  errorMessage?: string;
  emailError: string;
  passwordError: string;
};
export default createContext({
  isLoading: false,
  emailError: "Campo obrigatório",
  passwordError: "Campo obrigatório",
});
