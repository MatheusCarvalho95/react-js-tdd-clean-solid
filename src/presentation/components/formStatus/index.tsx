import React, { useContext } from "react";
import Loading from "../loading";
import Styles from "./styles.scss";
import Context, { StateProps } from "../context/form";

const FormStatus: React.FC = () => {
  const { isLoading, errorMessage } = useContext<StateProps>(Context);
  return (
    <div data-testid="status-container" className={Styles.statusContainer}>
      {isLoading && <Loading className={Styles.loading} />}
      {errorMessage && !isLoading && (
        <span className={Styles.statusError}>{errorMessage}</span>
      )}
    </div>
  );
};

export default FormStatus;
