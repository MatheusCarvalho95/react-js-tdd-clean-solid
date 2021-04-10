import React, { FC, useContext } from "react";
import { SurveyContext } from "..";
import Styles from "./error-styles.scss";

const Error: FC = () => {
  const { state } = useContext(SurveyContext);
  return (
    <div className={Styles.errorWrap} data-testid="error">
      <span>{state.error}</span>
      <button>Recarregar</button>
    </div>
  );
};
export default Error;
