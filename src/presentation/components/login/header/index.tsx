import React, { memo } from "react";
import Logo from "../../logo";
import Styles from "./styles.scss";

const LoginHeader: React.FC = () => {
  return (
    <header className={Styles.header}>
      <div className={Styles.img}>
        <Logo />
      </div>
      <h1>4Dev - Enquetes para Programadores</h1>
    </header>
  );
};

export default memo(LoginHeader);
