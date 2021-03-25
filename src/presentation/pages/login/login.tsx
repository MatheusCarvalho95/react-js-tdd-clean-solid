import Loading from "@/presentation/components/loading";
import Header from "@/presentation/components/login/header";
import Footer from "@/presentation/components/footer";
import React from "react";
import Styles from "./login-styles.scss";

const Login: React.FC = () => {
  const error = "Erro qualquer";
  return (
    <div className={Styles.login}>
      <Header />
      <form className={Styles.form}>
        <h2>Login</h2>
        <div className={Styles.inputContainer}>
          <input type="email" name="email" placeholder="Digite seu email" />
          <span className={Styles.redDot}>🔴</span>
        </div>
        <div className={Styles.inputContainer}>
          <input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />
          <span className={Styles.redDot}>🔴</span>
        </div>

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
