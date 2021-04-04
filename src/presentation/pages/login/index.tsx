import React, { useState, useEffect } from "react";
import Header from "@/presentation/components/login/header";
import Footer from "@/presentation/components/footer";
import Input from "@/presentation/components/input";
import FormStatus from "@/presentation/components/formStatus";
import Styles from "./styles.scss";
import Context from "../../components/context/form";
import { Validation } from "@/presentation/protocols/validation";
import { Authentication } from "@/domain/usecases";

type Props = {
  validation: Validation;
  authentication: Authentication;
};

const Login: React.FC<Props> = ({ validation, authentication }: Props) => {
  const [status, setStatus] = useState({
    isLoading: false,
    emailError: "",
    passwordError: "",
    email: "",
    errorMessage: "",
    password: "",
  });

  useEffect(() => {
    setStatus({
      ...status,
      emailError: validation.validate("email", status.email),
      passwordError: validation.validate("password", status.password),
    });
  }, [status.email, status.password]);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();

    setStatus({ ...status, isLoading: true });
    await authentication.auth({
      email: status.email,
      password: status.password,
    });
  };

  return (
    <div className={Styles.login}>
      <Header />
      <Context.Provider value={{ status, setStatus }}>
        <form className={Styles.form} onSubmit={handleSubmit}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu email" />
          <Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />
          <button
            type="submit"
            data-testid="submitButton"
            className={Styles.submitButton}
            disabled={!!status.emailError || !!status.passwordError}
          >
            Entrar
          </button>
          <span className={Styles.signUpLink}>Cadastre-se</span>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  );
};
export default Login;
