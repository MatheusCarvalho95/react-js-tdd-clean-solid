import { useLogout } from "@/presentation/hooks";
import React, { FC, memo } from "react";
import { useRecoilValue } from "recoil";
import { currentAccountState } from "../atoms/atoms";
import Logo from "../logo";
import Styles from "./header-styles.scss";
const Header: FC = () => {
  const logout = useLogout();

  const { getCurrentAccount } = useRecoilValue(currentAccountState);
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
