import React, { useState, useEffect } from "react";
import Header from "@/presentation/components/login/header";
import Footer from "@/presentation/components/footer";
import Input from "@/presentation/components/input";
import FormStatus from "@/presentation/components/formStatus";
import Styles from "./signup-styles.scss";
import Context from "../../components/context/form";

import { Link, useHistory } from "react-router-dom";
import { Validation } from "@/presentation/protocols/validation";
import { AddAccount, UpdateCurrentAccount } from "@/domain/usecases";
import SubmitButton from "@/presentation/components/submit-button/submit-button";
type Props = {
  validation: Validation;
  addAccount: AddAccount;
  updateCurrentAccount: UpdateCurrentAccount;
};
const SignUp: React.FC<Props> = ({
  validation,
  addAccount,
  updateCurrentAccount: saveAccessToken,
}: Props) => {
  const history = useHistory();
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
    invalidForm: true,
  });

  useEffect(() => {
    const { name, email, password, passwordConfirmation } = status;
    const formData = { name, email, password, passwordConfirmation };
    const nameError = validation.validate("name", formData);

    const emailError = validation.validate("email", formData);

    const passwordError = validation.validate("password", formData);

    const passwordConfirmationError = validation.validate("password", formData);

    setStatus({
      ...status,
      nameError,
      emailError,
      passwordError,
      passwordConfirmationError,
      invalidForm:
        !!nameError ||
        !!emailError ||
        !!passwordError ||
        !!passwordConfirmationError,
    });
  }, [status.name, status.email, status.password, status.passwordConfirmation]);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();
    try {
      if (
        !status.isLoading &&
        !status.emailError &&
        !status.passwordError &&
        !status.nameError &&
        !status.passwordConfirmationError
      ) {
        setStatus({ ...status, isLoading: true });
        const account = await addAccount.add({
          name: status.name,
          email: status.email,
          password: status.password,
          passwordConfirmation: status.passwordConfirmation,
        });
        await saveAccessToken.save(account);
        history.replace("/");
      }
    } catch (error) {
      setStatus({ ...status, isLoading: false, errorMessage: error.message });
    }
  };
  return (
    <div className={Styles.signUp}>
      <Header />
      <Context.Provider value={{ status, setStatus }}>
        <form
          className={Styles.form}
          onSubmit={handleSubmit}
          data-testid="form"
        >
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
          <SubmitButton text="Criar!" />

          <Link
            to="/login"
            data-testid="login-button"
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
