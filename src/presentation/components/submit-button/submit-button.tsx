import React, { useState, useEffect, useContext } from "react";
import Context from "../context/form";
import Styles from "./styles.scss";

type Props = {
  text: string;
};

const SubmitButton: React.FC<Props> = ({ text }: Props) => {
  const { status } = useContext(Context);

  return (
    <button
      type="submit"
      data-testid="submitButton"
      className={Styles.submitButton}
      disabled={status.invalidForm}
    >
      {text}
    </button>
  );
};
export default SubmitButton;
