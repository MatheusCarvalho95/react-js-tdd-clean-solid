import React, { useEffect } from "react";
import Header from "@/presentation/components/login/header";
import Footer from "@/presentation/components/footer";
import Styles from "./signup-styles.scss";
import { useRecoilState, useRecoilValue } from "recoil";
import { Link, useHistory } from "react-router-dom";
import { Validation } from "@/presentation/protocols/validation";
import { AddAccount } from "@/domain/usecases";
import { FormStatus, InputBase, signUpState, SubmitButton } from "./components";
import { currentAccountState } from "@/presentation/components/atoms/atoms";
type Props = {
  validation: Validation;
  addAccount: AddAccount;
};
const SignUp: React.FC<Props> = ({ validation, addAccount }: Props) => {
  const history = useHistory();
  const { setCurrentAccount } = useRecoilValue(currentAccountState);
  const [status, setStatus] = useRecoilState(signUpState);

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
        setCurrentAccount(account);
        history.replace("/");
      }
    } catch (error) {
      setStatus({ ...status, isLoading: false, errorMessage: error.message });
    }
  };
  return (
    <div className={Styles.signUp}>
      <Header />

      <form className={Styles.form} onSubmit={handleSubmit} data-testid="form">
        <h2>Criar conta</h2>
        <InputBase type="text" name="name" placeholder="Digite seu nome" />
        <InputBase type="email" name="email" placeholder="Digite seu email" />
        <InputBase
          type="password"
          name="password"
          placeholder="Digite sua senha"
        />
        <InputBase
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

      <Footer />
    </div>
  );
};
export default SignUp;
