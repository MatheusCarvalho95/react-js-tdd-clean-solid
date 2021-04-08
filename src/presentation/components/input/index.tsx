import React, { useContext, useRef } from "react";
import Styles from "./styles.scss";
import FormContext from "../context/form";
type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const Input: React.FC<Props> = (props: Props) => {
  const { status, setStatus } = useContext(FormContext);
  const inputRef = useRef<HTMLInputElement>();
  const error = status[`${props.name}Error`];

  const handleOnChange = (e: React.FocusEvent<HTMLInputElement>): void => {
    setStatus({
      ...status,
      [e?.target?.name]: e?.target?.value,
    });
  };

  return (
    <div
      data-testid={`${props.name}-wrap`}
      className={Styles.inputContainer}
      data-status={error ? "invalid" : "valid"}
    >
      <input
        {...props}
        ref={inputRef}
        title={error}
        placeholder=" "
        data-testid={`${props.name}`}
        readOnly
        onFocus={(e) => (e.target.readOnly = false)}
        onChange={handleOnChange}
        autoComplete="off"
      />
      <label
        title={error}
        data-testid={`${props.name}-label`}
        onClick={() => {
          inputRef.current.focus();
        }}
      >
        {props.placeholder}
      </label>
    </div>
  );
};

export default Input;
