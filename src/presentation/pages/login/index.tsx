import React, { useState, useEffect } from "react";
import Header from "@/presentation/components/login/header";
import Footer from "@/presentation/components/footer";
import Input from "@/presentation/components/input";
import FormStatus from "@/presentation/components/formStatus";
import Styles from "./styles.scss";
import Context from "../../components/context/form";
import { Validation } from "@/presentation/protocols/validation";
import { Authentication, UpdateCurrentAccount } from "@/domain/usecases";
import { Link, useHistory } from "react-router-dom";

type Props = {
  validation: Validation;
  authentication: Authentication;
  updateCurrentAccount: UpdateCurrentAccount;
};

const Login: React.FC<Props> = ({
  validation,
  authentication,
  updateCurrentAccount: saveAccessToken,
}: Props) => {
  const history = useHistory();
  const [status, setStatus] = useState({
    isLoading: false,
    emailError: "",
    passwordError: "",
    email: "",
    errorMessage: "",
    password: "",
  });

  useEffect(() => {
    const { email, password } = status;

    const formData = { email, password };

    const emailError = validation.validate("email", formData);

    const passwordError = validation.validate("password", formData);

    setStatus({
      ...status,
      emailError,
      passwordError,
    });
  }, [status.email, status.password]);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();
    try {
      if (!status.isLoading && !status.emailError && !status.passwordError) {
        setStatus({ ...status, isLoading: true });
        const account = await authentication.auth({
          email: status.email,
          password: status.password,
        });
        await saveAccessToken.save(account);
        history.replace("/");
      }
    } catch (error) {
      setStatus({ ...status, isLoading: false, errorMessage: error.message });
    }
  };

  return (
    <div className={Styles.login}>
      <Header />
      <Context.Provider value={{ status, setStatus }}>
        <form
          className={Styles.form}
          onSubmit={handleSubmit}
          data-testid="form"
          autoComplete="off"
        >
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
          <Link
            to="/signup"
            data-testid="register-button"
            className={Styles.signUpLink}
          >
            Cadastre-se
          </Link>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  );
};
export default Login;
