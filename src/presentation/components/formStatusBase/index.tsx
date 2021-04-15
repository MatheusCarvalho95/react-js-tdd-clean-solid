import React from "react";
import Loading from "../loading";
import Styles from "./styles.scss";

type Props = {
  state: any;
};
const FormStatusBase: React.FC<Props> = ({ state }: Props) => {
  return (
    <div data-testid="status-container" className={Styles.statusContainer}>
      {state.isLoading && <Loading className={Styles.loading} />}
      {state.errorMessage && (
        <span data-testid="main-error" className={Styles.statusError}>
          {state.errorMessage}
        </span>
      )}
    </div>
  );
};

export default FormStatusBase;
