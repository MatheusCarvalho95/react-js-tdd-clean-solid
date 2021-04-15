import React, { useEffect } from "react";
import Header from "@/presentation/components/login/header";
import Footer from "@/presentation/components/footer";
import Styles from "./styles.scss";
import { Validation } from "@/presentation/protocols/validation";
import { Authentication } from "@/domain/usecases";
import { Link, useHistory } from "react-router-dom";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { FormStatus, InputBase, loginState, SubmitButton } from "./components";
import { currentAccountState } from "@/presentation/components/atoms/atoms";

type Props = {
  validation: Validation;
  authentication: Authentication;
};

const Login: React.FC<Props> = ({ validation, authentication }: Props) => {
  const history = useHistory();
  const [state, setState] = useRecoilState(loginState);
  const { setCurrentAccount } = useRecoilValue(currentAccountState);
  const resetLoginState = useResetRecoilState(loginState);

  useEffect(() => resetLoginState(), []);
  useEffect(() => validate("email"), [state.email]);
  useEffect(() => validate("password"), [state.password]);

  const validate = (field: string): void => {
    const { email, password } = state;
    const formData = { email, password };
    setState((old) => ({
      ...old,
      [`${field}Error`]: validation.validate(field, formData),
    }));
    setState((old) => ({
      ...old,
      isFormInvalid: !!old.emailError || !!old.passwordError,
    }));
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();
    try {
      if (!state.isLoading && !state.emailError && !state.passwordError) {
        setState({ ...state, isLoading: true });
        const account = await authentication.auth({
          email: state.email,
          password: state.password,
        });
        setCurrentAccount(account);
        history.replace("/");
      }
    } catch (error) {
      setState({ ...state, isLoading: false, errorMessage: error.message });
    }
  };

  return (
    <div className={Styles.login}>
      <Header />

      <form
        className={Styles.form}
        onSubmit={handleSubmit}
        data-testid="form"
        autoComplete="off"
      >
        <h2>Login</h2>
        <InputBase type="email" name="email" placeholder="Digite seu email" />
        <InputBase
          type="password"
          name="password"
          placeholder="Digite sua senha"
        />

        <SubmitButton text={"Entrar"} />
        <Link
          to="/signup"
          data-testid="register-button"
          className={Styles.signUpLink}
        >
          Cadastre-se
        </Link>
        <FormStatus />
      </form>

      <Footer />
    </div>
  );
};
export default Login;
