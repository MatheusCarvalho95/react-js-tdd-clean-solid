import Loading from "@/presentation/components/loading/loading";
import Logo from "@/presentation/components/logo";
import React from "react";
import Styles from "./login-styles.scss";

const Login: React.FC = () => {
  const error = "Erro qualquer";
  return (
    <div className={Styles.login}>
      <header className={Styles.header}>
        <div className={Styles.img}>
          <Logo />
        </div>
        <h1>4Dev - Enquetes para Programadores</h1>
      </header>
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
      <footer className={Styles.footer}></footer>
    </div>
  );
};
export default Login;
