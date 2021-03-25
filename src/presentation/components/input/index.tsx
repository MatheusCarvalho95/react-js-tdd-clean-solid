import React from "react";

import Styles from "./styles.scss";
type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const Input: React.FC<Props> = (props: Props) => {
  return (
    <div className={Styles.inputContainer}>
      <input {...props} />
      <span className={Styles.redDot}>🔴</span>
    </div>
  );
};

export default Input;
