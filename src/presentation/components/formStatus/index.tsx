import React from "react";
import Loading from "../loading";
import Styles from "./styles.scss";

const FormStatus: React.FC = () => {
  return (
    <div className={Styles.statusContainer}>
      <Loading className={Styles.loading} />
      <span className={Styles.statusError}>Algum Erro</span>
    </div>
  );
};

export default FormStatus;
