import React, { FC, memo, useContext } from "react";
import { useHistory } from "react-router";
import ApiContext from "../context/api/api-context";
import Logo from "../logo";
import Styles from "./header-styles.scss";
const Header: FC = () => {
  const history = useHistory();
  const { setCurrentAccount, getCurrentAccount } = useContext(ApiContext);
  const logout = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ): void => {
    event.preventDefault();
    setCurrentAccount(undefined);
    history.replace("/login");
  };
  return (
    <header className={Styles.headerWrap}>
      <div className={Styles.headerContent}>
        <Logo />
        <div className={Styles.logouWrap}>
          <span data-testid="username">{getCurrentAccount().name}</span>
          <a data-testid="logout" href="#" onClick={logout}>
            Sair
          </a>
        </div>
      </div>
    </header>
  );
};
export default memo(Header);
