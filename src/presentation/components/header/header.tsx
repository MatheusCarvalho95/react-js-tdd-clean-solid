import { useLogout } from "@/presentation/hooks";
import React, { FC, memo, useContext } from "react";
import ApiContext from "../context/api/api-context";
import Logo from "../logo";
import Styles from "./header-styles.scss";
const Header: FC = () => {
  const logout = useLogout();

  const { getCurrentAccount } = useContext(ApiContext);
  const logoutHandler = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ): void => {
    event.preventDefault();

    logout();
  };
  return (
    <header className={Styles.headerWrap}>
      <div className={Styles.headerContent}>
        <Logo />
        <div className={Styles.logouWrap}>
          <span data-testid="username">{getCurrentAccount().name}</span>
          <a data-testid="logout" href="#" onClick={logoutHandler}>
            Sair
          </a>
        </div>
      </div>
    </header>
  );
};
export default memo(Header);
