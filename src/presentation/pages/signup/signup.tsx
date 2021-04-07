import React, { useState, useEffect } from "react";
import Header from "@/presentation/components/login/header";
import Footer from "@/presentation/components/footer";
import Input from "@/presentation/components/input";
import FormStatus from "@/presentation/components/formStatus";
import Styles from "./signup-styles.scss";
import Context from "../../components/context/form";

import { Link, useHistory } from "react-router-dom";
import { Validation } from "@/presentation/protocols/validation";
type Props = {
  validation: Validation;
};
const SignUp: React.FC<Props> = ({ validation }: Props) => {
  const [status, setStatus] = useState({
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
  });
  const [buttonDisabledState, setButtonDisabledState] = useState(true);

  useEffect(() => {
    setStatus({
      ...status,
      nameError: validation.validate("name", status.name),
      emailError: validation.validate("email", status.email),
      passwordError: validation.validate("password", status.password),
      passwordConfirmationError: validation.validate(
        "password",
        status.passwordConfirmation,
      ),
    });
    if (
      status.name &&
      status.email &&
      status.password &&
      status.passwordConfirmation
    ) {
      setButtonDisabledState(false);
    }
  }, [status.name, status.email, status.password, status.passwordConfirmation]);
  return (
    <div className={Styles.signUp}>
      <Header />
      <Context.Provider value={{ status, setStatus }}>
        <form className={Styles.form} onSubmit={() => {}} data-testid="form">
          <h2>Criar conta</h2>
          <Input type="text" name="name" placeholder="Digite seu nome" />
          <Input type="email" name="email" placeholder="Digite seu email" />
          <Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />
          <Input
            type="password"
            name="passwordConfirmation"
            placeholder="Digite sua senha novamente"
          />
          <button
            type="submit"
            data-testid="submitButton"
            className={Styles.submitButton}
            disabled={buttonDisabledState}
          >
            Criar!
          </button>
          <Link
            to="/login"
            data-testid="register-button"
            className={Styles.loginLink}
          >
            Voltar para login
          </Link>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  );
};
export default SignUp;
