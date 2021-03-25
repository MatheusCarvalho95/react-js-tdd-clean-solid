import Loading from "@/presentation/components/loading";
import Header from "@/presentation/components/login/header";
import Footer from "@/presentation/components/footer";
import React from "react";
import Styles from "./login-styles.scss";
import Input from "@/presentation/components/input";

const Login: React.FC = () => {
  const error = "Erro qualquer";
  return (
    <div className={Styles.login}>
      <Header />
      <form className={Styles.form}>
        <h2>Login</h2>

        <Input type="email" name="email" placeholder="Digite seu email" />

        <Input type="password" name="password" placeholder="Digite sua senha" />

        <button type="submit" className={Styles.submitButton}>
          Entrar
        </button>
        <span className={Styles.signUpLink}>Cadastre-se</span>
        <div className={Styles.statusContainer}>
          <Loading className={Styles.loading} />
          <span className={Styles.statusError}>{error}</span>
        </div>
      </form>
      <Footer />
    </div>
  );
};
export default Login;
