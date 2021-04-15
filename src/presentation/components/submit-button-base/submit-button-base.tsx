import React from "react";
import Styles from "./styles.scss";

type Props = {
  text: string;
  state: any;
};

const SubmitButtonBase: React.FC<Props> = ({ state, text }: Props) => {
  return (
    <button
      type="submit"
      data-testid="submitButton"
      className={Styles.submitButton}
      disabled={state.isFormInvalid}
    >
      {text}
    </button>
  );
};
export default SubmitButtonBase;
