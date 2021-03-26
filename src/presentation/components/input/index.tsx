import React from "react";

import Styles from "./styles.scss";
type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const Input: React.FC<Props> = (props: Props) => {
  const enableDataInput = (e: React.FocusEvent<HTMLInputElement>): void => {
    e.target.readOnly = false;
  };

  return (
    <div className={Styles.inputContainer}>
      <input {...props} readOnly onFocus={enableDataInput} />
      <span className={Styles.redDot}>🔴</span>
    </div>
  );
};

export default Input;
