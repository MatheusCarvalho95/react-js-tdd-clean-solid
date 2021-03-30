import React, { useContext } from "react";
import Styles from "./styles.scss";
import FormContext from "../context/form";
type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const Input: React.FC<Props> = (props: Props) => {
  const enableDataInput = (e: React.FocusEvent<HTMLInputElement>): void => {
    e.target.readOnly = false;
  };
  const contextValue = useContext<any>(FormContext);

  const error = contextValue[`${props.name}Error`];

  const getStatus = (): string => {
    return "🔴";
  };

  const getTitle = (): string => {
    return error;
  };

  return (
    <div className={Styles.inputContainer}>
      <input {...props} readOnly onFocus={enableDataInput} />
      <span
        data-testid={`${props.name}-status`}
        title={getTitle()}
        className={Styles.redDot}
      >
        {getStatus()}
      </span>
    </div>
  );
};

export default Input;
