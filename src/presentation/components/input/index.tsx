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
    <div className={Styles.inputContainer}>
      <input
        {...props}
        ref={inputRef}
        placeholder=" "
        data-testid={`${props.name}`}
        readOnly
        onFocus={(e) => (e.target.readOnly = false)}
        onChange={handleOnChange}
        autoComplete="off"
      />
      <label
        onClick={() => {
          inputRef.current.focus();
        }}
      >
        {props.placeholder}
      </label>
      <span
        data-testid={`${props.name}-status`}
        title={error ?? "Ok.."}
        className={Styles.redDot}
      >
        {error ? "🔴" : "🟢"}
      </span>
    </div>
  );
};

export default Input;
