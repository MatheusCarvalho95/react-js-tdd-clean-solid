import React, { createContext } from "react";
import { AccountModel } from "../../../../domain/models/";

type Props = {
  setCurrentAccount?: (account: AccountModel) => void;
  getCurrentAccount?: () => AccountModel;
};
export default React.createContext<Props>(null);
