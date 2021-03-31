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
  const { status, setStatus } = useContext(FormContext);

  const error = status[`${props.name}Error`];

  const handleOnChange = (e: React.FocusEvent<HTMLInputElement>): void => {
    setStatus({
      ...status,
      [e?.target?.name]: e?.target?.value,
    });
  };
  const getStatus = (): string => {
    return "🔴";
  };

  const getTitle = (): string => {
    return error;
  };

  return (
    <div className={Styles.inputContainer}>
      <input
        {...props}
        data-testid={`${props.name}`}
        readOnly
        onFocus={enableDataInput}
        onChange={handleOnChange}
      />
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
