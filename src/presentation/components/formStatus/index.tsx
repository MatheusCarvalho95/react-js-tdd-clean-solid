import React, { useContext } from "react";
import Loading from "../loading";
import Styles from "./styles.scss";
import Context from "../context/form";

const FormStatus: React.FC = () => {
  const { status } = useContext(Context);
  return (
    <div data-testid="status-container" className={Styles.statusContainer}>
      {status.isLoading && <Loading className={Styles.loading} />}
      {status.errorMessage && (
        <span data-testid="main-error" className={Styles.statusError}>
          {status.errorMessage}
        </span>
      )}
    </div>
  );
};

export default FormStatus;
