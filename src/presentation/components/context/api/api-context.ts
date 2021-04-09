import React, { createContext } from "react";
import { AccountModel } from "../../../../domain/models/";

type Props = {
  setCurrentAccount?: (account: AccountModel) => void;
};
export default React.createContext<Props>(null);
