import React, { createContext } from "react";

type Props = {
  onAnswer?: (answer: string) => void;
};
export default React.createContext<Props>(null);
