import React, { useEffect, useContext } from "react";
import Header from "@/presentation/components/login/header";
import Footer from "@/presentation/components/footer";
import Styles from "./styles.scss";
import ApiContext from "../../components/context/api/api-context";
import { Validation } from "@/presentation/protocols/validation";
import { Authentication } from "@/domain/usecases";
import { Link, useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";
import { FormStatus, InputBase, loginState, SubmitButton } from "./components";

type Props = {
  validation: Validation;
  authentication: Authentication;
};

const Login: React.FC<Props> = ({ validation, authentication }: Props) => {
  const history = useHistory();
  const [status, setStatus] = useRecoilState(loginState);
  const { setCurrentAccount } = useContext(ApiContext);

  useEffect(() => {
    const { email, password } = status;

    const formData = { email, password };

    const emailError = validation.validate("email", formData);
    setStatus((old) => ({
      ...old,
      emailError,
    }));
  }, [status.email]);

  useEffect(() => {
    const { email, password } = status;

    const formData = { email, password };

    const passwordError = validation.validate("password", formData);
    setStatus((old) => ({
      ...old,
      passwordError,
    }));
  }, [status.password]);

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
        setCurrentAccount(account);
        history.replace("/");
      }
    } catch (error) {
      setStatus({ ...status, isLoading: false, errorMessage: error.message });
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
