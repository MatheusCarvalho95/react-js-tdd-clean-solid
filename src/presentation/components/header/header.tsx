import React, { FC, memo } from "react";
import Logo from "../logo";
import Styles from "./header-styles.scss";
const Header: FC = () => {
  return (
    <header className={Styles.headerWrap}>
      <div className={Styles.headerContent}>
        <Logo />
        <div className={Styles.logouWrap}>
          <span>UserName</span>
          <a href="#">Sair</a>
        </div>
      </div>
    </header>
  );
};
export default memo(Header);
