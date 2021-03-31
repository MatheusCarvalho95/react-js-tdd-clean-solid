import React, { useState, useEffect } from "react";
import Header from "@/presentation/components/login/header";
import Footer from "@/presentation/components/footer";
import Input from "@/presentation/components/input";
import FormStatus from "@/presentation/components/formStatus";
import Styles from "./styles.scss";
import Context from "../../components/context/form";
import { Validation } from "@/presentation/protocols/validation";

type Props = {
  validation: Validation;
};

const Login: React.FC<Props> = ({ validation }: Props) => {
  const [status, setStatus] = useState({
    isLoading: false,
    emailError: "Campo obrigatório",
    passwordError: "Campo obrigatório",
    email: "",
    errorMessage: "",
  });

  useEffect(() => {
    validation.validate({ email: status.email });
  }, [status.email]);

  return (
    <div className={Styles.login}>
      <Header />
      <Context.Provider value={{ status, setStatus }}>
        <form className={Styles.form}>
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
            disabled
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
